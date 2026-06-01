import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { ForgotContent } from '../Components/Modal/Modal';

const ResetPassword = () => {
    const navigate = useNavigate();

    const handleEventClick = (event) => {
        if (event === "login") {
            navigate("/sign-in");
        } else {
            console.log("Unhandled auth event:", event);
        }
    };

    return (
        <AuthLayout>
            <ForgotContent onEventClick={handleEventClick} />
        </AuthLayout>
    );
};

export default ResetPassword;
