import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdPendingActions } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import { add_reserve_action, get_reserve_action, remove_reserve_action, set_reserve_action } from '../../state/Actions/UserAction';
import "./reserve.scss"

export default function Reserve() {
    const login_management = useSelector(state=>state.login_management);
    const user_info = useSelector(state=>state.user_info)
    const add_reserve = useSelector(state=>state.add_reserve)
    const set_reserve = useSelector(state=>state.set_reserve)
    const get_reserve = useSelector(state=>state.get_reserve)
    const remove_reserve = useSelector(state=>state.remove_reserve)
    const [status, setStatus] = useState(get_reserve.data?.at(0)?.status||"pending")
    const [description, setDescription] = useState(get_reserve.data?.at(0)?.description||"")
    const [projectName, setProjectName] = useState(get_reserve.data?.at(0)?.project_name||"")
    const [websiteLink, setWebsiteLink] = useState(get_reserve.data?.at(0)?.web_link||"")
    const [sub, setSub] = useState((get_reserve.data?.at(0)?.sub===1))
    const [message, setMessage] = useState("")

    const linkRef = useRef();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_reserve_action(user_info.user.token))
    },[dispatch, user_info.user.token])

    useEffect(()=>{
        if(message?.length>0){
            linkRef.current.click();
        }
        setMessage("")
    },[message])

    const add_reserve_service = ()=>{
        if(login_management.message?.admin){

            dispatch(add_reserve_action({description,project_name:projectName,web_link:websiteLink,status,sub:sub?1:0},user_info.user?.token));
            
        }else{
            
            dispatch(add_reserve_action({sub:sub?1:0},user_info.user?.token));
        }
        setMessage(add_reserve.data)
    }
    const remove_reserve_service = ()=>{
        dispatch(remove_reserve_action(user_info.user?.token))
        setMessage(remove_reserve.data)
    }
  return (
    <div className='reserve'>
        <DashboardBar/>
        <div className="reserve-content">
            <div className="reserve-header">
                <h1>
                    My reserve services {login_management.message?.admin&&"(Edit page)"}
                </h1>
            </div>
            <div className="reserve-info">
                <textarea name="description" placeholder={get_reserve.data?get_reserve.data[0]?.description:"Write your text here!"} disabled={!(login_management.message?.admin)} id="" cols="60" rows="10" onChange={e=>setDescription(e.target.value)}></textarea>
                <div className='reserve-info-table'>
                    <div style={{justifyItems:"center"}}>
                        <p>
                            Project name: 
                        </p>
                        {
                            login_management.message?.admin?(
                                <input type="text"  onChange={e=>setProjectName(e.target.value)} placeholder={get_reserve.data?.at(0)?.project_name||"project name"}/>  
                            ):(
                                <p>
                                    {get_reserve.data?.at(0)?.project_name}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <p>
                            Status 
                            Reserve service
                        </p>
                    </div>
                    {
                        sub?(
                            <div>
                                <button onClick={()=>setSub(false)}  >
                                    Unsubscribe  
                                    Reserve service
                                </button>
                            </div>
                        ):(
                            <div>
                                <button onClick={()=>setSub(true)} >
                                    Sign up 
                                    Reserve service
                                </button>
                            </div>
                        )
                    }
                    <div>
                        {
                            login_management.message?.admin?(
                                <>
                                    <p>
                                        Website link : 
                                    </p>
                                    <input type="text"  onChange={e=>setWebsiteLink(e.target.value)} placeholder={get_reserve.data?.at(0)?.web_link||'www.websitelink.com'} />
                                </>
                            ):(
                            <p>
                                More information about the <br />
                                project <a href={"https://"+get_reserve.data?.at(0)?.web_link} target='_blank'>click here {">>"}</a>
                            </p>
                            )
                        }
                    </div>
                    <div style={{justifyContent:"center"}}>
                        {
                            login_management.message?.admin?(
                                <>
                                    <select name="status" id="" onChange={e=>setStatus(e.target.value)} style={{borderTopRightRadius:"0px",borderBottomRightRadius:"0px"}}>
                                        <option value="pending" selected={get_reserve.data?.at(0)?.status==="pending"}>Pending</option>
                                        <option value="take over service" selected={get_reserve.data?.at(0)?.status==="take over service"}>Take over service</option>
                                        <option value="no service" selected={get_reserve.data?.at(0)?.status==="no service"}>No service</option>
                                    </select>
                                    <div className="reserve-status-icon">
                                        {
                                            status==="pending"?(
                                                <MdPendingActions/>
                                            ):status==="take over service"?(
                                                <BsFillCheckCircleFill/>
                                            ):(
                                                <AiFillCloseCircle/>
                                            )
                                        }
                                    </div>
                                </>
                            ):(
                                <p>
                                    {get_reserve.data&&get_reserve.data[0]?.status}
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <p>
                            {
                                get_reserve.data?.at(0)?.sub?"You have signed up for the reserve service":"You are not yet registered for the reserve service"
                            }
                               
                        </p>
                    </div>
                </div>
            </div>
            <div className="reserve-footer">
                <Link to="/dashboard/settings">
                    <button className="back">
                        Back
                    </button>
                </Link>
                <Link to="/dashboard/settings" state={{message}} ref={ref=>ref!==null&&(linkRef.current=ref)} onClick={()=>add_reserve_service()}>
                    <button>
                        Save
                    </button>
                </Link>
            </div>
        </div>
        <DashboardBarBottom/>
    </div>
  )
}
