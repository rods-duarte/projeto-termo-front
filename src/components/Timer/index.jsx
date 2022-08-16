import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { GameContext } from "../../contexts/gameContext";

export default function Timer() {
  const { data } = useContext(GameContext);
  const endDate = new Date(data?.endTime);
  const startDate = new Date(data?.startTime);
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();
  const diff = endTime - startTime;
  const [timeLeft, setTimeLeft] = useState(diff / 1000);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft((state) => state - 1);
    }, 1000);
  }, [timeLeft]);

  const seconds = Math.floor(timeLeft) % 60;
  const minutes = Math.floor(timeLeft / 60) % 60;
  const hours = Math.floor((timeLeft / (60 * 60)) % 24);
  return (
    <Wrapper>
      <div>{String(hours).padStart(2, "0")}</div>:
      <div>{String(minutes).padStart(2, "0")}</div>:
      <div>{String(seconds).padStart(2, "0")}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
