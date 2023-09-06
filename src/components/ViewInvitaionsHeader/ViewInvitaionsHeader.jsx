import React from 'react'
import { Link } from 'react-router-dom'
import "./viewInvitaionsHeader.scss"

export default function ViewInvitaionsHeader() {
  return (
    <div className='view-invitations-header'>
        <div>
          <Link to="/saved-profiles" state={{freelancer:false}}>
            Saved profiles freelancers
          </Link>
          <Link to="/view-invitations">
            Overview invitations
          </Link>
        </div>
        <div  style={{justifyContent:"flex-start",width:"100%"}}> 
          <h1>
              Overview invitations.
          </h1>
        </div>
    </div>
  )
}
