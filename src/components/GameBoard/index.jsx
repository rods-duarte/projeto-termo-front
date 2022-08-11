import styled from "styled-components";
import Row from "../Row";

export default function GameBoard({ guesses, turn, attempt, gameEnd }) {
  return (
    <Board>
      {guesses.map((guess, index) => {
        if (index === turn) {
          return (
            <Row attempt={attempt} isTurn={index === turn} gameEnd={gameEnd} />
          );
        }
        return <Row guess={guess} />;
      })}
    </Board>
  );
}

const Board = styled.div`
  max-width: fit-content;
  display: grid;
  gap: 5px;
  margin: 0 auto;
`;
