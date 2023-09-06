import React from 'react'
import { Link } from 'react-router-dom'
import "./savedProfilesHeader.scss"

export default function SavedProfilesHeader({freelancer}) {
  return (
    <div className='saved-profiles-header'>
          {
            freelancer?(
              <div>
                <Link to="/dashboard/my-assignement-alerts">
                  My assignement alerts
                </Link>
                <Link to="/saved-profiles" state={{freelancer:true}}>
                  Saved assignements
                </Link>
                <Link to="/my-applications">
                  My applications
                </Link>
              </div>
            ):(
              <div>
                <Link to="/saved-profiles" state={{freelancer:false}}>
                  Saved profiles freelancers
                </Link>
                <Link to="/view-invitations">
                  Overview invitations
                </Link>
              </div>
            )
          }
        <div  style={{justifyContent:"flex-start",width:"100%"}}>
          <h1>
              Saved {!freelancer?"profiles freelancers":"Assignements"}.
          </h1>
        </div>
    </div>
  )
}
