import { useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        error,
        errorMessage,
        contextLogin
    } = useAuth();


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        contextLogin(email, password);
        navigate("/");
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Inicio de Sesión</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email address
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        id="password"
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error || errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out w-full"
                        type="submit"
                    // disabled={isLoading}
                    >
                        Login {/* {isLoading ? 'Cargando...' : 'Login'} */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;