import { createContext, useState, ReactNode } from "react";

type Props = {
    children: ReactNode
};

interface Auth{
    username : string;
    accessToken: string | null;
};

interface AuthState
{
    auth: Auth | null;
    setAuth : React.Dispatch<React.SetStateAction<Auth | null>> | null;
};

const defaultAuthState : AuthState = {auth: null, setAuth : null};
const AuthContext = createContext<AuthState>(defaultAuthState);

export const AuthProvider = ({ children } : Props) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const state : AuthState = {auth, setAuth};
    return (
        <AuthContext.Provider value={ state }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;