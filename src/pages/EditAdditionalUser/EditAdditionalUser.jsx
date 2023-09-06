import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import MessageBox from '../../components/MessageBox/MessageBox';
import { set_additoinal_users_action } from '../../state/Actions/UserAction';
import "./editAdditionalUser.scss"

export default function EditAdditionalUser() {
    const user_info = useSelector(state=>state.user_info);
    const set_additional_users = useSelector(state=>state.set_additional_users); 
    const [error, setError] = useState(false)
    const inputRef = useRef({});
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(Object.keys(inputRef.current).length>0 && location && location.state && location.state.data!==undefined){
            let data = location.state.data;
            for(const [key,item] of Object.entries(inputRef.current)){
                item.defaultValue = data[key];
            }
        }
    },[location])

    useEffect(()=>{
        window.scrollTo(0,0);
    },[error])
    useEffect(()=>{
        setError(false);
    },[set_additional_users])
    const updateAdditionalUser = (e)=>{
        e.preventDefault();
        let info = {};
        for(const [key,item] of Object.entries(inputRef.current)){
            info[key] = item.value;
        }
        if(info.email.includes("@")){
            if(info.first_name.length>0){
                if(info.last_name.length>0){
                    info.id = location.state.data.id;
                    dispatch(set_additoinal_users_action(user_info.user.token,info));
                }else{
                    setError("Please add the new last name");
                }
            }else{
                setError("Please add the new first name");
            }
        }else{
            setError("Please add the new email")
        }
    }
  return (
      <div className="edit-additional-user">
          <DashboardBar/>
          <div className="edit-additional-user-content">
              <div className="edit-additional-user-header">
                  <h1>
                      Edit User
                  </h1>
              </div>
              {error&&(<MessageBox message={error} status={"failure"}/>)}
              {
                  set_additional_users.data&&(<MessageBox message={set_additional_users.data}/>)
              }
              <div className="edit-additional-user-info">
                  <form>
                    <div className="row">
                        <h1>
                            Email address
                        </h1>
                        <input type="email" required  name='email' ref={ref=>ref!==null&&(inputRef.current[ref.name]= ref)}  />
                    </div>
                    <div className="row">
                        <h1>
                            First name
                        </h1>
                        <input type="text" required  name='first_name' ref={ref=>ref!==null&&(inputRef.current[ref.name]= ref)}  />
                    </div>
                    <div className="row">
                        <h1>
                            Last name
                        </h1>
                        <input type="text" required  name='last_name' ref={ref=>ref!==null&&(inputRef.current[ref.name]= ref)}  />
                    </div>
                    <div className="row">
                        <div className="save-back-buttons">
                            <Link to="/dashboard/settings/accounts">
                                <button className='back'>
                                    Back
                                </button>
                            </Link>
                            <button onClick={(e)=>updateAdditionalUser(e)}>
                                Save
                            </button>
                        </div>
                    </div>
                  </form>
              </div>
          </div>
          <DashboardBarBottom/>
      </div>
  )
}
