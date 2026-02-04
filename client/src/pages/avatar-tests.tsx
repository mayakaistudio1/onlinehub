import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Download, Loader2, Plus, Video, X, MessageCircle, Send } from "lucide-react";
import {
  Room,
  RoomEvent,
  Track,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
  ConnectionState,
} from "livekit-client";

const CATEGORIES = [
  "Приветствие",
  "О компании",
  "Возражения",
  "Закрытие сделки",
  "Нестандартные",
];

interface TestQuestion {
  id: string;
  category: string;
  question: string;
  createdAt: string;
}

interface TestRun {
  id: string;
  questionId: string;
  question: string;
  answer: string | null;
  sessionId: string | null;
  responseTimeMs: number | null;
  status: string;
  createdAt: string;
}

type SessionState = "idle" | "connecting" | "connected" | "ended" | "error";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function AvatarTestsPage() {
  const queryClient = useQueryClient();
  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  
  const [activeTest, setActiveTest] = useState<TestQuestion | null>(null);
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const roomRef = useRef<Room | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data: questions = [], isLoading: loadingQuestions } = useQuery<TestQuestion[]>({
    queryKey: ["/api/avatar-tests/questions"],
    queryFn: async () => {
      const res = await fetch("/api/avatar-tests/questions");
      return res.json();
    },
  });

  const { data: runs = [], isLoading: loadingRuns } = useQuery<TestRun[]>({
    queryKey: ["/api/avatar-tests/runs"],
    queryFn: async () => {
      const res = await fetch("/api/avatar-tests/runs");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const addQuestionMutation = useMutation({
    mutationFn: async (data: { category: string; question: string }) => {
      const res = await fetch("/api/avatar-tests/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/avatar-tests/questions"] });
      setNewQuestion("");
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/avatar-tests/questions/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/avatar-tests/questions"] });
    },
  });

  const saveResultMutation = useMutation({
    mutationFn: async (data: { questionId: string; question: string; sessionId: string }) => {
      const res = await fetch("/api/avatar-tests/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/avatar-tests/runs"] });
    },
  });

  useEffect(() => {
    if (sessionState === "connected") {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionState]);

  const handleTrackSubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      if (track.kind === "video" && videoRef.current) {
        track.attach(videoRef.current);
      }
      if (track.kind === "audio" && audioContainerRef.current) {
        const audioEl = track.attach();
        audioEl.volume = 1.0;
        audioEl.autoplay = true;
        audioElementsRef.current.set(publication.trackSid, audioEl);
        audioContainerRef.current.appendChild(audioEl);
      }
    },
    []
  );

  const handleTrackUnsubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication) => {
      if (track.kind === "video") {
        track.detach();
      }
      if (track.kind === "audio") {
        const audioEl = audioElementsRef.current.get(publication.trackSid);
        if (audioEl) {
          audioEl.remove();
          audioElementsRef.current.delete(publication.trackSid);
        }
      }
    },
    []
  );

  const handleDataReceived = useCallback((payload: Uint8Array, participant?: RemoteParticipant) => {
    try {
      const text = new TextDecoder().decode(payload);
      const data = JSON.parse(text);
      if (data.type === "agent.text_response" && data.text) {
        const msg: Message = { id: Date.now().toString(), role: "assistant", text: data.text };
        setMessages((prev) => [...prev, msg]);
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const startTest = async (question: TestQuestion) => {
    setActiveTest(question);
    setSessionState("connecting");
    setMessages([]);
    setRemainingTime(60);

    try {
      const tokenRes = await fetch("/api/avatar-tests/sandbox-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!tokenRes.ok) throw new Error("Failed to get sandbox token");
      const tokenData = await tokenRes.json();
      setSessionId(tokenData.session_id);
      setSessionToken(tokenData.session_token);

      const startRes = await fetch("/api/liveavatar/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_token: tokenData.session_token }),
      });
      if (!startRes.ok) throw new Error("Failed to start session");
      const startData = await startRes.json();

      const { livekit_url, livekit_client_token } = startData.data || startData;

      const room = new Room();
      roomRef.current = room;

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
      room.on(RoomEvent.DataReceived, handleDataReceived);
      room.on(RoomEvent.Disconnected, () => {
        setSessionState("ended");
        if (activeTest && sessionId) {
          saveResultMutation.mutate({
            questionId: activeTest.id,
            question: activeTest.question,
            sessionId: sessionId,
          });
        }
      });

      await room.connect(livekit_url, livekit_client_token);
      setSessionState("connected");
    } catch (error: any) {
      console.error("Start test error:", error);
      setSessionState("error");
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isSending || !sessionToken) return;
    setIsSending(true);
    const text = inputText.trim();
    setInputText("");
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      await fetch("/api/liveavatar/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_token: sessionToken,
          event_type: "text_message",
          data: { text },
        }),
      });
    } catch (e) {
      console.error("Send message error:", e);
    } finally {
      setIsSending(false);
    }
  };

  const endSession = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setSessionState("ended");
    if (activeTest && sessionId) {
      saveResultMutation.mutate({
        questionId: activeTest.id,
        question: activeTest.question,
        sessionId: sessionId,
      });
    }
  };

  const closeTest = () => {
    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
    }
    setActiveTest(null);
    setSessionState("idle");
    setSessionId(null);
    setSessionToken(null);
    setMessages([]);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      addQuestionMutation.mutate({ category: newCategory, question: newQuestion.trim() });
    }
  };

  const handleExportCSV = () => {
    window.open("/api/avatar-tests/export-csv", "_blank");
  };

  const groupedQuestions = questions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {} as Record<string, TestQuestion[]>);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" data-testid="text-page-title">
          Тестирование LiveAvatar (Sandbox)
        </h1>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
          <div className="text-green-400 font-medium mb-2">Sandbox режим — кредиты НЕ списываются</div>
          <div className="text-gray-400 text-sm space-y-1">
            <div>Context ID: <span className="text-blue-400">ff6ea605-fd86-449c-8b22-ecb41bd4b27e</span> (WOW Live)</div>
            <div>Аватар: Wayne (sandbox)</div>
            <div>Сессия: ~1 минута</div>
            <div className="text-yellow-400 mt-2">Workflow: Нажмите "Тест" → Задайте вопрос голосом или текстом → Результат сохранится автоматически</div>
          </div>
        </div>

        {activeTest && (
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                Тест: {activeTest.question}
                {sessionState === "connected" && (
                  <span className="ml-3 text-sm text-yellow-400">({remainingTime}s)</span>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={closeTest}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative w-80 h-60 bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={false}
                    className="w-full h-full object-cover"
                  />
                  <div ref={audioContainerRef} className="hidden" />
                  {sessionState === "connecting" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                      <span className="ml-2">Подключение...</span>
                    </div>
                  )}
                  {sessionState === "ended" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <span className="text-green-400">Сессия завершена. Результат сохранён.</span>
                    </div>
                  )}
                  {sessionState === "error" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <span className="text-red-400">Ошибка подключения</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto max-h-48 mb-3">
                    {messages.length === 0 ? (
                      <div className="text-gray-500 text-sm text-center mt-8">
                        Задайте вопрос голосом или напишите в чат
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`mb-2 p-2 rounded ${
                            m.role === "user"
                              ? "bg-blue-900/50 text-blue-200 ml-8"
                              : "bg-gray-700 text-gray-200 mr-8"
                          }`}
                        >
                          {m.text}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="flex-1 bg-gray-700 border-gray-600"
                      disabled={sessionState !== "connected"}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={sessionState !== "connected" || isSending}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={endSession}
                      variant="destructive"
                      disabled={sessionState !== "connected"}
                    >
                      Завершить
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="questions" data-testid="tab-questions">Вопросы</TabsTrigger>
            <TabsTrigger value="results" data-testid="tab-results">Результаты ({runs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Добавить вопрос</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger className="w-48 bg-gray-700 border-gray-600" data-testid="select-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Введите тестовый вопрос..."
                    className="flex-1 bg-gray-700 border-gray-600"
                    data-testid="input-question"
                    onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
                  />
                  <Button
                    onClick={handleAddQuestion}
                    disabled={addQuestionMutation.isPending || !newQuestion.trim()}
                    data-testid="button-add-question"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold">Список вопросов ({questions.length})</h2>

            {loadingQuestions ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              </div>
            ) : (
              <div className="space-y-4">
                {CATEGORIES.map((category) => {
                  const categoryQuestions = groupedQuestions[category] || [];
                  if (categoryQuestions.length === 0) return null;
                  return (
                    <Card key={category} className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-gray-300">{category}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {categoryQuestions.map((q) => (
                          <div
                            key={q.id}
                            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                            data-testid={`question-item-${q.id}`}
                          >
                            <span className="flex-1">{q.question}</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => startTest(q)}
                                disabled={activeTest !== null}
                                data-testid={`button-test-${q.id}`}
                              >
                                <Video className="w-4 h-4 mr-1" />
                                Тест
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteQuestionMutation.mutate(q.id)}
                                data-testid={`button-delete-${q.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Результаты тестов</h2>
              <Button
                onClick={handleExportCSV}
                disabled={runs.length === 0}
                variant="outline"
                data-testid="button-export-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Экспорт CSV
              </Button>
            </div>

            {loadingRuns ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              </div>
            ) : runs.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="py-8 text-center text-gray-400">
                  Нет результатов. Выберите вопрос и нажмите "Тест".
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {runs.map((run) => (
                  <Card key={run.id} className="bg-gray-800 border-gray-700" data-testid={`run-item-${run.id}`}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-blue-400 mb-1">Вопрос:</div>
                          <div className="mb-3">{run.question}</div>
                          <div className="font-medium text-green-400 mb-1">Ответ:</div>
                          <div className="text-gray-300 whitespace-pre-wrap">
                            {run.answer || <span className="text-gray-500 italic">Нет ответа</span>}
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-400 ml-4">
                          <div className={`px-2 py-1 rounded text-xs mb-2 ${
                            run.status === "completed" ? "bg-green-900 text-green-300" :
                            run.status === "running" ? "bg-yellow-900 text-yellow-300" :
                            run.status === "failed" ? "bg-red-900 text-red-300" :
                            "bg-gray-700 text-gray-400"
                          }`}>
                            {run.status}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
