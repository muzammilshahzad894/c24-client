import React, {useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineLock } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation } from 'react-router-dom'
import { check_verification_email, reset_password_action, reset_password_email_action, send_verification_email } from '../../state/Actions/UserAction'
import "./verifyEmail.scss";
import MessageBox from '../../components/MessageBox/MessageBox'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { useEffect } from 'react'
export default function VerifyEmail({func,show,email}) {
    const [switchLoading, setSwitchLoading] = useState(true)
    
    const user_info = useSelector(state => state.user_info)
    const loginRef = useRef()
    const location = useLocation();
    const dispatch = useDispatch()

    const checkEmailCode = ()=>{
        if(loginRef.current?.value){
            dispatch(check_verification_email(loginRef.current?.value?.trim()))
        }
    }
    setTimeout(()=>{
        setSwitchLoading(false);
    },300)
    useEffect(()=>{
        console.log(email)
        if(email?.length>0){
            dispatch(send_verification_email(email))
        }
    },[dispatch,email,show])
    return (
    switchLoading?(
        <LoadingBox big />
    ):(
    <div className='login-verify' style={{display:show?"block":"none"}} >
        <div className="bg" ></div>
        <div className="content-verify">
            {user_info.error&&(
                <MessageBox message={user_info.error.data} status={"failure"}/>
            )}
            {
                location.state?.message&&(
                    <MessageBox message={location.state?.message}/>
                )
            }
            <div className='reset-password'>
                <div className="content" style={{alignItems:"center"}}>
                    <div className="reset-form">
                        <h1>Verify Email <AiOutlineClose onClick={()=>func()}/></h1>
                        <span>
                            A verification email has been sent to your email address. <br />
                            Please enter the verification code below.
                        </span>
                        <div className="inputs">
                            <div className="code">
                                <AiOutlineLock/>
                                <input type="text" name="verification code" id="" defaultValue={""} placeholder='verification code' ref={ref=>ref!==null&&(loginRef.current=ref)} />
                            </div>
                            <div className="reset-button" onClick={()=>checkEmailCode()}>
                                <button>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    )
}
