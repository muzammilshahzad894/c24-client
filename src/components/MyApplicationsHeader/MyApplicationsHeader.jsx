import React from 'react'
import { Link } from 'react-router-dom'
import "./myApplicationsHeader.scss"

export default function MyApplicationsHeader() {
  return (
    <div className='my-applications-header'>
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
        <div  style={{justifyContent:"flex-start",width:"100%"}}>
          <h1>
            My applications.
          </h1>
        </div>
    </div>
  )
}
