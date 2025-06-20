import type { ErrorApi } from "../types";
import type {
    Hotel,
    HotelAvailability,
    HotelAvailabilityCreate,
    HotelAvailabilityDetail,
    HotelAvailabilityUpdate,
    HotelCreate,
    HotelDetail,
    HotelList
} from "../types/hotel";
import { hotelBackend } from "./client";

export const storeHotel = async ({ name, address, tax_id, quantity_rooms, city_id }: HotelCreate): Promise<Hotel | ErrorApi> => {
    try {
        const { data } = await hotelBackend.post('/hotel', { name, address, tax_id, quantity_rooms, city_id });
        return data?.hotel;
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

export const showHotel = async (hotelId: number): Promise<HotelDetail | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get(`/hotel/${hotelId}`);
        return data?.hotel;
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

export const updateHotel = async (id: number, { name, address, tax_id, total_rooms, city_id }: HotelDetail): Promise<HotelDetail | ErrorApi> => {
    try {
        const { data } = await hotelBackend.put(`/hotel/${id}`, {
            name,
            address,
            tax_id,
            quantity_rooms: total_rooms,
            city_id
        });
        return data?.hotel;
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

export const allHotels = async (page: number = 1, perPage: number = 1000): Promise<HotelList[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<HotelList[]>(`/hotel`, {
            params: {
                page,
                perPage
            }
        });
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


export const storeHotelAvailability = async ({ room_type_id, accommodation_type_id, quantity, hotel_id }: HotelAvailabilityCreate): Promise<HotelAvailability | ErrorApi> => {
    try {
        const { data } = await hotelBackend.post('/availability', { room_type_id, accommodation_type_id, quantity, hotel_id });
        return data?.availability;
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

export const updateHotelAvailability = async (id: number, { quantity, room_type_id, accommodation_type_id, hotel_id }: HotelAvailabilityUpdate): Promise<HotelAvailability | ErrorApi> => {
    try {
        const { data } = await hotelBackend.put(`/availability/${id}`, { quantity, room_type_id, accommodation_type_id, hotel_id });
        return data?.availability;
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

export const allHotelAvailability = async (hotelId: number, page: number = 1, perPage: number = 1000): Promise<HotelAvailabilityDetail[] | ErrorApi> => {
    try {
        const { data } = await hotelBackend.get<HotelAvailabilityDetail[]>(`/availability`, {
            params: {
                hotelId,
                page,
                perPage
            }
        });
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

export const deleteHotelAvailability = async (id: number): Promise<void | ErrorApi> => {
    try {
        await hotelBackend.delete(`/availability/${id}`);
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

export const deleteHotel = async (id: number): Promise<void | ErrorApi> => {
    try {
        await hotelBackend.delete(`/hotel/${id}`);
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