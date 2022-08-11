/* eslint-disable react/jsx-no-constructed-context-values */

import { createContext, useState } from "react";
import { words } from "../words";

export const GameContext = createContext();

const wordLength = 5; //! .env

export function GameContextProvider({ children }) {
  const [attempt, setAttempt] = useState("");
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [lettersUsed, setLettersUsed] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [blockKeyPress, setBlockKeyPress] = useState(false);
  const answer = "given"; //eslint-disable-line

  function isCorrectAnswer() {
    return answer === attempt;
  }

  function updateTurn() {
    setAttempt("");
    setTurn((state) => state + 1);
    if (isCorrectAnswer()) setGameEnd(true);
  }

  function registerAttempt() {
    const newGuess = attempt
      .split("")
      .map((letter) => ({ key: letter, color: "grey" }));

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

    updateTurn();

    const letters = {};
    newGuess.forEach((letter) => {
      lettersUsed[letter.key] = letter;
    });
    setLettersUsed({ ...lettersUsed, letters });
  }

  function handleAnimationStart(e) {
    const classes = e.target.classList;
    if (
      classes.contains("grey") ||
      classes.contains("green") ||
      classes.contains("yellow")
    ) {
      setBlockKeyPress(true);
    }
  }

  function handleAnimationEnd(e) {
    if (e.target.id === "last") {
      setBlockKeyPress(false);
    }
  }

  function handleKeyUp({ key }) {
    if (gameEnd) return;
    if (blockKeyPress) return;

    if (key === "Enter" && attempt.length === 5) {
      if (attempt.length !== 5) return;
      if (turn > 5) return;

      if (!words[attempt]) {
        alert("palavra invalida");
        return;
      }

      //! essa validacao deve ser feita dentro do registerAttempt
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

  return (
    <GameContext.Provider
      value={{
        attempt,
        turn,
        guesses,
        lettersUsed,
        gameEnd,
        handleKeyUp,
        handleAnimationStart,
        handleAnimationEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
