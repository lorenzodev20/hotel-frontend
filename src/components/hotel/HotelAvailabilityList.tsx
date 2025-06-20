import type { HotelAvailabilityDetail } from "../../types/hotel";
import { TrashIcon } from "@heroicons/react/16/solid";
import List from "../common/List";
import { deleteHotelAvailability } from "../../api/hotel";
import { useState } from "react";
import SuccessMessage from "../common/SuccessMessage";

type HotelAvailabilityListProps = {
    availabilities: HotelAvailabilityDetail[],
    refreshView: () => void
}
export default function HotelAvailabilityList({ availabilities, refreshView }: Readonly<HotelAvailabilityListProps>) {
    const [success, setSuccess] = useState('');
    const handleDelete = async (id: number) => {
        await deleteHotelAvailability(id);
        setSuccess("¡Registro eliminado!")
        setTimeout(() => {
            refreshView();
        }, 2000);
    }

    const renderHotel = (item: HotelAvailabilityDetail) => (
        <div className="bg-white shadow rounded-md p-4 flex justify-between items-center border-2 border-solid">
            <div>
                <p className="font-semibold text-gray-800">{`Cantidad: ${item.quantity}`}</p>
                <p className="font-semibold text-gray-800">{`Tipo de habitación: ${item.room_type}`}</p>
                <p className="font-semibold text-gray-800">{`Acomodación: ${item.accommodation_type}`}</p>
            </div>
            <div className="flex space-x-2">
                {/* <Link to={`/hotels/${item.id}/availability`} className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500">
                    <PencilSquareIcon className="w-8 text-black" title="Editar" />
                </Link> */}
                <button
                    className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleDelete(item.id)}
                >
                    <TrashIcon className="w-8 text-black" title="Eliminar" />
                </button>
            </div>
        </div>
    );

    const hotelsList: Array<{ id: number; data: HotelAvailabilityDetail }> = availabilities.map(item => {
        return {
            id: item.id,
            data: item
        }
    })

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:max-w-lvh mx-auto ">
            <div className="m-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 underline">Detalle de la disponibilidad</h2>
            </div>
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <div className='m-4'>
                <List
                    items={hotelsList}
                    renderItem={renderHotel}
                />
            </div>
        </div>
    )
}
