import React, { useState } from 'react'
import { useEffect } from 'react'
import {  AiOutlineClose } from 'react-icons/ai'
import { BsFillEnvelopeFill } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MyAssignementAlertsHeader from '../../components/MyAssignementAlertsHeader/MyAssignementAlertsHeader'
import { delete_assignement_alert_action, get_assignement_alert_action } from '../../state/Actions/UserAction'
import "./myAssignementAlerts.scss"

export default function MyAssignementAlerts() {
    const user_info = useSelector(state=>state.user_info)
    const get_assignement_alert = useSelector(state=>state.get_assignement_alert);
    const delete_assignement_alert = useSelector(state=>state.delete_assignement_alert);
    const [elts, setElts] = useState([])
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(get_assignement_alert_action(user_info.user?.token))
    },[dispatch, user_info.user?.token])

    useEffect(()=>{
        if(get_assignement_alert.data){
            let arr = [],arr2=[];
            console.log(get_assignement_alert.data);
            get_assignement_alert.data?.map(item=>item.found_assignements?arr.push(item.id):false)
            console.log(arr)
            
            arr2 = arr.map(item=>get_assignement_alert.data?.find(elmnt=>elmnt.id===item))
            get_assignement_alert.data = arr2.concat(get_assignement_alert.data?.filter(item=>arr.indexOf(item.id) ===-1))
            setElts(get_assignement_alert.data)
        }
    },[get_assignement_alert])

    const deleteAssignementAlertHandler = (id)=>{
        dispatch(delete_assignement_alert_action(id,user_info.user.token))
        dispatch(get_assignement_alert_action(user_info.user.token))
        setElts([]);
    }
    console.log(elts);
  return (
    delete_assignement_alert.loading||get_assignement_alert.loading?(
        <LoadingBox/>
    ):(
        <div className='my-assignement-alerts'>
            <Header Child={<MyAssignementAlertsHeader/>}/>
            <div className="my-assignement-alerts-container">
                    <div className="my-assignement-alerts-button">
                        <h4>
                            My <b>Assignement</b> Alerts
                        </h4>
                        <Link to="/dashboard/assignement-alerts">
                            <button>
                                <BsFillEnvelopeFill/> Set up a another assignement alert
                            </button>
                        </Link>
                    </div>
                    <div className="my-assignement-alerts-elements">
                        {
                            elts[0]!==undefined&&elts.map(item=>(
                                <div className="my-assignement-alerts-element">
                                <div className='my-assignement-alerts-element-left'>
                                    <div>
                                        <span>
                                            <b>
                                                Assignement
                                            </b>
                                            alert criteria
                                        </span>
                                    </div>
                                    <div className="my-assignement-alerts-element-left-info">
                                        <div>
                                            <span>Keyword: </span>
                                            <span>{item.keyword}</span>
                                        </div>
                                        <div>
                                            <span>Location: </span>
                                            <span>{item.location+"  "+item.distance+" Km"}</span>
                                        </div>
                                        <div>
                                            <span>Section: </span>
                                            <span>{item.section}</span>
                                        </div>
                                        <div>
                                            <span>Profession: </span>
                                            <span>{item.profession}</span>
                                        </div>
                                        <div>
                                            <span>Frequency: </span>
                                            <span>{item.alert_duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-assignement-alerts-element-right">
                                    <div className="my-assignement-alerts-element-right-result">
                                        <p>
                                            {item.found_assignements||0} assignements found
                                        </p>
                                    </div>
                                    <div className="my-assignement-alerts-element-top-delete" onClick={()=>deleteAssignementAlertHandler(item.id)}>
                                        <AiOutlineClose/>
                                        <span>
                                            delete alert
                                        </span>
                                    </div>
                                    <div className="my-assignement-alerts-element-right-link">
                                        <Link to="">
                                            <HiArrowNarrowRight/>
                                            Show all {item.found_assignements||0}  assignments
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
            </div>
            <Footer/>
        </div>
    )
  )
}
