import { createContext, useState } from "react";
import Signin from "../components/Signin"; // eslint-disable-line

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modal, setModal] = useState(true);
  const [modalContent, setModalContent] = useState(<Signin />);

  return (
    <ModalContext.Provider
      value={{ modal, setModal, modalContent, setModalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
}
