import React, { useEffect, useRef, useState } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { delete_user_file, getPersonalInfo, get_client_orga_action, set_client_orga_action, update_user_file } from '../../state/Actions/UserAction';
import "./organasationData.scss";

export default function OrganasationData() {
    const client_orga  = useSelector(state=>state.get_client_orga);
    const get_personal  = useSelector(state=>state.get_personal);
    const set_client_orga  = useSelector(state=>state.set_client_orga);
    const user_info = useSelector(state=>state.user_info);
    const inputRef = useRef({});
    const linkRef = useRef();
    const imageRef = useRef();
    const dispatch = useDispatch();
    const data = new FormData();
    const filesRef = useRef({})
    const inputRef2 = useRef({})


    useEffect(()=>{
        dispatch(get_client_orga_action(user_info.user.token))
        dispatch(getPersonalInfo(user_info.user?.token))
    },[ dispatch, user_info.user.token])

    useEffect(()=>{
        if(set_client_orga.error||set_client_orga.data){
            linkRef.current.click();
            set_client_orga.error = set_client_orga.data = null;
        }
    },[set_client_orga, set_client_orga.data, set_client_orga.error])

    useEffect(()=>{
        if(inputRef.current["orga_name"] && client_orga.data){
            for(const [key,item] of Object.entries(inputRef.current)){
                item.defaultValue = (client_orga.data[key])||"";
            }
            if(imageRef.current){
                imageRef.current.src = (client_orga.data.company_logo || get_personal.user?.picture)
            }
        }
        if(set_client_orga.error || set_client_orga.data){
            window.scrollTo(0,0);
        }
    },[client_orga, get_personal.user?.picture, set_client_orga])


    const handle_input_change = e=>{
        imageRef.current.src = URL.createObjectURL(e.target.files[0]);
        data.set(e.target.name,e.target.files[0]);
    }

    const change_organisation_data_handler = e=>{
        e.preventDefault();
        window.scrollTo(0,0)
        let info = {};
        for(const [key,item] of Object.entries(inputRef.current)){
            info[key] = item.value;
        }
        data.set('info',JSON.stringify(info));
        dispatch(set_client_orga_action(user_info.user.token,data));
        dispatch(get_client_orga_action(user_info.user.token))
    }
    const hanldeFileSelect = (e)=>{
        data.set(e.target.name,e.target.files[0]);
        filesRef.current[e.target.name].src = URL.createObjectURL(e.target.files[0])
        if(e.target.name==="video"){
            filesRef.current[e.target.name]?.load();
        }
        //update the chosen file directely on the database
        let info = new FormData();
        info.set(e.target.name,e.target.files[0]);
        info.set("data",JSON.stringify({file:e.target.name}))
        dispatch(update_user_file(info,user_info.user.token))
    }
    const deleteFiles = (name)=>{
        let info = new FormData();
        info.set("data",JSON.stringify({file:name,table:"client_orga",key:"user_id"}))
        dispatch(delete_user_file(info,user_info.user.token))
        dispatch(get_client_orga_action(user_info.user.token))
        dispatch(getPersonalInfo(user_info.user?.token))
    }
  return (
        set_client_orga.loading||client_orga.loading?(
                <LoadingBox big/>
        ):(
    <div className='orga-data'>
        <DashboardBar/>
        <div className="orga-data-content">
            <div className="orga-data-header">
                <h1>
                    Settings - Organasations
                </h1>
            </div>
            <div className="orga-data-form">
                <form onSubmit={e=>e.preventDefault()}>
                    <fieldset>
                        <div className="orga-data-view-profile-ratings-link">
                            <Link to="/dashboard/settings/profile/">
                                View profile and reviews
                            </Link>
                        </div>
                        <legend>{client_orga.data&&client_orga.data.orga_name}</legend>
                        <div className="orga-data-form-inputs">
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Organisation name</label>
                                <input  type="text" defaultValue={""} placeholder='Organisation name' name='orga_name' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Phone number</label>
                                <input  type="text" placeholder='Phone number' name='phone_no' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Headquarters address</label>
                                <input  type="text" placeholder='Headquarters address ' name='headquarters_address' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Postal code headquarters</label>
                                <input  type="text" placeholder='Postal code headquarters ' name='postal_code_headquarters' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Headquarters location</label>
                                <input  type="text" placeholder='Headquarters location ' name='headquarters_location' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row" style={{alignItems:"start"}}>
                                <div className="video_text">
                                    <p>
                                        ! Upload a company video 
                                        <br />
                                        <br />
                                        As a company you can upload a company <br />
                                        video of approximately 30 seconds. 
                                        <br />
                                        <br />
                                        Then the freelancers can already see a bit of <br />
                                        the  corporate culture of your company.
                                    </p>
                                </div>
                                <div className="video">
                                    <video src={get_personal?.user?.video} name="video" ref={ref=>ref!==null&&(filesRef.current["video"] = ref)} autoPlay muted  controls>
                                        <source src={get_personal?.user?.video} />
                                    </video>
                                    <input type="file" name="video" accept='video/*' ref={ref=>ref!==null&&(inputRef2.current[ref.name] = ref)} style={{display:'none'}} onChange={e=>hanldeFileSelect(e)} />
                                    <div className="video-buttons">
                                        <div className="modify-profile-video"  onClick={()=>inputRef2.current["video"].click()}>
                                            <button>
                                                Modify <BsPen/>
                                            </button>
                                        </div>
                                        {
                                            client_orga.data?.company_logo&&(
                                                <div className="delete-profile-video" onClick={()=>deleteFiles('video')}>
                                                    <button>
                                                        Delete <BsTrash/>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Company profile</label>
                                <textarea cols={50} rows={7} placeholder='Company profile ' name='company_profile' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Website</label>
                                <input  type="text" placeholder='Website ' name='website' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Company logo</label>
                                <div className="orga-data-form-file-input">
                                    <img src={""} alt=""  ref={ref=>(imageRef.current = ref)}/>
                                    <input   type="file" accept='image/*' placeholder='Company logo' name="company_logo" onChange={(e)=>handle_input_change(e)}  />
                                </div>
                                <div className='delete-button'>
                                    <button className="delete" onClick={()=>deleteFiles("company_logo")}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Chamber of Commerce number</label>
                                <input  type="text" placeholder='Chamber of Commerce number' name='chamber_of_commerce_number' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">LRK (Childcare Register) Number</label>
                                <input  type="text" placeholder='LRK (Childcare Register) Number' name='LRK_childcare_register_number' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Term of payment </label>
                                <input  type="text" placeholder='Term of payment ' name='term_of_payment' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Email HR</label>
                                <input  type="text" placeholder={client_orga.data?.email_hr || user_info.user?.email } name='email_hr' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Phone HR</label>
                                <input  type="text" placeholder='phone HR ' name='phone_hr' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Email financial</label>
                                <input  type="text" placeholder='Email financial ' name='email_financial' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Financial telephone number </label>
                                <input  type="text" placeholder='Financial telephone number  ' name='financial_phone_number' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Email management</label>
                                <input  type="text" placeholder='Email management ' name='email_management' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                            <div className="orga-data-form-inputs-row">
                                <label htmlFor="text">Telephone management</label>
                                <input  type="text" placeholder='Telephone management ' name='telephone_management' ref={ref=>ref!==null&&(inputRef.current[ref.name]=ref)}/>
                            </div>
                        </div>
                        <div className="back-save-buttons">
                            <Link to={"/dashboard/settings"}>
                                <button className="back">
                                        Back
                                </button>
                            </Link>
                            <Link to="/dashboard/settings" 
                            state={{message:set_client_orga.error||set_client_orga.data}}
                            ref = {ref=>ref!==null&&(linkRef.current = ref)}
                            >
                            </Link>
                            <button className="save" onClick={e=>change_organisation_data_handler(e)}>
                                Save
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <DashboardBarBottom/>
    </div>
    )
  )
}
