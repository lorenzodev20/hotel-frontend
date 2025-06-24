import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import type { HotelCreate } from '../../types/hotel'
import type { StateOrCity } from '../../types/catalogs';
import { cities, states } from '../../api/catalogs';
import Select from '../common/Select';
import { storeHotel } from '../../api/hotel';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import { Link, useNavigate } from 'react-router';

const initialHotelState: HotelCreate = {
    name: '',
    address: '',
    tax_id: '',
    quantity_rooms: 1,
    city_id: 0
}

export default function FormCreateHotel() {

    const [hotel, setHotel] = useState<HotelCreate>(initialHotelState);
    const [stateData, setStateData] = useState<StateOrCity[]>([] as StateOrCity[]);
    const [cityData, setCityData] = useState<StateOrCity[]>([] as StateOrCity[]);
    const [stateSelected, setStateSelected] = useState<number>(0);
    const [error, setError] = useState('');
    const [register, setRegister] = useState<boolean>(false);
    const [hotelId, setHotelId] = useState<number>(0);
    const navigate = useNavigate();

    const callState = async () => {
        const result = await states();
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setStateData(result);
        }
    }

    const callCity = async (stateId: number = 15) => {
        const result = await cities(stateId);
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setCityData(result);
        }
    }

    useEffect(() => {
        const startCatalogs = async () => {
            await callState();
            await callCity();
        }
        startCatalogs();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isQuantityRoomsField = ['quantity_rooms'].includes(name)
        setHotel({ ...hotel, [name]: isQuantityRoomsField ? +value : value })
    }

    const onSelectChangeCity = (value: string | number) => {
        setHotel({
            ...hotel,
            city_id: +value
        })
    }
    const onSelectChangeState = (value: string | number) => {
        setStateSelected(+value);
    }

    useMemo(() => {
        if (stateSelected > 0) {
            callCity(stateSelected)
        }
    }, [stateSelected])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!register) {
            if (Object.values(hotel).includes('')) {
                setError('Todos los campos son obligatorios');
                return;
            }

            const saveHotel = async (hotel: HotelCreate) => {
                const result = await storeHotel(hotel);
                if ('error' in result) {
                    setError(result.error);
                } else {
                    setHotelId(result.id);
                    setRegister(true);
                }
            }
            saveHotel(hotel);
        } else {
            navigate(`/hotels/${hotelId}/availability`);
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Creación de Hotel</h2>
            </div>
            {register ? (<SuccessMessage>{" Creación del hotel correcta! "}</SuccessMessage>) : ''}
            {error ? (<ErrorMessage>{error}</ErrorMessage>) : ''}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="name"
                            name="name"
                            type="text"
                            value={hotel.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                            Dirección
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="address"
                            name="address"
                            type="text"
                            value={hotel.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="state">
                            Departamento
                        </label>

                        <Select
                            options={stateData.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                            selectedValue={stateSelected}
                            onSelectChange={onSelectChangeState}
                            required={true}
                            idOrNameSelect="state"
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                            Ciudad
                        </label>
                        <Select
                            options={cityData.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                            selectedValue={hotel.city_id}
                            onSelectChange={onSelectChangeCity}
                            required={true}
                            idOrNameSelect='address'
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tax_id">
                            NIT
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="tax_id"
                            name="tax_id"
                            type="text"
                            value={hotel.tax_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="quantity_rooms">
                            Cantidad de habitaciones
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="quantity_rooms"
                            name="quantity_rooms"
                            type="number"
                            value={hotel.quantity_rooms}
                            min={1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="m-4 flex justify-center">
                    <input
                        type='submit'
                        value={register ? `Configurar habitaciones` : `Guardar`}
                        className={`${register ? 'bg-green-600' : 'bg-blue-600'} cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg mx-3`}
                    />
                    <Link
                        to="/hotels"
                        className={`bg-gray-600 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg text-center mx-3`}
                    >
                        Volver al listado
                    </Link>
                </div>
            </form>
        </div>
    )
}
