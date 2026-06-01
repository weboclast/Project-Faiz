import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { insforge } from '../insforge';

const SignIn = () => {
    const navigate = useNavigate();

    const [togglePassword, settogglePassword] = useState(true);
    const [toogleCheck, setToogleCheck] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError('');

        try {
            setLoading(true);

            const { error: signInError } = await insforge.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message || 'Sign in failed');
                return;
            }

            window.dispatchEvent(new Event('insforge-auth-change'));
            navigate('/');
        } catch (err) {
            setError(err?.message || 'Sign in failed');
        } finally {
            setLoading(false);
        }
    };

    const SquareCheck = () => {
        return (
            <div
                onClick={() => setToogleCheck(!toogleCheck)}
                className={
                    "w-[24px] h-[24px] rounded-[4px] border border-solid flex items-center justify-center cursor-pointer " +
                    (toogleCheck ? "!border-orange " : "border-[#A3A3A3]")
                }
            >
                {toogleCheck ? <img src="./../images/sdgdgdsg.svg" alt="" /> : ""}
            </div>
        );
    };

    return (
        <AuthLayout>
            <Fragment>
                <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Login</h3>

                {error ? (
                    <div className="mb-4 text-center text-[12px] lg:text-[14px] text-red-600">
                        {error}
                    </div>
                ) : null}

                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]'
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Password</Form.Label>
                        <div className="relative">
                            <div
                                className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2"
                                onClick={() => settogglePassword(!togglePassword)}
                            >
                                <img src="./../images/eye-slash.svg" alt="" />
                            </div>
                            <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={togglePassword ? "password" : "text"}
                                className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]'
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </Form.Group>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToogleCheck(!toogleCheck)}>
                            {SquareCheck()} <span className='text-[14px] lg:text-[16px] text-[#878690]'>Remember me</span>
                        </div>

                        <div onClick={() => navigate("/reset-password")} className='font-medium text-[12px] cursor-pointer underline'>
                            Forgot Password
                        </div>
                    </div>

                    <div
                        onClick={loading ? undefined : handleLogin}
                        className={
                            'btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center ' +
                            (loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer')
                        }
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </div>

                    <div className="my-4 text-center relative">
                        <div className="w-full h-[1px] bg-[#E5E5E5] absolute left-0 top-1/2 -translate-y-1/2"></div>
                        <div className="inline-block text-[12px] lg:text-[14px] text-[#A3A3A3] bg-white px-3 py-1 relative z-2">
                            Or Sign In with
                        </div>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-3 mb-4">
                        <a href='#!' className="relative inline-block px-3 py-[10px] w-full text-center rounded-[16px] border border-solid border-[#E5E5E5] ">
                            <img src="./../images/Icon - Google.svg" className='absolute left-[10px] top-1/2 -translate-y-1/2' alt="" />
                            <div className="relative z-2 font-medium text-[12px] lg:text-[14px]">
                                Google
                            </div>
                        </a>
                        <a href='#!' className="relative inline-block px-3 py-[10px] w-full text-center rounded-[16px] border border-solid border-[#E5E5E5] ">
                            <img src="./../images/facebook-3-2 1.svg" className='absolute left-[10px] top-1/2 -translate-y-1/2' alt="" />
                            <div className="relative z-2 font-medium text-[12px] lg:text-[14px]">
                                Facebook
                            </div>
                        </a>
                    </div>

                    <div className="text-center text-[12px] lg:text-[14px] text-[#525252]">
                        Don’t have an account? <span className='text-orange cursor-pointer' onClick={() => navigate("/sign-up")}>Sign Up</span>
                    </div>
                </Form>
            </Fragment>
        </AuthLayout>
    );
};

export default SignIn;
