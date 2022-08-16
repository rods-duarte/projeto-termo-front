import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function ProgressBar({ index, total, current }) {
  const progressBar = useRef();
  const [progress, setProgress] = useState((current * 100) / total);

  useEffect(() => {
    const progressPercentage = (current * 100) / total;
    setProgress(progressPercentage);
  }, [total, current]);

  useEffect(() => {
    progressBar.current.style.setProperty("--before-width", `${progress}%`);
  }, [progress, progressBar]);

  return (
    <Wrapper>
      <span>{index}</span>

      <Progress ref={progressBar} value={current}>
        <Value>{current}</Value>
      </Progress>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 15px;
`;

const Progress = styled.div`
  --before-width: 0;
  width: 90%;
  height: 20px;
  background-color: #0000;
  position: relative;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-size: 12px;

  &::before {
    content: " ";
    min-width: 15px;
    width: var(--before-width);
    height: 20px;
    background-color: #3a3a3c;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

const Value = styled.span`
  width: var(--before-width);
  min-width: 15px;
  height: 20px;
  padding-right: 3.5px;
  background-color: #3a3a3c;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
