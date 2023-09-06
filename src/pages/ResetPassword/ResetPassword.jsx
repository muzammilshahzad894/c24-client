import React, { useRef } from 'react'
import { useEffect } from 'react'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { reset_password_action } from '../../state/Actions/UserAction'
import "./resetPassword.scss"

export default function ResetPassword() {
    const loginRef = useRef([])
    const dispatch = useDispatch()
    const reset_password = useSelector(state=>state.reset_password)
    const resetPasswordhandler = ()=>{
        let key = loginRef.current[0].value?.trim();
        let str = loginRef.current[1].value?.trim();
        let password = "";
        if(str.length>=8 && /\w+/g.test(str) && /[A-Z]/g.test(str)){
            password = str
            dispatch(reset_password_action({password,key}));
        }
    }

    
    if(reset_password.data){
        return <Navigate to="/login" state={{message:reset_password.data}}/>;
    }
  return (
    <div className='reset-password'>
        <div className="content">
            <div className="top">
                <Link to="/">
                    <img src="/images/logo.png" alt="" className='logo' />
                </Link>
                <div className="dont-have-an-account-yet">
                    <h4>Don't have an account yet?</h4>
                    <Link to="/join">
                        <button>                         
                            <AiOutlineLock className='lock'/>
                            REGISTER
                        </button>
                    </Link>
                </div>
            </div>
            <div className="reset-form">
                <h1>Reset Password</h1>
                <div className="inputs">
                    <div className="code">
                        <AiOutlineLock/>
                        <input type="text" name="verification code" id="" placeholder='verification code' ref={ref=>ref!==null&&(loginRef.current.push(ref))} />
                    </div>
                    <div className="password">
                        <span>
                            <AiOutlineLock/>
                        </span>
                        <input type="password" name="password" id="" placeholder='your new password'ref={ref=>ref!==null&&loginRef.current.push(ref)} />
                    </div>
                    <ul>
                        <li>
                            Your password cannot be the same as your first or last name 
                        </li>
                        <li>
                            Your password must be at least 8 letters or numbers 
                        </li>
                        <li>
                            Your password must contain at least 1 capital letter
                        </li>
                        <li>
                            Your password cannot contain only numbers 
                        </li>
                    </ul>
                    <div className="reset-button" onClick={()=>resetPasswordhandler()}>
                        <button>Reset</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="background">
            <img src="/images/freelance_img.png" alt="" />
        </div>
    </div>
  )
}
