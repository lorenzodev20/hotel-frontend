import { Navigate, Outlet } from "react-router";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../hooks/useAuth";

export default function AuthenticatedLayout() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            {/* Pendiente para cuando agregue el contexto global del sidebar */}
            {/* <div className={`min-h-screen bg-gray-100 flex-1 flex items-center justify-center p-4 ${isOpen ? 'ml-64' : 'ml-20'} md:ml-0`}></div> */}
            <div className="min-h-screen bg-gray-100 flex-1 flex items-center justify-center p-4 md:ml-0">
                <Outlet />
            </div>
        </div>
    );
}
