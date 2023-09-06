import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsBriefcase, BsCurrencyEuro } from 'react-icons/bs'
import { FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import { HiDocumentDuplicate } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { delete_applications_action, get_applications_action } from '../../state/Actions/UserAction'
import "./myApplicationsElement.scss"

export default function MyApplicationElement({data}) {
    const [showJob, setShowJob] = useState(false)
    const [showMotiv, setShowMotiv] = useState(false)
    const user_info = useSelector(state=>state.user_info)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(showMotiv){
            window.scrollTo(0,0)
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.height = "auto";
            document.body.style.overflow = "auto";
        }
    },[showMotiv])

    const deleteApplication = (id)=>{
      dispatch(delete_applications_action(user_info.user?.token,id))
      dispatch(get_applications_action(user_info.user?.token));
    }
    console.log(data);
  return (
    <div className="my_applications_element" style={{borderBottom:showJob?"none":"1px #ccc solid",height:showJob?"900px":"85px"}}>
    <div className="my_applications_element_header">
      <div>
        <span className='delete'>
          applied on {data.applied_on}
          <button onClick={()=>deleteApplication(data.application_id)}>
            Delete application
          </button>
        </span>
        <h3>
          {data.job_name}
        </h3>
      </div>
      <div>
        {
          showJob?(
            <AiOutlineMinus onClick={()=>setShowJob(false)} />
          ):(
            <AiOutlinePlus onClick={()=>setShowJob(true)}/> 
          )
        }
      </div>
    </div>
    <div className="my_application_element_content">
      <div>
        <h4>
          job description
        </h4>
      </div>
      <div className="my_application_element_content_icons">
        <div>
          <div>
            <GoLocation/>
            <span>
              {
                data.country
              }
            </span>
          </div>
          <div>
            <HiDocumentDuplicate/>
            <BsCurrencyEuro/>
            <span>
             {data.pay_type === "pay per piece"?data.price_per_piece+" per piece":"from: "+data.hourly_wage_from+" to : "+data.hourly_wage_to}
            </span>
          </div>
          <div>
            <BsBriefcase/>
            <span>
                {
                    data.job_duration
                }
            </span>
          </div>
        </div>

        <div>
          <div>
            <FaGraduationCap/>
            <span>
              Ibo, mavo, vmbo
            </span>
          </div>
          <div>
            <FaRegBuilding/>
            <span>
               {data.province}
            </span>
          </div>
        </div>
      </div>
      <div className="my_application_job_description">
        <div>
           <p>
            {data.description_of_activities}
           </p>
        </div>
        <div>
            <Link to={"/dashboard/view-assignement?id="+data.id} >
              <button>
                  View assignement
              </button>
            </Link>
        </div>
      </div>
    </div>
    <div className="my_application_element_content">
      <div>
        <h4>
          your motivation
        </h4>
      </div>  
      <div className="my_application_job_description">
        <div>
           <p>
            {data.motivation}
           </p>
        </div>
        <div onClick={()=>setShowMotiv(true)}>
          <button>
                View motivation
          </button>
        </div>
      </div>
    </div>
    <div className="my_application_element_content">
      <div>
        <h4>
          contact
        </h4>
      </div>  
      <div className="my_application_job_description">
        <div>
           <p>
            {data.orga_name}
           </p>
        </div>
      </div>
    </div>
    {
        showMotiv&&(
            <div className="apply-bg"></div>
        )
    }
    {
        showMotiv&&(
        <div className="dialog-container" onClick={()=>setShowMotiv(false)}>
            <div className="apply-dialog">
                <div className="apply-content">
                    <div className="apply-header">
                        <h4 className="apply-title">
                            <b>
                                Your motivation
                            </b>
                        </h4>
                    <div>
                        <AiOutlineClose onClick={()=>{setShowMotiv(false)}}/>
                    </div>
                    </div>
                    <div className="apply-body">
                        <span>
                            {data.job_name}
                        </span>
                        <p>
                            {
                                data.motivation
                            }
                        </p>
                    </div>
                    <div className="apply-footer">
                    <button type="button" onClick={()=>setShowMotiv(false)}>close</button>
                    </div>
                </div>
            </div>
        </div>

        )
    }
  </div>
  )
}
