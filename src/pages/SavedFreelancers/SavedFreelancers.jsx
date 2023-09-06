import React, { useEffect, useRef, useState } from 'react'
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import SavedProfilesHeader from '../../components/SavedProfilesHeader/SavedProfilesHeader'
import SingleResult from '../../components/SingleResult/SingleResult'
import { get_liked_action, remove_like_action } from '../../state/Actions/UserAction'
import "./savedFreelancers.scss"
import LoadingBox from '../../components/LoadingBox/LoadingBox'

export default function SavedFreelancers() {
    const user_info = useSelector(state=>state.user_info);
    const get_liked = useSelector(state=>state.get_liked);
    const remove_like = useSelector(state=>state.remove_like);

    const [eltsIndex, setEltsIndex] = useState(10)
    const [layout, setLayout] = useState(false);
    const [elts, setElts] = useState([])
    const dispatch = useDispatch()  
    const location = useLocation();
    const [freelancer, setFreelancer] = useState()

    const linkRef = useRef();

    //initialize freelancer variable on reload
    useEffect(()=>{
      setFreelancer(location.state?.freelancer||(user_info.user?.account_type==="freelancer"))
    },[location.state?.freelancer, user_info.user?.account_type])

    useEffect(()=>{
      if(!user_info.user?.token){
        linkRef.current.click();
      }
    },[dispatch, user_info.user?.token])
  
    useEffect(()=>{
      if(!freelancer){
        dispatch(get_liked_action("freelancers",user_info.user.token))
      }else if(freelancer){
        dispatch(get_liked_action("assignements",user_info.user.token)) 
      }
  },[dispatch, freelancer, user_info])
  
  

    useEffect(()=>{
        setElts(get_liked.data?.slice(0,10));
        setEltsIndex(10);
      },[get_liked])
    console.log(elts)

    const showMoreItems = ()=>{
      setElts(get_liked.data?.slice(0,eltsIndex+10));
      setEltsIndex(eltsIndex+10);
    }   
    const deleteAllLikesHandler = ()=>{
      get_liked.data?.map(item=>{
        dispatch(remove_like_action({table:freelancer?"assignements":"freelancers",id:item.freelancer_id||item.assignement_id},user_info.user.token));
        return item;
      })
      dispatch(get_liked_action(freelancer?"assignements":"freelancers",user_info.user.token))
    }   
  return (
    remove_like.loading?(
      <LoadingBox big/>
    ):(
    <div className='saved_profiles_container'>
      <Header Child={<SavedProfilesHeader freelancer={freelancer}/>}/>
      <div className="saved_profiles_layout">
        <div>
            <h3>
              {freelancer?"Assignements":"Profiles"} ({get_liked.data?.length||0})
            </h3>
        </div>
        <div>
          <TbLayoutGrid className={layout?"":'selected'} onClick={()=>setLayout(false)}/>
          <TbLayoutList className={!layout?"":'selected'} onClick={()=>setLayout(true)}/>
        </div>
      </div>
      <div className="saved_profiles">
        <div className="saved_profiles_elements_container" style={{flexDirection:layout?"column":"row"}}>
          {
            /** setting the target to go back to once clicking on the back button in single assignment */
            elts?.map(item=>(
              <SingleResult freelancer={!freelancer} sideBySide={!layout} data={{...item,target:"/saved-profiles"}}/>
            ))
          }
        </div>

        {
          //link to redirect un logged in users
          <Link to="/login" state={{target:"/saved-profiles"}} ref={ref=>ref!==null&&(linkRef.current = ref)}>

          </Link>
        }
      </div>
      {
        get_liked.data?.length>0&&(
        <div className='delete-all-saved-profiles'>
          <p onClick={()=>deleteAllLikesHandler()}>
            Delete all saved {freelancer?"assignements":"profiles"}
          </p>
        </div>
        )
      }
      {
        get_liked.data?.length>eltsIndex&&(
          <div className="search_result_footer" onClick={()=>showMoreItems()}>
            <button>
              Show more
            </button>
          </div>
        )
      }
    </div>
    )
  )
}
