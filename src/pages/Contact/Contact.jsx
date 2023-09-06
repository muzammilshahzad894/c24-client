import React, { useEffect } from 'react'
import "./contact.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ContactHeader from '../../components/ContactHeader/ContactHeader';
import { Link, useLocation } from 'react-router-dom';
import FaqQuestion from '../../components/FaqQuestion/FaqQuestion';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

export default function Contact() {
    const location = useLocation();
    const contact_us_email = useSelector(state=>state.contact_us_email);
    useEffect(()=>{
        window.scrollTo(0,0);
    },[contact_us_email])
  return (
        <div className='contact'>
            <Header contact/>
            <ContactHeader client={location.search?.replace("?user=","")==="client"}/>
            {
                location.search?.replace("?user=","")==="client"?(
                    <>
                        <div className='contact-texts'>
                            <h2>
                                Contact us
                            </h2>
                            <div className='contact-us-text'>
                                <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                                    <div>
                                        <h3>
                                            Head office Curant24
                                        </h3>
                                        <AiOutlinePlus/>
                                    </div>
                                    <p>
                                        Visiting address: <br />
                                        <span style={{color:"#e9260c"}}>
                                            ! Please note, you can only come by appointment. Then we have all the time for you when you come.
                                        </span> 
                                        <br />
                                        <br />
                                        Curant24 Nederland <br />
                                        Siergaarde 163 <br />
                                        2285 JG Rijswijk <br />
                                        Nederland <br />
                                        <br />
                                        Mailing address: <br /> <br />
                                        Curant24 Nederland <br /> 
                                        Siergaarde 163  <br />
                                        2285 JG Rijswijk  <br /><br />
                                    </p>
                                </div>
                                <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                                    <div>
                                        <h3>
                                            Telephone contact
                                        </h3>
                                        <AiOutlinePlus/>
                                    </div>
                                    <p>
                                        070-3841101 <br />
                                        ( General number, working days 8:30 am - 5:30 pm ) <br />
                                        <br />
                                        06-23045825 <br />
                                        ( General number, 24 hours ) <br />
                                    </p>
                                </div>
                                <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                                    <div>
                                        <h3>
                                            Our labels and specialties 
                                        </h3>
                                        <AiOutlinePlus/>
                                    </div>
                                    <p>
                                        <span style={{color:"#e9260c"}}>
                                            If you call the 070 number, you will automatically be connected to the right department. <br />
                                        </span>
                                        <br />
                                        <b>
                                            Curant24 Netherlands Offer projects (for clients)
                                        </b>
                                        <br />
                                        Do you want to offer a large project for which you need several freelancers?<br />
                                        Then call the number below <br />
                                        <br />
                                        070-3841101 (choice 1) <br /> 
                                        <br />
                                        <b>
                                            Curant24 Netherlands Screening & mediation of freelancers (for clients)
                                        </b>
                                        <br />
                                        If you would like more information about the screening and mediation of freelancers, please call the number below. <br />
                                        <br />
                                        070-3841101 (choice 2) <br />
                                        <br />
                                        <b>
                                            Curant24 Netherlands Find assignments & register as a freelancer (for freelancers) 
                                        </b>
                                        <br />
                                        If you would like more information on how to search for assignments and register as a freelancer, please call the number below. <br />
                                        <br />
                                        070-3841101 (choice 3) <br /> <br />
                                    </p>
                                </div>
                                <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                                    <div>
                                        <h3>
                                            Contact Form
                                        </h3>
                                        <AiOutlinePlus/>
                                    </div>
                                    <p>
                                        Prefer email? Use the <Link to="/contact-form" state={{client:"client",form:true}}> contact form. </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-useful-links">
                            <h2>
                                Useful links
                            </h2>
                            <div className='contact-links'>
                                <Link to="/contact?user=freelancer">
                                    Contact for employees
                                </Link>
                                <Link to="/register-project">
                                    Register an assignment
                                </Link>
                                <Link to="/dashboard">
                                    My Curant24
                                </Link>
                                <Link to="/contact">
                                    Contact
                                </Link>
                            </div>
                        </div>  
                    </>
                ):(
                    <>
                        <div className='contact-can-we-help-you'>
                            <div>
                                <h3>
                                    Can we help you further?
                                </h3>
                                <Link to="/contact-form" state={{client:"freelancer",form:true}}>
                                    <button>
                                        To our contact form
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <p>
                                    Do you have a question? We are happy to help you. First look below at the <br />
                                    frequently asked questions and answers whether your question can be <br />
                                    answered directly. Is the answer to your question not listed? Then ask him <br />
                                    via the <Link to="/contact-form">contact form</Link>. You will receive a response as soon as possible.
                                </p>
                            </div>
                        </div>
                        <div className='contact-faq'>
                            <div className="contact-faq-bar">
                                <div style={{textAlign:"center",marignBottom:"20px"}}>
                                    <h3>
                                        <b style={{color:"rgb(31, 119, 54)"}}>
                                            Frequently Asked 
                                        </b>
                                        <b>
                                            {" "}Questions
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
                                        <FaqQuestion question="How does Curant24 work for freelancers?" answer={" On Curant24 you will find various assignments for you as a freelancer. From plumber to childcare. First you create a Curant24 account and then you view the available assignments. Is there something interesting in there? Then click on 'I am interested' and let the client know that you are interested. \n Is the client also interested in your services? \n Then we discuss all the conditions of the project together with the client. So that there are no surprises for both parties. If everything has been properly discussed and both parties agree to the terms and conditions. \n Then Curant24 does the rest and we arrange all administration between both parties. \n You only need to submit your work hours weekly in your Curant24 account. Your invoice is automatically generated from the system every Tuesday and sent to the client. \n This is all neatly stored in your account.\n And you can choose when you have the invoices paid, 7, 14 or 30 days."}/>
                                        <FaqQuestion question="Why freelancers choose Curant24?" answer={"Curant24 is specialized internationally and nationally and is active in every industry. Thanks to our broad knowledge of the profession, we know better than anyone else what each industry looks like and what the possibilities are.\nBecause of the good cooperation with clients over the years who use our platform to place their projects. Can we offer you as freelancers a valuable offer?\n"}/>
                                        <FaqQuestion question="What makes Curant24 different from other agencies?" answer={"Various consultants work at Curant24, all of whom have knowledge of their industry. Thanks to our experience, knowledge and close cooperation with companies, organizations and freelancers, we know what is needed within a company or organization to successfully complete a project.\nWe strive to take a project to a higher level by not only looking at the required qualities of the freelancer. But we also look at the person, does the freelancer fit in with the organization or company? We know from experience that a match on paper is not always a match.\n"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='contact-social'>
                            <div>
                                <h3>
                                    Contact via <br />
                                    social media
                                </h3>
                            </div>
                            <div className='contact-social-links'>
                                <p>
                                    We are responsible on social media on weekdays from 08:30 - 17:00. You will <br />
                                    receive a response from us within an hour.
                                </p>
                                <div>
                                    <p>
                                        <AiOutlineCheck/>
                                        Ask your question via Facebook
                                    </p>
                                    <p>
                                        <AiOutlineCheck/>
                                        Ask your question via Linkedin
                                    </p>
                                    <p>
                                        <AiOutlineCheck/>
                                        Ask your question via Twitter
                                    </p>
                                    <p>
                                        <AiOutlineCheck/>
                                        Ask your question via Instagram
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='contact-sign-up-here'>
                            <div className="contact-sign-up-here-bg">
                                <img src="/images/contact_sign_up_img_blurred.jpg" className='blur' alt="" />
                                <img src="/images/contact_sign_up_img.jpg" alt="" />
                            </div>
                            <div className='contact-sign-up-here-text'>
                                <h1>
                                    Sign up now.
                                </h1>
                                <p>
                                    Start your account easily and effectively and create your <br/>
                                    own account
                                </p>
                                <Link to="join">
                                    <button>
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="contact-contact-us-container">
                            <div className="contact-contact-us">
                                <div style={{textAlign:"center",marginBottom:"10px"}}>
                                    <h3 style={{color:"rgb(31, 119, 54)"}}>
                                        <b>
                                            Contact Curant24, we are happy to help you
                                        </b>
                                    </h3>
                                    <p>
                                        Want to know more about Curant24, we would like to get <br />
                                        in touch with you. See below how to get in touch with us
                                    </p>
                                </div>
                                <div className="contact-contact-us-buttons">
                                    <button>
                                        Email us
                                    </button>
                                    <button>
                                        Whatsapp us
                                    </button>
                                    <button>
                                        I want to contact by phone
                                    </button>
                                    <button>
                                        I want to be called back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <Footer/>
        </div>
  )
}
