import type { UserAuthActive } from "../types";

export type AuthActions =
    { type: 'set-auth-user', payload: { data: UserAuthActive } }

export type AuthState = {
    userAuth: UserAuthActive
}
const getInitialUserAuthState = (): UserAuthActive => {
    try {
        const storedAuth = localStorage.getItem('userAuth');
        if (storedAuth) {
            const parsedAuth: UserAuthActive = JSON.parse(storedAuth);
            return parsedAuth;
        }
    } catch (error) {
        console.error("Failed to retrieve or parse userAuth from localStorage:", error);
    }
    return {
        token: '',
        name: '',
        email: ''
    };
};

const initialUserAuth: UserAuthActive = getInitialUserAuthState();

export const initialState: AuthState = {
    userAuth: initialUserAuth
}
export const authReducer = (state: AuthState = initialState, action: AuthActions) => {
    if (action.type === 'set-auth-user') {
        // asignar o recuperar al estado global del local storage
        return {
            ...state,
            userAuth: action.payload.data
        };
    }
    return state;
}
