import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GlobalStyle from "../assets/styles/global";
import { GameContextProvider } from "../contexts/gameContext";
import { ModalContextProvider } from "../contexts/modalContext";
import { UserContextProvider } from "../contexts/userContext";
import { AlertContextProvider } from "../contexts/alertContext";
import Header from "../components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AlertContextProvider>
          <GameContextProvider>
            <ModalContextProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </ModalContextProvider>
          </GameContextProvider>
        </AlertContextProvider>
      </UserContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
