import { createContext, useState, ReactNode, useCallback } from "react";

type Props = {
  children: ReactNode;
};

interface Auth {
  username: string;
  accessToken: string;
}

interface AuthState {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
