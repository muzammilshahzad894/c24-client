import React from 'react'
import { Link } from 'react-router-dom'
import FaqQuestion from '../../FaqQuestion/FaqQuestion'
import "./HomeDescriptionFreelancer.scss"

export default function HomeDescriptionFreelancer() {
  return (
    <div className='home-description-freelancer-wrapper'>
        <div className="home-description-freelancer-element">
            <div style={{width:"400px",marginLeft:"10%"}}>
                <h3>
                    For every freelancer, a appropriate <br />
                    project at Curant24
                </h3>
                <p>
                    Welcome to our website, sign up directly as a freelancer. <br />
                    To be able to respond to projects immediately.
                </p>
                <div className='home-description-freelancer-buttons'>
                    <Link to="/register?user=freelancer">
                        <button>
                            Register as a freelancer
                        </button>
                    </Link>
                    <Link to="/search">
                        <button>
                            Search projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">   
            <div className='home-description-freelancer-second-elt'>
                <div className='home-description-freelancer-elt-column-wrapper'>
                    <div>
                        <div style={{textAlign:"center"}}>
                            <strong style={{fontSize:"22px",color:"rgb(31, 119, 54)"}}>
                                Why choose Curant24
                            </strong>
                            <p style={{alignSelf:"start"}}>
                                Many freelancers have already preceded you by collaborating with <br />
                                Curant24. Below are a number of advantages that you have when you work with us.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='home-description-freelancer-elt-wrapper'>
                    <div className='home-description-freelancer-elt-column-wrapper'>    
                        <div>
                            <div>
                                <strong>
                                    No hidden costs
                                </strong>
                                <p>
                                    Everything is completely free for the professional, free <br />
                                    registeration no commission, no fees or hidden costs
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Flexibility
                                </strong>
                                <p>
                                    You can indicate in your online agenda (my curant24 account) <br />
                                    when you can work you decide which services you accept.
                                </p>
                            </div>
                            <div>
                                <strong>
                                    12 years of experience
                                </strong>
                                <p>
                                    Curant24 has been active for almost 12 years in mediating freelancers in at home and abroad.
                                    <br />
                                    <br />
                                    As a result, we have an extensive database of build qualified freelancers who are always looking for <br />
                                    qualified freelancers
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Payouts
                                </strong>
                                <p>
                                    Decide for yourself when you get paid.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='home-description-freelancer-elt-column-wrapper'>
                        <div>
                            <div>
                                <strong>
                                    Administration and ivoicing 
                                </strong>
                                <p>
                                    We take over the entire administration and invoicing from you <br />
                                    you only have to hand in your timesheet and we'll do the rest
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Curant24 own invoicing system
                                </strong>
                                <p>
                                    An overview of all working hours, invoices, and <br />
                                    receipts in your account. No more looking for receipt, <br />
                                    invoice or job sheet.
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Becoming an independent entrepeneur
                                </strong>
                                <p>
                                    Curant24 helps you step by step to become a freelancer. <br />
                                    More information.
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Always a suitable project based on your preferences
                                </strong>
                                <p>
                                    We are active and have experience in every industry <br />
                                    from plumber to childcare
                                </p>
                            </div>
                            <div>
                                <strong>
                                    Good earnings
                                </strong>
                                <p>
                                    You decide for which rate you want to work.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">
            <div className="home-description-freelancer-childcare">
                <div style={{textAlign:"center"}}>
                    <h3 style={{color:"rgb(31, 119, 54)"}}>
                        <b>
                            Freelancers wanted in childcare
                        </b>
                    </h3>
                    <p>
                        We have plenty of childcare projects. View directly <br />
                        based on your diplomas where you can work.
                    </p>
                </div>
                <div className='home-description-freelancer-childcare-diploma-check'>
                    <div>
                        <h3>
                            Diplomat check
                        </h3>
                        <p>
                            Fill in your diploma and see which sectors you can work
                        </p>
                    </div>
                    <div className='home-description-freelancer-childcare-diploma-check-inputs'>
                        <input type="text" placeholder='Choose your diploma' />
                        <button>
                            Check
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">
            <div className="home-description-freelancer-third-elt">
                <h3 style={{color:"rgb(31, 119, 54)"}}>
                    <b>
                        Why choose Curant24
                    </b>
                </h3>
                <div className="home-description-freelancer-third-elt-container">
                    <div className="home-description-freelancer-third-elt-container-elt">
                        <img src="/images/freelancer_home_page_section_img1.PNG" alt="" />
                        <div>
                            <strong>
                                Step 1: Register as a freelancer
                            </strong>
                            <p>
                                Create an account on Curant24.nl.
                            </p>
                        </div>
                    </div>
                    <div className="home-description-freelancer-third-elt-container-elt">
                        <img src="/images/freelancer_home_page_section_img2.PNG" alt="" />
                        <div>
                            <strong>
                                Step 2: Screening
                            </strong>
                            <p>
                                For certain professions such as working <br />
                                in childcare we first do a Screening whether <br />
                                you are suitable for the posision
                            </p>
                        </div>
                    </div>
                    <div className="home-description-freelancer-third-elt-container-elt">
                        <img src="/images/freelancer_home_page_section_img3.PNG" alt="" />
                        <div>
                            <strong>
                                Step 3: Profile complete
                            </strong>
                            <p>
                                Enter your availability in your account and <br />
                                now receive comments from companies or <br />
                                respond yourself on assignements.
                            </p>
                        </div>
                    </div>
                    <div className="home-description-freelancer-third-elt-container-elt">
                        <img src="/images/freelancer_home_page_section_img4.PNG" alt="" />
                        <div>
                            <strong>
                                Step 4: Getting started 
                            </strong>
                            <p>
                                Do what you are good at, and Curant24 <br />
                                takes care of the rest such as the administration and billing
                            </p>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">
            <div className="bg-img">
                <img src="/images/logo.png" alt="" />
            </div>
            <div className="home-description-freelancer-element-form">
                <div>
                    <div>
                        <div>
                            <h3>
                                <b>
                                    Start Working  as a freelancer <br />
                                    right away. What do i need ?
                                </b>
                            </h3>
                            <p>
                                <b>
                                    The following is required to work as a freelancer.
                                </b>
                            </p>
                        </div>
                        <div>
                            <p>
                                1: You need a valid diploma for childcare <br />
                                Do the diploma check immediately to see where you can work with <br />
                                your diplomas
                                <br />
                                <br />
                                2: Registeration in the childcare register.
                                <br />
                                <br />
                                3: Buisness Liability Insurance. 
                                <br />
                                4: Registeration with the Chamber of Commerce.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>
                            <b>
                                I want to become a freelancer <br />
                                what steps should i take?
                            </b>
                        </h3>
                        <p>
                            For example, if you do not have a valid VOG, have not yet been <br />
                            registered with the Chamber of Commerce or other important <br />
                            documents are still missing.
                            <br />
                            <br />
                            No problem, contact us and we will gladly help you step by step to <br />
                            become a freelancer. And help you immediatly with your first <br />
                            freelance assignement.
                            <br />
                            <br />
                            We have a special team that guides you in this . <br />
                            Please fill in the details below and we will contact you within 1 day.
                            <br />
                            <br />
                            If you have not received an email after 1 day, please check your <br />
                            spam box <br />
                            or contact us. To put everything into operation immediately 
                        </p>
                    </div>
                    <div className='home-description-freelancer-element-form-inputs'>
                        <div style={{display:"flex",justifyContent:"space-evenly"}}>
                            <div style={{flexDirection:"column"}}>
                                <span> 
                                    Name :
                                </span>
                                <input type="text" />
                            </div>
                            <div style={{flexDirection:"column"}}>
                                <span>
                                    Last name:
                                </span>
                                <input type="text" />
                            </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-evenly"}}>
                            <div style={{flexDirection:"column"}}>
                                <span>
                                    E-mail adress:
                                </span>
                                <input type="text" />
                            </div>
                            <div style={{flexDirection:"column"}}>
                                <span>
                                    Phone number
                                </span>
                                <input type="text" />
                            </div>
                        </div>
                        <div className='home-description-freelancer-buttons' style={{marginTop:"10px",marginLeft:"20px"}}>
                            <button>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">
            <div className="home-description-freelancer-fourth-elt">
                <div style={{textAlign:"center",marignBottom:"20px"}}>
                    <h3 style={{color:"rgb(31, 119, 54)"}}>
                        <b>
                            FAQ 
                        </b>
                    </h3>
                    <p>
                        If you still have questions, maybe your question is in our FAQ. <br />
                        If not, please <Link to="/contact"  style={{color:"rgb(31, 119, 54)"}}>contact</Link> us and we will be happy to help you.
                    </p>
                </div>
                <div>
                    <div className="home-description-freelancer-fourth-elt-search">
                        <input type="text" placeholder='Type your keywords here.' onChange={()=>window.location.replace("/faq")}/>
                        <button>
                            Seek
                        </button>
                    </div>
                    <div className="home-description-freelancer-fourth-elt-faqs">
                        <FaqQuestion question="I am already registered with the Chamber of Commerce as an independent entrepreneur. Can I pass on the same Chamber of Commerce number/excerpt?" answer="If you are already self-employed or self-employed, you are already registered with the Chamber of Commerce (KvK). You do not need to re-register to get started at Curant24."/>
                        <FaqQuestion question="I have experience in childcare, but my diplomat no longer qualifies?" answer={"On Curant24 you will find various assignments for you as a freelancer. From plumber to childcare. First you create a Curant24 account and then you view the available assignments. Is there anything interesting in there? Then click on 'I am interested' and let the freelancer know that you are interested.\nIs the freelancer also interested in your services?\nThen we discuss all the conditions of the project together with the freelancer. So that there are no surprises for both parties. If everything has been properly discussed and both parties agree to the terms and conditions.\nThen Curant24 does the rest and we arrange all administration between both parties.\nYou only need to submit your work hours weekly in your Curant24 account. Your invoice is automatically generated from the system every Tuesday and sent to the freelancer.\nThis is all neatly stored in your account.\nAnd you can choose when you have the invoices paid, 7, 14 or 30 days\n"}/>
                        <FaqQuestion question="I am already self-employed - do I have to re-register with the Chamber of Commerce?" answer={"If you are already self-employed or self-employed, you are already registered with the Chamber of Commerce (KvK). You do not need to re-register to get started at Curant24."}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-freelancer-element">
            <div className="home-description-freelancer-fifth-elt">
                <div style={{textAlign:"center",marginBottom:"10px"}}>
                    <h3 style={{color:"rgb(31, 119, 54)"}}>
                        <b>
                            Contact Curant23, we are happy to help you
                        </b>
                    </h3>
                    <p>
                        Want to know more about Curant24, we would like to get <br />
                        in touch with you. See below how to get in touch with us
                    </p>
                </div>
                <div className="home-description-freelancer-buttons">
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
    </div>
  )
}
