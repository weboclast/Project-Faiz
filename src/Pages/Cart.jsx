import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CartList } from '../Components/LIst/List'
import { NavLink } from 'react-router-dom'

const Cart = () => {
    const [StatusCart] = useState(true)


    const [ToogleCheck, setToogleCheck] = useState(false)
    const roundChekck = (e) => {
        return <div onClick={() => setToogleCheck(!ToogleCheck)} className={"w-[24px] h-[24px] rounded-full border border-solid flex items-center justify-center cursor-pointer " + (ToogleCheck ? "border-orange bg-orange" : "border-[#A3A3A3]")}>
            {
                ToogleCheck ? <img src="./../images/check (3).svg" alt="" /> : ""
            }
        </div>
    }
    return (
        <Fragment>
            <section>
                <Container>
                    <h3 className='font-Helvetica text-[18px] lg:text-[24px] lg:text-[32px] mb-6'>My Cart</h3>

                    {
                        StatusCart ? <Fragment>
                            <Row>
                                <Col lg={8} className='mb-4 mb-lg-0'>
                                    <Row className='font-medium text-[14px] lg:text-[16px] text-[#A3A3A3]'>
                                        <Col md={6}>
                                            <div className="flex items-center gap-3">
                                                {roundChekck()}
                                                <span>Product</span>
                                            </div>
                                        </Col>
                                        <Col>Quantity</Col>
                                        <Col className='text-right'>Price</Col>
                                    </Row>

                                    <hr className='border-[#E5E5E5] my-4' />

                                    <div className="flex flex-wrap gap-y-4 w-full">
                                        <CartList />
                                        <hr className='border-[#E5E5E5] w-full' />
                                        <CartList />
                                        <hr className='border-[#E5E5E5] w-full' />
                                        <CartList />
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="px-6 py-6 border border-solid border-[#E5E5E5] rounded-[16px]">
                                        <h4 className='font-bold text-[18px] lg:text-[24px] mb-2'>Order Summary</h4>
                                        <p className='text-[14px] lg:text-[16px]'>The total cost consists of temporary costs, not including shipping costs</p>

                                        <div className="mt-4 mb-6 flex items-center flex-wrap gap-3">
                                            <div className="flex items-center justify-between text-[16px] lg:text-[18px] w-full">
                                                <span className='text-gray'>Subtotal</span>
                                                <span className='font-medium'>$124.99</span>
                                            </div>
                                            <hr className='border-[#E5E5E5] w-full' />
                                            <div className="flex items-center justify-between text-[16px] lg:text-[18px] w-full">
                                                <span className='text-gray'>Total</span>
                                                <span className='font-medium'>$124.99</span>
                                            </div>
                                        </div>

                                        <NavLink to="/checkout" className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white w-full text-center '>Checkout Now</NavLink>
                                    </div>
                                </Col>
                            </Row>
                        </Fragment> : <Fragment>

                            <div className="text-center">
                                <div className="w-[176px] h-[176px] rounded-full border border-solid border-[#E5E5E5] flex justify-center items-center mx-auto mb-4">
                                    <img src="./../images/shopping-bag.svg" alt="" />
                                </div>
                                <h4 className='font-medium text-[16px] lg:text-[18px] mb-2'>Oops! Your cart is empty</h4>
                                <p className='text-[14px] lg:text-[16px] text-gray mb-4'>Start exploring our collection now and add your <br /> favorite items to your cart.</p>

                                <NavLink to="/product" className='btnClass large font-medium text-[14px] lg:text-[16px] bg-orange !border-orange text-white text-center '>Shop Now</NavLink>
                            </div>
                        </Fragment>
                    }


                </Container>
            </section>
        </Fragment >
    )
}

export default Cart
