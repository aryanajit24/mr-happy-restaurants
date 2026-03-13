import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
function AppRoutes() {
  // wouter's Router `base` prop must not have a trailing slash so that
  // route matching strips the prefix correctly (e.g. "/mr-happy-restaurants"
  // lets "/" match the Home route at "/mr-happy-restaurants/").
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  // make sure to consider if you need authentication for certain routes
  return (
    <Router base={base}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster position="top-right" />
            <AppRoutes />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
