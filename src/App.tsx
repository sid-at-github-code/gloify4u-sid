import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FloatingChat from "./components/FloatingChat";

// Heavy pages — Three.js / Spline only load when those routes are visited
const Projects   = lazy(() => import("./pages/Projects"));
const HowWeWork  = lazy(() => import("./pages/HowWeWork"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"            element={<Index />}     />
            <Route path="/projects"    element={<Projects />}  />
            <Route path="/how-we-work" element={<HowWeWork />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*"            element={<NotFound />}  />
          </Routes>
        </Suspense>
        <FloatingChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
