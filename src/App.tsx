
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="fixed top-0 right-0 p-2 z-50">
          <div className="flex gap-2">
            <Link to="/" className="text-xs px-3 py-1 bg-blue-600/70 hover:bg-blue-700/90 text-white rounded-full backdrop-blur-sm shadow transition-all">
              Landing Page
            </Link>
            <Link to="/admin" className="text-xs px-3 py-1 bg-yellow-500/70 hover:bg-yellow-600/90 text-black rounded-full backdrop-blur-sm shadow transition-all">
              Admin
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
