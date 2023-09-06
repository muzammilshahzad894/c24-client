import React from 'react'
import { Link } from 'react-router-dom'
import FaqQuestion from '../../FaqQuestion/FaqQuestion'
import "./HomeDescriptionClient.scss"

export default function HomeDescriptionClient() {
  return (
    <div className='home-description-client-wrapper'>
        <div className="home-description-client-element">
            <div style={{width:"400px",marginLeft:"10%"}}>
                <h3>
                    For all your projects, there is always <br />
                    one suitable qualified freelancer <br />
                    can be found at Curant24
                </h3>
                <p>
                    Choose from more than 4000+ freelancers from our network, or let someone from our <br />
                    team support you in finding a suitable freelancer.
                </p>
                <div className='home-description-client-buttons'>
                    <Link to="/register?user=client">
                        <button>
                            Register as Client
                        </button>
                    </Link>
                    <Link to="/search">
                        <button>
                            Find freelancers
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="home-description-client-element">
            <div className='home-description-client-second-elt'>
                <div className='home-description-client-elt-column-wrapper'>
                    <div>

                    </div>
                    <div>
                        <div>
                            <strong>
                                12 years of experience
                            </strong>
                            <p>
                                Curant24 has been active for almost 12 years in mediating freelancers in at home and abroad.
                                <br />
                                <br />
                                As a result, we have an extensive database of build qualified freelancers who are always looking for <br />
                                new projects. When reporting sick, a reserve rotation can be used
                            </p>
                        </div>
                        <div>
                            <strong>
                                Always a suitable freelancer for your project
                            </strong>
                            <p>
                                We are active and have experience in every industry <br />
                                from a plumber to childcare.
                            </p>
                        </div>
                        <div>
                            <strong>
                                What is possible at Curant24
                            </strong>
                            <p>
                                1 : Post unlimited projects <br />
                                2 : invite unlimited freelancers to your project <br />
                                3 : View unlimited profiles in our freelance database <br />
                                4 : Create a company profile and be visible to freelancers <br />
                                <br />
                                Everything is completely free of charge, no hidden costs
                            </p>
                        </div>
                        <div>
                            <strong>
                                No more overopacity
                            </strong>
                            <p>
                                And free cancellation up to 24 hours before the start of the service.
                                <br />
                                Outflow of freelancers to permanent employement is free of charge
                            </p>
                        </div>
                    </div>
                </div>
                <div className='home-description-client-elt-column-wrapper'>
                    <div>
                        <div style={{textAlign:"center"}}>
                            <strong style={{fontSize:"22px",color:"rgb(31, 119, 54)"}}>
                                Why choose Curant24
                            </strong>
                            <p style={{alignSelf:"start"}}>
                                Curant24 mediates companies and organasations with freelancers for a fair <br />
                                hourly rate.
                                <br />
                                <br />
                                We help in the event of a breakdown or to quickly absorb staff shortages <br />
                                Curant24 is the flexible substitute pool in childcare.
                            </p>
                        </div>
                    </div>
                    <div className='home-description-client-second-elt-img'>
                        <img src="/images/logo.png" alt="" />
                    </div>
                </div>
                <div className='home-description-client-elt-column-wrapper'>
                    <div>

                    </div>
                    <div>
                        <div>
                            <strong>
                                Take over administration and ivoicing 
                            </strong>
                            <p>
                                We take over the entire administration and invoicing <br />
                                you only have to check the time sheets and invoices <br />
                                and we <br />
                                do the rest
                            </p>
                        </div>
                        <div>
                            <strong>
                                Curant24 own invoicing system
                            </strong>
                            <p>
                                An overview of all freelancer working hours, invoices, contracts <br />
                                and receipts in your account. No more looking for receipt, <br />
                                invoice or job sheet.
                            </p>
                        </div>
                        <div>
                            <strong>
                                Full screening freelancer
                            </strong>
                            <p>
                                We take the screening of the freelancers who work <br />
                                through us <br />
                                full about. We check all documents, work past correct qualifications, followed by an intake interview. 
                                <br />
                                <br />
                                So that you only come to work with real professional
                            </p>
                        </div>
                        <div>
                            <strong>
                                Fast delivery freelancers
                            </strong>
                            <p>
                                Because we have a large database of freelancers and work on <br />
                                based on the availability of the freelancers. <br />
                                <br />
                                We can take immediate action and mediate the freelancers who can be deployed immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-client-element">
            <div className="home-description-client-third-elt">
                <h3 style={{color:"rgb(31, 119, 54)"}}>
                    <b>
                        Why choose Curant24
                    </b>
                </h3>
                <div className="home-description-client-third-elt-container">
                    <div className="home-description-client-third-elt-container-elt">
                        <img src="/images/client_home_page_section_img1.PNG" alt="" />
                        <div>
                            <strong>
                                Step 1: Register as a client
                            </strong>
                            <p>
                                Create an account on Curant24.nl, and <br />
                                fill in your company profile completely
                            </p>
                        </div>
                    </div>
                    <div className="home-description-client-third-elt-container-elt">
                        <img src="/images/client_home_page_section_img2.PNG" alt="" />
                        <div>
                            <strong>
                                Step 2: Post project
                            </strong>
                            <p>
                                Get started right away, and post a project. <br />
                                So that freelancers can view your project and react.
                            </p>
                        </div>
                    </div>
                    <div className="home-description-client-third-elt-container-elt">
                        <img src="/images/client_home_page_section_img3.PNG" alt="" />
                        <div>
                            <strong>
                                Step 3: Invite freelancers
                            </strong>
                            <p>
                                Check out our freelance database to <br />
                                find and invite a suitable freelancer to <br />
                                view your project
                            </p>
                        </div>
                    </div>
                    <div className="home-description-client-third-elt-container-elt">
                        <img src="/images/client_home_page_section_img4.PNG" alt="" />
                        <div>
                            <strong>
                                Step 4: Waiting for responses
                            </strong>
                            <p>
                                The chosen freelancers will receive a message , <br />
                                you will receive a message if there is a match.
                            </p>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        <div className="home-description-client-element">
            <div className="home-description-client-fourth-elt">
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
                    <div className="home-description-client-fourth-elt-search">
                        <input type="text" placeholder='Type your keywords here.' onChange={()=>window.location.replace("/faq")}/>
                        <button>
                            Seek
                        </button>
                    </div>
                    <div className="home-description-client-fourth-elt-faqs">
                        <FaqQuestion question="I am already registered with the Chamber of Commerce as an independent entrepreneur. Can I pass on the same Chamber of Commerce number/excerpt?" answer="If you are already self-employed or self-employed, you are already registered with the Chamber of Commerce (KvK). You do not need to re-register to get started at Curant24."/>
                        <FaqQuestion question="I have experience in childcare, but my diplomat no longer qualifies?" answer={"On Curant24 you will find various assignments for you as a freelancer. From plumber to childcare. First you create a Curant24 account and then you view the available assignments. Is there anything interesting in there? Then click on 'I am interested' and let the client know that you are interested.\nIs the client also interested in your services?\nThen we discuss all the conditions of the project together with the client. So that there are no surprises for both parties. If everything has been properly discussed and both parties agree to the terms and conditions.\nThen Curant24 does the rest and we arrange all administration between both parties.\nYou only need to submit your work hours weekly in your Curant24 account. Your invoice is automatically generated from the system every Tuesday and sent to the client.\nThis is all neatly stored in your account.\nAnd you can choose when you have the invoices paid, 7, 14 or 30 days\n"}/>
                        <FaqQuestion question="I am already self-employed - do I have to re-register with the Chamber of Commerce?" answer={"If you are already self-employed or self-employed, you are already registered with the Chamber of Commerce (KvK). You do not need to re-register to get started at Curant24."}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-description-client-element">
            <div className="home-description-client-fifth-elt">
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
                <div className="home-description-client-buttons">
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
