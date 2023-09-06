import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login_management_action } from '../../state/Actions/UserAction';
import "./management.scss"

export default function Management() {
    //management page for admin , when reached it promts for password, then sends it to the server, finally the admin object comes
    //which redirects to invoice page and  gives access to alter docs of said user
    //the page where user will find result is invopices page
    const user_info = useSelector(state=>state.user_info);
    let login_management = useSelector(state=>state.login_management);
    const inputRef = useRef([]);
    const dispatch = useDispatch();
    const [key, setKey] = useState("")
    const [i, setI] = useState(0)


    useEffect(()=>{
        inputRef.current[0]?.focus();
    },[inputRef])

    useEffect(()=>{
        if(login_management.message?.admin){
            sessionStorage.setItem("admin",JSON.stringify(login_management))
        }
    },[login_management])

    useEffect(()=>{
        if(key.length===6){
            dispatch(login_management_action({key},user_info.user.token));
        }
    },[dispatch, key, user_info.user.token])
    const focusOnNextElt = ()=>{
        setI(i+1)
        console.log(i);
        inputRef.current[i+1]?.focus();
        setKey(key+inputRef.current[i].value)
    }

    const logout = ()=>{
        sessionStorage.removeItem("admin");
        login_management = {}
        setI(0)
        setKey("")
        window.location.replace("/dashboard/settings");
    }
    console.log(key,key.length)
  return (
    <div className='management-password'>
        {
            login_management.message?.admin?(
                user_info.user?.account_type==="freelancer"?(
                        <>
                            <div className="management-link-to-admin-invoices">
                                <h1>
                                    Management system for website <br />
                                    Freelancer
                                </h1>
                                <Link to="/dashboard/contracts">
                                    - Contract page.
                                </Link>
                                <Link to="/dashboard/timecards">
                                    -  Timecards & Invoices, Freelancers
                                </Link>
                                <Link to="/dashboard/organisaties">
                                    - My Clients
                                </Link>
                                <Link to="/dashboard/settings/reserve">
                                    - My reserve services
                                </Link>
                                <Link to="" onClick={()=>logout()}>
                                    Log out
                                </Link>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="management-link-to-admin-invoices">
                                <h1>
                                    Management system for website <br />
                                    Client
                                </h1>
                                <Link to="/dashboard/contracts">
                                    - Contract page.
                                </Link>
                                <Link to="/dashboard/timecards">
                                    -  Timecards & Invoices, Client
                                </Link>
                                <Link to="/dashboard/organisaties">
                                    - My freelancers
                                </Link>
                                <Link to="" onClick={()=>logout()}>
                                    Log out
                                </Link>
                            </div>
                        </>
                    )
            ):(
                <>
                    <div className="management-password-img">
                        <img src="/images/logo.png" alt="" />
                    </div>
                    <div className="management-password-form">
                        <p>
                            Enter your PIN code
                        </p>
                        <div className="management-password-input">
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[0] = (ref))}/>
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[1] = (ref))}/>
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[2] = (ref))}/>
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[3] = (ref))}/>
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[4] = (ref))}/>
                            <input type="text" maxLength={1} onChange={focusOnNextElt} ref={ref=>ref!==null&&(inputRef.current[5] = (ref))}/>
                        </div>
                    </div>
                </>
            )
        }
    </div>
  )
}
