import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";
import { GameContext } from "../../contexts/gameContext";

export default function Modal({ children }) {
  const { modal, setModal } = useContext(ModalContext);
  const { blockKeyPress, setBlockKeyPress } = useContext(GameContext);
  setBlockKeyPress(true);

  if (!modal) {
    setBlockKeyPress(false);
    return null;
  }

  return (
    <Wrapper>
      <ModalContainer>
        <RiCloseFill className="icon" onClick={() => setModal(false)} />
        {children}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: fit-content;
  border: 1px solid #1a1a1b;
  border-radius: 8px;
  overflow-y: scroll;
  margin: 0 auto;
  background-color: #121213;
  opacity: 1;
  z-index: 4;
  position: relative;

  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 25px;
    color: #fff;
  }
`;
