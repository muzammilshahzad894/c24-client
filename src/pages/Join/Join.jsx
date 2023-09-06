import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import "./join.scss"
export default function Join() {
    const [switchLoading, setSwitchLoading] = useState(true)
    const location  = useLocation();
    setTimeout(()=>{
        setSwitchLoading(false);
    },300)

    return (
        switchLoading?(<LoadingBox big/>):(
        <div className='join'>
            <div className="background"></div>
            <div className="accType">
                <h1>Choose an account type</h1>
                <h3>Which of the following best describes you?</h3>
            </div>
            <div className="twoTypes">
                <div className="freelancer"> 
                    <img src="/images/freelance_icon.png" alt="" />
                    <h1>I am Freelancer</h1>
                    <h3>I am a freelancer and looking for new assignments</h3>
                    <Link to="/register/?user=freelancer" state={{target:location.state?.target}}>
                            Get Started
                    </Link>
                </div>
                <div className="client">
                    <img src="/images/client_icon.png" alt="" />
                    <h1>I am Client</h1>
                    <h3>I am a client and looking for new freelancer</h3>
                    <Link to="/register?user=client" state={{target:location.state?.target}}>
                            Get Started
                    </Link>
                </div>
            </div>
            <div className="info">
                <p>Not quite clear yet?</p>
                <p>Send us an email at <span>support@curant24.com</span></p>
                {/* <p>Or send us a Whatsapp message on <span>+316 29332475.</span></p>
                <p>Isn't this what you want? <span>To overview.</span></p> */}
            </div>
        </div>
    )
    )
}
