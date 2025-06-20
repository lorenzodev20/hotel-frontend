import { useParams } from "react-router";
import FormEditHotel from "../../components/hotel/FormEditHotel";

export default function HotelsEdit() {
    const { hotelId } = useParams<{ hotelId: string }>();
    return (
        <FormEditHotel hotelId={Number(hotelId)} />
    )
}
