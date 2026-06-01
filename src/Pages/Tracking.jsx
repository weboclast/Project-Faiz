import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Tracking = () => {
    const dataItems = [];

    for (let index = 0; index < 4; index++) {
        dataItems.push(<Fragment>
            <div className="py-6 border-t border-solid border-[#E5E5E5]">
                <Row>
                    <Col className='mb-2 mb-lg-0' lg={3}>
                        <div className='flex items-center gap-3'>
                            <img src="./../images/it (4).png" className='w-[80px] h-[80px] rounded-[8px] object-cover' alt="" />
                            <div>
                                <h4 className='font-semibold text-[18px] mb-2'>Winter Coat</h4>
                                <p className='text-[18px] text-[#A3A3A3] font-normal'>Beiges <span className='font-medium text-black'>M</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col className='mb-2 my-lg-auto lg:text-center' lg={3}>
                        <p className='ml-[6rem] lg:ml-0 text-[16px]'>Thursday, May 11 2023</p>
                    </Col>
                    <Col className='mb-2 my-lg-auto lg:text-center' lg={3}>
                        <p className='ml-[6rem] lg:ml-0 text-[16px]'>0981727198201</p>
                    </Col>
                    <Col className='mb-2 my-lg-auto lg:text-center' lg={1}>
                        <p className='ml-[6rem] lg:ml-0 text-[18px] font-medium'>$124.99</p>
                    </Col>
                    <Col className='mb-2 my-lg-auto lg:text-right' lg={2}>
                        <a href="#!" className='ml-[6rem] lg:ml-0 font-medium text-[12px] lg:text-sm text-orange !border-orange btnClass hover:bg-orange hover:text-white'>Track Order</a>
                    </Col>
                </Row>
            </div>
        </Fragment>)

    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <section>
                <Container>
                    <h3 className='font-Helvetica text-[32px] mb-6'>Order Tracking</h3>

                    <Row className='py-6 hidden lg:flex'>
                        <Col md={3}>
                            <h4 className='text-[16px] text-[#A3A3A3]'>Product</h4>
                        </Col>
                        <Col md={3}>
                            <h4 className='text-[16px] text-[#A3A3A3] text-center'>Date</h4>
                        </Col>
                        <Col md={3}>
                            <h4 className='text-[16px] text-[#A3A3A3] text-center'>Ref Number</h4>
                        </Col>
                        <Col md={1}>
                            <h4 className='text-[16px] text-[#A3A3A3] text-center'>Price</h4>
                        </Col>
                        <Col md={2}>
                            <h4 className='text-[16px] text-[#A3A3A3] text-right'>Status</h4>
                        </Col>
                    </Row>

                    {dataItems}


                </Container>
            </section>
        </Fragment >
    )
}

export default Tracking
