import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/auth';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { contextLogout, userAuth } = useAuth();
    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    }
    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} flex flex-col h-screen fixed md:relative z-40`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {isOpen && <span className="text-xl font-semibold">Hotel</span>}
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> // Icono X
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> // Icono Hamburguesa
                        )}
                    </svg>
                </button>
            </div>
            <nav className="mt-5 flex-1">
                <ul>
                    {/* <li className="mb-2">
                        <Link to="/dashboard" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-15 4v-4a1 1 0 011-1h2m-14 4h14a1 1 0 001-1v-4a1 1 0 00-1-1h-2"></path></svg>
                            {isOpen && <span className="whitespace-nowrap">Dashboard</span>}
                        </Link>
                    </li> */}
                    <li className="mb-2">
                        <Link to="/hotels" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-15 4v-4a1 1 0 011-1h2m-14 4h14a1 1 0 001-1v-4a1 1 0 00-1-1h-2"></path></svg>
                            {isOpen && <span className="whitespace-nowrap">Hoteles</span>}
                        </Link>
                    </li>
                    {/* <li className="mb-2">
                        <Link to="/users" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-4v-2h4v2zm-2-10V4h2v6h-2zM4 12V4h2v8H4zm6-2V4h2v6h-2zm-6 8H4v-2h2v2z"></path></svg>
                            {isOpen && <span className="whitespace-nowrap">Usuarios</span>}
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/settings" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.608 3.292 0z"></path></svg>
                            {isOpen && <span className="whitespace-nowrap">Configuración</span>}
                        </Link>
                    </li> */}
                </ul>
            </nav>
            {/* Logout al final */}
            <div className="mt-auto p-4 border-t border-gray-700">
                <button onClick={contextLogout} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 transition duration-150 ease-in-out">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    {isOpen && <span className="whitespace-nowrap">Cerrar Sesión</span>}
                </button>
            </div>
            {/* Footer para la versión compacta si se desea, o para el "Tailwind CSS" */}
            <div className="text-center text-gray-500 text-xs p-4">
                {'Usuario: '}
                {''}
                {isOpen ? userAuth.name : getInitials(userAuth.name)}
            </div>
        </div>
    );
};

export default Sidebar;