import styled from "styled-components";
import { GoGraph, GoSignIn, GoSignOut } from "react-icons/go";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";
import Stats from "../Stats";
import { UserContext } from "../../contexts/userContext";
import Signin from "../Signin";

export default function Header() {
  const { setModalContent, setModal } = useContext(ModalContext);
  const { user, logout } = useContext(UserContext);

  const signinOrSignout = user?.token ? (
    <GoSignOut onClick={logout} />
  ) : (
    <GoSignIn
      onClick={() => {
        setModalContent(<Signin />);
        setModal(true);
      }}
    />
  );

  return (
    <Container>
      <span>Termo</span>
      <GoGraph
        onClick={() => {
          if (!user?.token) alert("You must be logged !");
          else setModalContent(<Stats />);
          setModal(true);
        }}
      />
      {signinOrSignout}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #3a3a3c;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  column-gap: 10px;
  text-align: center;

  span {
    width: fit-content;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }

  svg {
    cursor: pointer;
  }

  color: #eee;
  font-size: 20px;
`;
