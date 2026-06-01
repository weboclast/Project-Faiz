import React from 'react';
import { Container } from 'react-bootstrap';

const AuthLayout = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
            <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80')" }}>
            </div>
            <div className="flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
