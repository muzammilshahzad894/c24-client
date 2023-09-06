import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import MessageBox from '../../components/MessageBox/MessageBox';
import { add_additional_users_action } from '../../state/Actions/UserAction';
import "./createUser.scss";

export default function CreateUser() {
    const user_info = useSelector(state=>state.user_info);
    const add_additional_users = useSelector(state=>state.add_additional_users);
    const createUser = useRef({})
    const [Error, setError] = useState( add_additional_users.error?.message||false);
    const dispatch = useDispatch();
    //create error state to show user errors
    const create_user = ()=>{
        let info = {};

        for(const [key,item] of Object.entries(createUser.current)){
            info[key] = item.value;
        }
        //check if all fields are filled and password is identical
        if(info.email.includes("@")){
            if(info.password.length>0&&info.confirm_password.length>0){
                if(info.password===info.confirm_password){
                    if(info.user_name.length>0){
                        if(info.first_name.length>0){
                            if(info.last_name.length>0){
                                dispatch(add_additional_users_action(user_info.user.token,info))
                            }else{
                                setError("Please Enter your last name")
                            }
                        }else{
                            setError("Please Enter your first name")
                        }
                    }else{
                        setError("Please Enter your user name")
                    }
                }else{
                    setError("The passwords are not identical! ");
                }
            }else{
                setError("Please Enter your password");
            }
        }else{
            setError("Please add a valid email");
        }
        
    }
    useEffect(()=>{
        window.scrollTo(0,0);
    },[Error])
    useEffect(()=>{
        window.scrollTo(0,0);
        if(add_additional_users.data){
            setTimeout(() => {
                window.location.replace("/dashboard/settings")
            }, 1000);
        }
    },[add_additional_users])
  return (
    <div className='create-user'>
        <DashboardBar/>
        <div className="create-user-content">
            <div className="create-user-header">
                <h1>
                    Add user
                </h1>
            </div>
            {
               Error&& (<MessageBox message={Error} status={"failure"}/>)
            }
            {
                add_additional_users.data&&(<MessageBox message={add_additional_users.data}/>)
            }
            <div className="create-user-info">
            <div className="row">
                    <h1>User Name</h1>
                    <div className="input">
                        <input required type="text"  placeholder='User name' name="user_name" ref={ref=>ref!==null&&(createUser.current[ref.name] = ref)} />
                        <span>Choose your username here</span>
                    </div>
                </div>
                <div className="row">
                    <h1>Password</h1>
                    <div className="input">
                        <input required type="password"    placeholder='Password' name="password" ref={ref=>ref!==null&&(createUser.current[ref.name] = ref)} />
                        <ul>
                            <li>
                                Your password cannot be the same as your first or last name 
                            </li>
                            <li>
                                Your password must be at least 8 letters or numbers 
                            </li>
                            <li>
                                Your password cannot contain only numbers 
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <h1>Confirm Password</h1>
                    <div className="input">
                        <input required type="password"  placeholder='Confirm Password' name="confirm_password" ref={ref=>ref!==null&&(createUser.current[ref.name ] = ref)} />
                        <span>Enter the same password again</span>
                    </div>
                </div>
                <div className="row">
                    <h1>Email Address</h1>
                    <div className="input">
                        <input required type="text"  placeholder='Email address' name="email" ref={ref=>ref!==null&&(createUser.current[ref.name] = ref)} />
                    </div>
                </div>
                <div className="row">
                    <h1>First Name</h1>
                    <div className="input">
                        <input required type="text" placeholder='First Name'  name="first_name" ref={ref=>ref!==null&&(createUser.current[ref.name] = ref)} />
                    </div>
                </div>
                <div className="row">
                    <h1>Last Name</h1>
                    <div className="input">
                        <input required type="text"  placeholder='Last Name' name="last_name" ref={ref=>ref!==null&&(createUser.current[ref.name] = ref)} />
                    </div>
                </div>
                <div className="row">
                    <div className="create-user-button">
                        <Link to="/dashboard/settings/accounts">
                            <button className='back'>
                                Back
                            </button>
                        </Link>
                        <button onClick={()=>create_user()}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <DashboardBarBottom/>
    </div>
  )
}
