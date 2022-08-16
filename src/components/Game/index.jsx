import { useContext, useEffect } from "react";
import styled from "styled-components";
import GameBoard from "../GameBoard";
import Keyboard from "../Keyboard";

import { GameContext } from "../../contexts/gameContext";

export default function Game() {
  const {
    attempt,
    turn,
    guesses,
    lettersUsed,
    handleKeyUp,
    handleAnimationStart,
    handleAnimationEnd,
    gameEnd,
  } = useContext(GameContext);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    window.addEventListener("animationstart", handleAnimationStart);
    return () =>
      window.removeEventListener("animationstart", handleAnimationStart);
  }, [handleAnimationStart]);

  useEffect(() => {
    window.addEventListener("animationend", handleAnimationEnd);
    return () => window.removeEventListener("animationend", handleAnimationEnd);
  }, [handleAnimationEnd]);

  return (
    <Main>
      <GameBoard
        guesses={guesses}
        attempt={attempt}
        turn={turn}
        gameEnd={gameEnd}
      />
      <Keyboard lettersUsed={lettersUsed} />
    </Main>
  );
}

const Main = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
