import { useEffect, useState, type PropsWithChildren } from 'react'

export default function SuccessMessage({ children }: Readonly<PropsWithChildren>) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null;
    }
    return (
        <p className='bg-green-600 p-2 text-white font-bold text-sm text-center'>{children}</p>
    )
}
