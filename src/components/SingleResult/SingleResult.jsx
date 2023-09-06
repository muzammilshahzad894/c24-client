import React from 'react'
import { useSelector } from 'react-redux'
import "./singleResult.scss"
import SingleResultAssignemnt from './SingleResultAssignment/SingleResultAssignemnt'
import SingleResultFreelancer from './SingleResultFreelancer/SingleResultFreelancer'

export default function SingleResult({data,freelancer,sideBySide}) {
  const research = useSelector(state=>state.research);
  console.log(freelancer)
  console.log(data)
  return (
    <div className='single_result' style={freelancer?{width:sideBySide?"500px":"100%",height:sideBySide?"720px":"auto"}:{width:sideBySide?"400px":"70%",height:sideBySide?"600px":"auto"}}>
        {
            (data?.email||(research.data&&research.data[0]?.email))?(
                <SingleResultFreelancer data={data} sideBySide={sideBySide}/>
            ):(
                <SingleResultAssignemnt data={data} sideBySide={sideBySide}/>
            )
        }
    </div>
  )
}
