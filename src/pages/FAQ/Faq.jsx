import React, { useState } from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BsFillGearFill } from 'react-icons/bs';
import {RiMoneyEuroCircleFill, RiSuitcaseFill} from 'react-icons/ri';
import {BiUser} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import FaqHeader from '../../components/FAQHeader/FaqHeader';
import {clientQuestions, freelancerQuestions} from '../../userQuestions';
import FaqQuestion from '../../components/FaqQuestion/FaqQuestion';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import "./faq.scss";
import { useEffect } from 'react';

export default function Faq() {
    const [navBarSwitch, setNavBarSwitch] = useState(0)
    const [data, setData] = useState([]);
    const [type, setType] = useState("")
    useEffect(()=>{
        if(navBarSwitch===0){
            setData(clientQuestions.general.concat(freelancerQuestions.general));
            setType("All")
        }else if(navBarSwitch===1){
            setData(freelancerQuestions.general);
            setType("Freelancers")
        }else if(navBarSwitch===2){
            setData(clientQuestions.general);
            setType("Client")
        }
    },[navBarSwitch])

    const searchBarHandler = e=>{
        console.log(e)
        console.log(data);
        if(e.target.value?.length>0){
            let arr = [];
            if(type==="Freelancers"){
                for(const [key,value] of Object.entries(freelancerQuestions)){
                    arr=[...arr,...value.filter(item=>item?.question?.toLowerCase().includes(e.target.value?.toLowerCase())||item.answer?.toLowerCase().includes(e.target.value?.toLowerCase()))]
                }
                setData(arr);
            }else if(type==="Client"){
                for(const [key,value] of Object.entries(clientQuestions)){
                    arr=[...arr,...value.filter(item=>item?.question?.toLowerCase().includes(e.target.value?.toLowerCase())||item.answer?.toLowerCase().includes(e.target.value?.toLowerCase()))]
                }
                setData(arr);
            }else{
                for(const [key,value] of Object.entries(freelancerQuestions)){
                    arr=[...arr,...value.filter(item=>item?.question?.toLowerCase().includes(e.target.value?.toLowerCase())||item.answer?.toLowerCase().includes(e.target.value?.toLowerCase()))]
                }
                for(const [key,value] of Object.entries(clientQuestions)){
                    arr=[...arr,...value.filter(item=>item?.question?.toLowerCase().includes(e.target.value?.toLowerCase())||item.answer?.toLowerCase().includes(e.target.value?.toLowerCase()))]
                }
                console.log(arr)
                setData([...new Set(arr)]);

            }
        }else{
            if(navBarSwitch===0){
                setData(clientQuestions.general.concat(freelancerQuestions.general));
                setType("All")
            }else if(navBarSwitch===1){
                setData(freelancerQuestions.general);
                setType("Freelancers")
            }else if(navBarSwitch===2){
                setData(clientQuestions.general);
                setType("Client")
            }
        }
    }
    const linkQuestion =(e,name)=>{
        e.preventDefault();
        if(type==="Freelancers"){
            setData(freelancerQuestions[name]||[])
        }else if(type==="Client"){
            setData(clientQuestions[name]||[])
        }else{
            console.log([...(freelancerQuestions[name]||[]),...(clientQuestions[name]||[])]);
            setData([...(freelancerQuestions[name]||[]),...(clientQuestions[name]||[])])
        }
    }
  return (
    <div className='faq'>
        <Header Child={<FaqHeader handler={searchBarHandler} type={type}/>} />
        <div className="faq-content">
            <div className="faq-content-nav-bar">
                <p className={`${navBarSwitch===0&&"selected"}`} onClick={()=>setNavBarSwitch(0)}>
                    All 
                </p>
                <p>
                    |
                </p>
                <p className={`${navBarSwitch===1&&"selected"}`} onClick={()=>setNavBarSwitch(1)}>
                    Freelancers
                </p>
                <p >
                    |
                </p>
                <p className={`${navBarSwitch===2&&"selected"}`} onClick={()=>setNavBarSwitch(2)}>
                    Client
                </p>
            </div>
            <div className="faq-content-questions-links">
                <div className="faq-content-questions">
                    {
                        data?.map(item=>(
                            <FaqQuestion question={item.question} answer={item.answer}/>
                        ))
                    }
                </div>
                <div className="faq-content-links">
                    {
                        type==="Freelancers"&&(
                            <Link to="">
                                <BiUser/>
                                Help for Freelancers during the sign-up process
                            </Link>
                        )
                    }
                    <Link to="" onClick={(e)=>linkQuestion(e,"general")}>
                        <AiOutlineFileSearch/>
                        General questions
                    </Link>
                    <Link to="" onClick={(e)=>linkQuestion(e,"cancellations")}>
                        <BsFillGearFill/>
                        Cancellations
                    </Link>
                    <Link to="" onClick={(e)=>linkQuestion(e,"invoicesPayments")}>
                        <RiMoneyEuroCircleFill/>
                        Invoices and Payments
                    </Link>
                    <Link to="/faq" onClick={(e)=>linkQuestion(e,type==="Freelancers"?"freelance":"assignmentAgreementWithFreelancer")}>
                        <BsFillGearFill/>
                        {type==="Freelancers"?"Freelancing":"Assignment agreement with the freelancer"}
                    </Link>
                    <Link to="" onClick={(e)=>linkQuestion(e,type==="Freelancers"?"education":"howToPlaceAssignment")}>
                        <AiOutlineFileSearch/>
                        {type==="Freelancers"?"Training and Courses":"How do I place an assignment"}
                    </Link>
                    {
                        type==="Client"&&(
                        <Link to=""  onClick={(e)=>{linkQuestion(e,"findFreelancer")}}>
                            <BiUser/>
                            Find and rate freelancers
                        </Link>
                        )
                    }
                    <Link to="" onClick={(e)=>linkQuestion(e,"generalChildcare")}>
                        <RiSuitcaseFill/>
                        General questions childcare
                    </Link>
                    {
                        type==="Freelancers"&&(
                            <>
                                <Link to="" onClick={(e)=>linkQuestion(e,"qualifications")}>
                                    <BiUser/>
                                    Qualifications and diplomas
                                </Link>
                                <Link to=""  onClick={(e)=>linkQuestion(e,"assignments")}>
                                    <AiOutlineFileSearch/>
                                    Assignments
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
