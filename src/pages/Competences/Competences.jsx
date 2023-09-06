import React, { useState } from 'react'
import "./competences.scss"
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_competency_action, get_all_competencies_action, get_user_competency_action, remove_competency_action } from '../../state/Actions/UserAction'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { BsPlusSquareFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Competences() {
    const user_info = useSelector(state=>state.user_info);
    const get_all_competencies = useSelector(state=>state.get_all_competencies);
    const get_user_competency = useSelector(state=>state.get_user_competency);
    const add_competency = useSelector(state=>state.add_competency);
    const all_comp = get_all_competencies.competencies?(get_all_competencies.competencies):[];
    const user_comp = get_user_competency.competencies||[];
    let checked_comp = all_comp.map(item=>user_comp.indexOf(item.id)!==-1&&item.id).filter(item=>item!==false)

    let competencies_childcare  = get_all_competencies.competencies?.slice(0,14);
    let competencies = get_all_competencies.competencies?.slice(14);

    const [userAddedCompetencies, setUserAddedCompetencies] = useState()
    const [competency, setCompetency] = useState()
    const [childcareCompetency, setChildcareCompetency] = useState()
    const inputRef = useRef();
    const dispatch = useDispatch();

    //handling message after saving 
    const linkRef = useRef();

    let message = {message:"competencies modified successfully"};
    useEffect(()=>{
        if(add_competency.competencies&&add_competency.competencies.length>0){
            add_competency.competencies&&(add_competency.competencies = null)
            linkRef.current.click();
        }
    })
    
    //setting competency arrays to initial value
    useEffect(()=>{
        setUserAddedCompetencies([...new Set(get_user_competency?.competencies?.filter(item=>item.competency!==undefined)?.map(item=>item.competency))]||[]);

        setCompetency(get_user_competency?.competencies?.filter(item=>item.competency===undefined)?.map(item=>get_all_competencies.competencies?.slice(14)?.find(elt=>elt.id===item)).filter(item=>item!==undefined)||[])

        setChildcareCompetency(get_user_competency?.competencies?.filter(item=>item.competency===undefined)?.map(item=>get_all_competencies.competencies?.slice(0,14)?.find(elt=>elt.id===item)).filter(item=>item!==undefined)||[])

    },[get_all_competencies.competencies, get_user_competency?.competencies])
    
    useEffect(()=>{
        dispatch(get_all_competencies_action())
        dispatch(get_user_competency_action(user_info.user.token))
    },[dispatch, user_info.user.token])

    const save_competencies = ()=>{
        //dispatch(add_competency_action(checked_comp,user_info.user.token))
        //dispatch(remove_competency_action(unchecked_comp,user_info.user.token))
        dispatch(add_competency_action({chosen_competency:[...competency.concat(childcareCompetency)?.map(item=>item.id)],user_added_comp:userAddedCompetencies},user_info.user.token,true))
        
    }
    console.log(competencies_childcare)
    return (
        get_user_competency.loading?(
            <LoadingBox big/>
        ):(
        <div className='competences'>
            <DashboardBar/>
            <div className="content">
                <div className="title">
                    <h1>
                        Settings - Competencies
                    </h1>
                </div>
                <div className="top-text">
                    <p>
                        You can fill in your competencies on this page. A competency shows which character traits , good <br />
                        qualities and qualities you have, which can be learned and developed. <br /><br />

                        Competencies therefore tell you in a few words where your core qualities lie. <br /><br />

                        Thanks to your competencies, your potential employer knows better what type of  employee you are, and <br />
                        whether you are a match with your new colleagues and the company itself. 
                    </p>
                </div>
                <div className="competences-select">
                    <div>
                        <span>
                            ! Only use if you work in childcare
                        </span>
                        <select name="childcare" id="" onChange={e=>e.target.value?.length>0&& childcareCompetency.find(elt=>elt.competence===e.target.value)?.at(0)===undefined && setChildcareCompetency([...childcareCompetency,{id:competencies_childcare?.find(elt=>elt.competence===e.target.value)?.id,competence:e.target.value}])}>
                            <option value="">
                                Choose your childcare competencies
                            </option>
                            {
                                competencies_childcare?.map(item=>(
                                    <option value={item.competence} key={item.id} /*selected={get_user_competency?.competencies?.includes(item.id)}*/> 
                                        {
                                            item.competence
                                        }
                                    </option>
                                ))
                            }
                        </select>
                        <div style={{marginTop:"22px"}}>
                                <ul style={{padding:0}}>
                                    {
                                        childcareCompetency?.map(item=>(
                                            <div>
                                                <li>
                                                    {item.competence}
                                                </li>
                                                <AiFillCloseCircle onClick={()=>setChildcareCompetency(childcareCompetency.filter(elt=>elt!==item))}/>
                                            </div>
                                        ))
                                    }
                                </ul>
                        </div>
                    </div>
                    <div>
                        <span>
                            Choose your competency from the list
                        </span>
                        <select name="competency" id="" onChange={e=>e.target.value?.length>0 && !competency.find(elt=>elt.competence===e.target.value) && setCompetency([...competency,{id:get_all_competencies.competencies?.find(elt=>elt.competence===e.target.value)?.id,competence:e.target.value}])}>
                            <option value="">
                                Choose your competences
                            </option>
                            {
                                competencies?.map(item=>(
                                    <option value={item.competence} id={item.id}  key={item.id} > 
                                        {item.competence}
                                    </option>
                                ))
                            }
                        </select>
                        <div style={{marginTop:"22px"}}>
                                <ul style={{padding:0}}>
                                    {
                                        competency?.map(item=>(
                                            <div>
                                                <li>
                                                    {item.competence}
                                                </li>
                                                <AiFillCloseCircle onClick={()=>setCompetency(competency.filter(elt=>elt!==item))}/>
                                            </div>
                                        ))
                                    }
                                </ul>
                        </div>
                    </div>
                    <div>
                        <span>
                            Add your own competence
                        </span>
                        <div>
                            <input type="text" placeholder='Add your competencies' ref={ref=>ref!==null&&(inputRef.current=ref)}/>
                            <BsPlusSquareFill onClick={()=>{setUserAddedCompetencies([...userAddedCompetencies,inputRef.current?.value]);(inputRef.current.value = "")}}/>
                        </div>
                        <div>
                            <ul >
                                {
                                    userAddedCompetencies?.map(item=>(
                                        <div>
                                            <li>
                                                {item}
                                            </li>
                                            <AiFillCloseCircle onClick={()=>setUserAddedCompetencies(userAddedCompetencies.filter(elt=>elt!==item))}/>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className="form">
                    <div className="label">
                        <h3>
                            Competencies
                        </h3>
                    </div>
                    <div className="values">
                        {
                            all_comp.map((item,index)=>(
                                <div key={index}>
                                    <input type="checkbox"  name={item.competence} defaultChecked={get_user_competency.competencies?.find(elt=>elt===item.id)!==undefined} id={item.competence} value={item.id}  ref={ref=>ref!==null&&(inputRef.current.push(ref))}  onChange={e=>handle_competence(e)}/>
                                    <h4>{item.competence}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div> */}
                <div className="back-save">
                    <Link to="/dashboard/settings">
                        <button className="back">Back</button>
                    </Link>
                    <Link to="/dashboard/settings" 
                            state={message}
                            ref = {ref=>ref!==null&&(linkRef.current = ref)}
                    >
                    </Link>
                    <button className="save" onClick={()=>save_competencies()}>Save</button>
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
        )
    )
}
