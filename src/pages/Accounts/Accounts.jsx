import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import { getPersonalInfo, get_additional_users_action } from '../../state/Actions/UserAction';
import "./accounts.scss";

export default function Accounts() {
    const get_personal = useSelector(state=>state.get_personal);
    const user_info = useSelector(state=>state.user_info);
    const get_additional_users = useSelector(state=>state.get_additional_users);
    const dispatch = useDispatch();

    if(!get_personal.user){
        get_personal.user = user_info.user;
    }
    useEffect(()=>{
        dispatch(get_additional_users_action(user_info.user.token))
        dispatch(getPersonalInfo(user_info.user.token))
    },[dispatch, user_info.user.token])
  return (
      <div className="accounts">
          <DashboardBar/>
          <div className="accounts-content">
              <div className="accounts-header">
                  <h1>
                      Settings - Users
                  </h1>
              </div>
              <div className="accounts-info">
                  <div className="row">
                      <div>
                          <h4>
                              <b>
                                User name
                              </b>
                          </h4>
                      </div>
                      <div>
                          <h4>
                              <b>
                                First name
                              </b>
                          </h4>
                      </div>
                      <div>
                          <h4>
                              <b>
                                Last name
                              </b>
                          </h4>
                      </div>
                      <div>
                          <h4>
                              <b>
                                Email
                              </b>
                          </h4>
                      </div>
                      <div>
                          <h4>
                              <b>
                                Actions
                              </b>
                          </h4>
                      </div>
                  </div>
                  <div className="row">
                      <div>
                        <p>
                            {
                                get_personal.user.user_name  
                            }
                        </p>
                      </div>
                      <div>
                        <p>
                            {
                                get_personal.user.first_name  
                            }
                        </p>
                      </div>
                      <div>
                        <p>
                            {
                                get_personal.user.last_name  
                            }
                        </p>
                      </div>
                      <div>
                        <p>
                            {
                                get_personal.user.email  
                            }
                        </p>
                      </div>
                      <div>
                          <Link to="/dashboard/settings/change-password">
                            <button>
                                Change Password
                            </button>
                          </Link>
                      </div>
                  </div>
                  {
                      get_additional_users.data && get_additional_users.data.map((item,index)=>(
                          <div className="row"key={index}>
                            <div>
                              <p>
                                  {
                                      item.user_name  
                                  }
                              </p>
                            </div>
                            <div>
                              <p>
                                  {
                                      item.first_name  
                                  }
                              </p>
                            </div>
                            <div>
                              <p>
                                  {
                                      item.last_name  
                                  }
                              </p>
                            </div>
                            <div>
                              <p>
                                  {
                                      item.email  
                                  }
                              </p>
                            </div>
                            <div>
                                <Link to="/dashboard/settings/edit-additional-user" state={{data:item}}>
                                  <button>
                                      To process
                                  </button>
                                </Link>
                            </div>
                          </div>
                      ))
                  }
                  <div className="row create-user">
                    <Link to="/dashboard/settings">
                        <button className='back'>
                            Back
                        </button>
                    </Link>
                    <Link to="/dashboard/settings/create-user" >
                        <button>
                            Create user
                        </button>
                    </Link>
                  </div>
              </div>
          </div>
          <DashboardBarBottom/>
      </div>
  )
}
