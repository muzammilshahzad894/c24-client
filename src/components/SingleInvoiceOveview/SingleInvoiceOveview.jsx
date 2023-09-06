import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose} from 'react-icons/ai'
import {BsExclamationTriangle} from 'react-icons/bs'
import {MdOutlineDone} from 'react-icons/md'
import {CgDanger} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import { add_invoices_actions, delete_invoices_action, delete_invoices_actions, delete_invoices_files_actions, get_invoices_actions } from '../../state/Actions/UserAction';
import "./singleInvoiceOverview.scss"
import { HiArrowDown } from 'react-icons/hi'

export default function SingleInvoiceOverview({card}) {
    const [completeInvoiceFile, setCompleteInvoiceFile] = useState([]);
    const [SignedTimesheetFile, setSignedTimesheetFile] = useState([])
    const [showSaveReminder, setShowSaveReminder] = useState(false)
    const [toggleUploadFileState, settoggleUploadFileState] = useState(card.invoice_signed_timesheet&&card.invoice_signed_timesheet.length>0)
    const [showAddAttention, setShowAddAttention] = useState(card.attention===1);
    const [status, setstatus] = useState();
    const dataRef = useRef([]);
    const inputRef = useRef([]);
    const downloadTimesheet = useRef([]);
    const downloadSignedTimesheet = useRef([]);
    const dispatch = useDispatch();
    const data  = new FormData();
    const user_info = useSelector(state=>state.user_info);
    const login_management = useSelector(state=>state.login_management);

    console.log(card.status);
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    const showFileInputs = (name)=>{
        inputRef.current[name].click();
    }

    const handleFileChange = e =>{
        if(e.target.name==="complete_invoice"){
            setCompleteInvoiceFile(completeInvoiceFile=>{
                return [...completeInvoiceFile,e.target.files[0]];
            })
        }else{
            setSignedTimesheetFile(SignedTimesheetFile=>{
                return [...SignedTimesheetFile,e.target.files[0]];
            });
            setstatus("Submitted");
            setShowAddAttention(false)
            setShowSaveReminder(true)
            settoggleUploadFileState(true)
        }
       // pRef.current[e.target.name].innerHTML = `<li> ${e.target.files[0].name} </li>`;
    
    }
    const deleteFile = (name,key)=>{
        if(name === "complete_invoice"){
            setCompleteInvoiceFile(completeInvoiceFile.filter((item,index)=>index!==key));
        }else{
            setSignedTimesheetFile(SignedTimesheetFile.filter((item,index)=>index!==key));
            settoggleUploadFileState(false);
            setShowAddAttention(false)
            if(SignedTimesheetFile.length===0){
                setShowSaveReminder(false)
            }
        }
    }
    const delete_file_handler=(name,id)=>{
        console.log(name,id)
        dispatch(delete_invoices_files_actions(name,id,user_info.user.token))
        dispatch(get_invoices_actions(user_info.user?.token))
    }
    //save invoice data
    const saveData = ()=>{
        let saved_data={};
        dataRef.current.map(item=>{
            saved_data[item.name] = item.value;                
            return item;
        })
        
        saved_data.id = card.id;
        console.log(SignedTimesheetFile)
        completeInvoiceFile.map(item=>data.append("complete_invoice",item))
        SignedTimesheetFile.map(item=>data.append("signed_timesheet",item));
        !saved_data.status && (saved_data.status = "Submitted");

        data.set("info",JSON.stringify(saved_data));
        dispatch(add_invoices_actions(data,user_info.user.token));
        dispatch(get_invoices_actions(user_info.user?.token))
    }

    //delete invoice 
    const deleteInvoice = ()=>{
        dispatch(delete_invoices_action(card.id,user_info.user?.token))
        dispatch(get_invoices_actions(user_info.user?.token))
    }

    console.log(card);
    return (
    <div className='timecard-wrapper'>
        <div className="timecard-row" style={{gridTemplateColumns:login_management.message?.admin?"repeat(7,1fr)":"repeat(6,1fr)"}}>
            <div className="timecard-company-input">
                {
                    login_management.message?.admin?(
                        <input type="text" placeholder='Company 1' name='company_name' defaultValue={card.company_name} ref={ref=>ref!=null&&(dataRef.current.push(ref))}/>
                    ):(
                        <p>
                            {card.company_name}
                        </p>
                    )
                }
            </div>
            <div className="timecard-company-input">
                {
                    login_management.message?.admin?(
                        <input type="text" placeholder='Company 1' name='invoice_amount' defaultValue={card.invoice_amount} ref={ref=>ref!=null&&(dataRef.current.push(ref))}/>
                    ):(
                        <p>
                            {card.invoice_amount}
                        </p>
                    )
                }
            </div>
            <div className="timecard-week">
                {/* <select name="week" id="" ref={ref=>ref!=null&&(dataRef.current.push(ref))}>
                    {a.map((item,key)=>(
                        <option key={key} value={new Date().getFullYear() + '-' +item} selected={(new Date().getFullYear() + '-' +item===card.week)}>{new Date().getFullYear() + '-' +item}</option>
                        ))}
                </select> */}
                {
                    login_management.message?.admin?(
                        <input type="week" name="week" id="" defaultValue={card.week}  ref={ref=>ref!=null&&(dataRef.current.push(ref))}/>
                    ):(
                        <p>
                            Week {card.week?.replace("W","")?.split("-").reverse().join("-")}
                        </p>
                    )
                }
                {/* <AiTwotoneCalendar/> */}
            </div>
            <div className="timecard-status">
                {   
                login_management.message?.admin?(
                    <div style={{display:"block"}}>
                        <input type="text" defaultValue={card.status} name="status" ref={ref=>ref!=null&&(dataRef.current.push(ref))} />
                    </div>
                ):(
                    <div className='timecard-status-user' style={{width:"auto"}}>
                        <h3>
                            {card.status}
                        </h3>
                        <h3 className='status'>
                            {
                                (card.status==="Rejected"||card.status==="reject")?(<AiOutlineClose className='pending'/>):(<MdOutlineDone className='done'/>)
                            }
                        </h3> 
                    </div>
                )
                }
                {/*
                    toggleUploadFileState?(
                        <div className={`submitted ${showAddAttention&&"red-flag"}`}>
                            <div style={{border:login_management?.message?.admin?"1px #000 solid":"none",justifyContent:login_management?.message?.admin?"space-between":"center"}}>
                            </div>
                        </div>

                    )
                    :(
                        <>  
                            {/* <h3>
                                {card.status}
                            </h3>
                            <h3 className="status">
                                <AiOutlineClose className='pending'/>
                            </h3> 
                            <div className='blank_'>
                                <p>
                                    No files were uploaded yet
                                </p>
                            </div>
                        </>
                    )
                */}
            </div>
            <div className="timecard-download">
                <ul name="timesheet" style={{listStyle:"none"}} >
                    {
                        login_management.message?.admin?(
                            completeInvoiceFile.length>0&&(
                                completeInvoiceFile.map((item,key)=>(
                                        <div key={key}>
                                            <li>
                                                {item.name?.length>15?item.name.split(".")[0].slice(0,5)+"..."+item.name.slice(item.name.length-5):item.name}
                                            </li>
                                            <button onClick={()=>deleteFile("complete_invoice",key)}>Delete</button>
                                        </div>
                                ))
                            )
                        ):(
                            card.invoice_complete_invoice?.map((elt,key)=>(
                                <li key={key}>
                                    <a href={elt.path} download style={{display:"none"}} ref={ref=>ref!==null&&(downloadTimesheet.current.push(ref))}>
                                        {elt?.path?.split("/")[3]}
                                    </a>
                                </li>
                            ))
                        )
                    }
                    {
                        !login_management.message?.admin&&
                        (card.invoice_complete_invoice?.length>0?(
                            <div className="download-button" style={{flexDirection:"row"}} onClick={()=>downloadTimesheet.current.map(item=>item.click())}>
                                <HiArrowDown style={{overflow:"visible"}}/>
                                <h4>
                                    DOWNLOAD
                                </h4>
                            </div>
                        ):(
                            <div className="download-button" style={{flexDirection:"row"}} >
                                <HiArrowDown style={{overflow:"visible"}}/>
                                <h4>
                                    No downloads available
                                </h4>
                            </div>
                        ))
                    }
                </ul>
                {
                    login_management?.message?.admin&&(
                        <div>
                            <button className='upload' onClick={()=>showFileInputs("complete_invoice")}>
                                Upload
                            </button>
                            <input type="file" accept='.pdf' name="complete_invoice" style={{display:"none"}} id="" ref={ref=>ref!==null&&(inputRef.current["complete_invoice"]=ref)} onChange={e=>handleFileChange(e)} />
                            <div className="download-files">
                                {
                                    card?.invoice_complete_invoice?.map(item=>(
                                        <>
                                            <a href={item.path} download>
                                                {item?.path?.split("/")[3]?.length>15?item.path?.split("/")[3]?.slice(0,8)+"..."+item.path?.split("/")[3]?.slice(item.path?.split("/")[3].length - 5):item.path?.split("/")[3]}
                                            </a>
                                            <button onClick={()=>delete_file_handler("invoice_complete_invoice",item.id)}>Delete</button>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="timecard-upload-signed-timesheet">
                <ul name="signed_timesheet" style={{listStyle:"none"}}  >
                    {
                        login_management.message?.admin?(
                            SignedTimesheetFile.length>0&&(
                                SignedTimesheetFile.map((item,key)=>(
                                    <div key = {key}>
                                        <li>
                                            {item.name?.length>15?item.name.split(".")[0].slice(0,5)+"..."+item.name.slice(item.name.length-5):item.name}
                                        </li>
                                        <button onClick={()=>deleteFile("signed_timesheet",key)}>Delete</button>
                                    </div>
                                ))
                            )
                        ):(
                            card.invoice_signed_timesheet?.map((elt,key)=>(
                                <li key={key}>
                                    <a href={elt.path} download style={{display:"none"}} ref={ref=>ref!==null&&(downloadSignedTimesheet.current.push(ref))}>
                                        {elt?.path?.split("/")[3]?.length>15?elt?.path?.split("/")[3].slice(0,8)+"..."+elt?.path?.split("/")[3]?.slice(elt?.path?.split("/")[3]?.length - 5):elt?.path?.split("/")[3]}
                                    </a>
                                </li>
                            ))
                        )
                    }
                    {
                        !login_management.message?.admin&&
                        (
                            card.invoice_signed_timesheet?.length>0?(
                            <div className="download-button" style={{flexDirection:"row"}} onClick={()=>downloadTimesheet.current.map(item=>item.click())}>
                                <HiArrowDown style={{overflow:"visible"}}/>
                                <h4>
                                    DOWNLOAD
                                </h4>
                            </div>
                        ):(
                            <div className="download-button" style={{flexDirection:"row"}}>
                                <HiArrowDown style={{overflow:"visible"}}/>
                                <h4>
                                    No downloads available
                                </h4>
                            </div>
                        )
                        )
                    }
                </ul>
                {
                    login_management.message?.admin&&(
                        <div>
                            {
                                card.invoice_signed_timesheet?.map(item=>(
                                    <div>
                                        <a href={item.path} download target="_blank" rel="noreferrer">
                                            {item?.path?.split("/")[3]?.length>15?item.path?.split("/")[3]?.slice(0,8)+"..."+item.path?.split("/")[3]?.slice(item.path?.split("/")[3].length - 5):item.path?.split("/")[3]}
                                        </a>
                                        <button onClick={()=>delete_file_handler("invoice_signed_timesheet",item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                ))
                            }
                            <button className='upload' onClick={()=>showFileInputs("signed_timesheet")}>
                                Upload
                            </button>
                            <input type="file" accept='.pdf' name="signed_timesheet" id="" style={{display:"none"}} ref={ref=>ref!==null&&(inputRef.current["signed_timesheet"]=ref)} onChange={e=>handleFileChange(e)} />
                        </div>
                    )
                }
                    {
                        showSaveReminder&&(
                            <div className='save-button-reminder'>
                                <BsExclamationTriangle/>
                                <p>
                                    Don't forget to press
                                    the save button when 
                                    you have uploaded
                                    the document.
                                    Otherwise the file will not be saved.
                                </p>
                            </div>
                        )
                    }
            </div>
            {
                login_management.message?.admin&&(
                    <div className="timecard-save">
                    {
                        login_management.message?.admin&&(
                            <>
                                <button onClick={()=>saveData()}>
                                    Save
                                </button>
                                <button onClick={()=>deleteInvoice()} className='delete'>
                                    Delete
                                </button>
                            </>
                        )
                    }
                    </div>
                )
            }
        </div>
    </div>
  )
}
