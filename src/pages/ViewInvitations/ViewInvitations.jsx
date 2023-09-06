import React, { useEffect, useRef, useState } from 'react'
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SingleResult from '../../components/SingleResult/SingleResult';
import ViewInvitaionsHeader from '../../components/ViewInvitaionsHeader/ViewInvitaionsHeader';
import { delete_invitations_freelancer_action, get_invited_freelancer_action, get_liked_action } from '../../state/Actions/UserAction';
import "./viewInvitations.scss"

export default function ViewInvitations() {
    const [layout, setLayout] = useState(false);
    const [eltsIndex, setEltsIndex] = useState(10)
    const [elts, setElts] = useState([])
    const user_info = useSelector(state=>state.user_info);
    const get_invited_freelancer = useSelector(state=>state.get_invited_freelancer); 
    const dispatch = useDispatch()  
    const linkRef = useRef();

    useEffect(()=>{
        if(!user_info.user?.token){
            linkRef.current.click();
        }
        dispatch(get_invited_freelancer_action(user_info.user.token));
        dispatch(get_liked_action("freelancers",user_info.user.token))
    },[dispatch, user_info.user.token])

    useEffect(()=>{
        setElts(get_invited_freelancer.data?.slice(0,10));
        setEltsIndex(10);
      },[get_invited_freelancer])

    const showMoreItems = ()=>{
      setElts(get_invited_freelancer.data?.slice(0,eltsIndex+10));
      setEltsIndex(eltsIndex+10);
    }
    const deleteAllInvitationsHandler = ()=>{
      dispatch(delete_invitations_freelancer_action(user_info.user.token));
      dispatch(get_invited_freelancer_action(user_info.user.token))
    }  
  return (
    <div className='search_results_container'>
    <Header Child={<ViewInvitaionsHeader />}/>
    <div className="search_results">
      <div className="search_results_filter">
        <div className="search_results_filter_inputs">
          <div>
            <p>
               {get_invited_freelancer.data?.length>10?("Search results 1 - "+ eltsIndex+" of "+get_invited_freelancer.data?.length):get_invited_freelancer.data?.length>0?("Search results "+get_invited_freelancer.data?.length):("No results")}
            </p>
          </div>
        </div>
        <div className="search_results_layout">
          <div>
            <TbLayoutGrid className={layout?"":'selected'} onClick={()=>setLayout(false)}/>
            <TbLayoutList className={!layout?"":'selected'} onClick={()=>setLayout(true)}/>
          </div>
        </div>
      </div>
      <div className="search_results_elements_container" style={{flexDirection:layout?"column":"row"}}>
        {
          elts?.map(item=>(
            <SingleResult freelancer={true} sideBySide={!layout} data={item}/>
          ))
        }
      </div>

      {
        //link to redirect un logged in users
        <Link to="/login" state={{target:"/search"}} ref={ref=>ref!==null&&(linkRef.current = ref)}>

        </Link>
      }
    </div>
    {
      get_invited_freelancer?.data?.length>0&&(
      <div className='delete-all-invitations-freelancers'>
        <p onClick={()=>deleteAllInvitationsHandler()}>
          Delete all saved profiles
        </p>
      </div>
      )
    }
    {
      get_invited_freelancer.data?.length>eltsIndex&&(
        <div className="search_result_footer" onClick={()=>showMoreItems()}>
          <button>
            Show more
          </button>
        </div>
      )
    }
  </div>
  )
}
