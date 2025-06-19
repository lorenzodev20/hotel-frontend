import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = {
    id: string;
    email: string;
    name?: string;
};

type AuthContextProps = {
    isAuthenticated: boolean;
    user: User | null; // Cambiamos 'session' por 'user'
    token: string | null; // Añadimos el token
    login: (email: string, password: string) => Promise<string | undefined>; // Cambiamos el retorno a Promise<string | undefined> para el token
    logout: () => void;
    // Podemos añadir un estado de carga y error para la UI
    isLoading: boolean;
    error: string | null;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null); // Guardaremos la información del usuario logueado
    const [token, setToken] = useState<string | null>(null); // Guardaremos el token JWT
    const [isLoading, setIsLoading] = useState<boolean>(true); // Para el estado de carga inicial al verificar token
    const [error, setError] = useState<string | null>(null); // Para manejar errores de autenticación

    // useEffect para verificar el token al cargar la aplicación
    useEffect(() => {
        const loadUserFromLocalStorage = () => {
            try {
                const storedToken = localStorage.getItem('authToken');
                const storedUser = localStorage.getItem('authUser');

                if (storedToken && storedUser) {
                    const parsedUser: User = JSON.parse(storedUser);
                    setToken(storedToken);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error("Failed to parse user or token from localStorage", e);
                // Si hay un error al parsear, limpiamos el localStorage para evitar problemas
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            } finally {
                setIsLoading(false); // Deja de cargar una vez que la verificación inicial está completa
            }
        };

        loadUserFromLocalStorage();
    }, []);

    const login = async (email: string, password: string): Promise<string | undefined> => {
        setError(null); // Limpiar errores previos
        setIsLoading(true); // Indicar que la operación está en curso

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, { // <--- Ajusta la ruta de tu API para el login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Si la respuesta no es OK (ej. 401 Unauthorized, 400 Bad Request)
                const errorMessage = data.message || 'Error al iniciar sesión.';
                throw new Error(errorMessage);
            }

            // Asumiendo que tu API devuelve el token y la información del usuario
            const receivedToken: string = data.token; // <--- Asegúrate que tu backend envía el token como 'token'
            const receivedUser: User = data.user;   // <--- Asegúrate que tu backend envía el usuario como 'user' (o adáptalo)

            setToken(receivedToken);
            setUser(receivedUser);
            setIsAuthenticated(true);

            // Guardar el token y la información del usuario en localStorage
            localStorage.setItem('authToken', receivedToken);
            localStorage.setItem('authUser', JSON.stringify(receivedUser)); // Guarda el usuario como string JSON

            setIsLoading(false);
            return receivedToken; // Retorna el token si es necesario
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || 'Ha ocurrido un error inesperado durante el login.');
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
            setIsLoading(false);
            throw err; // Re-lanza el error para que pueda ser manejado en la UI (ej. LoginForm)
        }
    };

    const logout = () => {
        // Limpiar el estado
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        // Eliminar el token y usuario de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        // Aquí podrías opcionalmente llamar a un endpoint de logout en tu API si es necesario invalidar el token en el backend
        // fetch(`${API_BASE_URL}/auth/logout`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //     },
        // });
    };

    // Memoizar el objeto de contexto para evitar re-renderizados innecesarios
    const contextValue = useMemo(() => ({
        isAuthenticated,
        user,
        token,
        login,
        logout,
        isLoading,
        error
    }), [isAuthenticated, user, token, isLoading, error]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};