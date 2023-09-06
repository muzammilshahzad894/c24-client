import React from 'react'
import { Link } from 'react-router-dom'
import {CgOrganisation} from 'react-icons/cg'
import {BsClock} from 'react-icons/bs'
import {FaFileContract} from 'react-icons/fa'
import "./dashboardBarBottom.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPersonalInfo } from '../../state/Actions/UserAction'
import { AiOutlineFileText } from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi';

export default function DashboardBarBottom({user_id = null}) {
    const get_personal = useSelector(state=>state.get_personal);
    const user_info = useSelector(state=>state.user_info);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(user_info.user?.token&&!get_personal.user?.account_type){
            dispatch(getPersonalInfo(user_info.user.token,user_id))
        }
    },[dispatch, get_personal.user?.account_type, user_id, user_info.user.token])
    return (
        <div className="bottomBar">
            <div className="elements" style={{gridTemplateColumns:user_info.user?.account_type!=="client"?"repeat(6,1fr)":"repeat(5,1fr)",width:user_info.user?.account_type!=="client"?"80%":"70%"}}>
                {
                     user_info.user?.account_type ==="client"&&(
                        <>
                            <div className="element">
                                <Link to={`/dashboard/${(user_info.user?.account_type==='client'?'place-call':'notifications')}`}>
                                    <img src="/images/bell.svg" alt="" />
                                </Link>
                                <p>Place Assignment</p>
                            </div>
                            <div className="element">
                                <Link to="/dashboard/assignements">
                                    <img src="/images/briefcase.svg" alt="" />
                                </Link>
                                <p>My Assignements</p>
                            </div>
                        </>
                     )
                }
                {
                    user_info.user?.account_type !=="client"&&(
                        <>
                            <div className="element">
                                <Link to='/dashboard/assignement-alerts'>
                                    <img src="/images/bell.svg" alt="" />
                                </Link>
                                <p>Set assignement alert</p>
                            </div>
                            <div className="element">
                                <Link to="/dashboard/availability">
                                    <img src="/images/calendar.svg" alt="" />
                                </Link>
                                <p>Availability</p>
                            </div>
                        </>
                    )
                }
                <div className="element">
                    <Link to="/dashboard/organisaties">
                        {
                            user_info.user.account_type==="client"?(
                                <FiUsers/>
                            ):(

                                <CgOrganisation/>
                            )
                        }
                    </Link>
                    <p>
                        My
                        {
                            user_info.user?.account_type==="client"?" Freelancers":" Clients"
                        }
                    </p>
                </div>
                <div className="element">
                    <Link to="/dashboard/timecards">
                        <BsClock/>
                        <img src="/images/euro.svg" alt="" />
                    </Link>
                    <p>
                        {
                            user_info.user?.account_type==="client"?"Timesheet & invoices Freelancers":"Send your invoices and Timesheet"
                        }
                    </p>
                </div>
                {
                    user_info.user.account_type==="freelancer"&&(
                        <div className="element">
                            <Link to="/dashboard/invoices-overview">
                                <AiOutlineFileText/>
                            </Link>
                            <p>
                                Overview of my sent <br />
                                Invoices and Timesheet
                            </p>
                        </div>
                    )
                }
                <div className="element">
                    <Link to="/dashboard/contracts">
                        <FaFileContract/>
                    </Link>
                    <p>Contracts</p>
                </div>
            </div>
        </div>
    )
}
