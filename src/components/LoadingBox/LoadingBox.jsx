import React, { useState } from 'react'
import "./loadingBox.scss"

export default function LoadingBox({big}) {
    const [showLoading, setShowLoading] = useState(true);

    setTimeout(()=>{
        setShowLoading(false)
    },3200);
  return (
    <div className={big?"loading-box big":"loading-box"}>
        <img src="/images/logo.png" alt="" />
        <div className={`loading ${!showLoading ? "hideLoading":""}`}>
            <div className="loadingBar"></div>
        </div>
    </div>
  )
}
