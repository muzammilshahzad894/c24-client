import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MessageBox from '../MessageBox/MessageBox';
import "./RegisterProjectHeader.scss"

export default function RegisterProjectHeader({form,client}) {
    const user_info = useSelector(state=>state.user_info);
    const [error, setError] = useState('')
    console.log(error)
  return (
    <div className='contact-header'>
        <div className="contact-header-banner">
            <div>
                <h1>
                    You can easily <br />
                    place your assignement <br />
                    online.
                </h1>
            </div>
        </div>
        <div>
            <Link state={{target:!user_info.user?.token?"/dashboard/place-call":null}} to={!user_info.user?.token?"/login":user_info.user?.account_type==="client"?"/dashboard/place-call":""} onClick={()=>user_info.user?.account_type!=="client"&&setError("As a freelancer you cannot place assignments. You must have a client account. ")} style={{textDecoration:"none"}}>
                <button>
                    Register your assignment directly
                </button>
            </Link>
        </div>
        {
            error.length>0&&(
                <MessageBox message={error} onClick={()=>setError("")} status="failure"/>
            )
        }
</div>
  )
}
