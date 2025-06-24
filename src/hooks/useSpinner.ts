import { useState } from "react";

export const useSpinner = () => {
    const [loading, setLoading] = useState<boolean>(true);
    return {
        loading,
        setLoading
    }
}