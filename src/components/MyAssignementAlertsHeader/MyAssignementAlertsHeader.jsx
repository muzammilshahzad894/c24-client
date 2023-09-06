import React from 'react'
import { Link } from 'react-router-dom'
import"./myAssignementAlertsHeader.scss"

export default function MyAssignementAlertsHeader() {
  return (
    <div className='my-assignement-alerts-header'>
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
        <div style={{justifyContent:"flex-start",width:"100%"}}>
            <h1>
                My assignement alerts
            </h1>
        </div>
    </div>
  )
}
