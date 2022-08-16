import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const userDataModel = {
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    oneGuess: 0,
    twoGuess: 0,
    threeGuess: 0,
    fourGuess: 0,
    fiveGuess: 0,
    sixGuess: 0,
  };
  const [user, setUser] = useLocalStorage("user", userDataModel);

  function logout() {
    alert("Log out");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
