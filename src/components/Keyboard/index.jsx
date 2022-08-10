import { useState } from "react";
import styled from "styled-components";

export default function Keyboard({ lettersUsed }) {
  console.log(
    "🚀 ~ file: index.jsx ~ line 5 ~ Keyboard ~ lettersUsed",
    lettersUsed
  );
  const [letters, setLetters] = useState([
    { key: "Q" },
    { key: "W" },
    { key: "E" },
    { key: "R" },
    { key: "T" },
    { key: "Y" },
    { key: "U" },
    { key: "I" },
    { key: "O" },
    { key: "P" },
    { key: "A" },
    { key: "S" },
    { key: "D" },
    { key: "F" },
    { key: "G" },
    { key: "H" },
    { key: "J" },
    { key: "K" },
    { key: "L" },
    { key: "Z" },
    { key: "X" },
    { key: "C" },
    { key: "V" },
    { key: "B" },
    { key: "N" },
    { key: "M" },
  ]);

  const firstRow = [];
  const secondRow = [];
  const thirdRow = [];

  letters.forEach((letter, index) => {
    const color = lettersUsed[letter.key.toLowerCase()]?.color;
    if (index <= 9) {
      firstRow.push(<Key className={color}>{letter.key}</Key>);
    } else if (index <= 18) {
      secondRow.push(<Key className={color}>{letter.key}</Key>);
    } else {
      thirdRow.push(<Key className={color}>{letter.key}</Key>);
    }
  });

  return (
    <KeyboardContainer>
      <div>{firstRow}</div>
      <div>{secondRow}</div>
      <div>{thirdRow}</div>
    </KeyboardContainer>
  );
}

const KeyboardContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  font-weight: 500;

  & > div {
    width: fit-content;
    display: flex;
    justify-content: center;
    column-gap: 2px;
  }
`;

const Key = styled.div`
  width: 50px;
  height: 43px;
  margin: 1px;
  border-radius: 5px;
  background-color: #818384;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  &.grey {
    background-color: #3a3a3c;
  }

  &.yellow {
    background-color: #b59f3b;
  }

  &.green {
    background-color: #538d4e;
  }
`;
