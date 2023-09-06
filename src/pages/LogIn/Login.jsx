import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import {HiArrowLeft} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { facebookLoginAction, loginAction, reset_password_email_action } from '../../state/Actions/UserAction'
import {BsFacebook} from 'react-icons/bs';
import "./login.scss"
import { FaLinkedin } from 'react-icons/fa'
import MessageBox from '../../components/MessageBox/MessageBox'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
export default function Login() {
    const [showForgotPass, setShowForgotPass] = useState(false)
    const [switchLoading, setSwitchLoading] = useState(true)
    const emailRef = useRef();
    
    const user_info = useSelector(state => state.user_info)
    const reset_password_email = useSelector(state=>state.reset_password_email)
    const loginRef = useRef([])
    //redirection link back to page
    const linkRef = useRef();

    const location = useLocation();
    const dispatch = useDispatch()
    useEffect(()=>{
        if(reset_password_email.data){
            setTimeout(() => {
                window.location.replace("/reset-password")
            }, 3000);
        }
    },[reset_password_email.data]);
    
    const login = ()=>{
        let email = loginRef.current[0].value;
        let password = loginRef.current[1].value;
        let verified = false;
        if(location.search.includes("v_=true")){
            verified = true;
        }
        if(email.length>0 && password.length >0)
        dispatch(loginAction({email,password,verified}));
    }
    console.log(location);
    const resetPasswordEmailHandler = ()=>{
        dispatch(reset_password_email_action({email:emailRef.current.value}))
    }
    if(user_info.user && user_info.user.email){
        sessionStorage.setItem("user_info",JSON.stringify(user_info))
        if(location.state?.target){
            if(location.state?.target==="/dashboard/place-call"){
                if(user_info.user?.account_type==="client"){
                    linkRef.current.click();
                }else{
                    window.location.replace("/dashboard")
                }
            }else{
                linkRef.current.click();
            }
        }else{
            return   <Navigate to="/Dashboard"/>
        }
    }
    setTimeout(()=>{
        setSwitchLoading(false);
    },300)

    return (
    switchLoading?(
        <LoadingBox big />
    ):(
    <div className='login'>
        <div className="content">
            <div className="top">
                <Link to="/">
                    <img src="/images/logo.png" alt="" className='logo' />
                </Link>
                <div className="dont-have-an-account-yet">
                    <h4>Don't have an account yet?</h4>
                    <Link to="/join" state={{target:location.state?.target}}>
                        <button>                         
                            <AiOutlineLock className='lock'/>
                            REGISTER
                        </button>
                    </Link>
                </div>
            </div>
            {user_info.error&&(
                <MessageBox message={user_info.error.data} status={"failure"}/>
            )}
            {
                location.state?.message&&(
                    <MessageBox message={location.state?.message}/>
                )
            }
            {!showForgotPass?(        
            <div className="methods">
                <h1>Welcome !</h1>
                <h2>Login</h2>
                {/* <div className="loginSocial">
                    <div className="loginFacebook" onClick={()=>dispatch(facebookLoginAction())}>
                        <a href="https://www.curant24.nl/api/auth/facebook" >
                            <BsFacebook/>
                            <span>LOGIN WITH FACEBOOK</span>
                        </a>
                    </div>
                    <div className="loginLinkedIn">
                        <a href="https://www.curant24.nl/api/auth/linkedin">
                            <FaLinkedin className='linkedin'/>
                            <span>LOGIN WITH LINKEDIN</span>
                        </a>
                    </div>
                </div>
                <h5>or</h5> */}
                <div className="emailLogin">
                    <div className="email">
                        <span>
                            <AiOutlineMail/>
                        </span>
                        <input type="email" placeholder='iets@example.com' ref={ref=>ref!==null&&(loginRef.current.push(ref))} name='email' />
                    </div>
                    <div className="password">
                        <span>
                            <AiOutlineLock/>
                        </span>
                        <input type="password" name="password" id="" placeholder='your password'ref={ref=>ref!==null&&(loginRef.current.push(ref))} />
                    </div>
                    <div className="ForgotPassword" onClick={()=>setShowForgotPass(true)}>
                        <p>Forgot your password?</p>
                    </div>
                    <div className="loginButton" onClick={()=>login()}>
                        <button>Login</button>
                    </div>
                </div>
            </div>):(
                <div className="reset-password">
                    <div className="reset-password-header">
                        <div className="reset-password-title">
                            <HiArrowLeft className="reset-password-tilte-icon" onClick={()=>setShowForgotPass(false)}/>
                            <h1>Reset your password</h1>
                        </div>
                        <p>
                            Enter your email address. We will send an email to reset 
                        </p>
                        <span>your password</span>
                    </div>
                    {
                        reset_password_email.data&&(
                            <div className="reset-password-status">
                                <p>
                                Password reset code sent to your email address. Please check your email to reset password with in 15 min. 
                                </p>
                            </div>
                        )
                    }
                    <div className="reset-password-form">
                        <div className="reset-password-email-input">
                            <AiOutlineMail/>
                            <input type="text" name="reset-password-email" id="" placeholder='iets@example.com' ref={ref=>ref!=null&&(emailRef.current=ref)} />
                        </div>
                        <div className="reset-password-submit">
                            <button onClick={()=>resetPasswordEmailHandler()}>
                                VERIFY E-MAIL
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
        <div className="background">
            <img src="/images/freelance_img.png" alt="" />
        </div>
        <Link to={location.state?.target||""} state={location.state} ref={ref=>ref!==null&&(linkRef.current = ref)}>

        </Link>
    </div>
    )
    )
}
