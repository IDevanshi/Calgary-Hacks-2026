import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LanguageArchive from "./pages/LanguageArchive";
import LanguageDetail from "./pages/LanguageDetail";
import Login from "./pages/Login";
import AdminManage from "./pages/AdminManage";
import AdminRequests from "./pages/AdminRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/archive" element={<LanguageArchive />} />
            <Route path="/language/:id" element={<LanguageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/manage" element={<AdminManage />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
