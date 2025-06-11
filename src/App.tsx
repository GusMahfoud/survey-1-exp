
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Surveys } from "./pages/Surveys";
import { Analytics } from "./pages/Analytics";
import { SurveyResponse } from "./pages/SurveyResponse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Admin routes with layout */}
        <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/surveys" element={<Layout><Surveys /></Layout>} />
        <Route path="/admin/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/admin/jobs" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/settings" element={<Layout><Dashboard /></Layout>} />
        
        {/* Public survey response route */}
        <Route path="/survey/:surveyId" element={<SurveyResponse />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/surveys" element={<Layout><Surveys /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/jobs" element={<Layout><Dashboard /></Layout>} />
        <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
