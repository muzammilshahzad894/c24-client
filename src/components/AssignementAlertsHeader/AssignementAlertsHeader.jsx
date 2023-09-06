import React from 'react'
import { Link } from 'react-router-dom'
import "./assignementAlertsHeader.scss"

export default function AssignementAlertsHeader() {
  return (
    <div className='assignement-alerts-header'>
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
    </div>
  )
}
