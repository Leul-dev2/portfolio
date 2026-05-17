import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./router";
import "./styles/globals.css";
import { ScrollToTopButton } from "./components/ScrollEffects";
import { CursorGlow } from "./components/EnhancedEffects";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CursorGlow />
        <AppRouter />
        <ScrollToTopButton />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
