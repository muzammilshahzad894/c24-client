import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import { changePassword } from '../../state/Actions/UserAction';
import "./changePassword.scss"
export default function ChangePassword() {
    const [switchLoading, setSwitchLoading] = useState(true)
    const passwordRef = useRef([]);
    const dispatch = useDispatch();
    const user_info = useSelector(state => state.user_info)
    const change_password = useSelector(state=>state.change_password);
    const linkRef = useRef();
    
    const ChPassword = ()=>{
        if(passwordRef.current[0].value.length>0 &&(passwordRef.current[1].value===passwordRef.current[2].value)){
            const info = {};
            passwordRef.current.map(item=>info[item.name] = item.value)
            dispatch(changePassword(info,user_info.user.token))
        }
    }
    let message = {message:change_password.change_password_message};
    useEffect(()=>{
        if(change_password.change_password_message&&change_password.change_password_message.length>0){
            change_password.change_password_message&&(change_password.change_password_message = null)
            linkRef.current.click();
        }
    })
    setTimeout(()=>{
        setSwitchLoading(false);
    },300)
    return (
        switchLoading?(<LoadingBox big/>):(
        <div className='change-password'>
            <DashboardBar/>
            <div className="content">
                <div className="title">
                    <h1>
                        Change Password .
                    </h1>
                </div>
                <div className="form">
                    <div className="row">
                        <h4>Old Password</h4>
                        <input type="password" placeholder='Old password' name='old_password'  ref={ref=>ref!==null&&passwordRef.current.push(ref)}/>
                    </div>
                    <div className="row">
                        <h4>
                            New Password
                        </h4>
                        <input type="password" placeholder='New password'name='new_password' ref={ref=>ref!==null&&passwordRef.current.push(ref)}/>
                    </div>
                    <div className="row">
                        <div className="list">
                            <ul>
                                <li>
                                    Your password should not be too similar to your other personal information.
                                </li>
                                <li>
                                    Your password must be at least 8 characters long.
                                </li>
                                <li>
                                    Your password cannot be a commonly used password.
                                </li>
                                <li>
                                    Your password cannot consist entirely of numbers.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <h4>
                            Confirm new Password
                        </h4>
                        <input type="password" placeholder='confirm new password'name=' confirm_new_password' ref={ref=>ref!==null&&passwordRef.current.push(ref)} />
                    </div>
                    <div className="row">
                        <div className="modify">
                            <Link to="/dashboard/settings" 
                            state={message}
                            ref = {ref=>ref!==null&&(linkRef.current = ref)}
                            >
                            </Link>
                            <Link to="/dashboard/settings">
                                <button className="back" >Back</button>
                            </Link>
                            <button onClick={()=>ChPassword()}>
                                    Modify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
