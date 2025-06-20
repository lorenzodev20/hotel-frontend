import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router';
import type { HotelAvailabilityDetail, HotelDetail } from '../../types/hotel';
import { allHotelAvailability, showHotel } from '../../api/hotel';
import FormCreateAvailability from '../../components/hotel/FormCreateAvailability';
import HotelAvailabilityList from '../../components/hotel/HotelAvailabilityList';
import { useSpinner } from '../../hooks/useSpinner';
import SpinnerLoading from '../../components/common/SpinnerLoading';

const initialHotelState: HotelDetail = {
  id: 0,
  name: '',
  address: '',
  tax_id: '',
  city_id: 0,
  available_rooms: 0,
  total_rooms: 0,
  full_address: '',
  state_id: 0
}

export default function HotelUpdatePage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelDetail>(initialHotelState);
  const [hotelAvailability, setHotelAvailability] = useState<HotelAvailabilityDetail[]>([]);
  const [addAvailability, setAddAvailability] = useState<boolean>(false);
  const [refreshView, setRefreshView] = useState<boolean>(false);
  const { loading, setLoading } = useSpinner();

  const callHotel = async (id: number) => {
    const result = await showHotel(id);
    if ('error' in result) {
      console.error(result?.error)
    } else {
      setHotel(result);
    }
  }
  const callHotelAvailability = async (id: number) => {
    const result = await allHotelAvailability(id);
    if ('error' in result) {
      console.error(result?.error)
    } else {
      setHotelAvailability(result.data);
    }
  }

  const initialActions = async () => {
    try {
      await callHotel(Number(hotelId))
      await callHotelAvailability(Number(hotelId))
    } catch (error) {
      console.error("Effect error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    initialActions();
  }, [hotelId]);

  const enabledAddForm = () => {
    setAddAvailability(!addAvailability)
  }

  useMemo(() => {
    initialActions();
  }, [addAvailability, refreshView])

  return (<>{loading ? (
    <SpinnerLoading />
  ) : (
    <div className='w-full'>
      <div className="w-full md:max-w-lvh mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="text-2xl font-bold underline text-center"> Datos del Hotel </p>
        <p className="font-medium text-center m-1">{`${hotel.name ?? ''}`}</p>
        {hotel.tax_id && <p className="font-medium text-center m-1">{`${hotel.address}`}</p>}
        {hotel.tax_id && <p className="font-medium text-center m-1">{`${hotel.tax_id}`}</p>}
        {hotel.tax_id && <p className="font-medium text-center m-1">{`Total de habitaciones: ${hotel.total_rooms}`}</p>}
        {hotel.tax_id && <p className="font-medium text-center m-1">{`Habitaciones disponibles: ${hotel.available_rooms}`}</p>}
        <div className="m-4 flex justify-center">
          <Link
            to="/hotels"
            className={`bg-gray-600 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg text-center mx-3`}
          >
            Volver al listado
          </Link>
          <Link
            to={`/hotels/${hotelId}/edit`}
            className={`bg-blue-500 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg text-center mx-3`}
          >
            Editar Información
          </Link>
          {!addAvailability && (
            <button
              className={`bg-green-700 cursor-pointer w-2xs p-2 text-white uppercase font-bold rounded-lg text-center mx-3`}
              onClick={enabledAddForm}
            >
              Agregar Disponibilidad
            </button>
          )}
        </div>
      </div>

      {addAvailability && <FormCreateAvailability hotelId={Number(hotelId)} enabledAddForm={enabledAddForm} />}

      {hotelAvailability.length > 0 ? (<HotelAvailabilityList availabilities={hotelAvailability} refreshView={() => setRefreshView(!refreshView)} />) : ''}

    </div>
  )}</>)
}
