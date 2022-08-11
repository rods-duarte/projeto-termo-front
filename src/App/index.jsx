import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "../components/Game";
import GlobalStyle from "../assets/styles/global";
import { GameContextProvider } from "../contexts/gameContext";

export default function App() {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </GameContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
