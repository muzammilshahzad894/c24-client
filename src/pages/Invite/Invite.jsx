import React, { useEffect, useState } from 'react'
import "./invite.scss"
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import { useDispatch, useSelector } from 'react-redux'
import { get_invited_action, invite_action } from '../../state/Actions/UserAction'
import MessageBox from '../../components/MessageBox/MessageBox'
import { FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'

export default function Invite() {
    //states
    const [select, setSelect] = useState("Freelacer");
    const [recipient, setRecipient] = useState("");
    const [recipient_name, setRecipient_name] = useState("");
    //redux states
    const get_invited = useSelector(state=>state.get_invited);
    const user_info = useSelector(state=>state.user_info);
    const invite = useSelector(state=>state.invite)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user_info.user.email){
            window.location.replace("/login");
        }
    })
    useEffect(()=>{
        dispatch(get_invited_action(user_info.user.token))
    },[dispatch, user_info.user.token])
    useEffect(()=>{
        dispatch(get_invited_action(user_info.user.token))
        if(invite.message){
            setTimeout(() => {
                invite.message = null;
            }, 5000);
        }
    },[dispatch, invite, user_info.user.token])

    //function to invite
    const invite_friend = ()=>{
        if(select.length>0 && recipient_name.length>0 && recipient.length>0){
            dispatch(invite_action({recipient,recipient_name,sender:user_info.user.email,user_type:select,status:0},user_info.user.token))
        }
    }
    return (
        get_invited.loading?(
            <LoadingBox big/>
        ):(
        <div className='invite'>
            <DashboardBar/>
            <div className="invite-content">
                <div className="title">
                    <h1>
                        To invite
                    </h1>
                </div>
                {
                    invite.message&&(
                        <MessageBox message={invite.message}/>
                    )
                }
                <div className="description">
                    <p>
                        We encourage expansion of the Curant24 network, you can also invite former colleagues and acquaintances to participate!
                    </p>
                </div>
                <div className="form">
                    <div>
                        <h2>Name</h2>
                        <input type="text" placeholder='Name' name='recipient_name' onChange={e=>setRecipient_name(e.target.value)} />
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input type="text" placeholder='Email' name='recipient'onChange={e=>setRecipient(e.target.value)} />
                    </div>
                    <div>
                        <h2>Invite as</h2>
                        <select name="user_type" id="" onChange={(e)=>setSelect(e.target.value)}>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Organisation">Organisation</option>
                        </select>
                    </div>
                    <div className="submit">
                        <Link to="/dashboard/settings">
                                <button className="back" >Back</button>
                        </Link>
                        <button onClick={()=>invite_friend()}>To Invite</button>
                    </div>
                </div>
                <div className="list-of-invited">
                    <div className="row">
                        <h2>Name</h2>
                        <h2>Email</h2>
                        <h2>Type</h2>
                        <h2>Status</h2>
                    </div>
                    {get_invited.data&&
                    (get_invited.data.map((item,key)=>(
                        <div className="row info" key={key}>
                            <h2>{item.name}</h2>
                            <h2 className='email'>{item.email}</h2>
                            <h2>{item.type}</h2>
                            <h2>{!item.status&&(<FiClock/>)}</h2>
                        </div>
                    )))
                    }
                </div>
            </div>
            <DashboardBarBottom/>
        </div>
    )
    )
}
