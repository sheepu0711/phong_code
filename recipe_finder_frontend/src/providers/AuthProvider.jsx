import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  clearAuth as clearAuthStorage,
  getUser,
  isAuthenticated,
  setAuth as setAuthStorage,
} from "../utils/auth";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoginStatus = () => {
    const loggedIn = isAuthenticated();
    const userData = getUser();
    console.log("Checking login status:", { loggedIn, userData });
    setIsLoggedIn(loggedIn);
    setUser(userData);
  };

  useEffect(() => {
    console.log("AuthProvider mounted");
    checkLoginStatus();
  }, []);

  const setAuth = (token, userData) => {
    console.log("Setting auth:", { token, userData });
    setAuthStorage(token, userData);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const clearAuth = () => {
    console.log("Clearing auth");
    clearAuthStorage();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    setAuth,
    clearAuth,
  };

  console.log("AuthProvider value:", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
