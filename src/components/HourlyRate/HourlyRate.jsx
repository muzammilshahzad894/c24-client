import React, { useState } from "react";
import { TwoThumbInputRange } from "react-two-thumb-input-range"
import "./hourlyRate.scss";

export default function HourlyRate() {
  const [showLabel, setShowLabel] = useState(true)
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(2000)
  const changeValue=values=>{
    console.log(values);
    setFirst(values[0]);
    setSecond(values[1])
  }
  return (
    <div className="two-thumb-range"  >
      <TwoThumbInputRange railColor="#ccc" showLabels={true}  onChange={(values)=>changeValue(values)} trackColor="rgb(250, 225, 0)" values={[first,second]} min={0} max={2000} />
  </div>
  )
}

export {HourlyRate};
