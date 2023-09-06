import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import MyApplicationElement from '../../components/MyApplicationElement/MyApplicationElement'
import MyApplicationsHeader from '../../components/MyApplicationsHeader/MyApplicationsHeader'
import { get_applications_action } from '../../state/Actions/UserAction'
import "./myApplications.scss"

export default function MyApplications({assignement_id}) {
  const user_info = useSelector(state=>state.user_info);
  const get_applications = useSelector(state=>state.get_applications);
  const delete_application = useSelector(state=>state.delete_application);
  const dispatch = useDispatch();
  const linkRef = useRef();

  useEffect(()=>{
    if(!user_info.user?.token){
      linkRef.current.click();
    }else{
      dispatch(get_applications_action(user_info.user.token))  
    }
  },[dispatch, user_info.user.token])
  return (
    
    (get_applications.loading||delete_application.loading)?(
      <LoadingBox/>
    ):(
    <div className='my_applications'>
        <Header Child={<MyApplicationsHeader/>}/>
        {
          delete_application.data&&(
            <MessageBox message={delete_application.data}/>
          )
        }
        <div className="my_applications_container">
          <div className="my_applications_label">
            <h2>
              applications
            </h2>
          </div>
          <div className="my_applications_elements">
            {
              get_applications?.data?.map(item=>(
                <MyApplicationElement data={item}/>
              ))
            }
          </div>
        </div>
        <Link to="/login" state={{target:"/my-applications"}} ref={ref=>ref!==null&&(linkRef.current=ref)}></Link>
    </div>
    )
  )
}
