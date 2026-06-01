import React, { Fragment, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { CloseIcon } from '../Icon/Icon'

export const AuthStepModal = ({ show, handleClose, handleShow, StatusModal, setStatusModal }) => {
    const onEventClick = (StatusModal) => {
        handleClose()
        setStatusModal(StatusModal)

        setTimeout(function () {
            handleShow()
        }, 500);
    }
    return (
        <Fragment>
            <StepModal show={show} handleClose={() => handleClose()} handleShow={() => handleShow()} StatusModal={StatusModal} setStatusModal={(e) => setStatusModal(e)} onEventClick={(e) => onEventClick(e)} />
        </Fragment>
    )
}


export const StepModal = ({ show, handleClose, handleShow, StatusModal, setStatusModal, onEventClick }) => {
    const showingForm = (e) => {
        switch (e) {
            case "login":
                return <LoginContent onEventClick={(e) => onEventClick(e)} />
                break;
            case "register":
                return <RegisterContent onEventClick={(e) => onEventClick(e)} />
                break;
            case "forgot password":
                return <ForgotContent onEventClick={(e) => onEventClick(e)} />
                break;
            case "verify your email":
                return <VerifyContent onEventClick={(e) => onEventClick(e)} />
                break;
            case "change password":
                return <ChangeContent onEventClick={(e) => onEventClick(e)} />
                break;
            case "succsess":
                return <SuccsessContent onEventClick={(e) => onEventClick(e)} />
                break;
            default:
                break;
        }
    }
    return (
        <Modal centered show={show} onHide={() => {
            handleClose()
            setStatusModal("login")
        }}>
            <Modal.Body className='px-6 py-6 relative'>
                <div className="flex justify-end mb-4 cursor-pointer" onClick={() => {
                    handleClose()
                    setStatusModal("login")
                }}>
                    <CloseIcon color={"#292D32"} />
                </div>
                {
                    showingForm(StatusModal)
                }
            </Modal.Body>
        </Modal>
    )
}

export const LoginContent = ({ onEventClick }) => {
    const [togglePassword, settogglePassword] = useState(true)

    const [ToogleCheck, setToogleCheck] = useState(false)
    const SquareCheck = () => {
        return <div onClick={() => setToogleCheck(!ToogleCheck)} className={"w-[24px] h-[24px] rounded-[4px] border border-solid flex items-center justify-center cursor-pointer " + (ToogleCheck ? "!border-orange " : "border-[#A3A3A3]")}>
            {
                ToogleCheck ? <img src="./../images/sdgdgdsg.svg" alt="" /> : ""
            }
        </div>
    }

    return <Fragment>
        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Login</h3>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Email</Form.Label>
            <Form.Control type="text" className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Password</Form.Label>
            <div className="relative">
                <div className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2" onClick={() => settogglePassword(!togglePassword)}>
                    <img src="./../images/eye-slash.svg" alt="" />
                </div>
                <Form.Control type={togglePassword ? "password" : "text"} className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your password" />
            </div>
        </Form.Group>

        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToogleCheck(!ToogleCheck)}>
                {SquareCheck()} <span className='text-[14px] lg:text-[16px] text-[#878690]'>Remember me</span>
            </div>
            <div onClick={() => onEventClick("forgot password")} className='font-medium text-[12px] cursor-pointer underline'>Forgot Password</div>
        </div>

        <a href="#!" className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center '>Login</a>

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
            Don’t have an account? <span className='text-orange cursor-pointer' onClick={() => onEventClick("register")}>Sign Up</span>
        </div>

    </Fragment>
}
export const RegisterContent = ({ onEventClick }) => {
    const [togglePassword, settogglePassword] = useState(true)

    return <Fragment>
        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Register</h3>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Fullname</Form.Label>
            <Form.Control type="text" className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your fullname" />
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Email</Form.Label>
            <Form.Control type="text" className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Password</Form.Label>
            <div className="relative">
                <div className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2" onClick={() => settogglePassword(!togglePassword)}>
                    <img src="./../images/eye-slash.svg" alt="" />
                </div>
                <Form.Control type={togglePassword ? "password" : "text"} className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your password" />
            </div>
        </Form.Group>

        <div onClick={() => onEventClick("verify your email")} className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center cursor-pointer'>Register</div>

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
            Already have an account? <span className='text-orange cursor-pointer' onClick={() => onEventClick("login")}>Log In</span>
        </div>

    </Fragment>
}
export const ForgotContent = ({ onEventClick }) => {
    return <Fragment>
        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Forgot Password</h3>
        <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-4'>Enter the email address associated with your account and we will send you a link to reset your password.</p>

        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Email</Form.Label>
            <Form.Control type="text" className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your email" />
        </Form.Group>

        <div onClick={() => onEventClick("change password")} className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center cursor-pointer'>Continue</div>
    </Fragment>
}
export const VerifyContent = ({ onEventClick }) => {
    return <Fragment>
        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Verify your Email</h3>
        <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-8'>Thank you, check your email for instructions to reset your password</p>

        <div className="text-center text-[12px] lg:text-[14px] font-medium mb-4">
            Don’t receive an email? <span className='text-orange cursor-pointer'>Resend</span>
        </div>
    </Fragment>
}
export const ChangeContent = ({ onEventClick }) => {
    const [togglePassword, settogglePassword] = useState(true)
    const [togglePasswordNew, settogglePasswordNew] = useState(true)
    const [togglePasswordConfirm, settogglePasswordConfirm] = useState(true)

    return <Fragment>
        <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center'>Change Password</h3>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Old Password</Form.Label>
            <div className="relative">
                <div className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2" onClick={() => settogglePassword(!togglePassword)}>
                    <img src="./../images/eye-slash.svg" alt="" />
                </div>
                <Form.Control type={togglePassword ? "password" : "text"} className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your old password" />
            </div>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>New Password</Form.Label>
            <div className="relative">
                <div className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2" onClick={() => settogglePasswordNew(!togglePasswordNew)}>
                    <img src="./../images/eye-slash.svg" alt="" />
                </div>
                <Form.Control type={togglePasswordNew ? "password" : "text"} className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your new password" />
            </div>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label className='font-medium text-[12px] lg:text-[14px]'>Confirm New Password</Form.Label>
            <div className="relative">
                <div className="cursor-pointer absolute right-[10px] top-1/2 -translate-y-1/2" onClick={() => settogglePasswordConfirm(!togglePasswordConfirm)}>
                    <img src="./../images/eye-slash.svg" alt="" />
                </div>
                <Form.Control type={togglePasswordConfirm ? "password" : "text"} className='text-[14px] lg:text-[16px] h-[56px] outline-none shadow-none border-[#E5E5E5] rounded-[8px] focus:border-[#E5E5E5]' placeholder="Enter your Confirm New Password" />
            </div>
        </Form.Group>

        <div onClick={() => onEventClick("succsess")} className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center cursor-pointer'>Submit</div>


    </Fragment >
}
export const SuccsessContent = ({ onEventClick }) => {
    return <Fragment>
        <div className="text-center mb-3">
            <img src="./../images/gfgdfgfd.svg" className='mx-auto' alt="" />
            <h3 className='text-[20px] lg:text-[24px] font-Helvetica mb-3 text-center mb-3'>Congratulations! </h3>
            <p className='text-center text-[14px] lg:text-[16px] text-[#737373] mb-8'>Your password has been changes</p>
            <div onClick={() => onEventClick("login")} className='font-medium text-sm text-orange !border-orange btnClass hover:bg-orange hover:text-white cursor-pointer'>Back to Sign In</div>
        </div>
    </Fragment>
}