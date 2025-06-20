import { useEffect, useState, type ChangeEvent } from "react";
import type { Accommodation, RoomType } from "../../types/catalogs";
import { accommodations, roomsTypes } from "../../api/catalogs";
import Select from "../common/Select";
import type { HotelAvailabilityCreate } from "../../types/hotel";
import { storeHotelAvailability } from "../../api/hotel";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";
import { useNavigate } from "react-router";

const initialState: HotelAvailabilityCreate = {
    quantity: 1,
    room_type_id: 1,
    accommodation_type_id: 1,
    hotel_id: 0
}

type FormCreateAvailabilityProps = {
    hotelId: number,
    enabledAddForm: () => void
}
export default function FormCreateAvailability({ hotelId, enabledAddForm }: Readonly<FormCreateAvailabilityProps>) {
    const [error, setError] = useState('');
    const [register, setRegister] = useState<boolean>(false);
    const [roomTypesData, setRoomTypesData] = useState<RoomType[]>([] as RoomType[])
    const [accommodationTypesData, setAccommodationTypesData] = useState<Accommodation[]>([] as Accommodation[])
    const [hotelAvailability, setHotelAvailability] = useState<HotelAvailabilityCreate>(initialState)
    const navigate = useNavigate();

    const callRoomTypes = async () => {
        const result = await roomsTypes();
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setRoomTypesData(result);
        }
    }

    const callAccommodationTypes = async () => {
        const result = await accommodations();
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setAccommodationTypesData(result);
        }
    }

    useEffect(() => {
        callAccommodationTypes();
        callRoomTypes();
        setHotelAvailability({
            ...hotelAvailability,
            hotel_id: hotelId
        })
    }, [])

    const onSelectChangeRoom = (value: string | number) => {
        setHotelAvailability({
            ...hotelAvailability,
            room_type_id: +value
        })
    }
    const onSelectChangeAccommodation = (value: string | number) => {
        setHotelAvailability({
            ...hotelAvailability,
            accommodation_type_id: +value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isQuantityField = ['quantity'].includes(name)
        setHotelAvailability({
            ...hotelAvailability,
            [name]: isQuantityField ? +value : value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!register) {
            if (Object.values(hotelAvailability).includes(0)) {
                setError('Debe seleccionar valores correctos');
                return;
            }

            const saveAvailability = async () => {
                const result = await storeHotelAvailability(hotelAvailability);
                if ('error' in result) {
                    setError(result?.error);
                    setTimeout(() => {
                        setError('')
                    }, 3000);
                } else {
                    setRegister(true);
                    navigate(`/hotels/${hotelId}/availability`);
                    setTimeout(() => {
                        disabledForm()
                    }, 3000);
                }
            }
            saveAvailability();
        }
    }

    const disabledForm = () => {
        setHotelAvailability(initialState);
        enabledAddForm();
    }
    return (
        <div className="w-full md:max-w-lvh mx-auto bg-white p-6 rounded-lg shadow-md mb-8 ">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registrar disponibilidad de habitaciones</h2>
            </div>
            {register ? (<SuccessMessage>{"Registro creado"}</SuccessMessage>) : ''}
            {error ? (<ErrorMessage>{error}</ErrorMessage>) : ''}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="room_type_id">
                            Tipo de habitación
                        </label>
                        <Select
                            options={roomTypesData.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                            selectedValue={hotelAvailability.room_type_id}
                            onSelectChange={onSelectChangeRoom}
                            required={true}
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="accommodation_type_id">
                            Tipo de acomodación
                        </label>
                        <Select
                            options={accommodationTypesData.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                            selectedValue={hotelAvailability.accommodation_type_id}
                            onSelectChange={onSelectChangeAccommodation}
                            required={true}
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="quantity">
                            Cantidad disponible
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={hotelAvailability.quantity}
                            min={1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="m-4 flex justify-center">
                    <input
                        type='submit'
                        value={`Guardar`}
                        className={`bg-blue-600 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg`}
                    />
                    <button
                        className={`bg-red-700 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg text-center mx-3`}
                        onClick={disabledForm}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
