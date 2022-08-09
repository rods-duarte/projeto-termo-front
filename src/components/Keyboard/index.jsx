import { useState } from "react";
import styled from "styled-components";

export default function Keyboard({ lettersUsed }) {
  const [letters, setLetters] = useState([
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
  ]);

  const firstRow = [];
  const secondRow = [];
  const thirdRow = [];

  const keys = letters.forEach((letter, index) => {
    const color = lettersUsed[letter.key]?.color;
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

  & > div {
    width: fit-content;
    display: flex;
    justify-content: center;
  }
`;

const Key = styled.div`
  width: 50px;
  height: 43px;
  margin: 1px;
  border-radius: 5px;
  background-color: antiquewhite;

  display: flex;
  justify-content: center;
  align-items: center;

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
