import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoMdAddCircleOutline, IoMdRemoveCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { add_favorite_freelancer, get_favorite_freelancer, remove_favorite_freelancer, search_action } from '../../state/Actions/UserAction'
import "./Favorites.scss"

export default function Favorites() {
    const [ShowWindow, setShowWindow] = useState(false)
    const dispatch = useDispatch();
    const research = useSelector(state=>state.research);
    const add_favorite = useSelector(state=>state.add_favorite);
    const get_favorite = useSelector(state=>state.get_favorite);
    const remove_favorite = useSelector(state=>state.remove_favorite);
    const user_info = useSelector(state=>state.user_info)
    const [data, setData] = useState(research?.data);
    const [selectedUser, setSelectedUser] = useState(0)
    const inputRef = useRef();
    //data object to store search values
    const searchData =         
    {
    hourly_rate:{
        operation:"",
        values:""
    },
    job_name:{
        operation:"",
        values:""
    },
    user_name:{
        operation:"",
        values:""
    },
    profession:{
        operation:"",
        values:""
    },
    industry:{
        operation:"",
        values:""
    },
    city:{
        operation:"",
        values:""
    },
    province:{
        operation:"",
        values:""
    },
    max_travel_distance:{
        operation:"",
        values:""
    },
    working_hours : {
        operation:"",
        values:[]
    },
    job_duration:{
        operation:"",
        values:[]
    },
    pay_type:{
        operation:"",
        values:[]
    },
    diplomat_certificate:{
        operation:"",
        values:""
    },
    currency:{
        operation:"",
        values:""
    },
    competency:{
        operation:"",
        values:""
    },
    }
    const info = useRef(searchData);
    useEffect(()=>{
        setData(research.data)
    },[research]);
    useEffect(()=>{

        searchHandler(false,"job_name","like ","")

    },[])
    const searchHandler = (remove,key,op,value)=>{  
        //asserting new data to data obj
        let the_info = {};
        if(key.length>0){
            //removing an element from the search
            if(remove){
                info.current[key].values = info.current[key]?.values.filter(item=>item!==value);
            }else{
                if(typeof(info.current[key]?.values)!=="string"){

                    if(typeof(value)!=="string"){
                        info.current[key]?.values.concat(value)
    
                    }else{
                        info.current[key]?.values.push(value)
                    }
                    info.current[key].values = [...new Set(info.current[key]?.values)]
                }else{
                    info.current[key].values = value
                }
            }
            info.current[key].operation = op
    
            for(const [the_key,elt] of Object.entries(info.current)){
                if(elt.values?.length>0){
                    the_info[the_key] = elt;
                }
            }
            the_info.table = "users";
            //the_info.table = info.current.table;
            dispatch(search_action(the_info))
        }
  }

  useEffect(()=>{
    dispatch(get_favorite_freelancer(user_info.user?.token))
    setShowWindow(false)
  },[dispatch, add_favorite, remove_favorite, user_info.user?.token])

  const addFavorite = ()=>{
    dispatch(add_favorite_freelancer(selectedUser,user_info.user?.token));
  }
  const removeFavorite = (id)=>{
    dispatch(remove_favorite_freelancer(id,user_info.user?.token))
  }
  return (
    get_favorite.loading||add_favorite.loading||remove_favorite.loading?(
        <LoadingBox big/>
    ):(
        <div className='favorites'>
            <DashboardBar/>
            <div className="favorites-header">
                <h1>
                    Favorite Professionals
                </h1>
                <button onClick={()=>setShowWindow(!ShowWindow)}>
                    <IoMdAddCircleOutline/> Add favorite professionals
                </button>
            </div>
            <div className="favorite-wrapper">
                {
                    get_favorite.data?.length>0&&(
                    <div className="favorite-wrapper-header">
                        <p>
                            <b>
                                Freelancer
                            </b>
                        </p>
                        <p>
                            <b>
                                Phone
                            </b>
                        </p>
                        <p>
                            <b>
                                Email
                            </b>
                        </p>
                        <p>
                            <b>
                                Profile
                            </b>
                        </p>
                        <p>
                            <b>
                                Actions
                            </b>
                        </p>
                    </div>
                    )
                }
                {
                    get_favorite?.data?.length>0?(
                        get_favorite?.data?.map(item=>(
                            <div style={{marginTop:"10px"}}>
                                <p>
                                    {item.user_name}
                                </p>
                                <p>
                                    {item.phone_no}
                                </p>
                                <p>
                                    {item.email}
                                </p>
                                <Link to={`/dashboard/settings/profile/${item.id}`} state={{user_id:item.id}}>
                                    View Profile
                                </Link>
                                <Link to="" onClick={()=>removeFavorite(item.id)}>
                                    <IoMdRemoveCircle color='red' fontSize={20}/>
                                    <span>
                                        Remove
                                    </span>
                                </Link>
                            </div>
                        ))
                    ):(
                        <p style={{textAlign:"center"}}>
                            No favorite professionals! 
                        </p>
                    )
                }
            </div>
            {
                ShowWindow&&(
                    <div className="favorite-pop-up">
                        <div className="pop-up-bg">

                        </div>
                        <div className="favorite-professionals-window">
                            <div className="favorite-professionals-window-header">
                                <h2>
                                    Add favorite Professionals
                                </h2>
                                <AiOutlineCloseCircle onClick={()=>setShowWindow(false)}/>
                            </div>
                            <div className="favorite-professionals-window-content">
                                <h3>
                                    Professional:
                                </h3>
                                <input type="text" placeholder='Seek ...' ref={ref=>ref!==null&&(inputRef.current  = ref)} onChange={(e)=>{e.target.value?.length>0?searchHandler(false,"user_name","like ",e.target.value+(e.target.value.length>0?"%":"")):setData([])}} />
                                <div className="favorite-professionals-list">
                                    <ul>
                                        {
                                            data?.map(item=>(
                                                item.user_name&&(
                                                    <li onClick={()=>{setSelectedUser(item.id);setData([]);inputRef.current.value=item.user_name}}>
                                                        {item.user_name}
                                                    </li>  
                                                )
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="favorite-professionals-window-footer">
                                <button className="back" onClick={()=>setShowWindow(false)}>
                                    Back
                                </button>
                                <button onClick={()=>addFavorite()}>
                                    Add Favorite
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
  )
}
