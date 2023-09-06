import React, { useState } from 'react'
import "./UnderCunstruction.scss"
import { AiFillCloseCircle } from 'react-icons/ai'

export default function UnderCunstruction() {
    const [showPanel, setShowPanel] = useState(true)

  return (
    <div className='under-cunstruction-wrapper' style={{display:showPanel?"flex":"none"}} onClick={()=>setShowPanel(false)}>
        <div className="under-cunstruction-elt">
            <img src="/images/under_cunstruction.jpg" alt="" />
            <AiFillCloseCircle onClick={()=>setShowPanel(false)}/>
        </div>
    </div>
  )
}
