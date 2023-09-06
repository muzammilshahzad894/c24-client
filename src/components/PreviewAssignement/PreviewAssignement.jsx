import React, { useEffect, useState } from 'react'
import { BsBell, BsPen, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { delete_assignement_action, get_assignement_action, set_assignement_action } from '../../state/Actions/UserAction';
import DashboardBar from '../DashboardBar/DashboardBar';
import DashboardBarBottom from '../DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import "./previewAssignement.scss";

export default function PreviewAssignement() {
    const user_info = useSelector(state=>state.user_info);
    const get_assignement = useSelector(state=>state.get_assignement);
    const delete_assignement = useSelector(state=>state.delete_assignement);
    const set_assignement = useSelector(state=>state.set_assignement);
    let files = [],skills = [],cert = [],working_days = [];
    const [show_notif, setShow_notif] = useState(true)
    const [status, setStatus] = useState()
    const [statusMessage, setStatusMessage] = useState()
    const assignement = (get_assignement.data&&get_assignement.data?.result&&get_assignement.data?.result[0])||{};
    const dispatch = useDispatch()
    const location = useLocation();
    console.log(location.state);
    //getting all the files from assignements
    if(get_assignement.data){
      files = get_assignement.data?.files?.map(item=>item.file);
      skills = get_assignement.data?.skills?.map(item=>item.skill);
      cert = get_assignement.data?.certificates?.map(item=>item.certificate);
      working_days = get_assignement.data?.days?.map(item=>item.day);
    }
    useEffect(()=>{
      dispatch(get_assignement_action(user_info.user.token,location.state.id));
    },[dispatch, location.state.id, user_info.user.token])

    useEffect(()=>{
        if(get_assignement.data){
            setStatus(get_assignement.data[0].status)
            setStatusMessage(get_assignement.data[0].status_message)
        }
    },[get_assignement.data])

    const deleteAssignement = ()=>{
        dispatch(delete_assignement_action(user_info.user.token,location.state.id));
    }

   useEffect(()=>{
       if(delete_assignement.data?.length>0){
           setTimeout(() => {
               window.location.replace("/dashboard")               
           }, 1000);
       }
    },[delete_assignement.data]);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[set_assignement])

    useEffect(()=>{
        if(set_assignement.data){
            setTimeout(() => {
                set_assignement.data = null;
            }, 1000);
        }
        if(delete_assignement.data){
            setTimeout(() => {
                delete_assignement.data = null;
            }, 1000);
        }
    })
    useEffect(()=>{
            dispatch(get_assignement_action(user_info.user.token,location.state.id));
    },[dispatch, location.state.id, status, user_info.user.token])

    const set_assignement_handler = ()=>{
        let stt = "";
        let data = new FormData();
        (status==="Paused"?stt="Assignement Placed":stt= "Paused");
        setShow_notif(true);
        setStatus(stt);
        data.set("info",JSON.stringify({status:stt}))
        dispatch(set_assignement_action(data,location.state.id,user_info.user.token))
    }
    const updateStatusMessage = ()=>{
        let data = new FormData();
        data.set("info",JSON.stringify({status_message:statusMessage}))
        dispatch(set_assignement_action(data,location.state.id,user_info.user.token))
    }
    //NOT IMPLEMENTED ON ANY PAGE, CONCERVED ONLY FOR FUTURE USE (IF ANY)
  return (
          delete_assignement.loading?(
              <LoadingBox big/>
          ):(
              <div className='preview-assignement'>
                  <DashboardBar/>
                  <div className="preview-assignement-content">
                      {
                          delete_assignement.data&&(
                              <MessageBox message={delete_assignement.data}/>
                          )
                      }
                      {
                          set_assignement?.data&&(
                              <MessageBox message={set_assignement.data}/>
                          )
                      }
                      <div className="preview-assignement-header">
                          <h5>
                              {assignement.job_name}
                          </h5>
                      </div>
                      <div className="preview-assignement-info">
                          <div className="row">
                              <h5>
                                  <b>
                                      Job name
                                  </b>
                              </h5>
                              <p>
                                  {assignement.job_name}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Job industry
                                  </b>
                              </h5>
                              <p>
                                  {assignement.industry}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Location 
                                  </b>
                              </h5>
                              <p>
                                  {assignement.place + " , "+assignement.province+", "+assignement.country}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Working hours 
                                  </b>
                              </h5>
                              <p>
                                  {assignement.working_hours}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Working days
                                  </b>
                              </h5>
                              <ul>
                                  {working_days.map((item,index)=>(
                                      <li key={index}>
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Required certificates
                                  </b>
                              </h5>
                              <ul>
                                  {skills.map((item,index)=>(
                                      <li key={index}>
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Skills
                                  </b>
                              </h5>
                              <ul>
                                  {skills.map((item,index)=>(
                                      <li key={index}>
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Files
                                  </b>
                              </h5>
                              <ul>
                                  {files.map((file,index)=>(
                                      <li key={index}>
                                          <a href={file} download>{file.split("/")[3]}</a>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      What may be charged
                                  </b>
                              </h5>
                              <p>
                                  {assignement.what_may_be_charged}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                      Starting date
                                  </b>
                              </h5>
                              <p>
                                  {assignement.starting_date?.split("T")[0]}
                              </p>
                          </div>
                          <div className="row">
                              <h5>
                                  <b>
                                       Contact
                                  </b>
                              </h5>
                              <p>
                                  {assignement.contact_person}
                              </p>
                          </div>
                          <div className="row description">
                              <h5>
                                  <b>
                                      Job Description
                                  </b>
                              </h5>
                              <p>
                                  {assignement.description_of_activities}
                              </p>
                          </div>
                      </div>
                      <div className="preview-assignement-buttons">
                          {/* <button>
                              {status}
                          </button> */}
                          <button onClick={()=>deleteAssignement()}>
                              Remove
                              <BsTrash/>
                          </button>
                          <Link to="/dashboard/place-call" state={{data:get_assignement.data}}>
                            <button>
                                Edit
                                <BsPen/>
                            </button>
                          </Link>
                          <button className={status==="Paused"&&"red"} onClick={()=>{set_assignement_handler()}}>
                              Pause job
                          </button>
                          <button className={status!=="Paused"&&"green"} onClick={()=>{set_assignement_handler()}}>
                              Place job
                          </button>
                          <button className={status==="Paused"?"red":"green"} onClick={()=>{setShow_notif(!show_notif)}}>
                              Notifications
                              <BsBell/>
                          </button>
                      </div>
                      {
                          show_notif&&(
                              <div className="preview-assignement-notifications">
                                    <textarea name="status_message" id="" onChange={e=>setStatusMessage(e.target.value)} defaultValue={statusMessage||status} placeholder="Your message here" cols="90" style={{width:"100%"}} rows="10"></textarea>
                                    <button className="save" onClick={()=>updateStatusMessage()} >
                                        Save
                                    </button>
                              </div>
                          )
                      }
                  </div>
                  <div className="buttons">
                    <Link to="/dashboard/assignements">
                      <button onClick={()=>set_assignement.data = undefined}>Back</button>
                    </Link>
                  </div>
                  <DashboardBarBottom/>
              </div>
          )
  )
}
