import { createContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { login, logout } from "../api/auth";
import { authReducer, initialState } from "../reducers/auth-reducer";
import type { UserAuthActive, UserLogin } from "../types";
import { isValidUserAuthActive } from "../utils/auth";

interface AuthContextProps {
    isAuthenticated: boolean;
    userAuth: UserAuthActive; // Expose the actual user data
    error: boolean;
    errorMessage: string;
    contextLogin: (email: string, password: string) => Promise<void>;
    contextLogout: () => Promise<void>; // Add logout to context
    setError: (value: boolean) => void;
    setErrorMessage: (message: string) => void;
}

type AuthProviderProps = {
    children: ReactNode
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const userAuth = state.userAuth;

    const contextLogin = async (email: string, password: string) => {
        setError(false);
        setErrorMessage('');
        const response = await login({ email, password });

        if ('error' in response) {
            console.error("Error");
            setError(true);
            setErrorMessage(response.error);
        } else {
            const authData: UserAuthActive = {
                token: response?.token,
                name: response?.name,
                email: response?.email
            };
            dispatch({
                type: 'set-auth-user',
                payload: {
                    data: authData
                }
            })
            localStorage.setItem('UserAuthActive', JSON.stringify(authData));
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
        }
    }

    const contextGetUserAuthActive = async () => {
        setIsAuthenticated(true);
        if (!isValidUserAuthActive(state.userAuth)) {
            setIsAuthenticated(false);
            return;
        }
        setError(false);
        setErrorMessage('');
    }

    const contextLogout = async () => {
        setError(false);
        setErrorMessage('');
        await logout();
        dispatch({
            type: 'set-auth-user',
            payload: {
                data: initialState.userAuth
            }
        })
        localStorage.removeItem("UserAuthActive")
        localStorage.removeItem("isAuthenticated")
        setIsAuthenticated(false);
    }
    useEffect(() => {
        contextGetUserAuthActive();
    }, [])

    const obj = useMemo(() => ({
        isAuthenticated,
        userAuth,
        contextLogin,
        contextLogout,
        error,
        setError,
        errorMessage,
        setErrorMessage
    }), [isAuthenticated]);

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider >
    )
}

