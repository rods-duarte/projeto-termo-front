import { useContext, useEffect } from "react";
import styled from "styled-components";
import GameBoard from "../GameBoard";
import Keyboard from "../Keyboard";

import { GameContext } from "../../contexts/gameContext";

export default function Game() {
  const { attempt, turn, guesses, lettersUsed, handleKeyUp } =
    useContext(GameContext);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <Main>
      <GameBoard guesses={guesses} attempt={attempt} turn={turn} />
      <Keyboard lettersUsed={lettersUsed} />
    </Main>
  );
}

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
