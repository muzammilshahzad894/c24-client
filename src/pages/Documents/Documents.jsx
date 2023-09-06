import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { HiArrowDown } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import { addDocuments, delete_file_action, getDocuments } from '../../state/Actions/UserAction';
import "./documents.scss"

export default function Documents() {
    const data = new FormData();
    const dispatch = useDispatch()
    const user_info = useSelector(state => state.user_info)
    const add_documents = useSelector(state => state.add_documents)
    const get_documents = useSelector(state=>state.get_documents);
    const imageRef = useRef({})
    const filenameRef = useRef([])
    const files = useRef({});
    const [switcher, setSwitcher] = useState(0)
    const [link, setLink] = useState("")
    //handling message after saving 
    const linkRef = useRef();
    let message = {message:add_documents.response&&add_documents.response.message};

    useEffect(()=>{
        if(add_documents.response&&add_documents.message&&add_documents.response.message.length>0){
            add_documents.response.message&&(add_documents.response.message = null)
            linkRef.current.click();
        }
        if(get_documents.data&&get_documents.data.length>0){
            //getting data from server and filtering ...
            get_documents.data = get_documents.data[0][0];
        }
    })
    useEffect(()=>{
        dispatch(getDocuments(user_info.user.token))
    },[add_documents, dispatch, user_info.user.token])

    useEffect(()=>{
        for(const [key,value] of Object.entries(imageRef.current)){
            if(files.current[value.name]){
                value.src = URL.createObjectURL(files.current[value.name]);
            }
        }
    },[switcher,get_documents.data])
    useEffect(()=>{
        console.log("switcher");
        console.log(switcher)
        if(get_documents.data&&get_documents.data.id_card){
            if(switcher===0){
                setLink(get_documents.data?.id_card)
            }else if(switcher===1){
                setLink(get_documents.data?.chamber_of_commerce_registration)
            }else if(switcher===2){
                setLink(get_documents.data?.declaration_of_conduct);
            }else if (switcher===3){
                setLink(get_documents.data?.persons_register_childcare)
            }else{
                setLink(get_documents.data?.insurance_picture)
            }
        }
    },[get_documents.data,switcher,add_documents])

    const upload_documents = ()=>{
        for(const [key,value] of Object.entries(files.current)){
            data.set(key,value);
        }
        dispatch(addDocuments(data,user_info.user.token))
    }
    const handle_input_change = (e)=>{
        //imageRef.current[e.target.name].src = URL.createObjectURL(e.target.files[0]);
        setLink(URL.createObjectURL(e.target.files[0]))
        //filenameRef.current[e.target.name].style.display = "none";
        //data.set(e.target.name,e.target.files[0]);
        files.current[e.target.name] = e.target.files[0];
        e.target.value = ""
        upload_documents()
    }
    const delete_file = (table,column,path,whereId,id)=>{
        //imageRef.current[column].src = "blank";
        setLink(null)
        dispatch(delete_file_action({table,column,path,whereId,id},user_info.user?.token));
        dispatch(getDocuments(user_info.user.token))
    }
    console.log(link);
    return (
        add_documents.loading?(
            <LoadingBox big/>
        ):(
        <div className='documents'>
            <DashboardBar/>
            <div className="content">
                <div className="title">
                    <h1>
                        Settings - Documents
                    </h1>
                </div>
                <h3>
                    In order to get started immediately as a freelancer, we need the following documents from you. 
                    <br />
                    <br />
                    See below which documents these are. If you have any questions, please <br />
                    <Link to="/contact"> contact us </Link> and we will be happy to help you.
                </h3>
                <div className="form-header">
                    <h4 className={switcher===0&&'active'} onClick={()=>setSwitcher(0)}>
                        IDCard
                    </h4>
                    <h4 className={switcher===1&&'active'} onClick={()=>setSwitcher(1)}>
                        Chamber of <br />
                        Commerce <br />
                        Registration
                    </h4>
                    <h4 className={switcher===2&&'active'} onClick={()=>setSwitcher(2)}>
                        VOG
                    </h4>
                    <h4 className={switcher===3&&'active'} onClick={()=>setSwitcher(3)}>
                        Person register
                    </h4>
                    <h4 className={switcher===4&&'active'} onClick={()=>setSwitcher(4)}>
                        Insurance
                    </h4>
                </div>
                <div className="form">
                    {
                        switcher===0?(
                            <h4>
                                Upload your ID Card  
                            </h4>
                        ):switcher===1?(
                            <h4>
                                Chamber of Commerce registration
                            </h4>
                        ):switcher===2?(
                            <h4>VOG</h4>
                        ):switcher===3?(
                            <h4>Person Register</h4>
                        ):switcher===4?(
                            <h4>
                                Insurance
                            </h4>
                        ):(
                            <></>
                        )
                    }
                    <div className="form-content">
                        {
                            switcher===0?(
                                <h4 color=' rgb(240, 53, 53)'>
                                    Here you can upload  your ID Card, make sure that your ID card has not <br />
                                    expired.
                                    <br />
                                    <br />
                                    A passport. ID Card or driver's liscence is all valid to confirm your identity.
                                    <br />
                                </h4>
                            ):switcher===1?(
                                <h4>
                                    As proof that you are registered with the Chamber of Commerce as a self-employed person, we ask for an extract of your <br />
                                    Chamber of Commerce registration.
                                    <br />
                                    <br />
                                    <b>
                                        Chamber of Commerce Extract
                                        <br />
                                        <br />
                                    </b>
                                    If you do not have an extract from  your Chamber of Commerce registration, you can request it from the Chamber of <br />
                                    Commerce. <Link to=""> Click here </Link> to request proof of registration and then upload the PDF as proof.
                                    <br />

                                </h4>
                            ):switcher===2?(
                                <h4>
                                    To work in a Childcare Center, a Certificate of Good Conduct for working with children is required (codes 84 and 86) <br />
                                    <br />
                                    <b>
                                        Declaration of conduct <br /> <br />
                                    </b>
                                    Upload  a good quality scan of your certificate of Conduct as evidence.
                                </h4>
                            ):switcher===3?(
                                <h4>
                                    <span style={{color:'rgb(240, 53, 53)'}}>
                                        ! You only need to register if you work in childcare <br />  <br />
                                    </span>
                                    To work in a childcare center, registration in the Chilcare Persons Register is required. We ask for a screenshot as proof <br />
                                    that you are registered.
                                    <br />
                                    <br />
                                    Upload a screenshot clearly showing your name and the VOG attribute as proof.
                                </h4>
                            ):switcher===4?(
                                <h4>
                                    To work as a self-employed person, a business liability insurance is required. We ask for a copy of the policy as proof.
                                    <br />
                                    <br />
                                    <br />
                                    Upload a digital PDF or good quality scan of your policy as proof of insurance.
                                </h4>
                            ):(
                                <></>
                            )
                        }
                        <h4>
                            <strong>
                                Upload other file 
                            </strong>
                        </h4>
                        <div className="image">
                            {
                                switcher===0?(
                                    <div className="image-field">
                                        <div>
                                            {
                                                link?(
                                                    link?.includes(".pdf")?(
                                                        <embed src={link} alt="" name="id_card"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    ):(
                                                        <img src={link} alt="" name="id_card"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    )
                                                ):(
                                                    <img src="" alt="" />
                                                )
                                            }
                                        </div>
                                        <p ref={ref=>ref!==null&&(filenameRef.current["id_card"]=ref)} name="id_card">
                                            {link?.split("/")?.at(-1)}
                                        </p>
                                        {
                                            link?.length>0&&(
                                                <p onClick={()=>delete_file("documents","id_card",link,"id",get_documents.data?.id)} className="delete">
                                                    delete <BsTrashFill/>
                                                </p>
                                            )
                                        }
                                        <input type="file" name="id_card" id="" onChange={(e)=>handle_input_change(e)}/>
                                        {add_documents.response&&(<p className={`${add_documents.response[0]?.status?"success":"fail"}`}>{add_documents.response[0]?.message}</p>)}
                                    </div>
                                ):switcher===1?(
                                    <div className="image-field">
                                        <div>
                                            {
                                                link?(
                                                    link?.includes(".pdf")?(
                                                        <embed src={link} alt="" name="chamber_of_commerce_registration"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    ):(
                                                        <img src={link} alt="" name="chamber_of_commerce_registration"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    )
                                                ):(
                                                    <img src="" alt="" />
                                                )
                                            }
                                        </div>
                                        <p ref={ref=>ref!==null&&(filenameRef.current["chamber_of_commerce_registration"]=ref)} name="chamber_of_commerce_registration">
                                            {link?.split("/")?.at(-1)}
                                        </p>
                                        {
                                            link?.length>0&&(
                                                <p onClick={()=>delete_file("documents","chamber_of_commerce_registration",link,"id",get_documents.data?.id)} className="delete">
                                                    delete <BsTrashFill/>
                                                </p>
                                            )
                                        }
                                        <input type="file" name="chamber_of_commerce_registration" id="" onChange={(e)=>handle_input_change(e)}/>
                                        {add_documents.response&&(<p className={`${add_documents.response[0]?.status?"success":"fail"}`}>{add_documents.response[0]?.message}</p>)}
                                    </div>
                                ):switcher===2?(
                                    <div className="image-field">
                                        <div>
                                            {
                                                link?(
                                                    link?.includes(".pdf")?(
                                                        <embed src={link} alt="" name="declaration_of_conduct"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    ):(
                                                        <img src={link} alt="" name="declaration_of_conduct"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    )
                                                ):(
                                                    <img src="" alt="" />
                                                )
                                            }
                                        </div>
                                        <p ref={ref=>ref!==null&&(filenameRef.current["declaration_of_conduct"]=ref)} name="declaration_of_conduct">
                                            {link?.split("/")?.at(-1)}
                                        </p>
                                        {
                                            link?.length>0&&(
                                                <p onClick={()=>delete_file("documents","declaration_of_conduct",link,"id",get_documents.data?.id)} className="delete">
                                                    delete <BsTrashFill/>
                                                </p>
                                            )
                                        }
                                        <input type="file" name="declaration_of_conduct" id="" onChange={(e)=>handle_input_change(e)}/>
                                        {add_documents.response&&(<p className={`${add_documents.response[0]?.status?"success":"fail"}`}>{add_documents.response[0]?.message}</p>)}
                                    </div>
                                ):switcher===3?(
                                    <div className="image-field">
                                        <div>
                                            {
                                                link?(
                                                    link?.includes(".pdf")?(
                                                        <embed src={link} alt="" name="persons_register_childcare"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    ):(
                                                        <img src={link} alt="" name="persons_register_childcare"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    )
                                                ):(
                                                    <img src="" alt="" />
                                                )
                                            }
                                        </div>
                                        <p ref={ref=>ref!==null&&(filenameRef.current["persons_register_childcare"]=ref)} name="persons_register_childcare">
                                            {link?.split("/")?.at(-1)}
                                        </p>
                                        {
                                            link?.length>0&&(
                                                <p onClick={()=>delete_file("documents","persons_register_childcare",link,"id",get_documents.data?.id)} className="delete">
                                                    delete <BsTrashFill/>
                                                </p>
                                            )
                                        }
                                        <input type="file" name="persons_register_childcare" id="" onChange={(e)=>handle_input_change(e)}/>
                                        {add_documents.response&&(<p className={`${add_documents.response[0]?.status?"success":"fail"}`}>{add_documents.response[0]?.message}</p>)}
                                    </div>
                                ):(
                                    <div className="image-field">
                                        <div>
                                            {
                                                link?(
                                                    link?.includes(".pdf")?(
                                                        <embed src={link} alt="" name="insurance_picture"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    ):(
                                                        <img src={link} alt="" name="insurance_picture"ref={(ref)=>ref!==null&&(imageRef.current[ref.name]=ref)} />
                                                    )
                                                ):(
                                                    <img src="" alt="" />
                                                )
                                            }
                                        </div>
                                        <p ref={ref=>ref!==null&&(filenameRef.current["insurance_picture"]=ref)} name="insurance_picture">
                                            {link?.split("/")?.at(-1)}
                                        </p>
                                        {
                                            link?.length>0&&(
                                                <p onClick={()=>delete_file("documents","insurance_picture",link,"id",get_documents.data?.id)} className="delete">
                                                    delete <BsTrashFill/>
                                                </p>
                                            )
                                        }
                                        <input type="file" name="insurance_picture" id="" onChange={(e)=>handle_input_change(e)}/>
                                        {add_documents.response&&(<p className={`${add_documents.response[0]?.status?"success":"fail"}`}>{add_documents.response[0]?.message}</p>)}
                                    </div>
                                )
                            }
                            {
                                link?.length>0&&(
                                    <div className="download-button" style={{flexDirection:"row"}}>
                                        <a href={link} download>
                                            <HiArrowDown style={{overflow:"visible"}}/>
                                            <h4>
                                                DOWNLOAD
                                            </h4>
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                        <div className="back-save">
                            {
                                switcher>0 &&(
                                    <button className="back" onClick={()=>setSwitcher(switcher-1)}>
                                        {"<<"}
                                    </button>
                                )
                            }
                            <button className="save" style={{width:"220px"}}  onClick={()=>setSwitcher(switcher<4?switcher+1:0)}>
                                SAVE AND CONTINUE
                            </button>
                            {
                                switcher<4&&(
                                    <button className="back" onClick={()=>setSwitcher(switcher+1)}>
                                        {">>"}
                                    </button>
                                )
                            }
                        </div>
                        <div className="form-bottom-notes">
                            {
                                switcher===1?(
                                    <h4>
                                        <b>
                                            Not registered with the Chamber of Commerce? <br />
                                            <br />

                                        </b>
                                        To start working as a self-employed person you must be registered with the Chamber of Commerce, <Link to="">Click here </Link> to register as <br />
                                        a self-employed person.
                                    </h4>
                                ):switcher===2?(
                                    <h4>
                                        <b>
                                            How can I apply for a Certificate of Good Conduct? <br />
                                        </b>
                                        To request a certificate of conduct, press the button below and we will request a Certificate of Conduct for you.
                                        <div className="back-save">
                                            <button className="save" style={{width:"150px"}}>
                                                Apply for VOG
                                            </button>
                                        </div>
                                    </h4>
                                ):switcher===3?(
                                    <h4>
                                        If you are not yet registered in the Childcare Persons Register, <Link to="">Click here </Link> to register (free of charge)
                                    </h4>
                                ):switcher===4?(
                                    <h4>
                                        If you are not yet registered in the Childcare Persons Register, <Link to="">Click here </Link> to register (free of charge)
                                    </h4>
                                ):(
                                    <></>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="back-save">
                    <Link to="/dashboard/settings" 
                        state={message}
                        ref = {ref=>ref!==null&&(linkRef.current = ref)}
                    >
                    </Link>
                    <Link to="/dashboard/settings">
                        <button className="back" >Back</button>
                    </Link>
                    {/* <button className="save" onClick={()=>upload_documents()}>Save</button> */}
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
