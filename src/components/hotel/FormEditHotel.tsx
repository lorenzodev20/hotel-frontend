import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import type { HotelDetail } from '../../types/hotel'
import type { StateOrCity } from '../../types/catalogs';
import { cities, states } from '../../api/catalogs';
import Select from '../common/Select';
import { showHotel, updateHotel } from '../../api/hotel';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import { Link, useNavigate } from 'react-router';
import { useSpinner } from '../../hooks/useSpinner';
import SpinnerLoading from '../common/SpinnerLoading';

const initialHotelState: HotelDetail = {
    id: 0,
    name: '',
    address: '',
    tax_id: '',
    available_rooms: 0,
    total_rooms: 0,
    full_address: '',
    city_id: 0,
    state_id: 0
}

type FormEditHotelProps = {
    hotelId: number
}

export default function FormEditHotel({ hotelId }: Readonly<FormEditHotelProps>) {

    const [hotel, setHotel] = useState<HotelDetail>(initialHotelState);
    const [stateData, setStateData] = useState<StateOrCity[]>([] as StateOrCity[]);
    const [cityData, setCityData] = useState<StateOrCity[]>([] as StateOrCity[]);
    const [stateSelected, setStateSelected] = useState<number>(0);
    const [error, setError] = useState('');
    const [register, setRegister] = useState<boolean>(false);
    const navigate = useNavigate();
    const { loading, setLoading } = useSpinner();

    const callHotel = async (id: number) => {
        const result = await showHotel(id);
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setHotel(result);
            setStateSelected(result.state_id);
        }
    }

    const callState = async () => {
        const result = await states();
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setStateData(result);
        }
    }

    const callCity = async (stateId: number = 13) => {
        const result = await cities(stateId);
        if ('error' in result) {
            console.error(result?.error)
        } else {
            setCityData(result);
        }
    }

    useEffect(() => {
        const initialActions = async () => {
            setLoading(true);
            try {
                await callHotel(hotelId);
                await callState();
                if (stateSelected > 0) {
                    await callCity(stateSelected);
                }
            } catch (error) {
                console.error("Error effect", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        initialActions();
    }, []);

    useMemo(() => {
        if (stateSelected > 0) {
            callCity(stateSelected)
        }
    }, [stateSelected]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log({ name, value })
        const isQuantityRoomsField = ['quantity_rooms'].includes(name)
        setHotel({ ...hotel, [isQuantityRoomsField ? 'total_rooms' : name]: isQuantityRoomsField ? +value : value })
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!register) {
            if (Object.values(hotel).includes('')) {
                setError('Todos los campos son obligatorios');
                return;
            }

            const callUpdateHotel = async (hotel: HotelDetail) => {
                const result = await updateHotel(hotelId, hotel);
                if ('error' in result) {
                    setError(result.error);
                } else {
                    setRegister(true);
                }
            }
            callUpdateHotel(hotel);
        } else {
            navigate(`/hotels/${hotelId}/availability`);
        }
    }

    return (<>
        {
            loading ? (
                <SpinnerLoading />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edición datos del hotel</h2>
                    </div>
                    {register ? (<SuccessMessage>{" Modificación correcta! "}</SuccessMessage>) : ''}
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
                                    value={hotel.total_rooms}
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
            )}
    </>)
}
