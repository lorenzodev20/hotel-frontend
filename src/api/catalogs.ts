import type { ErrorApi } from "../types";
import type { Accommodation, RoomTypes, StateOrCity } from "../types/catalogs";
import { hotelBackend } from "./client";

export const accommodations = async (): Promise<Accommodation[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<Accommodation[]>('/catalogs/accommodations');
        return data;
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

export const roomsTypes = async (): Promise<RoomTypes[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<RoomTypes[]>('/catalogs/rooms-types');
        return data;
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

export const states = async (countryId: number = 43): Promise<StateOrCity[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<StateOrCity[]>(`/catalogs/states?country_id=${countryId}`);
        return data;
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

export const cities = async (stateId: number = 13): Promise<StateOrCity[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<StateOrCity[]>(`/catalogs/cities?state_id=${stateId}`);
        return data;
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