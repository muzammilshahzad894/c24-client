import React, { useEffect, useState } from 'react'
import "./SingleResultAssignemnt.scss";
import { BsClock, BsCurrencyEuro, BsFacebook, BsHeart, BsHeartFill, BsLinkedin, BsShare } from 'react-icons/bs';
import {AiFillTwitterCircle, AiOutlineClose, AiOutlineMore} from 'react-icons/ai'
import { GoLocation } from 'react-icons/go';
import { IoPricetagSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_liked_action, like_action, remove_like_action } from '../../../state/Actions/UserAction';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { IoLogoWhatsapp } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';


export default function SingleResultAssignemnt({data,sideBySide}) {
    const get_liked = useSelector(state=>state.get_liked);
    const user_info = useSelector(state=>state.user_info);
    const [showShare, setShowShare] = useState(false)
    const dispatch = useDispatch();

    const like_freelancer = ()=>{
        if(user_info.user?.account_type==="freelancer"){
            dispatch(like_action({table:"assignements",id:data.id},user_info.user.token))
            dispatch(get_liked_action("assignements",user_info.user.token))
        }
    }
    
    const removeLikeHandler = (assignement_id)=>{
        if(user_info.user?.account_type==="freelancer"){
            dispatch(remove_like_action({table:"assignements",id:assignement_id},user_info.user.token))
            dispatch(get_liked_action("assignements",user_info.user.token))
        }
    }
    //setting searchStop variable in order to not commit search once going back
    data.stopSearch=true
  return (
    <div className='single_result_assignment'>
        <div className="single_result_assignment_container">
            <div className="single_result_assignment_info_container">
                <div className="single_result_assignment_header">
                    <div>
                        <h3>
                            {data.job_name}
                        </h3>
                    </div>
                    <div className="single_result_user_love_share" style={{borderBottom:"none"}}>
                    {
                        get_liked.data?.find(item=>item?.assignement_id===data.id)!==undefined?(
                            <BsHeartFill style={{color:"#e31b23"}} onClick={()=>removeLikeHandler(data.id)}/>
                        ):(
                            <BsHeart onClick={()=>like_freelancer()}/>
                        )
                    }
                            <BsShare onClick={()=>setShowShare(true)}/>
                    {
                        showShare&&(
                            <div className='shareAssignement'>
                                <div>
                                    <h4>
                                        <b>
                                            Share this assignment
                                        </b>
                                    </h4>
                                    <div className="close" onClick={()=>setShowShare(false)}>
                                        <AiOutlineClose/>
                                    </div>
                                </div>
                                <div>
                                    <FacebookShareButton url={`https://curant24.nl/dashboard/view-assignement/${data.id}`} quote={`https://curant24.nl/dashboard/view-assignement/${data.id}`}>
                                        <BsFacebook/> 
                                    </FacebookShareButton>
                                    <TwitterShareButton url={`https://curant24.nl/dashboard/view-assignement/${data.id}`}>
                                        <AiFillTwitterCircle />
                                    </TwitterShareButton>
                                    <LinkedinShareButton url={`https://curant24.nl/dashboard/view-assignement/${data.id}`}>
                                        <BsLinkedin/>
                                    </LinkedinShareButton>
                                    <WhatsappShareButton url={`https://curant24.nl/dashboard/view-assignement/${data.id}`}>
                                        <IoLogoWhatsapp/>
                                    </WhatsappShareButton>
                                    <EmailShareButton subject='  ' body='  ' url={`https://curant24.nl/dashboard/view-assignement/${data.id}`} separator="" style={{width:"auto",height:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
                                        <MdEmail/>
                                    </EmailShareButton>
                                </div>
                            </div>
                        )
                    }
                        <AiOutlineMore/>
                    </div>
                </div>
                <div className="single_result_assignment_info" onClick={()=>setShowShare(false)} style={{display:"flex",flexDirection:sideBySide?"column":"row"}}>
                    <div className='single_result_assignment_info_items'>
                        <div>
                            <GoLocation/>
                            <p>
                                :<b> {data.province}</b>
                            </p>
                        </div>
                        <div>
                            <p>
                                Industry :<b> {data.industry}</b>
                            </p>
                        </div>
                        <div>
                            <BsClock/>
                            <p>
                                : <b>{data.job_duration}</b>
                            </p>
                        </div>
                        <div>
                            <IoPricetagSharp/>
                            <p>: </p><BsCurrencyEuro/> <p> {data.price_per_piece?.length>0?data.price_per_piece:data.hourly_wage?.length>0?data.hourly_wage:data.hourly_wage_from+" /"+<BsCurrencyEuro/>+<p>{data.hourly_wage_to}</p>}</p>
                        </div>
                        <div>
                            <p>
                                Start date: {data.start_asap?"ASAP":data.starting_date?.split('T')[0]}
                            </p>
                        </div>
                        {
                            !sideBySide&&(
                                <div className="single_result_assignment_buttons">
                                    <Link to="/dashboard/view-assignement" state={data}>
                                        <button>
                                            View Assignment
                                        </button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div style={{borderLeft:sideBySide?"none":"1px #ccc solid",alignItems:"flex-start"}}>
                        <p style={{width:sideBySide?"auto":"650px",marginLeft:"15px",wordBreak:"break-all"}}>
                            {
                                data.description_of_activities?.slice(0,300)
                                +(data.description_of_activities?.length>300?"...   ":"")
                            }
                            {
                                data.description_of_activities?.length>300&&(
                                    <Link to={`/dashboard/view-assignement/${data.id}`} state={data}>
                                        read more.
                                    </Link>
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
            {
                sideBySide&&(
                <div className="single_result_assignment_buttons">
                    <Link to={`/dashboard/view-assignement/${data.id}`} state={data}>
                        <button>
                            View Assignement
                        </button>
                    </Link>
                </div>
                )
            }
        </div>
    </div>
  )
}
