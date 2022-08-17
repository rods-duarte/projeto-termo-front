import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../api";
import { words } from "../words";
import { UserContext } from "./userContext";
import { AlertContext } from "./alertContext";
import { ModalContext } from "./modalContext";
import UserStats from "../components/Stats";

export const GameContext = createContext();

const wordLength = 5;

export function GameContextProvider({ children }) {
  const [attempt, setAttempt] = useState("");
  const [turn, setTurn] = useLocalStorage("turn", 0);
  const [guesses, setGuesses] = useLocalStorage("guesses", [...Array(6)]);
  const [lettersUsed, setLettersUsed] = useState({});
  const [gameEnd, setGameEnd] = useLocalStorage("gameEnd", false);
  const [blockKeyPress, setBlockKeyPress] = useState(false);
  const [data, setData] = useLocalStorage("data", null);
  const [answer, setAnswer] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const { setAlert, setAlertContent, setBadAnimation } =
    useContext(AlertContext);
  const { setModal, setModalContent } = useContext(ModalContext);

  useEffect(() => {
    api
      .getGameData()
      .then((response) => {
        const wordsArray = Object.getOwnPropertyNames(words);

        // reset localstorage values if the word is new
        if (response.data.answer !== data?.answer) {
          setGuesses([...Array(6)]);
          setTurn(0);
          setGameEnd(false);
        }

        setAnswer(wordsArray[Number(response.data.answer)]);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert("error while getting game data, try again later !");
      });
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
      if (turn === 0) {
        attemptsProperty = "oneGuess";
        setAlertContent("Genius");
      } else if (turn === 1) {
        attemptsProperty = "twoGuess";
        setAlertContent("Magnificent");
      } else if (turn === 2) {
        attemptsProperty = "threeGuess";
        setAlertContent("Impressive");
      } else if (turn === 3) {
        attemptsProperty = "fourGuess";
        setAlertContent("Splendid");
      } else if (turn === 4) {
        attemptsProperty = "fiveGuess";
        setAlertContent("Great");
      } else if (turn === 5) {
        attemptsProperty = "sixGuess";
        setAlertContent("Phew");
      }

      const newStats = {
        [attemptsProperty]: user[attemptsProperty] + 1,
        wins: user.wins + 1,
        currentStreak: user.currentStreak + 1,
        bestStreak:
          user.currentStreak >= user.bestStreak
            ? user.currentStreak + 1
            : user.bestStreak,
      };

      setUser({ ...user, ...newStats });
      api.updateStats(user.id, user.token, newStats);

      setBadAnimation(false);
      setModalContent(<UserStats />);
      setTimeout(() => {
        setAlert(true);
        setModal(true);
      }, 1500);
      return;
    }

    if (turn === 5 && !isCorrectAnswer()) {
      const newStats = {
        losses: user.losses + 1,
        currentStreak: 0,
      };
      setAlertContent(answer);
      setBadAnimation(false);

      setUser({ ...user, ...newStats });
      api.updateStats(user.id, user.token, newStats);
      setModalContent(<UserStats />);
      setTimeout(() => {
        setAlert(true);
        setModal(true);
      }, 1500);
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

    setAlert(false);

    if (key === "Enter") {
      if (attempt.length !== 5) {
        setAlertContent("Not enough letters");
        setAlert(true);
        return;
      }
      if (turn > 5) return;

      if (!words[attempt]) {
        setAlertContent("Word not in the list !");
        setAlert(true);
        return;
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
        data,
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
