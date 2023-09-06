import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import MessageBox from '../../components/MessageBox/MessageBox'
import { add_work_experience_action, delete_work_experience_action, get_work_experience_action } from '../../state/Actions/UserAction'
import {AiOutlineClose} from 'react-icons/ai'
import "./workXP.scss"
import LoadingBox from '../../components/LoadingBox/LoadingBox'

export default function WorkXP() {
    const get_work_experience = useSelector(state=>state.get_work_experience)
    const add_work_experience = useSelector(state=>state.add_work_experience)
    const remove_work_xp = useSelector(state=>state.delete_work_experience);
    const user_info = useSelector(state=>state.user_info)
    const dispatch = useDispatch()
    const inputRef = useRef([]);
    const linkRef = useRef();
    const [message, setMessage] = useState("")
    const [endDate, setEndDate] = useState("")
    const [today, setToday] = useState(false)
    useEffect(()=>{
        if(add_work_experience.work_xp_message&&add_work_experience.work_xp_message.length>0){
            setMessage({message:add_work_experience.work_xp_message})
            setTimeout(()=>{
                add_work_experience.work_xp_message&&(add_work_experience.work_xp_message = null)
            },1000)
            linkRef.current.click();
        }
    },[add_work_experience])

    useEffect(()=>{
        dispatch(get_work_experience_action(user_info.user.token))
    },[dispatch, user_info.user.token,add_work_experience])
    
    const add_work_xp = (e)=>{
        e.preventDefault();
        let data = {};
        inputRef.current.map(item=>{
            if(item.value.length>0){
                data[item.name] = item.value;
            }
            return item;
        })
        if(today){
            data["end_date"] = "9999-09-09";
        }
        if(Object.keys(data).length===5){
            dispatch(add_work_experience_action(data,user_info.user.token))
        }
        
    }
    const delete_work_xp = (id)=>{
        dispatch(delete_work_experience_action({id},user_info.user.token));
        dispatch(get_work_experience_action(user_info.user?.token))
    }

    const handleTodayCheck = e=>{
        if(e.target.checked){
            setToday(true);
            //(setEndDate(new Date().toLocaleString("default", { year: "numeric" })+"-"+new Date().toLocaleString("default", { month: "2-digit" })+"-"+new Date().toLocaleString("default", { day: "2-digit" })))
            setEndDate(null);
        }else{
            setToday(false)
            (setEndDate(""))
        }
    }
    console.log(endDate)
    return (
        get_work_experience.loading?(
            <LoadingBox big/>
        ):(
        <div className='work-xp'>
            <DashboardBar/>
            <div className="content">
                <div className="title">
                    <h1>
                        Settings - Work Experience
                    </h1>
                </div>
                {
                    remove_work_xp.work_xp_message&&(
                        <MessageBox message={remove_work_xp.work_xp_message}/>
                    )
                }
                {
                    get_work_experience.work_xp&&get_work_experience.work_xp.map(item=>(
                        <div className="saved_work_xp">
                            <div className="work_xp_content">
                                <div className="info">
                                    <div className="row">
                                        <h4>
                                            {item.function}
                                        </h4>
                                        <h4>-</h4>
                                        <h4>
                                            {item.employer}
                                        </h4>
                                    </div>
                                    <div className="row">
                                        <span>
                                            {item.start_date.split("T")[0]}
                                        </span>
                                        <span>{item.end_date.split("T")[0]?.includes("9999")?"Today":item.end_date.split("T")[0]}</span>
                                    </div>
                                </div>
                                <div className="desc">
                                    {item.description}
                                </div>
                            </div>
                            <div className="close" onClick={()=>delete_work_xp(item.id)}>
                                <AiOutlineClose/>
                            </div>
                        </div>
                    ))
                }
                <div className="form">
                    <div className="row">
                        <h3>
                            Function
                        </h3>
                        <input type="text" name="func" ref={ref=>ref!==null&&inputRef.current.push(ref)}/>
                    </div>
                    <div className="row">
                        <h3>
                            Employer
                        </h3>
                        <input type="text" placeholder='Employer' name='employer' ref={ref=>ref!==null&&inputRef.current.push(ref)} />
                    </div>
                    <div className="row">
                        <h3>
                            Start date
                        </h3>
                        <input type="date" placeholder='start date' ref={ref=>ref!==null&&inputRef.current.push(ref)} name='start_date' />
                    </div>
                    <div className="row">
                        <h3>
                            End date
                        </h3>
                        <input type="date" disabled={today} defaultValue={endDate} onChange={e=>setEndDate(e.target.value)} placeholder='end date' ref={ref=>ref!==null&&inputRef.current.push(ref)} name='end_date' />
                    </div>
                    <div className="row" style={{justifyContent:"flex-start",paddingLeft:'20%'}}>
                        <input type="checkbox" name="" id="" onClick={(e)=>handleTodayCheck(e)}/>
                        <h3 style={{width:"70px"}}>
                            Today
                        </h3>
                    </div>
                    <div className="row">
                        <h3>
                            Description
                        </h3>
                        <textarea maxLength={"2000"} id="" cols="30" rows="50" placeholder='Description' name='description' ref={ref=>ref!==null&&inputRef.current.push(ref)}></textarea>
                    </div>
                    <div className="row">
                        <div className="back-save">
                            <Link to="/dashboard/settings">
                                <button className="back">Back</button>
                            </Link>
                            <Link to="/dashboard/settings" 
                            state={message}
                            ref = {ref=>ref!==null&&(linkRef.current = ref)}
                            >
                            </Link>
                            <button className="save"  onClick={(e)=>add_work_xp(e)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
