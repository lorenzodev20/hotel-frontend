import { FolderPlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import List from '../../components/common/List';
import type { HotelList } from '../../types/hotel';
import { allHotels } from '../../api/hotel';
import { Link } from 'react-router';
import SpinnerLoading from '../../components/common/SpinnerLoading';
import { useSpinner } from '../../hooks/useSpinner';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelList[]>([]);
  const { loading, setLoading } = useSpinner();

  useEffect(() => {
    
    const getHotels = async () => {
      setLoading(true);
      try {
        const result = await allHotels();
        if ('error' in result) {
          console.error(result?.error)
        } else {
          // @ts-ignore
          setHotels(result.data);
        }
      } catch (error) {
        console.error("Hubo un error al cargar los hoteles:", error);
      } finally {
        setLoading(false);
      }
    }

    getHotels();
  }, []);

  const renderHotel = (item: HotelList) => (
    <div className="bg-white shadow rounded-md p-4 flex justify-between items-center border-2 border-solid">
      <div>
        <p className="font-semibold text-gray-800"> {item.name}</p>
        <p className="text-gray-600 text-sm">{item.address}</p>
        <p className="text-gray-600 text-sm">{item.tax_id}</p>
        <p className="text-gray-600 text-sm">{`Total de habitaciones: ${item.total_rooms}`}</p>
        <p className="text-gray-600 text-sm">{`Habitaciones disponibles: ${item.available_rooms}`}</p>
      </div>
      <div className="flex space-x-2">
        <Link to={`/hotels/${item.id}/edit`} className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500">
          <PencilSquareIcon className="w-8 text-black" title="Editar" />
        </Link>
        <Link to={`/hotels/${item.id}/availability`} className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500">
          <FolderPlusIcon className="w-8 text-black" title="Editar Disponibilidad" />
        </Link>
        <Link to={`/hotels/${item.id}/availability`} className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500">
          <TrashIcon className="w-8 text-black" title="Eliminar" />
        </Link>
      </div>
    </div>
  );

  const hotelsList: Array<{ id: number; data: HotelList }> = hotels.map(item => {
    return {
      id: item.id,
      data: item
    }
  })

  return (<>
    {
      loading ? (
        <SpinnerLoading />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
          <div className="m-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 underline">Listado de Hoteles </h2>
          </div>
          <div className="m-4 flex items-center">
            <Link
              to={"/hotels/create"}
              className="bg-green-600 cursor-pointer p-2 text-white uppercase font-bold rounded-lg"
            > Crear Registro</Link>
          </div>
          <div className='m-4'>
            <List
              items={hotelsList}
              renderItem={renderHotel}
            />
          </div>
        </div>
      )
    }
  </>)
}
