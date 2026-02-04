import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TelegramProvider } from "@/lib/telegram";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AvatarTestsPage from "@/pages/avatar-tests";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin/avatar-tests" component={AvatarTestsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <LanguageSwitcher />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </TelegramProvider>
    </QueryClientProvider>
  );
}

export default App;
