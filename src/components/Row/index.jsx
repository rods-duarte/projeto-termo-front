import styled from "styled-components";

const wordLength = 5;
export default function Row({ guess, attempt }) {
  if (guess) {
    return (
      <WordRow>
        {guess.map((letter) => (
          <LetterBox className={letter.color}>
            {letter.key.toUpperCase()}
          </LetterBox>
        ))}
      </WordRow>
    );
  }

  if (attempt) {
    const emptySpaces = wordLength - attempt.length;
    const emptyBoxes = [...Array(emptySpaces)];
    return (
      <WordRow>
        {attempt.split("").map((letter) => (
          <LetterBox>{letter.toUpperCase()}</LetterBox>
        ))}
        {emptyBoxes.map(() => (
          <LetterBox />
        ))}
      </WordRow>
    );
  }

  return (
    <WordRow>
      <LetterBox> </LetterBox>
      <LetterBox> </LetterBox>
      <LetterBox> </LetterBox>
      <LetterBox> </LetterBox>
      <LetterBox> </LetterBox>
    </WordRow>
  );
}

const WordRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
`;

const LetterBox = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;

  &.grey {
    background-color: #999;
    color: #fff;
  }

  &.yellow {
    background-color: #d08b01;
    color: #fff;
  }

  &.green {
    background-color: #28af28;
    color: #fff;
  }
`;
