import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { insforge } from '../insforge';

const ResetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [view, setView] = useState('form'); // form | verify

    const handleReset = async () => {
        setError('');

        try {
            setLoading(true);

            const { error: resetEmailError } = await insforge.auth.sendResetPasswordEmail({
                email,
            });

            if (resetEmailError) {
                setError(resetEmailError.message || 'Failed to send reset email');
                return;
            }

            setView('verify');
        } catch (err) {
            setError(err?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Fragment>
                {view === 'form' ? (
                    <Fragment>
                        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Forgot Password</h3>
                        <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-4'>
                            Enter the email address associated with your account and we will send you a link to reset your password.
                        </p>

                        {error ? (
                            <div className="mb-4 text-center text-[12px] lg:text-[14px] text-red-600">
                                {error}
                            </div>
                        ) : null}

                        <Form>
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

                            <div
                                onClick={loading ? undefined : handleReset}
                                className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center cursor-pointer'
                                style={loading ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
                            >
                                {loading ? 'Sending...' : 'Continue'}
                            </div>
                        </Form>

                        <div className="text-center text-[12px] lg:text-[14px] text-[#525252] mt-4">
                            <span
                                className='text-orange cursor-pointer'
                                onClick={() => navigate("/sign-in")}
                            >
                                Back to Sign In
                            </span>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Verify your Email</h3>
                        <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-8'>
                            Thank you, check your email for instructions to reset your password
                        </p>

                        <div className="text-center text-[12px] lg:text-[14px] font-medium mb-4">
                            Don’t receive an email? <span className='text-orange cursor-pointer'>Resend</span>
                        </div>

                        <div className="text-center text-[12px] lg:text-[14px] text-[#525252]">
                            <span className='text-orange cursor-pointer' onClick={() => navigate("/sign-in")}>
                                Back to Sign In
                            </span>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </AuthLayout>
    );
};

export default ResetPassword;
