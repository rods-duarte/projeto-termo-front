import { useContext, useEffect } from "react";
import Game from "../../components/Game";
import Modal from "../../components/Modal";
import { ModalContext } from "../../contexts/modalContext";
import { UserContext } from "../../contexts/userContext";
import Alert from "../../components/Alert";
import { AlertContext } from "../../contexts/alertContext";

export default function Home() {
  const { setModal, modalContent } = useContext(ModalContext);
  const { setAlert, alertContent } = useContext(AlertContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.token) {
      setModal(false);
    }
  }, []);

  return (
    <>
      <Alert>{alertContent}</Alert>
      <Modal>{modalContent}</Modal>
      <Game />
    </>
  );
}
