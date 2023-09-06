import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { AiFillTwitterCircle, AiOutlineClose } from 'react-icons/ai'
import { BsDownload, BsFacebook, BsHeart, BsHeartFill,  BsLinkedin,  BsPen, BsShare, BsTrash } from 'react-icons/bs'
import {GrDocumentPdf} from 'react-icons/gr';
import { CgCalendar } from 'react-icons/cg'
import ReactStars from "react-rating-stars-component";
import { GoInfo, GoLocation } from 'react-icons/go'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import DashboardBar from '../../components/DashboardBar/DashboardBar'
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom'
import ImageCropper from '../../components/ImageCropper/ImageCropper'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { add_review_action, delete_review_action, delete_user_file, get_all_assignements_action, get_all_competencies_action, get_availability_action, get_client_orga_action, get_lang_action, get_liked_action, get_profile_ratings_action, get_review_action, get_user_competency_action, get_work_experience_action, invite_freelancer_action, like_action, remove_like_action, update_user_file } from '../../state/Actions/UserAction'
import "./profile.scss"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import {lang} from '../../languages_data'

export default function Profile() {
    const user_info = useSelector(state=>state.user_info)
    const profile_ratings = useSelector(state=>state.get_profile_ratings)
    const get_all_assignements = useSelector(state=>state.get_all_assignements)
    const get_profile_ratings = useSelector(state=>state.get_profile_ratings)
    const get_client_orga = useSelector(state=>state.get_client_orga);
    const invite_freelancer = useSelector(state=>state.invite_freelancer);
    const get_availability = useSelector(state=>state.get_availability);
    const get_reviews = useSelector(state=>state.get_reviews)
    const add_reviews = useSelector(state=>state.add_review)
    const get_liked = useSelector(state=>state.get_liked);
    const get_work_xp = useSelector(state=>state.get_work_experience)
    const update_user_files = useSelector(state=>state.update_user_file);
    const get_all_competencies = useSelector(state=>state.get_all_competencies)
    const get_user_competency = useSelector(state=>state.get_user_competency)
    const delete_review = useSelector(state=>state.delete_review);
    const get_company_data = useSelector(state=>state.get_company_data);
    const get_lang = useSelector(state=>state.get_lang);

    const user = profile_ratings.profile_ratings&&profile_ratings.profile_ratings.user?profile_ratings.profile_ratings.user:{};
    const [switcher, setSwitcher] = useState(user_info.user?.account_type==="freelancer"?1:3)
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [showSecondImg, setShowSecondImg] = useState(false);
    const [showInvite, setShowInvite] = useState(false)
    const [savePDF, setSavePDF] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [rating, setRating] = useState(0)
    const [reviewType, setReviewType] = useState("")
    const [error, setError] = useState("")
    const [userComp, setUserComp] = useState()
    const [userChildcareComp, setUserChildcareComp] = useState()

    const [secondImageName, setsecondImageName] = useState("")
    const filesRef = useRef({})
    const inputRef = useRef({})
    const linkRef = useRef({});
    const inviteRef = useRef({});
    const msgRef = useRef({});
    let data = new FormData();
    const [pdf, setPdf] = useState(new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
   }))
    const dispatch = useDispatch();
    const input = document.getElementById('profile');

    const location = useLocation();
    const uniqueAddresses = Array.from(new Set(get_all_assignements?.data?.map(a => a.assignement_id)))
        .map(id => {
          return get_all_assignements.data?.find(a => a.assignement_id === id)
        })

    useEffect(()=>{
        let arr = get_all_competencies.competencies?.slice(14)?.filter(item=>get_user_competency.competencies?.includes(item.id));
        setUserChildcareComp(get_all_competencies.competencies?.slice(0,14)?.filter(item=>get_user_competency.competencies?.includes(item.id)));
        setUserComp(arr?.concat(get_user_competency.competencies?.filter(item=>item.competency!==undefined)?.map((item,key)=>{return {id:arr.length+key,competence:item.competency}})))
    },[get_all_competencies.competencies, get_user_competency.competencies])

    console.log(location.state)

    const hanldeFileSelect = (e)=>{
        data.set(e.target.name,e.target.files[0]);
        filesRef.current[e.target.name].src = URL.createObjectURL(e.target.files[0])
        if(e.target.name==="video"){
            filesRef.current[e.target.name]?.load();
        }
        //update the chosen file directely on the database
        let info = new FormData();
        info.set(e.target.name,e.target.files[0]);
        info.set("data",JSON.stringify({file:e.target.name}))
        dispatch(update_user_file(info,user_info.user.token))
    }
    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
          const reader = new FileReader();
    
          reader.addEventListener("load", () => {
            const image = reader.result;

            setImageToCrop(image);
            setsecondImageName(event.target.files[0].name);
            setShowSecondImg(true);
            
          });
    
          reader.readAsDataURL(event.target.files[0]);
        }
      };
    const deleteFiles = (name)=>{
        let info = new FormData();
        info.set("data",JSON.stringify({file:name}))
        dispatch(delete_user_file(info,user_info.user.token))
    }



    
    useEffect(()=>{
        if(typeof(parseInt(location.pathname?.split("/")[4]))==="number"){
            if(location.state){
                location.state.user_id = parseInt(location.pathname?.split("/")[4])
            }
        }
    },[location, location.pathname, location.state])
    //getting info of said user
    useEffect(()=>{
        dispatch(get_profile_ratings_action(user_info.user.token,location.state?.user_id))
        dispatch(get_all_assignements_action(user_info.user.token,location.state?.user_id))
        dispatch(get_review_action(user_info.user.token,location.state?.user_id)) 
        dispatch(get_availability_action(user_info.user.token,location.state?.user_id))
        dispatch(get_client_orga_action(user_info.user.token,location.state?.user_id))
        dispatch(get_work_experience_action(user_info.user.token,location.state?.user_id))
        dispatch(get_user_competency_action(user_info.user.token,location.state?.user_id))
        dispatch(get_lang_action(user_info.user.token,null,location.state?.user_id))
        dispatch(get_all_competencies_action())
    },[dispatch, location.state?.user_id, user_info.user.token])

    useEffect(()=>{
        dispatch(get_profile_ratings_action(user_info.user.token,location.state?.user_id))
        dispatch(get_review_action(user_info.user.token,location.state?.user_id))
    },[dispatch, update_user_files, delete_review, user_info.user.token, location.state?.user_id])

    useEffect(()=>{
        if(update_user_files?.data){
            setShowSecondImg(false);
            setTimeout(() => {
                update_user_files.data = null;
            }, 1000);
        }
        if(update_user_files?.error){
            setShowSecondImg(false);
            setTimeout(() => {
                update_user_files.error = null;
            }, 1000);
        }
    },[update_user_files])
    
    /*useEffect(()=>{
        if(!user_info.user.token){
            linkRef.current.click();
        }
    },[user_info])*/
    
    useEffect(()=>{
        if(showInvite){
            window.scrollTo(0,0)
            document.body.style.height = "100vh";
            document.body.style.overflow ="hidden";
        }else{
            document.body.style.height = "auto";
            document.body.style.overflow = "auto"
        }
    },[showInvite])

    useEffect(()=>{
        if(user_info.user?.account_type === "client"){
            dispatch(get_all_assignements_action(user_info.user.token));
        }
    },[dispatch, user_info.user?.account_type, user_info.user.token])

    //notice message for invite freelancer
    useEffect(()=>{
        if(invite_freelancer.message){
            setTimeout(() => {
                invite_freelancer.message = null
            }, 1000);
        }
    },[invite_freelancer])

    useEffect(()=>{
        if(invite_freelancer.message){
            setShowInvite(false);
        }
    },[invite_freelancer.message])

    const add_review = ()=>{
        if(get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"){
            if(inputRef.current["review_text"]?.value?.length>0&&reviewType.length>0){
                dispatch(add_review_action({review:inputRef.current["review_text"].value,rating,review_type:reviewType,reviewed_user:user.id},user_info.user.token));
                window.scrollTo(0,0)
                inputRef.current["review_text"].value = ""
                dispatch(get_review_action(user_info.user.token,location.state?.user_id))
            }else{
                setError("You must fill in every field")
            }
        }else{
            setError("You cannot leave a review with a freelancer account.")
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }
    const uploadSecondPic = ()=>{
        if(croppedImage.lastModifiedDate){
            croppedImage.lastModifiedDate = new Date();
        }
        console.log(croppedImage)
        /*const img = new File([croppedImage], "second_picture.png");
        console.log(img);*/
        //update the chosen file directely on the database
        let info = new FormData();
        info.set("second_picture",croppedImage);
        info.set("data",JSON.stringify({file:"second_picture"}))
        dispatch(update_user_file(info,user_info.user.token))
    }
    //like/save assignement 
    useEffect(()=>{
        dispatch(get_liked_action("freelancers",user_info.user.token))
      },[dispatch, user_info])

    const like_freelancer = ()=>{
        dispatch(like_action({table:"freelancers",id:location.state?.user_id},user_info.user.token))
        dispatch(get_liked_action("freelancers",user_info.user.token))
    }

    const removeLikeHandler = (freelancer_id)=>{
        dispatch(remove_like_action({table:"freelancers",id:freelancer_id},user_info.user.token))
        dispatch(get_liked_action("freelancers",user_info.user.token))
    }
    const inviteHandler = ()=>{
        if(inviteRef.current["assignement_id"].value?.length>0&&inviteRef.current["message"].value?.length>0){
            dispatch(invite_freelancer_action(
                {
                    freelancer_id:get_profile_ratings.profile_ratings?.user?.id,
                    assignement_id:inviteRef.current["assignement_id"].value,
                    message:inviteRef.current["message"].value
                },
                user_info.user?.token
            ))
        }
    }
    //save pdf file
    const printDocument = ()=> {
        setSavePDF(null)
        setSwitcher(null)
  }
  //scrollto top once error is triggered
  useEffect(()=>{
    if(error){
        window.scrollTo(0,0);
        setTimeout(()=>{
            setError(null);
        },5000)
    }
  },[error])
  //launches right after the begining of changes to start capturing each page by itself
  useEffect(()=>{
    if(savePDF===null && switcher===null){
        setSavePDF(true)
        setSwitcher(1)
    }
    if(savePDF && switcher === 1 ){
        console.log("prf")
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,scale: 2})
        .then((canvas) => {
            const page = canvas.toDataURL('image/png',1.0);
            let imgWidth = 250;
            let imgHeight = canvas.height * imgWidth / canvas.width; 
            pdf.addImage(page, 'PNG', -20, 20,imgWidth,imgHeight);
            pdf.addPage("a4","p")
            setSwitcher(5)
        })
    }
    if(savePDF && switcher === 5 ){
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,scale: 2})
        .then((canvas) => {
            const page = canvas.toDataURL('image/png',1.0);
            let imgWidth = 250;
            let imgHeight = canvas.height * imgWidth / canvas.width; 
            pdf.addImage(page, 'PNG', -20, 20,imgWidth,imgHeight);
            pdf.addPage("a4","p")
            setSwitcher(6)
        })
    }

    if(savePDF && switcher === 6){
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,scale: 2})
        .then((canvas) => {
            const page = canvas.toDataURL('image/png',1.0);
            let imgWidth = 250;
            let imgHeight = canvas.height * imgWidth / canvas.width; 
            pdf.addImage(page, 'PNG', -20, 20,imgWidth,imgHeight);
            pdf.addPage("a4","p")
            setSwitcher(4)
        })
    }

    
    if(switcher === 4 && savePDF){
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,scale: 2})
        .then((canvas) => {
            const page = canvas.toDataURL('image/png',1.0);
            let imgWidth = 250;
            let imgHeight = canvas.height * imgWidth / canvas.width; 
            pdf.addImage(page, 'PNG', -20, 20,imgWidth,imgHeight);
            
            pdf.save(get_profile_ratings.profile_ratings?.user?.user_name+".pdf");
            setSavePDF(false)
            setPdf(new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts:true
           }))
        })
    }
  },[switcher])
  const numberOfWeek = (date)=>{
    let currentDate = new Date(date);
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }
    return (
        profile_ratings?.loading||update_user_files?.loading?(
            <LoadingBox big/>
        ):(
            showSecondImg?(
                <div className='crop-img'>
                    <DashboardBar/>
                    <div className="crop-img-header">
                        <h2>
                            Choose your background photo
                        </h2>
                        <h4>
                            Select the part of the photo you want to show. 
                        </h4>
                        <h4>
                            See how it will look like on your profile below.
                        </h4>
                    </div>
                    <div className="crop-content">
                        <div className='img-cropper'>
                            <ImageCropper
                            imageToCrop={imageToCrop}
                            onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                            />
                        </div>
                    <div className='cropped-image'>
                        {/* displaying the cropped image properly*/ }
                        <div className="title-prf">
                            <div className="second-image">
                                <img alt="Cropped Img" src={croppedImage&&URL.createObjectURL(croppedImage)} />
                            </div>
                            <div className="profile-image">
                                <img src={user.picture||"/images/logo.png"} name="picture" alt="" ref={ref=>ref!==null&&(filesRef.current["picture"] = ref)}/>
                            </div>
                        </div>
                        <div className="info-prf">
                            <div className="row">
                                <div>
                                    <p>
                                        Registered since : {get_profile_ratings.profile_ratings?.user?.created_at?.split("T")[0]?.split("-").reverse()?.join("-")}
                                    </p>
                                    <p>
                                        Last time online : {get_profile_ratings.profile_ratings?.user?.last_online?.split("T")[0]?.split("-").reverse()?.join("-")}
                                    </p>
                                    {
                                        get_profile_ratings.profile_ratings?.user?.account_type === "freelancer"&&(
                                            <>
                                                <p>
                                                    Name : {" "+get_profile_ratings.profile_ratings?.user?.first_name + " "+get_profile_ratings.profile_ratings?.user?.last_name} 
                                                </p>
                                                <br />
                                                {/* <p>
                                                    Hourly rate: {" "+get_profile_ratings.profile_ratings?.company_details?.hourly_rate+" USD (excl)"}
                                                </p>
                                                <p>
                                                    Work experience since: {" "+get_profile_ratings.profile_ratings?.user?.work_experience}
                                                </p> */}
                                                <br />
                                            </>
                                        )
                                    }
                                    {
                                        //the user name only appears when there is no company name &&get_profile_ratings.profile_ratings?.company_details?.orga_name?.length>0
                                        get_profile_ratings.profile_ratings?.user?.account_type==="client"?(
                                            <p>
                                                Company Name: {get_profile_ratings.profile_ratings?.company_details?.orga_name}
                                            </p>
                                        ):(
                                            <p>
                                                {/*User Name: get_profile_ratings.profile_ratings?.user?.user_name*/}
                                            </p>
                                        )
                                    }
                                    {/* <p>
                                        <b>{get_reviews.data?.length}</b> reviews
                                    </p> */}
                                </div>
                                <div className='info-icons' style={{position:"relative"}}>
                                    {/*
                                        get_profile_ratings.profile_ratings?.user?.account_type !== "freelancer"&&(
                                        //for freelancer only
                                        <div className="invite" onClick={()=>setShowInvite(true)}>
                                            <button>
                                                Invite to assignement
                                            </button>
                                        </div>
                                        )
                                        */}
                                    <div>
                                    {
                                        location.state?.user_id?(
                                            get_liked.data?.find(item=>item.freelancer_id===location.state?.user_id)!==undefined?(
                                                <BsHeartFill style={{color:"#e31b23"}} onClick={()=>removeLikeHandler(location.state?.user_id)}/>
                                            ):(
                                                <BsHeart onClick={()=>like_freelancer()}/>
                                            )
                                        ):(
                                            <BsShare onClick={()=>setShowShare(true)}/>
                                        )     
                                    }
                                    {
                                        showShare&&(                                                
                                        <div className='shareAssignement'>
                                                    <div>
                                                        <h4>
                                                            <b>
                                                                Share this profile
                                                            </b>
                                                        </h4>
                                                        <div className="close" onClick={()=>setShowShare(false)}>
                                                            <AiOutlineClose/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FacebookShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} quote={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <BsFacebook/> 
                                                        </FacebookShareButton>
                                                        <TwitterShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <AiFillTwitterCircle />
                                                        </TwitterShareButton>
                                                        <LinkedinShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <BsLinkedin/>
                                                        </LinkedinShareButton>
                                                        <WhatsappShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <IoLogoWhatsapp/>
                                                        </WhatsappShareButton>
                                                        <EmailShareButton subject='  ' body='  ' url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} separator="" style={{width:"auto",height:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
                                                            <MdEmail/>
                                                        </EmailShareButton>
                                                    </div>
                                        </div>)
                                    }
                                    </div>
                                    <div>
                                    <BsShare onClick={()=>setShowShare(true)}/>
                                    {
                                    showShare&&(
                                        <div className='shareAssignement'>
                                            <div>
                                                <h4>
                                                    <b>
                                                        Share this profile
                                                    </b>
                                                </h4>
                                                <div className="close" onClick={()=>setShowShare(false)}>
                                                    <AiOutlineClose/>
                                                </div>
                                            </div>
                                            <div>
                                                <FacebookShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} quote={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                    <BsFacebook/> 
                                                </FacebookShareButton>
                                                <TwitterShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                    <AiFillTwitterCircle />
                                                </TwitterShareButton>
                                                <LinkedinShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                    <BsLinkedin/>
                                                </LinkedinShareButton>
                                                <WhatsappShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                    <IoLogoWhatsapp/>
                                                </WhatsappShareButton>
                                                <EmailShareButton subject='  ' body='  ' url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} separator="" style={{width:"auto",height:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
                                                    <MdEmail/>
                                                </EmailShareButton>
                                            </div>
                                        </div>
                                    )
                                    }
                                    </div>
                                </div>
                                
                            </div>
                    </div>
                    </div>
                    </div>
                    <div className="buttons-crop">
                            <button className="back" onClick={()=>setShowSecondImg(false)}>
                                Back
                            </button>
                            <button className="save" onClick={()=>uploadSecondPic()}>
                                Save
                            </button>
                    </div>
              </div>
            ):(
            <div className='profile' id='profile'>
                {
                    !savePDF&&(
                        <DashboardBar/>
                    )
                }
                
                <div className="content" id="content">
                    {
                        add_reviews.data&&(
                            <MessageBox message={add_reviews.data} onClick={()=>add_reviews.data = null}/>
                        )
                    }
                    {
                        update_user_files?.data&&(
                            <MessageBox message={update_user_files.data} onClick={()=>update_user_files.data = null}/>
                        )
                    }
                    {
                        delete_review?.data&&(
                            <MessageBox message={delete_review.data} onClick={()=>delete_review.data = null}/>
                        )
                    }
                    {
                        error.length>0&&(
                            <MessageBox message={error} status="failure"/>
                        )
                    }
                    <div className="title-prf">
                        <div className="second-image">
                            <img src={user.second_picture}    name="second_picture" alt="" ref={ref=>ref!==null&&(filesRef.current["second_picture"] = ref)}/>
                            <input type="file" name="second_picture" accept='image/*' style={{display:"none"}} id="" ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)}  onChange={onUploadFile} />
                            {
                                user_info.user?.id===get_profile_ratings.profile_ratings?.user?.id&&(
                                    <div className="modify-second-image">
                                        <p onClick={()=>inputRef.current["second_picture"].click()}>
                                            Modify <BsPen/>
                                        </p>
                                        <p onClick={()=>deleteFiles("second_picture")}>
                                            Delete <BsTrash/>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-image">
                            <img src={user.picture||"/images/logo.png"} name="picture" alt="" ref={ref=>ref!==null&&(filesRef.current["picture"] = ref)}/>
                            <input type="file" name="picture" id="" accept='image/*' style={{display:'none'}} ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)} onChange={(e)=>hanldeFileSelect(e)} />
                            {
                                user_info.user?.id===get_profile_ratings.profile_ratings?.user?.id&&(
                                    <div className="modify-profile-image"  onClick={()=>inputRef.current["picture"].click()}>
                                        <p>
                                            Modify <BsPen/>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="info-prf">
                        <div className="row">
                            <div>
                                <p>
                                    Registered since : {get_profile_ratings.profile_ratings?.user?.created_at?.split("T")[0]?.split("-").reverse()?.join("-")}
                                </p>
                                <p>
                                    Last time online : {get_profile_ratings.profile_ratings?.user?.last_online?.split("T")[0]?.split("-").reverse()?.join("-")}
                                </p>
                                {
                                    get_profile_ratings.profile_ratings?.user?.account_type === "freelancer"&&(
                                        <>
                                            <p>
                                                Name : {" "+get_profile_ratings.profile_ratings?.user?.first_name + " "+get_profile_ratings.profile_ratings?.user?.last_name} 
                                            </p>
                                            <br />
                                            <p>
                                                Profession : {get_profile_ratings.profile_ratings?.company_details?.profession||"not added"}
                                            </p>
                                            <p>
                                                Hourly rate: {" "+(get_profile_ratings.profile_ratings?.company_details?.hourly_rate?.length>0?get_profile_ratings.profile_ratings?.company_details?.hourly_rate:get_profile_ratings.profile_ratings?.company_details?.hourly_rate_inclusive)+ " " + (get_company_data.data?.currency||" USD ") + (get_profile_ratings.profile_ratings?.company_details?.hourly_rate?.length>0?"(excl)":"(incl)")}
                                            </p>
                                            <br />
                                        </>
                                    )
                                }
                                {
                                    //the user name only appears when there is no company name &&get_profile_ratings.profile_ratings?.company_details?.orga_name?.length>0
                                    get_profile_ratings.profile_ratings?.user?.account_type==="client"?(
                                        <p>
                                            Company Name: {get_profile_ratings.profile_ratings?.company_details?.orga_name}
                                        </p>
                                    ):(
                                        <p>
                                            {/*User Name: get_profile_ratings.profile_ratings?.user?.user_name*/}
                                        </p>
                                    )
                                }
                                {
                                    get_reviews.data&&(
                                        <div className="review-ratings">
                                            <p>
                                                Reviews <b>{get_reviews.data?.length}</b> . Poor
                                            </p>
                                            <div>
                                                <ReactStars
                                                count={5}
                                                onChange={(e)=>{console.log(e)}}
                                                size={24}
                                                isHalf
                                                value={get_reviews.data[0]?.avg_rating}
                                                activeColor="#ffd700"
                                                edit={false}
                                                />
                                                <p>
                                                    {Math.floor((get_reviews.data[0]?.avg_rating||0))}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{borderLeft:"1px #555 solid",paddingLeft:"10px"}}>
                                {
                                   get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&(
                                        <>
                                            <p>
                                                Maximum travel distance : {get_profile_ratings.profile_ratings?.user?.max_travel_distance} KM
                                            </p>
                                            <p>
                                                Work experience since: {" "+(get_profile_ratings.profile_ratings?.user?.work_experience||"not added")}
                                            </p>
                                        </>
                                    )
                                }
                                {
                                    user_info.user?.account_type==="client"&&/*get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&*/(
                                        <div onClick={()=>setSwitcher(3)} >
                                            <button className="post_review">
                                                <HiOutlinePencilAlt/>
                                                Write a review
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='info-icons'>
                                {
                                    user_info.user?.account_type && user_info.user?.account_type === "client"&&get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&(
                                    //for freelancer only
                                    <div className="invite"  onClick={()=>setShowInvite(true)}>
                                        <button>
                                            Invite to job
                                        </button>
                                    </div>
                                    )
                                }
                                <div>
                                {
                                    location.state?.user_id?(
                                        get_liked.data?.find(item=>item.freelancer_id===location.state?.user_id)!==undefined?(
                                            <BsHeartFill style={{color:"#e31b23"}} onClick={()=>removeLikeHandler(location.state?.user_id)}/>
                                        ):(
                                            <BsHeart onClick={()=>like_freelancer()}/>
                                        )
                                    ):(
                                        <BsHeart/>
                                    )
                                }
                                </div>
                                <div style={{position:"relative"}}>
                                    <BsShare onClick={()=>setShowShare(true)}/>
                                    {
                                        showShare&&(                                                
                                        <div className='shareAssignement'>
                                                    <div>
                                                        <h4>
                                                            <b>
                                                                Share this profile
                                                            </b>
                                                        </h4>
                                                        <div className="close" onClick={()=>setShowShare(false)}>
                                                            <AiOutlineClose/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FacebookShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} quote={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <BsFacebook/> 
                                                        </FacebookShareButton>
                                                        <TwitterShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <AiFillTwitterCircle />
                                                        </TwitterShareButton>
                                                        <LinkedinShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <BsLinkedin/>
                                                        </LinkedinShareButton>
                                                        <WhatsappShareButton url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`}>
                                                            <IoLogoWhatsapp/>
                                                        </WhatsappShareButton>
                                                        <EmailShareButton subject='  ' body='  ' url={`https://curant24.nl/dashboard/settings/profile/${location.state?.user_id}`} separator="" style={{width:"auto",height:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
                                                            <MdEmail/>
                                                        </EmailShareButton>
                                                    </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className={`nav ${get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&'freelancer'}`} id="freelancer_nav">
                        <div onClick={()=>setSwitcher(1)} className={switcher===1?"selected":""}>
                            <p>
                                {get_profile_ratings.profile_ratings?.user?.account_type ==="freelancer"?"Freelancer":"Company"} Information
                            </p>
                        </div>
                        {
                            get_profile_ratings.profile_ratings?.user?.account_type ==="freelancer"?(
                                <>
                                <div onClick={()=>setSwitcher(5)} className={switcher===5?"selected":""}>
                                    <p>
                                        Work History                                
                                    </p>
                                </div>
                                <div id='diplomas_cert' onClick={()=>setSwitcher(6)} className={switcher===6?"selected":""}>
                                    <p>
                                        Diplomas and  Certificates                                
                                    </p>
                                </div>
                                <div onClick={()=>setSwitcher(4)} className={switcher===4?"selected":""}>
                                    <p>
                                        Competencies                                
                                    </p>
                                </div>
                                <div onClick={()=>setSwitcher(7)} className={switcher===7?"selected":""}>
                                    <p>
                                        Availability                                
                                    </p>
                                </div>
                                </>
                            ):(
                                <div onClick={()=>setSwitcher(2)} className={switcher===2?"selected":""}>
                                    <p>
                                        Open assignements                                
                                    </p>
                                </div>
                            )
                        }
                        <div onClick={()=>setSwitcher(3)} className={switcher===3?"selected":""}>
                            <p>
                                Reviews
                            </p>
                        </div>
                        {/* <div onClick={()=>setSwitcher(4)} className={switcher===4?"selected":""}>
                            <FiMail/>
                        </div> */}
                    </div>
                    <div className="navigated-content">
                        {
                            switcher===1?(
                                <div className="company-info">
                                    <div className="description">
                                        <p>
                                            {(profile_ratings.profile_ratings?.user?.about)||get_client_orga.data?.company_profile||"empty"}
                                        </p>
                                        {
                                            //languages_spoken
                                        }
                                        <div className="">
                                            <h4>
                                                {
                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&get_lang.data?.at(0)?.i_dont_speak_other_langs===0?"I speak the following languages":""
                                                }
                                                 
                                            </h4>
                                            <div>
                                                {/* {
                                                    get_lang?.data?.map(item=>(
                                                        <div>
                                                            {lang[item.lang]}
                                                        </div>
                                                    ))
                                                } */}
                                            {
                                                get_lang.data?.at(0)?.i_dont_speak_other_langs===0&& get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&
                                                
                                                get_lang.data?.map(item=>(
                                                  <>
                                                    <p style={{margin:0}}>
                                                      {
                                                        lang[item.lang] + " : "+ item.level
                                                      }
                                                    </p>
                                                  </>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="video">
                                        <video src={user.video} name="video" ref={ref=>ref!==null&&(filesRef.current["video"] = ref)} autoPlay muted  controls>
                                            <source src={user.video} />
                                        </video>
                                        <input type="file" name="video" accept='video/*' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)} style={{display:'none'}} onChange={e=>hanldeFileSelect(e)} />
                                        {
                                            user_info.user?.id===get_profile_ratings.profile_ratings?.user?.id&&(
                                                <div className="video-buttons">
                                                    <div className="modify-profile-video"  onClick={()=>inputRef.current["video"].click()}>
                                                        <button>
                                                            Modify <BsPen/>
                                                        </button>
                                                    </div>
                                                    <div className="delete-profile-video" onClick={()=>deleteFiles('video')}>
                                                        <button>
                                                            Delete <BsTrash/>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ):switcher===2?(
                                <>
                                    <div className="opened-assignements">
                                        {
                                            uniqueAddresses.map(item=>(
                                            <Link to="/dashboard/single-assignement" state={{id:item.assignement_id}}>
                                                <div className="assignement-elt">
                                                <p>
                                                    <BsPen/>
                                                    {item.job_name}
                                                </p>
                                                <p>
                                                    {item.industry}
                                                </p>
                                                <p>
                                                    <GoLocation/>
                                                    {item.location}
                                                </p>
                                                <p>
                                                    <CgCalendar/>
                                                    {item.starting_date.split('T')[0]}
                                                </p>
                                                </div>
                                            </Link>
                                            ))
                                        }
                                    </div>
                                </>
                            ):switcher===3?(
                                <>
                                    <div className="reviews">
                                        {
                                            get_reviews.data?.map((item,index)=>(
                                                <div className="review" id={index} key={index}>
                                                    <div className="user-image">
                                                        <img src={item.picture||"/images/logo.png"} alt="" />
                                                    </div>
                                                    <div className="review-content">
                                                        <div className="user-name">
                                                            <h4>
                                                                {item.user_name}
                                                            </h4>
                                                        </div>
                                                        <div className="review-text">
                                                            <p>
                                                                {item.review}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="delete-review">
                                                        <BsTrash  onClick={()=>dispatch(delete_review_action(item.id,user_info.user.token))}/>
                                                    </div>
                                                    <div    className="review-stars-user">
                                                        <ReactStars
                                                            count={5}
                                                            onChange={(e)=>{console.log(e)}}
                                                            size={24}
                                                            isHalf
                                                            value={item.review_type==="Very poor"?1:item.review_type==="Bad"?2:item.review_type==="Average"?3:item.review_type==="Good"?4:5}
                                                            activeColor="#ffd700"
                                                            edit={false}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="add-review">
                                            {
                                                (
                                                    <>
                                                        <div className="add-review-header">
                                                            <div>
                                                                <img src={user_info.user?.picture} alt="" />
                                                                <h5>
                                                                    Write a review
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <h1 style={{color:"red",marginLeft:"4.25%",width:"40vw"}}>
                                                            <strong >
                                                                *
                                                            </strong>
                                                        </h1>
                                                        <textarea maxLength={"1000"} name="review_text" placeholder='Add your review here ' ref={ref=>ref!==null&&(inputRef.current[ref.name] = ref)} onChange={()=>!user_info.user.token&&linkRef.current.click()} id="" cols="70" rows="7"></textarea>
                                                    </>
                                                )
                                            }
                                            <div className="reviews-statistics">
                                                <div className="reviews-statistics-header">
                                                    <h3>
                                                        Reviews <span>{get_reviews?.data?.length}</span>
                                                    </h3>
                                                </div>
                                                {
                                                    get_reviews?.data&&(
                                                        <div className="reviews-stats">
                                                            <h1 style={{color:"red",width:"40vw",marginLeft:"7%"}}>
                                                                <strong >
                                                                    *
                                                                </strong>
                                                            </h1>
                                                            <div style={{gridTemplateColumns:get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"?"1fr 1fr 3fr 1fr":"1fr 4fr 1fr"}}>
                                                                {
                                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"&&(
                                                                        <input type="radio" name="review_type" onChange={()=>setReviewType("Excelent")} id="" />
                                                                    )
                                                                }
                                                                <span>
                                                                    Excelent
                                                                </span>
                                                                <div className="span">
                                                                    <p style={{width:Math.floor(get_reviews.data[0]?.avg_rating_excelent)+"%"}}></p>
                                                                </div>
                                                                <span>
                                                                    {Math.floor(get_reviews.data[0]?.avg_rating_excelent)||0} %
                                                                </span>
                                                            </div>
                                                            <div style={{gridTemplateColumns:get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"?"1fr 1fr 3fr 1fr":"1fr 4fr 1fr"}}>
                                                                {
                                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"&&(
                                                                        <input type="radio" name="review_type" onChange={()=>setReviewType("Good")} id="" />
                                                                    )
                                                                }
                                                                <span>
                                                                    Good
                                                                </span>
                                                                <div className="span">
                                                                    <p style={{width:Math.floor(get_reviews.data[0]?.avg_rating_good)+"%"}}></p>
                                                                </div>
                                                                <span>
                                                                    {Math.floor(get_reviews.data[0]?.avg_rating_good)||0} %
                                                                </span>
                                                            </div>
                                                            <div style={{gridTemplateColumns:get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"?"1fr 1fr 3fr 1fr":"1fr 4fr 1fr"}}>
                                                                {
                                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"&&(
                                                                        <input type="radio" name="review_type" onChange={()=>setReviewType("Average")} id="" />
                                                                    )
                                                                }
                                                                <span>
                                                                    Average
                                                                </span>
                                                                <div className="span">
                                                                    <p style={{width:Math.floor(get_reviews.data[0]?.avg_rating_average)+"%"}}></p>
                                                                </div>
                                                                <span>
                                                                    {Math.floor(get_reviews.data[0]?.avg_rating_average)||0}%
                                                                </span>
                                                            </div>
                                                            <div style={{gridTemplateColumns:get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"?"1fr 1fr 3fr 1fr":"1fr 4fr 1fr"}}>
                                                                {
                                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"&&(
                                                                        <input type="radio" name="review_type" onChange={()=>setReviewType("Bad")} id="" />
                                                                    )
                                                                }
                                                                <span>
                                                                    Bad
                                                                </span>
                                                                <div className="span">
                                                                    <p style={{width:Math.floor(get_reviews.data[0]?.avg_rating_bad)+"%"}}></p>
                                                                </div>
                                                                <span>
                                                                    {Math.floor(get_reviews.data[0]?.avg_rating_bad)||0} %
                                                                </span>
                                                            </div>
                                                            <div style={{gridTemplateColumns:get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"?"1fr 1fr 3fr 1fr":"1fr 4fr 1fr"}}>
                                                                {
                                                                    get_profile_ratings.profile_ratings?.user?.account_type==="freelancer"&&user_info.user?.account_type==="client"&&(
                                                                        <input type="radio" name="review_type" onChange={()=>setReviewType("Very poor")} id="" />
                                                                    )
                                                                }
                                                                <span>
                                                                    Very poor
                                                                </span>
                                                                <div className="span">
                                                                    <p style={{width:Math.floor(get_reviews.data[0]?.avg_rating_poor)+"%"}}></p>
                                                                </div>
                                                                <span>
                                                                    {Math.floor(get_reviews.data[0]?.avg_rating_poor)||0} %
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="add-review-button">
                                                <h1 style={{color:"red",marginLeft:"0",width:"40vw"}}>
                                                    <strong >
                                                        *
                                                    </strong>
                                                </h1>
                                                <ReactStars
                                                    count={5}
                                                    onChange={(rate)=>setRating(rate)}
                                                    size={24}
                                                    isHalf
                                                    activeColor="#ffd700"
                                                    style={{alignSelf:"flex-start"}}
                                                />
                                                <button onClick={()=>add_review()}>
                                                    Add Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ):switcher===4?(
                                <>
                                    <div className="competencies_profile">
                                        {/* {get_user_competency.competencies?.map(item=>(  
                                                <div className="availability_profile">
                                                    
                                                    <p>
                                                        {item.competency?item.competency:get_all_competencies?.competencies?.find(elt=>elt.id===item)?.competence}
                                                    </p>
                                                </div>
                                        ))} */}
                                        <div>
                                            <p style={{margin:"15px 0"}}>
                                                <b>
                                                    On this tab you will find the competencies that I have <br />
                                                    mastered
                                                </b>
                                            </p>
                                        </div>
                                        <div className="competencies_profile_elts">
                                            {
                                                userChildcareComp?.length>0&&(
                                                    <div className="competencies_profile_elt">
                                                        <u>
                                                            Competencies needed for the childcare I master
                                                        </u>
                                                        <ul>
                                                            {
                                                                userChildcareComp?.map(item=>(
                                                                    <li key={item?.id} value={item?.competence}>
                                                                        {item?.competence}
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            <div className="competencies_profile_elt">
                                                <u>
                                                    My Competencies (general)
                                                </u>
                                                <ul>
                                                    {
                                                        userComp?.map(item=>(
                                                            <li key={item?.id} value={item.competence}>
                                                                {item.competence}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ):switcher===5?(
                                <>
                                    <div className="work_xp_profile">
                                        {get_work_xp.work_xp?.map(item=>(
                                            <div className="work_profile">
                                                <div className="row">
                                                    <p>
                                                        Function : {" "}
                                                        {item.function}
                                                    </p>
                                                    <p>
                                                        Employer: {" "}
                                                        {item.employer}
                                                    </p>
                                                    <p>
                                                        From : {" "}
                                                        {item.start_date.split('T')[0]}
                                                    </p>
                                                    <p>
                                                        To:{" "}
                                                        {item.end_date.split("T")[0]?.includes("9999")?"Today":item.end_date.split("T")[0]}

                                                    </p>
                                                </div>
                                                <div className="row work_profile_description">
                                                    <p>
                                                        Description: {" "}
                                                    </p>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ):switcher===6?(
                                <>
                                    <div className="diplomat_certificates">
                                        {get_profile_ratings.profile_ratings?.diplomat_certificate?.map(item=>(
                                            <>
                                                <div className="diplomat">
                                                    <b>
                                                        {item.type}
                                                    </b>
                                                    <a href={item.diplomat_certificate} download alt="">
                                                        <img src={item.diplomat_certificate} alt="" />
                                                    </a>
                                                </div>
                                                <a href={item.diplomat_certificate} download alt="">
                                                    <BsDownload/>
                                                </a>
                                            </>
                                        ))}
                                    </div>
                                </>
                            ):switcher===7?(
                                <>
                                    <div className="availability_dates_profile">
                                        {get_availability.availability?.map(item=>(
                                            <div className="availability_profile">
                                                <p>
                                                    Week number: {" "}
                                                    {numberOfWeek(item.availability_date.split("/")[1]+"/"+item.availability_date.split("/")[0]+"/"+item.availability_date.split("/")[2])}
                                                </p>
                                                <p>
                                                    Date : {" "}
                                                    {item.availability_date}
                                                </p>
                                                <p>
                                                    From: {" "}
                                                    {item.start_time}
                                                </p>
                                                <p>
                                                    To:{" "}
                                                    {item.end_time}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ):(
                                <>
                                </>
                            )
                        }
                        <div className="save-pdf-freelancer" onClick={()=>printDocument()}>
                            <GrDocumentPdf/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="back">
                            <Link to={location.state?.target||"/dashboard/settings"} state={{stopSearch:location.state?.stopSearch}}>
                                <button>
                                    Back
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    !savePDF&&user_info.user?.token&&(
                        <DashboardBarBottom/>
                    )
                }
                
                <Link to="/login" state={{user_id:location.state?.user_id,target:`/dashboard/settings/profile/${location.state?.user_id}`}} ref={ref=>ref!==null&&(linkRef.current = ref)}>

                </Link>
                {
                    user_info.user?.account_type==="client" && showInvite&&(
                    <div className="apply" tabindex="-1">
                        <div className="apply-bg" onClick={()=>setShowInvite(false)}></div>
                        <div className="apply-dialog "> 
                            <div className="apply-content">
                                <div className="apply-header">
                                    <h4 className="apply-title">
                                    <b>
                                        Send message
                                    </b>
                                    </h4>
                                    <div>
                                        <AiOutlineClose onClick={()=>setShowInvite(false)}/>
                                    </div>
                                </div>
                                <div className="apply-body">
                                    <div className="apply-form">
                                        <p>
                                            Choose the project you want to invite the freelancer to*
                                        </p>
                                        <select name="assignement_id" id="" ref={ref=>ref!==null&&(inviteRef.current[ref.name] = ref)}>
                                            {
                                                get_all_assignements.data?.map((item,idx)=>(
                                                    <option value={item.id} key={idx}>{item.job_name}</option>
                                                ))
                                            }
                                        </select>
                                        <b>
                                            Message
                                        </b>
                                        <textarea name="message" id="" placeholder='Describe the project or position that you are hiring for. It helps to be detailed as well to give some information about you and your company.'  maxLength={"3000"} cols="30" rows="5"ref={ref=>ref!==null&&(inviteRef.current[ref.name] = ref)} ></textarea>
                                    </div>
                                </div>
                                <div className="apply-footer">
                                    <button type="button" onClick={()=>inviteHandler()} >{invite_freelancer?.loading?"... Sending":"Send"}</button>
                                    <button type="button" className="back" onClick={()=>setShowInvite(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
                {
                    invite_freelancer.message&&(
                        <div className='message-box-small'  onClick={()=>msgRef.current.style.display="none"} ref={ref=>ref!==null&&(msgRef.current = ref)}>
                            <div>
                                <div>
                                    <GoInfo/>
                                    <p>
                                        Notice
                                    </p>
                                </div>
                                <AiOutlineClose style={{cursor:"pointer"}} onClick={()=>msgRef.current.style.display="none"}/>
                            </div>
                            <div>
                                <p>
                                    Job invite email was sent. Check your email inbox for the reply from this member.
                                </p>
                            </div>

                        </div>
                    )
                }
            </div>

            )
        )
    )
}
