import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import LoginPage from "../pages/LoginPage";

const RedirectToHomeIfAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/hotels');
        }
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? null : <LoginPage />;
};

export default RedirectToHomeIfAuthenticated;
