import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Address = () => {
    const [ToogleCheck, setToogleCheck] = useState("")
    const roundChekck = (e) => {
        return <div onClick={() => setToogleCheck(e)} className={"w-[24px] h-[24px] rounded-full border border-solid flex items-center justify-center cursor-pointer " + (ToogleCheck == e ? "border-orange bg-orange" : "border-[#A3A3A3]")}>
            {
                ToogleCheck == e ? <img src="./../images/check (3).svg" alt="" /> : ""
            }
        </div>
    }
    return (
        <Fragment>
            <section>
                <Container>
                    <Row className='justify-center'>
                        <Col lg={8}>
                            <h2 className='font-normal text-[24px] md:text-[28px] text-[32px] font-Helvetica mb-4'>Address</h2>
                            <h5 className='font-medium text-[14px] lg:text-[16px] mb-3'>Shipping Address</h5>

                            <div className="flex flex-wrap gap-4">

                                <div className={"flex justify-between items-center px-3 py-3 border border-solid rounded-[8px] cursor-pointer w-full " + (ToogleCheck == "home" ? "!border-orange" : "border-[#E5E5E5]")} onClick={() => setToogleCheck("home")}>
                                    <div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full border border-solid border-[#E5E5E5] shrink-0">
                                                <img src="./../images/home-2.svg" alt="" />
                                            </div>
                                            <div>
                                                <h5 className='font-medium text-[14px] lg:text-[16px]'>My Home</h5>
                                                <h4 className='font-semibold text-[18px] my-2'>1536 Stellar Dr, Kenai, Alaska 99611, USA</h4>
                                                <p className='text-[14px] lg:text-[16px] text-gray'>(907) 283-6173</p>
                                            </div>
                                        </div>
                                        <a href="#!" className='font-medium text-[12px] px-4 py-[4px] border border-solid !border-orange rounded-full text-orange hover:bg-orange  hover:text-white mt-3 sm:mt-0 inline-block ml-[4.1rem] sm:hidden'>Change</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a href="#!" className='font-medium text-[12px] px-4 py-[4px] border border-solid !border-orange rounded-full text-orange hover:bg-orange  hover:text-white hidden sm:inline-block'>Change</a>
                                        {roundChekck("home")}
                                    </div>
                                </div>

                                <div className={"flex justify-between items-center px-3 py-3 border border-solid rounded-[8px] cursor-pointer w-full " + (ToogleCheck == "Office" ? "!border-orange" : "border-[#E5E5E5]")} onClick={() => setToogleCheck("Office")}>
                                    <div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full border border-solid border-[#E5E5E5] shrink-0">
                                                <img src="./../images/briefcase.svg" alt="" />
                                            </div>
                                            <div>
                                                <h5 className='font-medium text-[14px] lg:text-[16px]'>Office</h5>
                                                <h4 className='font-semibold text-[18px] my-2'>2336 Jack Warren Rd, Delta Junction, Alaska 99737, USA</h4>
                                                <p className='text-[14px] lg:text-[16px] text-gray'>(907) 283-6173</p>
                                            </div>
                                        </div>
                                        <a href="#!" className='font-medium text-[12px] px-4 py-[4px] border border-solid !border-orange rounded-full text-orange hover:bg-orange  hover:text-white mt-3 sm:mt-0 inline-block ml-[4.1rem] sm:hidden'>Change</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a href="#!" className='font-medium text-[12px] px-4 py-[4px] border border-solid !border-orange rounded-full text-orange hover:bg-orange  hover:text-white hidden sm:inline-block'>Change</a>
                                        {roundChekck("Office")}
                                    </div>
                                </div>

                            </div>

                            <div className="mt-5 text-center">
                                <a href="#!" className='btnClass font-medium text-[14px] bg-orange !border-orange text-white !px-[42px]'> Add New Address</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment >
    )
}

export default Address
