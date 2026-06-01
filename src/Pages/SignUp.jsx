import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { RegisterContent } from '../Components/Modal/Modal';

const SignUp = () => {
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
            <RegisterContent onEventClick={handleEventClick} />
        </AuthLayout>
    );
};

export default SignUp;
