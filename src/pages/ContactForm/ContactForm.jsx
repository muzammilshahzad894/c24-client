import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ContactHeader from '../../components/ContactHeader/ContactHeader'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { send_contact_mail_action } from '../../state/Actions/UserAction';
import "./contactForm.scss"

export default function ContactForm() {
    const location = useLocation();
    const user_info = useSelector(state=>state.user_info);
    const contact_us_email = useSelector(state=>state.contact_us_email);
    const [files, setFiles] = useState([])
    const [error, setError] = useState(null)


    const dispatch = useDispatch();
    const contactEmail= useRef({});

    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files)
            if(event.target.files[0]?.name.includes("pdf") || event.target.files[0]?.name.includes("docs")){
                setFiles([...files, Object.assign(event.target.files[0], {
                    preview: URL.createObjectURL(event.target.files[0]),
                    image_type:"pdf"
                  })])
            }else{
                setFiles([...files, Object.assign(event.target.files[0], {
                    preview: URL.createObjectURL(event.target.files[0]),
                    image_type:"pdf"
                })])
            }
        }
    };
    
    const deleteFile = (id)=>{
        setFiles(files.filter((item,idx)=>idx!==id));
    };

    const sendContactEmail = ()=>{
        let formdata = new FormData();
        let info = {};
        let message = `
        <h1>
        New contact email from a ${(location.state?.client)||user_info.user?.account_type}
        </h1>
        <p>
        <b>
        `;
        for(const [key,value] of Object.entries(contactEmail.current)){
            let v = (typeof(value)==="string"?value:value.value);
            info[key] = v;
            message+=` ${key.replaceAll("_"," ")} : ${v} <br/>`
        }
        message+=`
        </b>
        </p>
        `;
        setError(null)
        console.log(Object.entries(info)?.filter(item=>item[1]?.length>0))
        if((Object.entries(info)?.filter(item=>item[1]?.length>0).length === 8  &&  (location.state?.client==="client"||user_info.user?.account_type==="client")) || (Object.entries(info)?.filter(item=>item[1]?.length>0).length === 4  &&  (location.state?.client==="freelancer"||user_info.user?.account_type==="freelancer"))){
            info.message = message;
            formdata.set("info",JSON.stringify(info));
            files.map((file,index)=>{
                formdata.set("file"+index,file)
                return index;
            })
            console.log(info)
            dispatch(send_contact_mail_action(formdata,user_info.user?.token))
        }else{
            setError("Pleae note, you must fill in all fields marked with * ")
        }
    }

    useEffect(()=>{
        window.scrollTo(0,0)
        setTimeout(() => {
            contact_us_email.data = null
        }, 1000);
    },[contact_us_email,error])
  return (
    contact_us_email.loading?(
        <LoadingBox/>
    ):(
    <div className='contact-form'>
        <Header contact/>
        <ContactHeader form={location.state?.form} client={location.state?.client}/>
        {
            error && (
                <div className='message-box-contact-form' id="error-box-form">
                    <p>
                        {
                            error
                        }
                    </p>
                    <AiFillCloseCircle onClick={()=>{setError(null);document.getElementById('error-box-form').style.display = "none"}}/>
                </div>
            )
        }
        {
            contact_us_email.data&&(
            <div className='message-box-contact-form' id="message-box-form">
                <p>
                    Thanks for your message. We have received the <br />
                    completed form. One of our account managers will <br />
                    contact you as soon as possible and will be happy to <br />
                    help you.
                </p>
                <AiFillCloseCircle onClick={()=>{contact_us_email.data = null;document.getElementById('message-box-form').style.display = "none"}}/>
            </div>
            )
        }
        {
            (location.state?.client==="client"||user_info.user?.account_type==="client")?(
                <div>
                    <div className="contact-us-form">
                        <div>
                            <h2>
                                Contact us
                            </h2>
                        </div>
                        <div className='contact-us-form-inputs'>
                            <div>
                                <span>
                                    salutation *
                                </span>
                                <div style={{flexDirection:"row",alignItems:"center"}}>
                                    <input type="radio" name="salutation" onChange={e=>e.target.checked&&(contactEmail.current["salutation"] = "Mr")} id=""   />
                                    <span>
                                        Mr.
                                    </span>
                                </div>
                                <div style={{flexDirection:"row",alignItems:"center"}}>
                                    <input type="radio" name="salutation" onChange={e=>e.target.checked&&(contactEmail.current["salutation"] = "Mrs")} id="" />
                                    <span>
                                        Mrs
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span>
                                    first name *
                                </span>
                                <input type="text" name='first_name' ref={ref=>ref!==null&&(contactEmail.current["first_name"] = ref)} />
                            </div>
                            <div>
                                <span>
                                    surname *
                                </span>
                                <input type="text" name='surname' ref={ref=>ref!==null&&(contactEmail.current["surname"] = ref)} />
                            </div>
                            <div style={{borderBottom:"1px #ccc solid"}}>
                                <span>
                                    email*
                                </span>
                                <input type="text" name="email" ref={ref=>ref!==null&&(contactEmail.current["email"] = ref)} />
                            </div>
                            <div>
                                <span>
                                    telephone number *
                                </span>
                                <input type="text" name="phone_no" ref={ref=>ref!==null&&(contactEmail.current["phone_no"] = ref)} />
                            </div>
                            <div style={{borderBottom:"1px #ccc solid"}}>
                                <span>
                                    Company *
                                </span>
                                <input type="text" name="company" ref={ref=>ref!==null&&(contactEmail.current["company"] = ref)} />
                            </div>
                            <div style={{borderBottom:"1px #ccc solid"}}>
                                <span>
                                   company location *
                                </span>
                                <input type="text" name="company_location" ref={ref=>ref!==null&&(contactEmail.current["company_location"] = ref)} />
                            </div>
                            <div>
                                <span>
                                    Contact me about *
                                </span>
                                <textarea name="contact_me_about" ref={ref=>ref!==null&&(contactEmail.current["contact_me_about"] = ref)} id="" cols="49" rows="10" maxLength={1000}></textarea>
                                <span style={{color:"#ccc"}}>
                                    (max 1000 characters):
                                </span>
                            </div>
                            <div>
                                <span style={{color:"#555"}}>
                                    Your privacy is important to us <b style={{color:"rgb(231, 12, 12)"}}>Curant24</b> handles your personal data <br />
                                    with care. see more about this in our privacy statement.
                                </span>
                                <button  onClick={()=>sendContactEmail()}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us-can-we-help-you" style={{backgroundColor:"rgb(0, 103, 158)",color:"white"}}>
                        <p>
                            See also
                        </p>
                        <Link to="" style={{color:"white"}}>
                            Register a project
                        </Link>
                        <Link to="/faq" style={{color:"white"}}>
                            FAQ
                        </Link>
                        <Link to="/search" style={{color:"white"}}>
                            Find a freelancer
                        </Link>
                    </div>
                    <div className='contact-sign-up-here'>
                        <div className="contact-sign-up-here-bg">
                            <img src="/images/send_project_now_contact_us.jpg" alt="" />
                        </div>
                        <div className='contact-sign-up-here-text'>
                            <h1>
                                Send your assignement <br />
                                now.
                            </h1>
                            <p>
                                Are you looking for a freelancer. Post <br />
                                an assignement and we will find a suitable <br />
                                freelancer.
                            </p>
                            <Link to="/">
                                <button>
                                    Send
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ):(
            <div>
                <div className='contact-texts'>
                    <h2>
                        Contact us
                    </h2>
                    <div className='contact-us-text'>
                        <p>
                            Do you have a question for <b>Curant24?</b>  We are happy to help you. First <br />
                            check below whether the subject of your question is listed. Do you have <br />
                            another question? Fill in the form below and we will answer you as soon as <br />
                            possible.
                            <br />
                            <br />
                            <br />
                            Please note that this form is not intended for applications and enrolements. <br />
                            You can apply for an <b>Assignement</b> via the application button for <b>our assignements</b>. <br />
                            You can register on the <Link to="/join">Registration page </Link>.
                        </p>
                    </div>
                </div>
                <div className="contact-useful-links">
                    <h2>
                        My question is about:
                    </h2>
                    <div className='contact-us-text'>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    What is Curant24?
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
                                    How does Curant24 work for freelancers?
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
                                How do I create a Curant24 account (profile)?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                You can sign up for free and without obligation via the www.Curant24.nl platform, via this <Link to={"/join"} style={{color:"#70b157"}}>link</Link>
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    Why freelancers choose Curant24
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                            Curant24 is specialized internationally and nationally and is active in every industry. Thanks to our broad knowledge of the profession, we know better than anyone else what each industry looks like and what the possibilities are. <br />
                            Because of the good cooperation with clients over the years who use our platform to place their projects. Can we offer you as freelancers a valuable offer?
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    Can you work via Curant24 if you are also employed?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                Depending on the agreements you have with your employer, you can be employed and also work as a freelancer
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    I would like to apply for a VOG, is that possible via Curant24?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                Send us an email with your full name, initials and surname and we can send you a pre-completed VOG - application form. You can email your request to: info@curant24.nl
                            </p>
                        </div>
                        <div onClick={e=>e.target.parentElement?.classList?.contains("contact-us-text-elt")?e.target.parentElement.classList.toggle("active"):e.target.parentElement?.parentElement?.classList.toggle("active")} className="contact-us-text-elt">
                            <div>
                                <h3>
                                    Are there enough assignments within my competences?
                                </h3>
                                <AiOutlinePlus/>
                            </div>
                            <p>
                                Curant24 is active in every industry, thanks to our many contacts with different clients. We always have enough assignments in every competence.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="contact-us-form">
                    <div>
                        <h2>
                            Contact
                        </h2>
                    </div>
                    <div className='contact-us-form-inputs'>
                        <div>
                            <span>
                                name *
                            </span>
                            <input type="text" name='name' ref={ref=>ref!==null&&(contactEmail.current["name"] = ref)} />
                        </div>
                        <div>
                            <span>
                                telephone *
                            </span>
                            <input type="text" name="phone_no" ref={ref=>ref!==null&&(contactEmail.current["phone_no"] = ref)} />
                        </div>
                        <div style={{borderBottom:"1px #ccc solid"}}>
                            <span>
                                e-mail address *
                            </span>
                            <input type="text" name="email" ref={ref=>ref!==null&&(contactEmail.current["email"] = ref)} />
                        </div>
                        <div>
                            <span>
                                Contact me about *
                            </span>
                            <textarea name="contact_me_about" ref={ref=>ref!==null&&(contactEmail.current["contact_me_about"] = ref)} id="" cols="49" rows="10"  maxLength={1000}></textarea>
                            <span style={{color:"#ccc"}}>
                                (max 1000 characters):
                            </span>
                        </div>
                        <div>
                            <span>
                                or upload your document
                            </span>
                            <input type="file" name="document" id="doc" /*accept='.doc .docx .pdf' max={"1"}*/ onChange={(e)=>onUploadFile(e)} style={{display:"none"}} />
                            <button onClick={()=>document.getElementById("doc")?.click()}>
                                Upload
                            </button>
                            <span style={{color:"#ccc"}}>
                                .doc .docx .pdf <br />
                                (max, 1 mb)
                            </span>
                            {
                                files.map((item,idx)=>(
                                    <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start"}}>
                                        {
                                            item.image_type === "pdf"?(
                                                <embed src={item.preview} height={"auto"} width={"auto"}/>
                                            ):(
                                                <img src={item.preview} alt="" height={"auto"} width={"auto"}/>
                                            )
                                        }
                                        <AiFillCloseCircle fontSize={22} onClick={()=>deleteFile(idx)}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <span style={{color:"#555"}}>
                                Your privacy is important to us <b style={{color:"rgb(231, 12, 12)"}}>Curant24</b> handles your personal data <br />
                                with care. see more about this in our privacy statement.
                            </span>
                            <button  onClick={()=>sendContactEmail()}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contact-us-can-we-help-you">
                    <p>
                        We can help you with
                    </p>
                    <Link to="">
                        Report a data breach
                    </Link>
                    <Link to="/faq">
                        frequently asked questions
                    </Link>
                    <Link to="">
                        info & forms
                    </Link>
                </div>
            </div>
                
            )
        }
        <Footer/>  
    </div>
    )
  )
}
