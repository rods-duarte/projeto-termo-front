/* eslint-disable react/jsx-no-constructed-context-values */

import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../api";
import { words } from "../words";
import { UserContext } from "./userContext";

export const GameContext = createContext();

const wordLength = 5;

export function GameContextProvider({ children }) {
  const [attempt, setAttempt] = useState("");
  const [turn, setTurn] = useLocalStorage("turn", 0);
  const [guesses, setGuesses] = useLocalStorage("guesses", [...Array(6)]);
  const [lettersUsed, setLettersUsed] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [blockKeyPress, setBlockKeyPress] = useState(false);
  const [data, setData] = useLocalStorage("data", null);
  const [answer, setAnswer] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(async () => {
    try {
      const response = await api.getGameData();
      const wordsArray = Object.getOwnPropertyNames(words);

      if (response.data.answer !== data.answer) {
        setGuesses([...Array(6)]);
        setTurn(0);
      }

      setAnswer(wordsArray[Number(response.data.answer)]);
      setData(response.data);
    } catch (err) {
      alert("error while getting game data, try again later !");
    }
  }, []);

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  function isCorrectAnswer() {
    return answer === attempt;
  }

  function updateUserStats() {
    if (isCorrectAnswer()) {
      let attemptsProperty;
      if (turn === 0) attemptsProperty = "oneGuess";
      if (turn === 1) attemptsProperty = "twoGuess";
      if (turn === 2) attemptsProperty = "threeGuess";
      if (turn === 3) attemptsProperty = "fourGuess";
      if (turn === 4) attemptsProperty = "fiveGuess";
      if (turn === 5) attemptsProperty = "sixGuess";
      const newStats = {
        [attemptsProperty]: user[attemptsProperty] + 1,
        wins: user.wins + 1,
        currentStreak: user.currentStreak + 1,
        bestStreak:
          user.currentStreak > user.bestStreak
            ? user.currentStreak + 1
            : user.bestStreak,
      };

      setUser({ ...user, ...newStats });
      api.updateStats(user.id, user.token, newStats);
      return;
    }

    if (turn === 5) {
      const newStats = {
        losses: user.losses + 1,
        currentStreak: 0,
      };

      setUser({ ...user, ...newStats });
      api.updateStats(user.id, user.token, newStats);
    }
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
      console.log(answer);
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

    updateUserStats();
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
      console.log(key);

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
        answer,
        blockKeyPress,
        setBlockKeyPress,
        handleKeyUp,
        handleAnimationStart,
        handleAnimationEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
