import React, { useState } from 'react'
import { useEffect } from 'react'
import { BsBriefcase, BsFileEarmarkPpt, BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import { getCompanyInfo, getDocuments, getPersonalInfo, get_user_competency_action, get_work_experience_action } from '../../state/Actions/UserAction'
import "./completeRegistration.scss"

export default function CompleteRegistration() {
    const dispatch = useDispatch();
    const user_info = useSelector(state=>state.user_info);
    const get_company_data = useSelector(state=>state.get_company_data);
    const get_personal = useSelector(state=>state.get_personal);
    const get_documents = useSelector(state=>state.get_documents);
    const get_work_experience = useSelector(state=>state.get_work_experience);
    const get_user_competency = useSelector(state=>state.get_user_competency);
    const [personalInfo, setPersonalInfo] = useState(0)
    const [companyDetails, setCompanyDetails] = useState(0)
    const [document, setDocument] = useState(0)
    const [diplomas, setDiplomas] = useState(0)
    const [introVideo, setIntroVideo] = useState(0)
    const [workXP, setWorkXP] = useState(0)
    const [competencies, setCompetencies] = useState(0)

    const checker = ()=>{
        let personalInfoPercent = 0;
        let companyDetailsPercent = 0;
        let documentPercent = 0;
        let diplomasPercent = 0;
        for(const [key,value] of Object.entries(get_personal.user)){
            if(key!=="id" && key!=="user_key" && key!=="created_at" && key!=="updated_at" && key!=="competencies" && key!=="rating"){
                if(value?.length>0){
                    personalInfoPercent++;
                }
            }
        }
        for(const [key,value] of Object.entries(get_company_data.data)){
            if(key!=="id"&&key!=="user_id"){
                if(value?.length>0){
                    companyDetailsPercent++;
                }
            }
        }
        if(get_documents.data&&get_documents.data[0]&&get_documents.data[0][0]){
            for(const [key,value] of Object.entries(get_documents.data[0][0])){
                if(key!=="user_id"){
                    if(value?.length>0){
                        documentPercent++;
                    }
                }
            }
        }
        get_documents.data[1]?.map(item=>{
            if(item?.diplomat_certificate?.length>0){
                diplomasPercent = 1
            }
            return item;
        })

        if(get_personal.user?.video){
            setIntroVideo(100)
        }
        if(get_work_experience.work_xp[0]?.id){
            setWorkXP(100)
        }
        if(get_user_competency.competencies?.at(0)!==undefined){
            setCompetencies(100)
        }
        setPersonalInfo(Math.floor((personalInfoPercent/16)*100)>100?100:Math.floor((personalInfoPercent/16)*100))
        setCompanyDetails(Math.floor((companyDetailsPercent/9)*100))
        setDocument(Math.floor((documentPercent/5)*100))
        setDiplomas(Math.floor((diplomasPercent/1)*100))
    }
    useEffect(()=>{
        dispatch(getPersonalInfo(user_info.user?.token))
        dispatch(getCompanyInfo(user_info.user?.token))
        dispatch(getDocuments(user_info.user?.token))
        dispatch(get_work_experience_action(user_info.user?.token))
        dispatch(get_user_competency_action(user_info.user?.token))
    },[dispatch, user_info.user?.token])


    useEffect(()=>{
        if(get_personal.user&&get_company_data.data&&get_documents.data&&get_work_experience.work_xp){
            checker()
        }
    },[get_company_data, get_documents.data, get_personal.user, get_work_experience.work_xp])
    console.log(get_user_competency.competencies?.at(0))
  return (
    <div className='complete-registration'>
        <DashboardBar/>
        <div className="complete-registration-content">
            <div className="complete-registration-header">
                <h1>
                    Complete registration
                </h1>
            </div>
            <div className="complete-registration-wrapper">
                <Link to="/dashboard/settings/personal-information">
                    <div className={`registration-item ${personalInfo===100&&"done"}`}>
                        <div>
                            <BsFillPersonFill/>
                        </div>
                        <div>
                            <h4>
                                Personal data
                            </h4>
                            <p>
                                {personalInfo}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/company-details">
                    <div className={`registration-item ${companyDetails===100&&"done"}`}>
                        <div>
                            <BsBriefcase/>
                        </div>
                        <div>
                            <h4>
                                Company details
                            </h4>
                            <p>
                                {companyDetails}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/documents">
                    <div className={`registration-item ${document===100&&"done"}`}>
                        <div>
                            <HiOutlineDocumentText color='white'/>
                        </div>
                        <div>
                            <h4>
                                Documents
                            </h4>
                            <p>
                                {document}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/credentials">
                    <div className={`registration-item ${diplomas===100&&"done"}`}>
                        <div>
                            <BsFileEarmarkPpt/>
                        </div>
                        <div>
                            <h4>
                                Diploma's
                            </h4>
                            <p>
                                {diplomas}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/profile">
                    <div className={`registration-item ${introVideo===100&&"done"}`}>
                        <div>
                            <BsFileEarmarkPpt/>
                        </div>
                        <div>
                            <h4>
                                30 second introductory video
                            </h4>
                            <p>
                                {introVideo}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/work-experience">
                    <div className={`registration-item ${workXP===100&&"done"}`}>
                        <div>
                            <BsFileEarmarkPpt/>
                        </div>
                        <div>
                            <h4>
                                Work experience
                            </h4>
                            <p>
                                {workXP}% complete
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="/dashboard/settings/competences">
                    <div className={`registration-item ${competencies===100&&"done"}`}>
                        <div>
                            <BsFileEarmarkPpt/>
                        </div>
                        <div>
                            <h4>
                                Competencies
                            </h4>
                            <p>
                                {competencies}% complete
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <DashboardBarBottom/>
    </div>
  )
}
