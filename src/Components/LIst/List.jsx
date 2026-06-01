import React, { Fragment, useState } from 'react'
import { LikeBoldIcon, LikeOutlineIcon, MoreOptionIcon, ShareIcon, StarRateIcon, UnlikeBoldIcon, UnlikeOutlineIcon } from '../Icon/Icon';
import { Col, Row } from 'react-bootstrap';

export const CartList = (props) => {
    const [countCart, setcountCart] = useState(1)

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
            <Row className='w-full'>
                <Col className='mb-2 my-md-auto' md={6}>
                    <div className="flex items-center gap-3">
                        {roundChekck()}
                        <div className='flex items-center gap-3'>
                            <img src="./../images/it (4).png" className='w-[100px] xl:w-[128px] h-[100px] xl:h-[128px] rounded-[8px] object-cover' alt="" />
                            <div>
                                <h4 className='font-semibold text-[18px] mb-2'>Winter Coat</h4>
                                <p className='text-[18px] text-[#A3A3A3] font-normal'>Beiges <span className='font-medium text-black'>M</span></p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='mb-2 my-md-auto'>
                    <div className="flex items-center justify-end md:justify-start gap-4 xl:gap-6">
                        <div className="flex items-center gap-2 xl:gap-3">
                            <img src="./../images/size.svg" className='cursor-pointer' onClick={() => setcountCart(countCart > 1 ? countCart - 1 : 1)} alt="" />
                            <div className="w-[32px] h-[32px] rounded-full flex justify-center items-center text-[14px] lg:text-[16px] border border-solid border-[#E5E5E5] flex-shrink-0">{countCart}</div>
                            <img src="./../images/size (1).svg" className='cursor-pointer' onClick={() => setcountCart(countCart + 1)} alt="" />
                        </div>

                        <div className="flex items-center gap-3 cursor-pointer">
                            <img src="./../images/trash.svg" alt="" />
                            <span className='font-medium text-[12px] lg:text-[14px]'>Remove</span>
                        </div>
                    </div>
                </Col>
                <Col className='text-right my-auto'>
                    <h5 className='text-[18px] font-medium'>$124.99</h5>
                </Col>
            </Row>
        </Fragment>
    )
}



export const ListComment = ({ replayIcon = false }) => {
    const LikeUnline = () => {
        const [Like, setLike] = useState(false)
        const [LikeCount, setLikeCount] = useState(0)

        const [Unlike, setUnlike] = useState(false)
        const [UnlikeCount, setUnlikeCount] = useState(0)

        const ToogleLike = (e) => {
            if (e == "like") {

                if (Unlike) {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount - 1)
                }

                if (!Like) {
                    setLike(!Like)
                    setLikeCount(LikeCount + 1)
                } else {
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }
            } else {
                if (Like) {
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }

                if (!Unlike) {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount + 1)
                } else {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount - 1)
                }
            }
        }

        return <Fragment>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    {
                        Like ? <div className='cursor-pointer' onClick={() => ToogleLike("like")}><LikeBoldIcon /></div> : <div className='cursor-pointer' onClick={() => ToogleLike("like")}><LikeOutlineIcon /></div>
                    }
                    <span className='text-[12px] lg:text-[14px] text-[#525252]'>{LikeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                    {
                        Unlike ? <div className='cursor-pointer' onClick={() => ToogleLike("unlike")}><UnlikeBoldIcon /></div> : <div className='cursor-pointer' onClick={() => ToogleLike("unlike")}><UnlikeOutlineIcon /></div>
                    }
                    <span className='text-[12px] lg:text-[14px] text-[#525252]'>{UnlikeCount}</span>
                </div>
                {
                    replayIcon ? <div className="flex items-center gap-2">
                        <ShareIcon />
                        <span className='text-[12px] lg:text-[14px] text-[#525252]'>0</span>
                    </div> : ""
                }
            </div>
        </Fragment>
    }
    return (
        <Fragment>
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <img src="./../images/avatar.png" className='w-[48px] h-[48px] rounded-full object-cover' alt="" />
                        <div>
                            <h4 className='font-medium text-[18px] mb-1'>Kierra Bergson</h4>
                            <div className="flex items-center">
                                <div className="flex items-center gap-[2px]">
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                </div>

                                <div className='text-[12px] ml-2 text-gray'>
                                    1 weeks ago
                                </div>
                            </div>
                        </div>
                    </div>

                    <MoreOptionIcon />
                </div>

                <div className="ml-[4rem]">
                    <p className='text-[14px] lg:text-[16px] mb-3'>I am thrilled with my recent purchase, a dress from brand X. The fabric is of high quality and feels comfortable on the skin. The design is fashionable and unique. I have received many compliments when wearing it. The shopping experience on this website was delightful, and I will definitely return to buy more products!</p>

                    {LikeUnline()}
                </div>
            </div>
        </Fragment>
    )
}


export const ListCommentDiscussion = ({ replay = false }) => {

    const [toogleReplay, settoogleReplay] = useState(replay)

    const LikeUnline = () => {
        const [Like, setLike] = useState(false)
        const [LikeCount, setLikeCount] = useState(0)

        const [Unlike, setUnlike] = useState(false)
        const [UnlikeCount, setUnlikeCount] = useState(0)

        const ToogleLike = (e) => {
            if (e == "like") {

                if (Unlike) {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount - 1)
                }

                if (!Like) {
                    setLike(!Like)
                    setLikeCount(LikeCount + 1)
                } else {
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }
            } else {
                if (Like) {
                    setLike(!Like)
                    setLikeCount(LikeCount - 1)
                }

                if (!Unlike) {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount + 1)
                } else {
                    setUnlike(!Unlike)
                    setUnlikeCount(UnlikeCount - 1)
                }
            }
        }

        return <Fragment>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    {
                        Like ? <div className='cursor-pointer' onClick={() => ToogleLike("like")}><LikeBoldIcon /></div> : <div className='cursor-pointer' onClick={() => ToogleLike("like")}><LikeOutlineIcon /></div>
                    }
                    <span className='text-[12px] lg:text-[14px] text-[#525252]'>{LikeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                    {
                        Unlike ? <div className='cursor-pointer' onClick={() => ToogleLike("unlike")}><UnlikeBoldIcon /></div> : <div className='cursor-pointer' onClick={() => ToogleLike("unlike")}><UnlikeOutlineIcon /></div>
                    }
                    <span className='text-[12px] lg:text-[14px] text-[#525252]'>{UnlikeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShareIcon />
                    <span className='text-[12px] lg:text-[14px] text-[#525252]'>0</span>
                    <span className='text-[12px] lg:text-[14px] cursor-pointer font-medium' onClick={() => settoogleReplay(!toogleReplay)}>{toogleReplay ? "Hide replies" : "Show Replay"}</span>
                </div>

            </div>
        </Fragment>
    }
    return (
        <Fragment>
            <div className={'relative ' + (toogleReplay ? "line__three" : "")}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <img src="./../images/avatar.png" className='w-[48px] h-[48px] rounded-full object-cover' alt="" />
                        <div>
                            <h4 className='font-medium text-[18px] mb-1'>Kierra Bergson</h4>
                            <div className="flex items-center">
                                <div className="flex items-center gap-[2px]">
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                    <StarRateIcon />
                                </div>

                                <div className='text-[12px] ml-2 text-gray'>
                                    1 weeks ago
                                </div>
                            </div>
                        </div>
                    </div>

                    <MoreOptionIcon />
                </div>

                <div className="ml-[4rem]">
                    <p className='text-[14px] lg:text-[16px] mb-3'>I am thrilled with my recent purchase, a dress from brand X. The fabric is of high quality and feels comfortable on the skin. The design is fashionable and unique. I have received many compliments when wearing it. The shopping experience on this website was delightful, and I will definitely return to buy more products!</p>

                    {LikeUnline()}
                </div>
                {
                    toogleReplay ? <Fragment>
                        <div className="ml-[4rem] mt-8 flex flex-wrap gap-4 last__comment-line">
                            <div className="relative">
                                <ListComment replayIcon={true} />
                                <img src="./../images/line.svg" className='absolute -z-[1] -left-[2.521rem] top-0' alt="" />
                            </div>
                            <div className="relative">
                                <ListComment replayIcon={true} />
                                <img src="./../images/line.svg" className='absolute -z-[1] -left-[2.521rem] top-0' alt="" />
                            </div>
                        </div>
                    </Fragment> : ""
                }

            </div>
        </Fragment>
    )
}

