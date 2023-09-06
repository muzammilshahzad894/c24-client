import React, { useEffect, useRef, useState } from 'react';
import "./messageBox.scss";
import {AiOutlineClose} from 'react-icons/ai';
;


export default function MessageBox({message,status="success",onClick = ()=>{} }) {
  const messageBoxRef = useRef();
  const [t, setT] = useState(false)
  setTimeout(() => {
    console.log("hiding the button")
    hideButton()
  }, 10000);
  useEffect(() => {
    console.log(status)
    setT(!t)
  },[status])
  console.log(status)
  console.log("hi")
  const hideButton = ()=>{
    if(messageBoxRef.current){
      if(messageBoxRef.current.style.display === "flex"){
        messageBoxRef.current.style.display = "none";
      }else{
        messageBoxRef.current.style.display = "flex";
      }
    }
    onClick();
  }
  return (
    <div className={'messageBox '+status}  ref={ref=>(messageBoxRef.current = ref)}>
        <div className="message-content">{message}</div>
        <div className="closeBtn" onClick={()=>hideButton()}><AiOutlineClose/></div>
    </div>
  );
}
