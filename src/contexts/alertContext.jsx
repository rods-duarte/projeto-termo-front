import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState(null);
  const [badAnimation, setBadAnimation] = useState(true);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
        alertContent,
        setAlertContent,
        badAnimation,
        setBadAnimation,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
