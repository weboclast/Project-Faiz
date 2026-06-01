import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { LoginContent } from '../Components/Modal/Modal';

const SignIn = () => {
    const navigate = useNavigate();

    const handleEventClick = (event) => {
        if (event === "register") {
            navigate("/sign-up");
        } else if (event === "forgot password") {
            navigate("/reset-password");
        } else {
            console.log("Unhandled auth event:", event);
        }
    };

    return (
        <AuthLayout>
            <LoginContent onEventClick={handleEventClick} />
        </AuthLayout>
    );
};

export default SignIn;
