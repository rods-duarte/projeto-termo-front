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
  animation: appear 0.5s ease-in-out 0s forwards,
    shake 0.5s ease-in-out 0s forwards, dissapear 0.5s ease-in-out 3s forwards;

  @keyframes appear {
    0% {
      opacity: 0;
      display: block;
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
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;
