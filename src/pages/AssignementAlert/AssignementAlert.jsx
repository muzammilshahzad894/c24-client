import React, { useState } from 'react'
import { FcInfo } from 'react-icons/fc'
import { BsArrowLeft, BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import AssignementAlertsHeader from '../../components/AssignementAlertsHeader/AssignementAlertsHeader'
import Header from '../../components/Header/Header'
import "./assignementAlert.scss"
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPersonalInfo, set_assignement_alert_action } from '../../state/Actions/UserAction'
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'

export default function AssignementAlert() {
    let infoRef = useRef({});
    const user_info = useSelector(state=>state.user_info);
    const add_assignement_alert = useSelector(state=>state.add_assignement_alert);
    const get_personal = useSelector(state=>state.get_personal)
    const [showEmptyMsg, setShowEmptyMsg] = useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPersonalInfo(user_info.user?.token))
    },[user_info,dispatch])

    useEffect(()=>{
        let info = infoRef.current;
        if(info["section"]?.value?.length>0 || info["profession"]?.value?.length>0 || info["keyword"]?.value?.length>0 ||  info["location"]?.value?.length>0 || info["distance"]?.value?.length>0 || info["receive_email"]?.value?.length>0 || info["alert_duration"]?.value?.length>0){
            setShowEmptyMsg(false)
        }
    },[infoRef.current])

    useEffect(()=>{
        window.scrollTo(0,0);
        if(add_assignement_alert.message){
            setTimeout(() => {
                add_assignement_alert.message = undefined;
            }, 1000);
        }
    },[add_assignement_alert])

    const addAssignementAlertHandler = ()=>{
        let info = {};
        for(const [key,value] of Object.entries(infoRef.current)){
            info[key] = value.value;
            console.log(value,value.value,key)
        }
        if(info["section"].length>0 && info["profession"].length>0 && info["keyword"].length>0 &&  info["location"].length>0 && info["distance"].length>0 &&info["alert_duration"].length>0){
            if( info["receive_email"].length===0){
                info["receive_email"] = get_personal.user?.email;
            }
            dispatch(set_assignement_alert_action(info,user_info.user?.token))
        }
    }
  return (
    <div className='assignement-alerts'>
        <Header Child={<AssignementAlertsHeader/>}/>
        <div className="assignement-alert-content">
            <div className="back-link">
                <Link to="/search">
                    <BsArrowLeft/>
                    Go back to search results
                </Link>
            </div>
            {
                add_assignement_alert.message?(
                    <>
                        <div className='create-assignement-alert-success'>
                            <div className='create-assignement-alert-success-header'>
                                <h2>
                                    <b>
                                        Assignment 
                                    </b>
                                    already saved
                                </h2>
                            </div>
                            <div className="create-assignement-alert-success-msg">
                               <BsFillCheckCircleFill/>
                               <span>
                                    your <Link to="">assignment</Link> alert has been saved
                                </span> 
                            </div>
        
                            <div>
                                <p>
                                    from now on you will receive daily <Link to="">assignments</Link> on {infoRef.current["receive_email"]?.value?.length>0?infoRef.current["receive_email"]?.value:get_personal?.user?.email}. 
                                </p>
                            </div>
                            <div>
                                <p>
                                    Do you want to change something ?
                                </p>
                                <p>
                                    This can be done in your My <Link to="/dashboard">Curant24</Link> account under the tab '<Link to="">assignment</Link> alerts '.
                                </p>
                            </div>
                            <div className="create-assignement-alert-success-buttons">
                                <Link to="/search">
                                    <button className='back'>
                                        back to all assignments
                                    </button>
                                </Link>
                                <p>
                                    - Or -
                                </p>
                                <Link to="/dashboard">
                                    <button>
                                        go to My Curant24
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                ):(
                    <>
                        <div className="create-assignement-alert">
                            <div className="create-assignement-info">
                                <div style={{display:"flex",flexDirection:"column"}}>
                                    <h2>
                                        Create e-mail alert new Assignements
                                    </h2>
                                    <span style={{width:"100%"}}>
                                        Create your own email alert here to receive new Assignements that are relevant to you.
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Section
                                    </span>
                                    <select name="section" id=""ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}>
                                        <option value="Construction">
                                            Bouw
                                        </option>
                                        <option  value="Electrical">
                                            Elektrotechniek
                                        </option>
                                        <option value="Installation">
                                            Installatietechniek
                                        </option>
                                        <option value="Infrastructure">
                                            Infra
                                        </option>
                                        <option   value="Industrial">
                                            Industrie
                                        </option>
                                        <option value="Health care and well being">
                                            Health care and well being
                                        </option>
                                        <option  value="Trade and services">
                                            Trade and services
                                        </option>
                                        <option value="IT">
                                            IT
                                        </option>
                                        <option  value="Justice, security and public administration">
                                            Justice, security and public administration
                                        </option>
                                        <option value="Environment and Agriculture">
                                            Environment and Agriculture
                                        </option>
                                        <option value="Media and communication">
                                            Media and communication
                                        </option>
                                        <option value="Education, culture and science">
                                            Education, culture and science
                                        </option>
                                        <option  value="Engineering, production and construction">
                                            Engineering, production and construction
                                        </option>
                                        <option  value="Tourism, recreation and catering">
                                            Tourism, recreation and catering
                                        </option>
                                        <option value="Transport and Logistics">
                                            Transport and Logistics
                                        </option>
                                        <option value="Childcare">
                                            Childcare
                                        </option>
                                    </select>
                                </div>
                                {/* <div>
                                    <span>
                                        Profession
                                    </span>
                                    <select name="profession" id=""ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}>
                                        <option value="Construction">
                                            Bouw
                                        </option>
                                        <option  value="Electrical">
                                            Elektrotechniek
                                        </option>
                                        <option value="Installation">
                                            Installatietechniek
                                        </option>
                                        <option value="Infrastructure">
                                            Infra
                                        </option>
                                        <option   value="Industrial">
                                            Industrie
                                        </option>
                                        <option value="Health care and well being">
                                            Health care and well being
                                        </option>
                                        <option  value="Trade and services">
                                            Trade and services
                                        </option>
                                        <option value="IT">
                                            IT
                                        </option>
                                        <option  value="Justice, security and public administration">
                                            Justice, security and public administration
                                        </option>
                                        <option value="Environment and Agriculture">
                                            Environment and Agriculture
                                        </option>
                                        <option value="Media and communication">
                                            Media and communication
                                        </option>
                                        <option value="Education, culture and science">
                                            Education, culture and science
                                        </option>
                                        <option  value="Engineering, production and construction">
                                            Engineering, production and construction
                                        </option>
                                        <option  value="Tourism, recreation and catering">
                                            Tourism, recreation and catering
                                        </option>
                                        <option value="Transport and Logistics">
                                            Transport and Logistics
                                        </option>
                                        <option value="Childcare">
                                            Childcare
                                        </option>
                                    </select>
                                </div> */}
                                <div>
                                    <span>
                                        Profession / Keyword
                                    </span>
                                    <input type="text" name='keyword' placeholder='keyword/profession'ref={ref=>{ref!==null&&(infoRef.current[ref.name] = infoRef.current["profession"]  = ref)}}/>
                                </div>
                                <div>
                                    <span>
                                        Location
                                    </span>
                                    <input type="text" name='location' placeholder='Den-Haag, Netherlands' ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}/>
                                </div>
                                <div>
                                    <span>
                                        Distance
                                    </span>
                                    <select name="distance" id=""ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}>
                                        <option value=">10"> {">"} 10Km</option>
                                        <option value="<10"> {"<"} 10Km</option>
                                        <option value="<30"> {"<"} 30Km</option>
                                        <option value="<50"> {"<"} 50Km</option>
                                    </select>
                                </div>
                            </div>
                            <div className="create-assignement-alert-options">
                                <div>
                                    <span>
                                        At which e-mail address would you like to receive the assignment alerts?
                                    </span>
                                    <input type="text" name='receive_email' placeholder='e-mail address' ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}/>
                                </div>
                                <div>
                                    <span>
                                        How often do you want to receive the assignment alert?
                                    </span>
                                    <select name="alert_duration" id=""ref={ref=>ref!==null&&(infoRef.current[ref.name] = ref)}>
                                        <option value="daily">
                                            daily
                                        </option>
                                        <option value="weekly">
                                            weekly
                                        </option>
                                        <option value="monthly">
                                            monthly
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="create-assignement-alerts-save">
                                <div>
                                    {
                                        showEmptyMsg&&(
                                            <span>
                                                <FcInfo/>
                                                Please note that you have not selected any filters at this time. You will receive all vacancies
                                            </span>
                                        )
                                    }
                                    <button onClick={()=>addAssignementAlertHandler()}>
                                        Save assignment alert
                                    </button>
                                    <Link to="/">
                                        <button className='back'>
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
        <Footer/>
    </div>
  )
}
