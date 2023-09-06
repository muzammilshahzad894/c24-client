import React, { useEffect, useState } from 'react'
import OrganisatiesElement from '../../components/OrganisatiesElement/OrganisatiesElement'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import "./organisaties.scss"
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { get_organasation_action } from '../../state/Actions/UserAction'
import MessageBox from '../../components/MessageBox/MessageBox'

export default function Organisaties() {
    const get_orga = useSelector(state=>state.get_orga);
    const set_orga = useSelector(state=>state.set_orga);
    const user_info = useSelector(state=>state.user_info);
    const login_management = useSelector(state=>state.login_management)
    const dispatch = useDispatch();
    const [organasationsElts, setOrganasationsElts] = useState(get_orga);
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(()=>{
        setOrganasationsElts(get_orga);
    },[get_orga])

    useEffect(()=>{
        if(user_info.user){
            dispatch(get_organasation_action(user_info.user.token))
        }
    },[dispatch, user_info.user,set_orga])
    const handleAddElt= ()=>{
        setOrganasationsElts(organasationsElts => {
            return {loading:false,data:[...organasationsElts.data,<OrganisatiesElement key={organasationsElts.length} organasation={{nv:true}} />]}
          })
    }
  return (
    get_orga.loading||set_orga.loading?(
        <LoadingBox big />
    ):(
    <div className='organisaties-wrapper'>
        <DashboardBar/>
        <div className="header">
            {
                user_info?.user?.account_type==="client"?(
                    <>
                        <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                            Freelancers
                        </h2>
                    </>
                ):(
                    <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>Employers</h2>
                )
            }
            {
                login_management.message?.admin&&(
                    <div className="upload-contract" onClick={()=>handleAddElt()}>
                        <button>
                            <IoAddOutline/>
                        </button>
                    </div>
                )
            }
        </div>
            {set_orga.data&&(
                <MessageBox message={set_orga.data} />
            )}
        <div className="orga-elements">
            <div className="orga-row">
                {
                    user_info.user?.account_type==="client"?(
                        <>
                        <div style={{display:"block"}}>
                            <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                                Name freelancer
                            </h2>
                            <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                                Name company
                            </h2>
                        </div>
                        </>
                    ):(
                        <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                            Name
                        </h2>
                    )
                }
                <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                    Bureau
                </h2>
                <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>
                    Type
                </h2>
                <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>

                </h2>
                <h2 style={{justifyContent:user_info.user?.account_type==="client"?"flex-start":"center"}}>

                </h2>
            </div>
            {
                 organasationsElts.data&&organasationsElts.data.map((item,key)=><OrganisatiesElement key={key} organasation={item}/>)
                //get_orga&&get_orga.data.map((item,key)=><OrganisatiesElement key={key} organasation={item}/>)
            }
        </div>
        <DashboardBarBottom/>
    </div>
    )
  )
}
