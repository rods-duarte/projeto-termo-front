import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "../components/Game";
import GlobalStyle from "../assets/styles/global";
import { GameContextProvider } from "../contexts/gameContext";

const wordLength = 5; //! .env

//! POSSO CRIAR UM GAME CONTEXT E ABSTRAIR TODAS ESSAS INFORMACOES LA !!!

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
