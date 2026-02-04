import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Play, Download, Loader2, Plus } from "lucide-react";

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

export default function AvatarTestsPage() {
  const queryClient = useQueryClient();
  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [runningTestId, setRunningTestId] = useState<string | null>(null);

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

  const runSingleMutation = useMutation({
    mutationFn: async (data: { questionId: string; question: string }) => {
      setRunningTestId(data.questionId);
      const res = await fetch("/api/avatar-tests/run-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      setRunningTestId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/avatar-tests/runs"] });
    },
    onError: () => {
      setRunningTestId(null);
    },
  });

  const runAllMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/avatar-tests/run-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/avatar-tests/runs"] });
    },
  });

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
            <div>Сессия: ~1 минута, 1 вопрос на сессию</div>
          </div>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="questions" data-testid="tab-questions">Вопросы</TabsTrigger>
            <TabsTrigger value="results" data-testid="tab-results">Результаты</TabsTrigger>
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

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Список вопросов ({questions.length})</h2>
              <Button
                onClick={() => runAllMutation.mutate()}
                disabled={runAllMutation.isPending || questions.length === 0}
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-run-all"
              >
                {runAllMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Запустить все тесты
              </Button>
            </div>

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
                                variant="outline"
                                onClick={() => runSingleMutation.mutate({ questionId: q.id, question: q.question })}
                                disabled={runningTestId === q.id}
                                data-testid={`button-run-${q.id}`}
                              >
                                {runningTestId === q.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
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
              <h2 className="text-xl font-semibold">Результаты тестов ({runs.length})</h2>
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
                  Нет результатов. Добавьте вопросы и запустите тесты.
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
                          {run.responseTimeMs && (
                            <div>{(run.responseTimeMs / 1000).toFixed(1)}s</div>
                          )}
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
