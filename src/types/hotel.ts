export type Hotel = {
    id: number,
    name: string,
    address: string,
    tax_id: string,
    quantity_rooms: number,
    city_id: number
}

export type HotelCreate = Omit<Hotel, 'id'>

export type HotelList = {
    available_rooms: number,
    total_rooms: number
} & Omit<Hotel, 'quantity_rooms'>

export type HotelDetail = {
    available_rooms: number,
    total_rooms: number,
    full_address: string,
    state_id: number
} & Omit<Hotel, 'quantity_rooms'>

export type HotelAvailability = {
    id: number,
    quantity: number,
    room_type: string,
    accommodation_type: string
}

export type HotelAvailabilityCreate = Omit<HotelAvailability, 'id' | 'room_type' | 'accommodation_type'> & {
    room_type_id: number,
    accommodation_type_id: number,
    hotel_id: number
}

export type HotelAvailabilityDetail = {
    hotel: string
} & HotelAvailability

export type HotelAvailabilityUpdate = Omit<HotelAvailability, 'id' | 'room_type' | 'accommodation_type'> & {
    room_type_id: number,
    accommodation_type_id: number,
    hotel_id: number
}