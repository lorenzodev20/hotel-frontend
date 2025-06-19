import type { ErrorApi, UserAuthActive, UserLogin } from "../types";
import { hotelBackend } from "./client";

export const login = async ({ email, password }: UserLogin): Promise<UserAuthActive | ErrorApi> => {
    try {
        const result = await hotelBackend.post('/auth/login', { email, password });

        return {
            token: result.data?.token,
            name: result.data?.user?.name,
            email: result.data?.user?.email
        };
    } catch (error: any) {
        if (error.response) {
            let messageError = error.response.data?.message ?? 'Error desconocido del servidor.';
            console.error(messageError);
            return { error: messageError };
        }
        console.error('Error inesperado:', error.message);
        return { error: 'Ocurrió un error inesperado.' };
    }
}

export const logout = async (): Promise<void | ErrorApi> => {
    try {
        await hotelBackend.post('/auth/logout');
    } catch (error: any) {
        if (error.response) {
            let messageError = error.response.data?.message ?? 'Error desconocido del servidor.';
            console.error(messageError);
            return { error: messageError };
        }
        console.error('Error inesperado:', error.message);
        return { error: 'Ocurrió un error inesperado.' };
    }
}

export const me = async (): Promise<void | ErrorApi> => {
    try {
        const response = await hotelBackend.post('/auth/logout');
        console.info(response);
    } catch (error: any) {
        if (error.response) {
            let messageError = error.response.data?.message ?? 'Error desconocido del servidor.';
            console.error(messageError);
            return { error: messageError };
        }
        console.error('Error inesperado:', error.message);
        return { error: 'Ocurrió un error inesperado.' };
    }
}