import { useContext, useEffect } from "react";
import Game from "../../components/Game";
import Modal from "../../components/Modal";
import { ModalContext } from "../../contexts/modalContext";
import Signin from "../../components/Signin";
import { UserContext } from "../../contexts/userContext";

export default function Home() {
  const { setModal, modalContent } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.token) {
      setModal(false);
    }
  }, []);

  return (
    <>
      <Modal>{modalContent}</Modal>
      <Game />
    </>
  );
}
