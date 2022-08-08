import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";

const wordLength = 5; //! .env

export default function App() {
  const [attempt, setAttempt] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [letterUsed, setLettersUsed] = useState({});
  const answer = "teste"; //eslint-disable-line

  function handleKeyUp({ key }) {
    console.log(key);

    if (key === "Enter" && attempt.length === 5) {
      // TODO verify answer
      if (attempt === answer) {
        alert("certa resposta");
      }
    }

    if (key === "Backspace") {
      setAttempt((state) => state.slice(0, -1));
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (attempt.length < wordLength) {
        setAttempt((state) => state + key);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>
      <GameBoard guesses={guesses} attempt={attempt} turn={turn} />
    </div>
  );
}
