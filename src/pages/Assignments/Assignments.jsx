import React, { useEffect, useState } from 'react'
import { BsBell, BsPen, BsSearch } from 'react-icons/bs';
import { CgCalendar, CgClose } from 'react-icons/cg';
import { GoLocation } from 'react-icons/go';
//import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { getPersonalInfo, get_all_assignements_action } from '../../state/Actions/UserAction';

import "./assignements.scss"
export default function Assignments() {
    const user_info = useSelector(state=>state.user_info);
    const get_all_assignements = useSelector(state=>state.get_all_assignements);
    const get_personal = useSelector(state=>state.get_personal)
    const [all_assignements, setAllAssignements] = useState([])
    //week
    const [nextWeek, setNextWeek] = useState(new Date())
    const [prevWeek, setPrevWeek] = useState(new Date())
    const [currWeek, setCurrWeek] = useState(new Date())
    const [daysOfWeek, setDaysOfWeek] = useState(new Date())
    const [changed, setChanged] = useState(false)
    const date = new Date();
    const [currDay, setCurrDay] = useState(date.getDate())
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(get_all_assignements_action(user_info.user.token));
        dispatch(getPersonalInfo(user_info.user.token))
    },[dispatch, user_info.user.token]);


    /*
    useEffect(()=> {
        let arr=[],temp=[]; 
        if(get_all_assignements.data?.length>0){
            get_all_assignements.data.map((item)=>{
                if(arr.indexOf(item.assignement_id)===-1){
                    arr.push(item.assignement_id)
                    temp.push(item)
                }
                return item;
            })
            setAllAssignements(temp.filter(item=>new Date(item.starting_date).getTime()>=currWeek.getTime()&&new Date(item.starting_date).getTime()<=nextWeek.getTime()))
        }
    },[currWeek, get_all_assignements,daysOfWeek])
    useEffect(()=>{        
        nextWeek.setDate(currDay+7)
        prevWeek.setDate(currDay-7)
        setDaysOfWeek(new Date(currWeek))
    },[])*/
    useEffect(()=>{
        if(get_all_assignements.data){
            setAllAssignements(get_all_assignements.data)
        }
    },[get_all_assignements])
     const sortByDate =(type)=>{
        if(type==="oldest first"){
            all_assignements.sort((a,b)=>new Date(a.starting_date)-new Date(b.starting_date))
        }else{
            all_assignements.sort((a,b)=>new Date(a.starting_date)-new Date(b.starting_date)).reverse()
        }
        setChanged(!changed)
    }

    const searchByText =(text)=>{
        text = text.toLowerCase();
        all_assignements.sort((a,b)=>{
            return a.job_name.replace(text,"")<b.job_name.replace(text,"")?-1:a.job_name.replace(text,"")>b.job_name.replace(text,"")?1:0;
        })
        setChanged(!changed)
    }

    const sortByStatus=(text)=>{
        //text = text.toLowerCase();

        setAllAssignements(get_all_assignements.data?.filter(item=>item.status===text));
        //all_assignements.sort((a,b)=>a.status.toLowerCase().replace(text,"").length-b.status.toLowerCase().replace(text,"").length);
        setChanged(!changed);
    }
    /*
    //to navigate through weeks
    const handleWeek = (input)=>{ 
        if(input === "prev"){
            nextWeek.setDate(nextWeek.getDate()-7)  
            currWeek.setDate(currWeek.getDate()-7);
            prevWeek.setDate(prevWeek.getDate()-7)
            setDaysOfWeek(new Date(currWeek))
        }else if(input === "next"){
            nextWeek.setDate(nextWeek.getDate()+7)  
            currWeek.setDate(currWeek.getDate()+7);
            prevWeek.setDate(prevWeek.getDate()+7)
            setDaysOfWeek(new Date(currWeek))
        }
    }*/
    if(get_personal.user?.account_type==="freelancer"){
        return <Navigate to="/dashboard"/>;
    }
    return (
        get_all_assignements.loading?(<LoadingBox big/>):(
        <div className='assignements'>
            <DashboardBar/>
            <div className="assignements-header">
                <h1> My Assignements </h1>
            </div>
            {
                location&&location.state&&location.state.message&&(
                        <Link to=""state={{}}>
                            <MessageBox message={location.state.message}/>
                        </Link>
                )
            }
            <div className="assignements-content">
                <div className="assignements-search">
                    <div>
                        <input type="text" name="search_by_name" placeholder='Search within results' onChange={e=>searchByText(e.target.value)}/>
                        <BsSearch className='search'/>
                    </div>
                    <div>
                        <select name="status" id="" onChange={e=>e.target.value!=="status"&&sortByStatus(e.target.value)}>
                            <option value="status">Status...</option>
                            <option value="Paused">Paused</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Assignement Placed">Assignement Placed</option>
                        </select>
                    </div>
                    <div>
                        <select name="sort_by_date" id="" onChange={(e)=>sortByDate(e.target.value)}>
                            <option value="oldest first">Sort by date (oldest first)</option>
                            <option value="newest first">Sort by date (newest first)</option>
                        </select>
                    </div>
                </div> 
                <div className="place-order-bar">
                    <div className="weeks">
                        {/* <IoIosArrowBack className='week-arrow' onClick={()=>handleWeek("prev")}/>
                        <div className="nav-week" onClick={()=>handleWeek("prev")}>
                            <span>{(prevWeek.getDate().toString().length===1?("0"+prevWeek.getDate()):prevWeek.getDate())+"-"+((prevWeek.getMonth()+1).toString().length===1?"0"+(prevWeek.getMonth()+1):(prevWeek.getMonth()+1))+"-"+prevWeek.getFullYear()}</span>
                        </div>
                        <div className="nav-week middle">
                            <span>{currWeek.getDate().toString().length===1?"0"+currWeek.getDate():currWeek.getDate()}-{(currWeek.getMonth()+1).toString().length===1?"0"+(currWeek.getMonth()+1):(currWeek.getMonth()+1)}-{currWeek.getFullYear()}</span>
                        </div>
                        <div className="nav-week"onClick={()=>handleWeek("next")}> 
                            <span>{(nextWeek.getDate().toString().length===1?"0"+nextWeek.getDate():nextWeek.getDate())+"-"+((nextWeek.getMonth()+1).toString().length===1?"0"+(nextWeek.getMonth()+1):(nextWeek.getMonth()+1))+"-"+nextWeek.getFullYear()}</span>
                        </div>
                        <IoIosArrowForward className='week-arrow' onClick={()=>handleWeek("next")}/> */}
                    </div>
                    <div>
                        <Link to="/dashboard/place-call">
                            <button>
                                <BsBell/>
                                <p>
                                    Place Order
                                </p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="assignements-info">
                    {
                        all_assignements.map((item,index)=>(
                            <Link to="/dashboard/view-assignement" state={{id:item.id,open_assignments:get_all_assignements.data?.length}} key={index}>
                                <div className="assignement-elt">
                                    {/* <p>
                                        {new Date(item.starting_date).toLocaleString('en-GB', {weekday:'long'})}
                                    </p> */}
                                    <p>
                                        <BsPen/>
                                        {item.job_name}
                                    </p>
                                    <p>
                                        <CgCalendar/>
                                        {item.starting_date.split("T")[0]}
                                    </p>
                                        {item.status==="Paused"?<p>Paused</p>:item.status==="Rejected"?<p>Rejected <CgClose/></p>:<p>Assignement Placed <MdDone/></p>}
                                    <p>
                                        <GoLocation/>
                                        {item.province+ ", "+item.place+" ,"+item.country+"."}
                                    </p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="back-button">
                    <Link to="/dashboard">
                        <button>
                            Back
                        </button>
                    </Link>
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
