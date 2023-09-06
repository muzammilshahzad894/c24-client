import React, { useEffect } from 'react'
import "./singleContract.scss"
import {AiOutlineFileImage} from 'react-icons/ai'
import {IoIosArrowDown} from 'react-icons/io'
import {GrDocumentPdf, GrStatusGood} from 'react-icons/gr'
import {HiArrowDown} from 'react-icons/hi';
import {FiAlertTriangle} from 'react-icons/fi';
import { FaFileSignature, FaRegBuilding, FaRegFileAlt, FaRegUserCircle } from 'react-icons/fa'
import { BsCheckCircle, BsClock, BsFileText, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { add_contract_action, get_contract_action } from '../../state/Actions/UserAction'
import { useState } from 'react'

export default function SingleContract({contract}) {
    //let filename = file.name?file.name.replace("/images/documents/",""):"";
    const login_management = useSelector(state=>state.login_management);
    const user_info = useSelector(state=>state.user_info)
    let isAdmin = login_management.message?.admin;
    const threePartyAgreementRef = useRef();
    const signedAgreementRef = useRef();
    const agreement2SignaturesRef = useRef();
    const three_agreement_download = useRef([]);
    const agreement_2_signatures_download = useRef([]);
    const info = useRef({state:contract.state,week:"",name_freelancer:"",name_company:""});
    const [files,setFiles] = useState({three_party_agreement:contract.three_party_agreement||[],signed_agreement:contract.signed_agreement||[],agreement_2_signatures:contract.agreement_2_signatures||[]});
    const [deleteFiles, setDeleteFiles] = useState({three_agreement_download:[],signed_agreement:[],agreement_2_signatures:[]})
    const [a, setA] = useState(false)
    const dispatch = useDispatch();
    const [option, setOption] = useState(contract.state)

    useEffect(()=>{
        setOption(contract.state);
    },[contract.state])
    useEffect(()=>{
        info.current.state = option;
    },[option])

    useEffect(()=>{
        setFiles({three_party_agreement:contract.three_party_agreement||[],signed_agreement:contract.signed_agreement||[],agreement_2_signatures:contract.agreement_2_signatures||[]})
    },[contract.agreement_2_signatures, contract.signed_agreement, contract.three_party_agreement])
    useEffect(()=>{
        if(deleteFiles.signed_agreement?.length>0){
            addContract()            
        }
    },[deleteFiles.signed_agreement])


    const addContract = ()=>{
        let formdata = new FormData();
        if(contract.id){
            info.current.id = contract.id;
        }
        if(user_info.user.account_type==="freelancer"){
            info.current.name_freelancer = null;
        }
        formdata.set("info",JSON.stringify(info.current));
        for(const [key,value] of Object.entries(files)){
            value.map((item,idx)=>formdata.set(key+"-"+item?.name+idx,item))
        }
        formdata.set("delete_files",JSON.stringify(deleteFiles))
        //formdata.set("files",JSON.stringify(files));
        dispatch(add_contract_action(formdata,user_info.user.token))
        dispatch(get_contract_action(user_info.user.token))
    }
    
    const handleAddingFiles = (name,file)=>{
        let data = files;
        data[name]?.push(file);
        setFiles(data)   
        setA(!a)
        addContract()
    }
    console.log(deleteFiles)
  return (
    <div className='single-contract'>
        <div className="signle-contract-elements">
            <div className="single-contract-header-element">
                <div className="single-contract-header-element-header">
                    {
                        user_info.user?.account_type==="client"?(
                            <>
                                <FaRegUserCircle/>
                                <div>
                                    <p>
                                        Name freelancer
                                    </p>
                                    <p>
                                        Name company
                                    </p>
                                </div>
                            </>
                        ):(
                            <>
                                <FaRegBuilding/>
                                <div>
                                    <p>
                                        Client
                                    </p>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="single-contract-header-element-info">
                    {
                        isAdmin?(
                            <>
                                {user_info.user?.account_type==="client"&&(<input type="text" maxLength={250} defaultValue={contract.name_freelancer} onChange={e=>info.current.name_freelancer = e.target.value} />)}
                                <input type="text" maxLength={250} defaultValue={contract.name_company} onChange={e=>info.current.name_company = e.target.value} />
                            </>
                        ):(
                            <>
                                <p>
                                    {contract.name_freelancer} 
                                </p>
                                <p>
                                    {contract.name_company}
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="single-contract-header-element">
                <div className="single-contract-header-element-header">
                    <BsClock/>
                    <div>
                        <p>
                            Week
                        </p>
                    </div>
                </div>
                <div className="single-contract-header-element-info">
                    {
                        isAdmin?(
                            <input type="week" name="" id="" defaultValue={contract.week} onChange={e=>info.current.week = e.target.value} />
                        ):(
                            <p>
                                {contract.week?.replace("W","")}
                            </p>
                        )
                    }
                </div>
            </div>
            <div className="single-contract-header-element">
                <div className="single-contract-header-element-header">
                    <FaRegFileAlt style={{fontSize:"40px"}}/>
                    <div>
                        <span>
                            Download here The three-party agreement for mediation
                        </span>
                    </div>
                </div>
                <div className="single-contract-header-element-info">
                    {
                        isAdmin?(
                            files.three_party_agreement?.map((item,id)=>{
                                let elt = {name:item?.name||item?.split("/")[3]}
                                return(
                                    <p>
                                        {elt.name?.length>15?elt.name.split(".")[0].slice(0,5)+"..."+elt.name.slice(elt.name.length - 6):elt.name}
                                        {/* <BsTrash style={{color:"darkred",fontSize:"14px",cursor:"pointer"}} onClick={()=>setFiles({...files,signed_agreement:files.signed_agreement.filter((elt,idx)=>idx!==id)})}/> */}
                                    </p>
                                )
                        })
                        ):(
                            <div>
                                {
                                    files.three_party_agreement?.map((item,id)=>{
                                        return(
                                            <a href={!item?.name&&item} download style={{display:"none"}} ref={ref=>ref!==null&&(three_agreement_download.current.push(ref))}>
                                                {item?.split("/")[3].name?.length>15?item?.split("/")[3].name.split(".")[0].slice(0,5)+"..."+item?.split("/")[3].name.slice(item?.split("/")[3].name.length - 6):item?.split("/")[3].name}
                                                {/* <BsTrash style={{color:"darkred",fontSize:"14px",cursor:"pointer"}} onClick={()=>setFiles({...files,signed_agreement:files.signed_agreement.filter((elt,idx)=>idx!==id)})}/> */}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        isAdmin?(
                            <div className="upload-button" onClick={()=>threePartyAgreementRef.current.click()}>
                                <button>
                                    Upload
                                </button>
                            </div>
                        ):(
                        <div className="download-button" onClick={()=>three_agreement_download.current.map(item=>item.click())}>
                            <HiArrowDown/>
                            <h4>
                                DOWNLOAD
                            </h4>
                        </div>
                        )
                    }
                </div>
            </div>
            <div className="single-contract-header-element">
                <div className="single-contract-header-element-header">
                    <FaFileSignature/>
                    <div>
                        <span>
                            Upload your signed agreement here
                        </span>
                    </div>
                </div>
                <div className="single-contract-header-element-info">
                    {
                        isAdmin?(
                            files.signed_agreement?.map((item,id)=>{
                                let elt = {name:item?.name||item?.split("/")[3]}
                                return(
                                    <p>
                                        {elt.name?.length>15?elt.name.split(".")[0].slice(0,5)+"..."+elt.name.slice(elt.name.length - 6):elt.name}
                                        <button style={{color:"rgb(255, 70, 70)",cursor:"pointer",marginLeft:"10px",background:"white",border:"1px #ccc solid",borderRadius:"6px"}} onClick={()=>{setFiles({...files,signed_agreement:files.signed_agreement.filter((elt,idx)=>idx!==id)});setDeleteFiles({...deleteFiles,signed_agreement:[...deleteFiles.signed_agreement,item]})}}>
                                            Delete
                                        </button>
                                    </p>
                                )
                                })
                        ):(
                            <div style={{display:"flex",flexDirection:"column"}}>
                                {
                                    files.signed_agreement?.map((item,id)=>{
                                        let elt = {name:item?.name||item}
                                        return(
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <a href={!item?.name&&item} download style={{marginRight:"5px"}} >
                                                    {elt.name?.length>15?elt.name.split(".")[0].slice(0,5)+"..."+elt.name.slice(elt.name.length - 6):elt.name}
                                                </a>
                                                <button style={{color:"rgb(255, 70, 70)",cursor:"pointer",marginLeft:"10px",background:"white",border:"1px #ccc solid",borderRadius:"6px"}} onClick={()=>{setFiles({...files,signed_agreement:files.signed_agreement.filter((elt,idx)=>idx!==id)});setDeleteFiles({...deleteFiles,signed_agreement:[...deleteFiles.signed_agreement,item.name||item]});}}>
                                                    Delete
                                                </button>
                                            </div>
                                        )
                                        })
                                }
                            </div>
                        )
                    }
                    <div className="upload-button" onClick={()=>signedAgreementRef.current.click()}>
                        <button>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            <div className="single-contract-header-element">
                <div className={`single-contract-header-element-header ${option ==="option1"?"danger":"success"}`}>
                    {
                        option==="option1"?(
                            <>
                                <FiAlertTriangle/>
                                <div>
                                    <h3>
                                        Attention
                                    </h3>
                                </div>
                            </>
                        ):(
                            <>
                                <BsCheckCircle style={{color:"#35711d",height:"120px",fontSize:"90px"}}/>
                            </>
                        )
                    }
                </div>
                <div className={`single-contract-header-element-info ${option ==="option1"?"danger":"success"}`}>
                    {
                        isAdmin&&(
                            <select name="state" id="" onChange={e=>setOption(e.target.value)}>
                                <option value="option1" selected={"option1" === contract.state}>
                                    Option 1
                                </option>
                                <option value="option2" selected={"option2" === contract.state}>
                                    Option 2
                                </option>
                            </select>
                        )
                    }
                    {
                        option==="option1"?(
                            <p>
                                Please note that your company has not yet uploaded and signed the agreement
                            </p>
                        ):(
                            <p>
                                The agreement is signed by your company and approved by Curant24.
                                We can now do buisness together.
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="single-contract-download-signed-agreement">
            <div>
                <BsFileText/>
            </div>
            <div className='single-contract-download-signed-agreement-download'>
                <div>
                    <p>
                        Here you can download the agreement
                    </p>
                    <p>
                        including the 2 signatures of your company and Curant24
                    </p>
                </div>
                <div style={{display:"flex",flexDirection:"row"}}>
                    {
                        files.agreement_2_signatures?.length>0?(
                            <>
                                <div style={{display:"flex",alignItems:"center",flexDirection:"row",marginBottom:"5px"}} onClick= {()=>agreement_2_signatures_download.current.map(item=>item.click())}>
                                    <div className="download-button">
                                        <HiArrowDown/>
                                        <h4>
                                            DOWNLOAD
                                        </h4>
                                    </div>
                                </div>
                            
                            </>
                        ):(
                            <>
                                <div style={{display:"flex",alignItems:"center",flexDirection:"row",marginBottom:"5px"}}>
                                    <div className="download-button">
                                        <HiArrowDown/>
                                        <h4>
                                            No downloads available
                                        </h4>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        isAdmin&&(
                            <div className="upload-button" onClick={()=>agreement2SignaturesRef.current.click()}>
                                <button>
                                    Upload
                                </button>
                            </div>
                        )
                    }
                    {
                        isAdmin&&(  
                        <div className="download-button" style={{width:"80px",alignItems:"center",marginLeft:"6%"}} onClick={()=>addContract()}>
                            <h4>
                                Save
                            </h4>
                        </div>
                        )
                    }
                </div>
            </div>
            <div style={{marginLeft:"10px"}}>
                {files.agreement_2_signatures.map((item,id)=>{
                    let elt = {name:item.name?item.name:item?.split("/")[3]}
                    return(
                    <div style={{display:"flex",alignItems:"center",margin:"5px 0"}}>
                        <a href={item?.name||item} download style={{display:isAdmin?"block":"none"}} ref={ref=>ref!=null&&(agreement_2_signatures_download.current.push(ref))} >
                            {elt.name?.length>15?elt.name.split(".")[0].slice(0,5)+"..."+elt.name.slice(elt.name.length - 6):elt.name}
                        </a>
                        {
                            isAdmin&&(
                                <button style={{color:"rgb(255, 70, 70)",cursor:"pointer",marginLeft:"10px",background:"white",border:"1px #ccc solid",borderRadius:"6px"}} onClick={()=>{setFiles({...files,agreement_2_signatures:files.agreement_2_signatures.filter((elt,idx)=>idx!==id)});setDeleteFiles({...deleteFiles,agreement_2_signatures:[...deleteFiles.agreement_2_signatures,item]})}}>
                                    Delete
                                </button>
                            )
                        }
                    </div>
                )})}
            </div>
        </div>
        {/* <div className="single-contract-file">
            <div className="single-contract-file-icon">
                {
                    filename.split(".")[1]==="pdf"?<GrDocumentPdf className='pdf'/>:<AiOutlineFileImage className='image'/>
                }
                
            </div>
            <div className='single-contract-file-info'>
                <h3>
                    {filename}
                </h3>
                <span>
                    Contract document Candidate
                </span>
            </div>
        </div>
        <div className="single-contract-tools">
            <div className="single-contract-arrow-down">
                <IoIosArrowDown/>
            </div>
            <div className="single-contract-open-button">
                <a href={file.name} target="_blank" rel="noreferrer">
                    <button>
                        Open
                    </button>
                </a>
            </div>
        </div> */}
        <input type="file" style={{display:"none"}} ref={ref=>ref!==null&&(threePartyAgreementRef.current = ref)}  onChange={e=>handleAddingFiles("three_party_agreement",e.target.files[0])}/>
        <input type="file" style={{display:"none"}} ref={ref=>ref!==null&&(signedAgreementRef.current = ref)}  onChange={e=>handleAddingFiles("signed_agreement",e.target.files[0])}/>
        <input type="file" style={{display:"none"}} ref={ref=>ref!==null&&(agreement2SignaturesRef.current = ref)}  onChange={e=>handleAddingFiles("agreement_2_signatures",e.target.files[0])}/>
    </div>
  )
}
