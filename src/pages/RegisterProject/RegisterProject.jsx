import React, { useEffect } from 'react'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import FaqQuestion from '../../components/FaqQuestion/FaqQuestion'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import RegisterProjectHeader from '../../components/RegisterProjectHeader/RegisterProjectHeader'
import "./RegisterProject.scss"

export default function RegisterProject() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
  return (
    <div className='contact'>
        <Header contact/>
        <RegisterProjectHeader/>
            <div className='contact-can-we-help-you'>
                        <div>
                            <h3>
                                Looking for new <br />
                                Freelancers
                            </h3>
                            <Link to="/search">
                                <button>
                                    Search freelancers
                                </button>
                            </Link>
                        </div>
                        <div>
                            <p>
                                Do you need reinforcement in your team now? We are happy to help you <br />
                                with that! Register you <Link to="">Assignement</Link> online for free and we will quickly find the  <br />
                                right talent for your organisation. Here's what you get from us: <br />
                            </p>
                            <div>
                                <p style={{display:"flex",alignItems:"center"}}>
                                    <AiOutlineCheck style={{color:"lightcoral",fontSize:"20px"}}/> A tailor-made solution within 24 hours
                                </p>
                                <p style={{display:"flex",alignItems:"center"}}>
                                    <AiOutlineCheck style={{color:"lightcoral",fontSize:"20px"}}/> The largest selection of the best talents
                                </p>
                                <p style={{display:"flex",alignItems:"center"}}>
                                    <AiOutlineCheck style={{color:"lightcoral",fontSize:"20px"}}/> Direct insight into the price
                                </p>
                            </div>
                        </div>
            </div>
            <div className='contact-faq'>
                        <div className="contact-faq-bar">
                            <div style={{textAlign:"center",marignBottom:"20px"}}>
                                <h3>
                                    <b style={{color:"rgb(31, 119, 54)"}}>
                                        FAQ
                                    </b>
                                </h3>
                                <p>
                                    If you still have questions, maybe your question is in our FAQ. <br />
                                    If not, please <Link to="/contact"  style={{color:"rgb(31, 119, 54)"}}>contact</Link> us and we will be happy to help you.
                                </p>
                            </div>
                            <div>
                                <div className="contact-faq-bar-search">
                                    <input type="text" placeholder='Type your keywords here.' onChange={()=>window.location.replace("/faq")}/>
                                    <button>
                                        Seek
                                    </button>
                                </div>
                                <div className="contact-faq-bar-faqs">
                                    <FaqQuestion question="What about the responsibility in case of incidents during the assignments?" 
                                    answer={" Curant24 is only the mediator and is not liable in the event of incidents during assignments. \n The freelancer is insured for accidents/incidents during work.\n Without business liability insurance, the freelancers are not allowed to work via Curant24"}/>
                                    <FaqQuestion question="Can you, as a client, cancel an order within 24 hours?" 
                                    answer={"When a client cancels a service within 24 hours, the freelancer receives compensation. \nThe compensation of €100 is compensation for canceling within 24 hours and there is no work in return. \nThe freelancer does not have to come to the location. The freelancer can take on another service.\nThis cancellation is not possible if the freelancer is already at the location and has therefore already started the assignment."}/>
                                    <FaqQuestion question="When can an order be accepted?" answer={"When the freelancer meets all the requirements that are asked. Watch out for money for assignments in childcare.\nAn assignment can be accepted if the diploma meets the requirements. For example, there are pedagogues who are allowed to work at the BSO but not at a baby group."}/>
                                </div>
                            </div>
                        </div>
            </div>
            <div className="contact-useful-links">
                    <h2>
                        other questions:
                    </h2>
                    <div className='contact-us-text'>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    How do you recruit candidates?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                Curant24 is a platform where freelancers and clients from every conceivable industry do business with each other.
                                <br />
                                Clients have the option to search for freelancers for free in our extensive database for their project. Or can immediately call on the help of Curant24. And vice versa, freelancers can search for the most current projects on Curant24
                                Curant 24 was founded in 2009 and has offices in various countries worldwide. Curant24 is an intermediary agency that brings freelancers from every industry together with clients.
                                <br />
                                Curant24 is part of NatureTower bv with more than 100 employees worldwide.
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    How long does it take to hire a candidate?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                On Curant24 you will find various assignments for you as a freelancer. From plumber to childcare. First you create a Curant24 account and then you view the available assignments. Is there something interesting in there? Then click on 'I am interested' and let the client know that you are interested.
                                <br />
                                Is the client also interested in your services?
                                Then we discuss all the conditions of the project together with the client. So that there are no surprises for both parties. If everything has been properly discussed and both parties agree to the terms and conditions.
                                <br />
                                Then Curant24 does the rest and we arrange all administration between both parties.
                                You only need to submit your work hours weekly in your Curant24 account. Your invoice is automatically generated from the system every Tuesday and sent to the client.
                                This is all neatly stored in your account.
                                <br />
                                And you can choose when you have the invoices paid, 7, 14 or 30 days
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    What if I hire someone myself?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                You can sign up for free and without obligation via the www.Curant24.nl platform, via this <Link to={"/join"} style={{color:"#70b157"}}>link</Link>
                            </p>
                        </div>
                    </div>
            </div>
            <div className='contact-sign-up-here'>
                        <div className="contact-sign-up-here-bg">
                            <img src="/images/register_project_img.jpg"  alt="" />
                        </div>
                        <div className='contact-sign-up-here-text'>
                            <h1>
                                Get in touch.
                            </h1>
                            <p>
                                Would you like to talk to us first about your vacancy, the <br />
                                services or our working method? That's possible ! <br />
                                Schedule an appointment, with one of our advisors. The <br />
                                appointment can be made by telephone or via a video connection.
                            </p>
                            <Link to="/">
                                <button>
                                    Schedule an appointment
                                </button>
                            </Link>
                        </div>
            </div>
        <Footer/>
    </div>
  )
}
