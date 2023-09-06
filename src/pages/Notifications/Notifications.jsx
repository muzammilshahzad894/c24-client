import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { get_notifications_action, set_notifications_action } from '../../state/Actions/UserAction'
import "./notifications.scss"

export default function Notifications() {
    const user_info = useSelector(state=>state.user_info)
    const get_notifications = useSelector(state=>state.get_notifications)
    const set_notifications = useSelector(state=>state.set_notifications)

    let notifications = {};
    //const set_notifications = useSelector(state=>state.set_notifications)
    const dispatch = useDispatch();
    const optionRef= useRef([]);
    const inputRef = useRef([]);
    let select = notifications.amt_of_notif;
    const linkRef = useRef();

    let message = {message:set_notifications.message};
    useEffect(()=>{
        if(!user_info.user.email){
            window.location.replace("/login");
        }
    })
    useEffect(()=>{
        if(set_notifications.message&&set_notifications.message.length>0){
            set_notifications.message&&(set_notifications.message = null)
            linkRef.current.click();
        }
    })
    useEffect(()=>{
        dispatch(get_notifications_action(user_info.user.token))
    },[dispatch, user_info.user.token])

    useEffect(()=>{
        if(get_notifications.notifications){
            for(const [key,item] of Object.entries(optionRef.current)){
                item.selected = get_notifications.notifications.amt_of_notif===item.value;
            }
            for(const [key,item] of Object.entries(inputRef.current)){
                item.checked = get_notifications.notifications[key]!==0;
            }
        }

    },[get_notifications.notifications])

    const handleSelectChange = e=>{
        select = (e.target.value)
    }

    const change_notif = ()=>{
        let data = {amt_of_notif:select}
        for(const [key,item] of Object.entries(inputRef.current)){
            data[key] = item.checked?1:0;
        }
        dispatch(set_notifications_action(data,user_info.user.token))
    }
    return (
        get_notifications.loading?(
            <LoadingBox big />
        ):(
        <div className='notification'>
            <DashboardBar/>
            <div className="notification-content">
                <div className="notif-header">
                    <h1>
                        Settings - Notifications
                    </h1>
                </div>
                <div className="notif-form">
                    <div>
                        <h2>
                            Amount of notifications
                        </h2>
                        <div className="notif-form-input">
                            <select name="nofif " id="" onChange={(e)=>handleSelectChange(e)} >
                                <option value="Receive all notifications" ref={ref=>ref!==null&&(optionRef.current[ref.name]=ref)}>
                                    Receive all notifications
                                </option>
                                <option value="Summary of notifications received"ref={ref=>ref!==null&&(optionRef.current[ref.name]=ref)}>
                                    Summary of notifications received
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h2>
                            Email notifications
                        </h2>
                        <div className="notif-form-input">
                            <input type="checkbox" name="email_notif" id=""  ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                        </div>
                    </div>
                    <div>
                        <h2>
                            Notifications via the app
                        </h2>
                        <div className="notif-form-input">
                            <input type="checkbox" name="notif_via_app" id=""   ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                        </div>
                    </div>
                </div>
                <div className="notif-save-back">
                    <Link to="/dashboard/settings">
                        <button className='notif-back'>
                            Back
                        </button>
                    </Link>
                    <Link to="/dashboard/settings" 
                            state={message}
                            ref = {ref=>ref!==null&&(linkRef.current = ref)}
                            >
                    </Link>
                    <button className='notif-save' onClick={()=>change_notif()}>
                        Save
                    </button>
                </div>

            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
