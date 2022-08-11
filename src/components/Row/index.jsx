import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const wordLength = 5;
export default function Row({ guess, attempt, isTurn, gameEnd }) {
  if (guess) {
    const lastIndex = wordLength - 1;
    return (
      <WordRow>
        {guess.map((letter, index) => (
          <LetterBox
            key={index}
            id={index === lastIndex ? "last" : undefined}
            className={letter.color}
          >
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
        {attempt.split("").map((letter, index) => (
          <LetterBox key={index} className="active">
            {letter.toUpperCase()}
          </LetterBox>
        ))}
        {emptyBoxes.map((letter, index) => (
          <LetterBox key={index} />
        ))}
      </WordRow>
    );
  }

  return (
    <WordRow className={isTurn && !gameEnd ? null : "inactive"}>
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
  gap: 5px;

  &.inactive > * {
    background-color: #333;
    opacity: 0.8;
  }
`;

const LetterBox = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #333;
  background-color: #0000;
  opacity: 1;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  transition: all 0.1s ease;
  transition-delay: 1.5s;

  &.active {
    border: 2px solid #666;
    animation: pop 0.1s ease normal;
    animation-delay: 0s !important;
  }

  &.grey {
    --bg-color: #3a3a3c;
    --color: #fff;
    animation: flip 0.5s ease forwards;
    opacity: 1;
  }

  &.yellow {
    --bg-color: #b59f3b;
    --color: #fff;
    animation: flip 0.5s ease forwards;
    opacity: 1;
  }

  &.green {
    --bg-color: #538d4e;
    --color: #fff;
    animation: flip 0.5s ease forwards;
    opacity: 1;
  }

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.9s;
  }

  &:nth-child(5) {
    animation-delay: 1.2s;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: rotateX(0);
      background-color: #121213;
      border: 2px solid #333;
    }
    45% {
      transform: rotateX(90deg);
      background-color: #121213;
      border: 2px solid #333;
    }
    55% {
      transform: rotateX(90deg);
      background-color: var(--bg-color);
      border: #333;
    }
    100% {
      transform: rotateX(0);
      background-color: var(--bg-color);
      border: #333;
    }
  }
`;
