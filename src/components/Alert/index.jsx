import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AlertContext } from "../../contexts/alertContext";

export default function Alert({ children }) {
  const { alert, setAlert } = useContext(AlertContext);
  const alertElement = useRef();

  if (!alert) return null;

  return (
    <Wrapper ref={alertElement}>
      <span>{children}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  height: 30px;
  padding: 2px 5px;
  border-radius: 5px;
  position: fixed;
  background-color: #5c84a3;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  left: calc(50% - 100px);
  top: 45px;
  z-index: 5;
  animation: appear 0.5s ease-in-out 0s forwards normal;
  animation: shake 0.5s ease-in-out 0s forwards;
  animation: dissapear 0.5s ease-in-out 3s forwards;

  @keyframes appear {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes dissapear {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      display: none;
    }
  }

  @keyframes shake {
    0% {
      transform: rotateZ(0);
    }

    25% {
      transform: rotateZ(10deg);
    }

    50% {
      transform: rotateZ(0deg);
    }

    75% {
      transform: rotateZ(-10deg);
    }

    100% {
      transform: rotateZ(0deg);
    }
  }
`;
