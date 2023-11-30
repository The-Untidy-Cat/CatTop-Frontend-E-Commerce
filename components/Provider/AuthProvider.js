import { createContext, useContext } from "react";
import { useUserController, useFakeUserController } from "./controllers/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const auth = useUserController();
  // const auth = useFakeUserController();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useUser = () => useContext(AuthContext);
