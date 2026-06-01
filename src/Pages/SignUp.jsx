import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { insforge } from '../insforge';

const SignUp = () => {
    const navigate = useNavigate();

    const [togglePassword, settogglePassword] = useState(true);

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [view, setView] = useState('form'); // form | verify

    const handleRegister = async (e) => {
        if (e?.preventDefault) e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error: signUpError } = await insforge.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: fullname,
                    },
                },
            });

            if (signUpError) {
                throw signUpError;
            }

            if (data?.user) {
                const { error: signInError } = await insforge.auth.signInWithPassword({ email, password });
                if (signInError) {
                    throw signInError;
                }

                window.dispatchEvent(new Event('insforge-auth-change'));
                navigate('/');
                return;
            }

            setView('verify');
        } catch (err) {
            console.error('Signup error:', err?.message || err);
            setError(err?.message || 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Fragment>
                {view === 'form' ? (
                    <Form>
                        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Register</h3>

                        <Form.Group className='mb-3'>
                            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Fullname</Form.Label>
                            <Form.Control
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]'
                                placeholder="Enter your fullname"
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    type={togglePassword ? "password" : "text"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]'
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </Form.Group>

                        {error ? (
                            <div className="mb-4 text-center text-[12px] lg:text-[14px] text-red-600">
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="button"
                            onClick={loading ? undefined : handleRegister}
                            className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center cursor-pointer'
                            style={loading ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>

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
                            Already have an account?{' '}
                            <span className='text-orange cursor-pointer' onClick={() => navigate("/sign-in")}>Log In</span>
                        </div>
                    </Form>
                ) : (
                    <Fragment>
                        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Verify your Email</h3>
                        <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-8'>
                            Thank you, check your email for instructions to reset your password
                        </p>

                        <div className="text-center text-[12px] lg:text-[14px] font-medium mb-4">
                            Don’t receive an email? <span className='text-orange cursor-pointer'>Resend</span>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </AuthLayout>
    );
};

export default SignUp;
