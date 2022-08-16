import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState(null);

  return (
    <AlertContext.Provider
      value={{ alert, setAlert, alertContent, setAlertContent }}
    >
      {children}
    </AlertContext.Provider>
  );
}
