import styled from "styled-components";
import Row from "../Row";

export default function GameBoard({ guesses, turn, attempt }) {
  return (
    <Board>
      {guesses.map((guess, index) => {
        if (index === turn) {
          return <Row attempt={attempt} />;
        }
        return <Row guess={guess} />;
      })}
    </Board>
  );
}

const Board = styled.div`
  width: 500px;
  margin: 0 auto;
`;
