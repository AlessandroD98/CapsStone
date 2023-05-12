import { ReactNode, createContext, useState, useContext } from "react";
import { IUser } from "../interface/Interface";

type AuthContextType = {
  auth: IUser | null;
  setAuth: (value: IUser | null) => void;
};

const authContextDefaultValues: AuthContextType = {
  auth: null,
  setAuth: () => {},
};

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

//const AuthContext = createContext({});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<IUser | null>(null);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
export default AuthContext;
