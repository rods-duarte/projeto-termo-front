import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";

const wordLength = 5; //! .env

export default function App() {
  const [attempt, setAttempt] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [letterUsed, setLettersUsed] = useState({});
  const answer = "teste"; //eslint-disable-line

  function registerAttempt() {
    const newGuess = attempt
      .split("")
      .map((letter) => ({ key: letter, color: "grey" }));

    // find green letters
    newGuess.forEach((letter, index) => {
      if (letter.key === answer[index]) {
        newGuess[index].color = "green";
      }
    });

    newGuess.forEach((letter, index) => {
      if (answer.includes(letter.key) && letter.color !== "green") {
        newGuess[index].color = "yellow";
      }
    });

    setGuesses((state) =>
      state.map((guess, index) => {
        if (index === turn) {
          return newGuess;
        }
        return guess;
      })
    );
    setAttempt("");
    setTurn((state) => state + 1);
  }

  function handleKeyUp({ key }) {
    if (key === "Enter" && attempt.length === 5) {
      if (attempt.length !== 5) return;
      if (turn > 6) return;

      // TODO verify answer
      if (attempt === answer) {
        alert("certa resposta");
      }

      registerAttempt();
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
