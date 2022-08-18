import { useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import styled from "styled-components";

export default function Keyboard({ lettersUsed }) {
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

  function handleClick(e) {
    window.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: e.target.id,
      })
    );
  }

  letters.forEach((letter, index) => {
    const color = lettersUsed[letter.key.toLowerCase()]?.color;

    if (index <= 9) {
      firstRow.push(
        <Key
          key={letter.key}
          id={letter.key.toLowerCase()}
          onClick={(e) => handleClick(e)}
          className={color}
        >
          {letter.key}
        </Key>
      );
    } else if (index <= 18) {
      secondRow.push(
        <Key
          key={letter.key}
          id={letter.key.toLowerCase()}
          onClick={(e) => handleClick(e)}
          className={color}
        >
          {letter.key}
        </Key>
      );
    } else {
      thirdRow.push(
        <Key
          key={letter.key}
          id={letter.key.toLowerCase()}
          onClick={(e) => handleClick(e)}
          className={color}
        >
          {letter.key}
        </Key>
      );
    }
  });

  return (
    <KeyboardContainer>
      <KeyboardRow>{firstRow}</KeyboardRow>
      <KeyboardRow>{secondRow}</KeyboardRow>
      <KeyboardRow>
        <Key id="Enter" onClick={(e) => handleClick(e)}>
          Enter
        </Key>
        {thirdRow}
        <Key id="Backspace" onClick={(e) => handleClick(e)}>
          <RiDeleteBack2Line />
        </Key>
      </KeyboardRow>
    </KeyboardContainer>
  );
}

const KeyboardContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  font-weight: 500;
`;

const KeyboardRow = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  column-gap: 2px;
`;

const Key = styled.div`
  width: 50px;
  height: 43px;
  margin: 1px;
  border-radius: 5px;
  background-color: #818384;
  color: #fff;
  font-size: 19px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &.grey {
    background-color: #3a3a3c;
    opacity: 0.5;
  }

  &.yellow {
    background-color: #b59f3b;
  }

  &.green {
    background-color: #538d4e;
  }

  &#Enter,
  &#Backspace {
    width: 70px;
  }

  &#Backspace {
    font-size: 28px;
  }

  & > svg {
    pointer-events: none;
  }

  @media screen and (max-width: 500px) {
    width: 30px;
    height: 40px;

    &#Backspace {
      width: 20%;
      font-size: 23px;
    }

    &#Enter {
      font-size: 15px;
      width: 50px;
    }
  }

  @media screen and (max-width: 340px) {
    width: 25px;
  }
`;
