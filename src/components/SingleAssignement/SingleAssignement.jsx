import React, { useEffect, useState } from "react";
import {
  AiFillTwitterCircle,
  AiOutlineClose,
  AiOutlineFieldTime,
  AiOutlineFileImage,
} from "react-icons/ai";
import {
  BsBell,
  BsCursor,
  BsDownload,
  BsFacebook,
  BsFileEarmarkArrowUp,
  BsHeart,
  BsHeartFill,
  BsLinkedin,
  BsPen,
  BsShare,
  BsTrash,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { MdEmail, MdOutlineAddTask } from "react-icons/md";
import { GoCalendar, GoLocation } from "react-icons/go";
import { ImPriceTag } from "react-icons/im";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiSuitcaseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  apply_action,
  delete_assignement_action,
  getPersonalInfo,
  get_all_competencies_action,
  get_assignement_action,
  get_client_orga_action,
  get_geolocation_action,
  get_lang_action,
  get_liked_action,
  get_locations_action,
  get_review_action,
  get_user_competency_action,
  like_action,
  remove_like_action,
  set_assignement_action,
} from "../../state/Actions/UserAction";
import DashboardBar from "../DashboardBar/DashboardBar";
import DashboardBarBottom from "../DashboardBarBottom/DashboardBarBottom";
import LoadingBox from "../LoadingBox/LoadingBox";
import { HiDocumentDuplicate } from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { lang } from "../../languages_data";
import "./singleAssignement.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper";
import { IoIosQuote, IoLogoWhatsapp } from "react-icons/io";
import Map from "../Map/Map";
import { useRef } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import MessageBox from "../MessageBox/MessageBox";
import axios from "axios";
import LoadingRocket from "../LoadingBox/Loading-rocket";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

export default function SingleAssignement() {
  const user_info = useSelector((state) => state.user_info);
  const get_assignement = useSelector((state) => state.get_assignement);
  const delete_assignement = useSelector((state) => state.delete_assignement);
  const set_assignement = useSelector((state) => state.set_assignement);
  const get_personal = useSelector((state) => state.get_personal);
  const get_client_orga = useSelector((state) => state.get_client_orga);
  const get_geolocation = useSelector((state) => state.get_geolocation);
  const get_liked = useSelector((state) => state.get_liked);
  const get_locations = useSelector((state) => state.get_locations);
  const get_all_competencies = useSelector(
    (state) => state.get_all_competencies
  );
  const get_reviews = useSelector((state) => state.get_reviews);
  const like = useSelector((state) => state.like);
  const get_lang = useSelector((state) => state.get_lang);
  const add_assignement = useSelector((state) => state.add_assignement);
  const set_lang = useSelector((state) => state.set_lang);
  let files = [],
    skills = [],
    cert = [],
    working_days = [],
    what_may_be_charged = [],
    checked_comp = [];
  const [show_notif, setShow_notif] = useState(true);
  const [savePDF, setSavePDF] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [showApplyMotiv, setShowApplyMotiv] = useState(false);
  const [applySubmit, setApplySubmit] = useState(false);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [charNum, setCharNum] = useState(3000);
  const [status, setStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState();
  const [img, setImg] = useState("");
  const [applyPhoneNo, setApplyPhoneNo] = useState("");
  const [applyMotivation, setApplyMotivation] = useState("");
  const [latestMotiv, setLatestMotiv] = useState("");
  const [showLatestMotiv, setShowLatestMotiv] = useState(false);

  const assignement = get_assignement?.data || {};
  const dispatch = useDispatch();
  const location = useLocation();
  const linkRef = useRef();
  const redirectLink = useRef();
  const applyRef = useRef([]);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const messageBoxRef = useRef();
  const hideButton = () => {
    messageBoxRef.current.style.display = "none";
  };

  //getting all the files from assignements
  if (get_assignement.data) {
    what_may_be_charged = get_assignement.data?.what_may_be_charged?.map(
      (item) => item.what_may_be_charged
    );
    checked_comp = get_assignement.data?.checked_comp;
    files = get_assignement.data?.files?.map((item) => item.file);
    skills = get_assignement.data?.skills?.map((item) => item.skill);
    cert = get_assignement.data?.certificates?.map((item) => item.certificate);
    working_days = get_assignement.data?.days?.map((item) => item.day);
  }
  //redirecting user to login if not authenticated
  /*useEffect(()=>{
    if(!user_info.user?.id){
      redirectLink.current.click();
    }
  },[user_info.user?.id])*/

  useEffect(() => {
    setImg("/images/" + Math.floor(Math.random() * 4 + 1) + ".jpg");
  }, []);

  useEffect(() => {
    if (location.search.length > 0) {
      location.state = {
        ...location.state,
        id: parseInt(location.search.split("&")[0].replace("?id=", "")),
      };
    } else if (parseInt(location.pathname?.split("/").at(-1)) > 0) {
      location.state = {
        ...location.state,
        id: parseInt(location.pathname?.split("/").at(-1)),
      };
    }
    if (assignement) {
      location.state.user_id = assignement.user_id;
      setUserId(location.state.user_id);
    }
  }, [assignement, dispatch, location, user_info.user.token]);

  useEffect(() => {
    dispatch(getPersonalInfo(user_info.user.token, userId));
    dispatch(get_locations_action(user_info.user.token));
  }, [dispatch, userId, user_info.user.token]);

  useEffect(() => {
    dispatch(get_assignement_action(user_info.user.token, location.state?.id));
    dispatch(
      get_client_orga_action(user_info.user.token, location.state.user_id)
    );
    dispatch(get_review_action(user_info.user.token, location.state.user_id));
    dispatch(get_all_competencies_action());
    dispatch(get_lang_action(user_info.user.token, location.state?.id));
  }, [dispatch, location, user_info.user.token]);

  //getting latest motivation on condition
  useEffect(() => {
    const get_latest_motivation = async () => {
      const { data } = await axios.get("/api/user/latest-motivation", {
        headers: {
          token: user_info.user?.token,
        },
      });
      setLatestMotiv(data);
    };
    if (showApply) {
      get_latest_motivation();
    }
  }, [showApply, user_info.user?.token]);

  useEffect(() => {
    if (get_assignement.data) {
      setStatus(get_assignement.data?.status);
      setStatusMessage(get_assignement.data?.status_message);
    }
  }, [get_assignement.data]);

  const deleteAssignement = () => {
    dispatch(
      delete_assignement_action(user_info.user.token, location.state?.id)
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (delete_assignement.data?.length > 0) {
      setTimeout(() => {
        linkRef.current.click();
      }, 1000);
    }
  }, [delete_assignement.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [set_assignement]);

  useEffect(() => {
    if (set_assignement.data) {
      setTimeout(() => {
        set_assignement.data = null;
      }, 1000);
    }
    if (delete_assignement.data) {
      setTimeout(() => {
        delete_assignement.data = null;
      }, 1000);
    }
  });
  useEffect(() => {
    if (assignement.province) {
      dispatch(
        get_geolocation_action(
          user_info.user.token,
          assignement.place,
          assignement.province + ", " + assignement.country
        )
      );
    }
  }, [get_assignement.data, dispatch, user_info.user.token, assignement]);

  //initializing the variables that cause the re appearance of single assignement page when reaching it
  useEffect(() => {
    add_assignement.data = null;
    set_lang.data = null;
  }, [add_assignement, set_lang]);

  const set_assignement_handler = () => {
    let stt = "";
    let data = new FormData();
    status === "Paused" ? (stt = "Assignement Placed") : (stt = "Paused");
    setShow_notif(true);
    setStatus(stt);
    data.set("info", JSON.stringify({ status: stt }));
    dispatch(
      set_assignement_action(
        data,
        location.state?.id || get_assignement.data?.id,
        user_info.user.token
      )
    );
  };
  const updateStatusMessage = () => {
    let data = new FormData();
    data.set("info", JSON.stringify({ status_message: statusMessage }));
    dispatch(
      set_assignement_action(data, location.state?.id, user_info.user.token)
    );
  };

  //like/save assignement
  useEffect(() => {
    dispatch(get_liked_action("assignements", user_info.user.token));
  }, [dispatch, user_info]);

  //initialize like object once retreived
  useEffect(() => {
    if (like.data) {
      setTimeout(() => {
        like.data = null;
      }, 1000);
    }
  }, [like]);
  const like_assignement = () => {
    if (user_info.user?.token) {
      dispatch(
        like_action(
          { table: "assignements", id: location.state?.id },
          user_info.user.token
        )
      );
      dispatch(get_liked_action("assignements", user_info.user.token));
    } else {
      redirectLink.current.click();
    }
  };

  const removeLikeHandler = (assignement_id) => {
    dispatch(
      remove_like_action(
        { table: "assignements", id: assignement_id },
        user_info.user.token
      )
    );
    dispatch(get_liked_action("assignements", user_info.user.token));
  };

  //save pdf file
  const printDocument = () => {
    const input = document.getElementById("single-assignement");
    setSavePDF(true);
    setTimeout(() => {
      html2canvas(input, {
        logging: true,
        letterRendering: 1,
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const page = canvas.toDataURL("image/png", 1.0);
        const pdf = new jsPDF();
        let imgWidth = 210;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(page, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(assignement.job_name + ".pdf");
      });
    }, 1 / 100);
  };

  useEffect(() => {
    if (savePDF === true) {
      setTimeout(() => {
        setSavePDF(false);
      }, 1 / 10);
    }
  }, [savePDF]);

  const apply = () => {
    let info = { id: location.state?.id };
    setError(false);
    if (applyPhoneNo.length > 0) {
      //set data in obj
      info["motivation"] = applyMotivation;
      info["phone_no"] = applyPhoneNo;
      setApplyMotivation("");
      setApplyPhoneNo("");
      //hide form window
      setShowApplyMotiv(false);
      setApplySubmit(true);
      setCharNum(3000);
      //dispatch apply event
      dispatch(apply_action(info, user_info.user.token));
    } else {
      setError(true);
      setApplySubmit(false);
    }
  };
  return get_assignement.loading || delete_assignement.loading ? (
    <LoadingRocket big />
  ) : (
    <div
      className="single-assignement"
      id="single-assignement"
      style={{
        height:
          showApply && user_info.user?.account_type === "freelancer"
            ? "100vh"
            : "100%",
        overflow:
          showApply && user_info.user?.account_type === "freelancer"
            ? "hidden"
            : "auto",
        marginBottom:
          showApply && user_info.user?.account_type === "freelancer"
            ? "0px"
            : "150px",
      }}
    >
      <DashboardBar pdf={savePDF} />
      <div className="single-assignement-header">
        <div className="bg-single-assignement">
          <img src={img} alt="" />
        </div>
        <div className="row">
          <div className="work-icon">
            <MdOutlineWorkOutline className="work" />
          </div>
          <div>
            <h3>{assignement.job_name}</h3>
            <p>
              Industry: {assignement.industry}
              {assignement.industry === "Childcare" &&
                checked_comp?.map(
                  (item) =>
                    "," +
                    get_all_competencies.competencies?.find(
                      (elt) => elt.id === item
                    )?.competence
                )}
            </p>
            <p>
              <GoLocation />
              {assignement.place +
                " , " +
                assignement.province +
                ", " +
                assignement.country}
            </p>
            <p>Contact person: {" " + assignement.contact_person}</p>
            <br />
            <p>
              {get_locations.data?.map((item, index) => (
                <span key={index}>
                  {item.name} {item.address?.length > 0 && " / "}
                  {item.address} {item.city?.length > 0 && " / "} {item.city}{" "}
                  {item.location?.length > 0 && "/"} {item.location}{" "}
                </span>
              ))}
            </p>
          </div>
          <div
              className="pdf-image"
              style={{
                cursor: 'pointer', // This sets the cursor to a pointer when hovering
              }}
              onClick={() => {
                printDocument();
              }}
            >
            {/* <a href=""> */}
              {" "}
              <img src="/images/pdf-icon.png" alt="" width={60} />
            {/* </a> */}
          </div>
        </div>
      </div>
      <div className="single-assignement-content">
        <div className="col long">
          <div className="col long info">
            <div className="row">
              <p>
                <b>Starting date</b>
              </p>
              <p>
                {assignement.start_asap
                  ? "Start as soon as possible"
                  : assignement.starting_date?.split("T")[0]}
              </p>
            </div>
            <div className="row">
              <p>
                <b>Deadline for registeration</b>
              </p>
              <p>{assignement.deadline?.split("T")[0]}</p>
            </div>
            <div className="row">
              <p>
                <b>Week hours</b>
              </p>
              <p>
                {assignement.working_hours === "partime"
                  ? "parttime"
                  : assignement.working_hours}
              </p>
            </div>
            <div className="row">
              <p>
                <b>Assignement on location</b>
              </p>
              <p>{assignement.assignement_on_location}</p>
            </div>
            <div className="row">
              <p>
                <b>
                  {/\d/.test(assignement.job_duration)
                    ? "Project end time"
                    : "Duration"}
                </b>
              </p>
              <p>{assignement.job_duration}</p>
            </div>
            <div className="row">
              <p>
                <b>Can this assignement be carried out continously</b>
              </p>
              <p>
                {assignement.can_this_assignement_be_carried_out_continously}
              </p>
            </div>
          </div>
          <div className="col long info">
            <div className="row">
              <p style={{ alignSelf: "flex-start" }}>
                <b>Working days</b>
              </p>
              <p>
                <ul className="workingDays">
                  {working_days
                    ?.sort((a, b) => days.indexOf(a) - days.indexOf(b))
                    ?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </p>
            </div>
          </div>
          {assignement.can_this_assignement_be_carried_out_continously ===
            "no" && (
            <div className="col">
              <h3>Description of construction stop</h3>
              <p className="desc">
                {assignement.description_construction_stop}
              </p>
            </div>
          )}
          <div className="col">
            <h3>Job description</h3>
            <p className="desc">{assignement.description_of_activities}</p>
          </div>
          <div className="col long">
            <div className="row-header">
              <BsFileEarmarkArrowUp />
              <p>Required Certificates</p>
            </div>
            <ul>
              {cert?.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>

          <div className="col long">
            <div className="row-header">
              <ImPriceTag />
              <p>Skills</p>
            </div>
            <ul>
              {skills?.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>

          <div className="col long">
            <div className="row-header">
              <AiOutlineFileImage />
              <p>Languages</p>
            </div>
            <div>
              <span className="red">
                For this assignment you must speak the following languages{" "}
                <br /> <br />
              </span>
              <div className="languages_spoken">
                {/* {
                          get_lang.data?.map(item=>(
                              <div>
                                  {lang[item.lang]}
                              </div>
                          ))
                      } */}
                {get_lang.data?.map((item) => (
                  <>
                    <p>{lang[item.lang] + " : " + item.level}</p>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="col long">
            <div className="row-header">
              <AiOutlineFileImage />
              <p>Attachments</p>
            </div>
            <div className="row attachments">
              <ul>
                {savePDF
                  ? files?.map((file) => (
                      <li>
                        <img src={file} alt="" />
                      </li>
                    ))
                  : files?.map((file) => (
                      <li>
                        <a href={file} download>
                          <embed src={file} type="" />
                          <BsDownload />
                        </a>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col side-info">
          <div
            onClick={() => {
              user_info.user?.token
                ? setShowApply(!showApply)
                : redirectLink.current.click();
            }}
          >
            <a href="#" className="apply-button">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45A10.02 10.02 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22l-1.5-1.5c-1 .46-2.11.72-3.28.72zm7-5h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z"></path>
              </svg>{" "}
              Apply
            </a>
          </div>

          <div className="side-panel">
            <div className="row-header">
              <p>
                <img
                  src={
                    get_personal.user?.picture || "/images/profile-client.png"
                  }
                  alt=""
                />
              </p>
            </div>
            <div className="row">
              <div>
                <p>
                  <b>Contact person</b>
                  {" " + assignement.contact_person}
                </p>
              </div>
            </div>
            <div className="row">
              <div>
                <p>
                  <b>Open assignments</b>
                </p>
                <p>{assignement?.open_assignments}</p>
              </div>
            </div>
            <div className="row last_review">
              <div>
                <p>
                  <b>Last reviews</b>
                </p>
                <div className="last_reviews">
                  <Swiper
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 4000 }}
                    loop
                  >
                    {get_reviews.data?.map((item, index) => (
                      <SwiperSlide>
                        <div className="review" id={index} key={index}>
                          <div className="user-image">
                            <img
                              src={item.picture || "/images/logo.png"}
                              alt=""
                            />
                          </div>
                          <div className="review-content">
                            <div className="user-name">
                              <h4>{item.user_name}</h4>
                            </div>
                            <div className="review-text">
                              <IoIosQuote />
                              <p>{item.review}</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <div className="side-panel">
            <div className="row-header">
              <p>Cost</p>
            </div>
            <div className="row">
              <ImPriceTag />
              <div>
                <p>
                  <b>Pay type</b>
                </p>
                <p>{assignement.pay_type}</p>
              </div>
            </div>
            {assignement.number_of_units && (
              <div className="row">
                <ImPriceTag />
                <div>
                  <p>
                    <b>Number of units</b>
                  </p>
                  <p>{assignement.number_of_units}</p>
                </div>
              </div>
            )}
            <div className="row">
              <RiSuitcaseFill />
              <div>
                <p>
                  <b>Price type</b>
                </p>
                <p>{assignement.price_type || ""}</p>
              </div>
            </div>
            <div className="row">
              <RiSuitcaseFill />
              <div>
                <p>
                  <b>Payment terms</b>
                </p>
                <p>{assignement.payements_term}</p>
              </div>
            </div>
            {assignement.type_of_installation_object && (
              <div className="row">
                <ImPriceTag />
                <div>
                  <p>
                    <b>Type of installation object</b>
                  </p>
                  <p>{assignement.type_of_installation_object}</p>
                </div>
              </div>
            )}
            {assignement.pay_type === "pay per hour" ? (
              assignement.price_type?.toLowerCase() === "asking price" ? (
                <div className="row">
                  <ImPriceTag />
                  <div>
                    <p>
                      <b>Hourly rate</b>
                    </p>
                    <p>
                      {assignement.hourly_wage +
                        " " +
                        (assignement.currency || "€")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    <ImPriceTag />
                    <div>
                      <p>
                        <b>Hourly wage from</b>
                      </p>
                      <p>
                        {assignement.hourly_wage_from} <b>To</b>{" "}
                        {" " + assignement.hourly_wage_to}
                      </p>
                    </div>
                  </div>
                </>
              )
            ) : assignement.price_type?.toLowerCase() === "asking price" ? (
              <div className="row">
                <ImPriceTag />
                <div>
                  <p>
                    <b>Price Per Piece</b>
                  </p>
                  <p>{assignement.price_per_piece}</p>
                </div>
              </div>
            ) : (
              <div className="row">
                <ImPriceTag />
                <div>
                  <p>
                    <b>Opening Price</b>
                  </p>
                  <p>{assignement.opening_price}</p>
                </div>
              </div>
            )}
          </div>
          <div className="side-panel">
            <div className="row-header">
              <p>Assignement Overview</p>
            </div>
            <div className="row">
              <RiSuitcaseFill />
              <div>
                <p>
                  <b>Industry</b>
                </p>
                <p>
                  {assignement.industry}
                  {assignement.industry === "Childcare" &&
                    checked_comp?.map(
                      (item) =>
                        "," +
                        get_all_competencies.competencies?.find(
                          (elt) => elt.id === item
                        )?.competence
                    )}
                </p>
              </div>
            </div>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <ImPriceTag />
              <div>
                <p>
                  <b>What may be charged</b>
                </p>

                {what_may_be_charged?.map((item) => (
                  <p>
                    <u>{item}</u>
                  </p>
                ))}
              </div>
            </div>
            <div className="row">
              <AiOutlineFieldTime />
              <div>
                <p>
                  <b>
                    {/\d/.test(assignement.job_duration)
                      ? "Project end time"
                      : "Estimated lead time"}
                  </b>
                </p>
                <p>{assignement.job_duration}</p>
              </div>
            </div>
            <div className="row">
              <GoCalendar />
              <div>
                <p>
                  <b>Starting date</b>
                </p>
                <p>
                  {assignement.start_asap
                    ? "Start as soon as possible"
                    : assignement.starting_date?.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="side-panel">
            <div className="row-header">
              <p>Map</p>
            </div>
            <div className="row">
              {get_assignement.data &&
                get_geolocation.data &&
                get_geolocation.data?.results && (
                  <Map
                    place={assignement.place}
                    address={assignement.province + ", " + assignement.country}
                    lat={
                      get_geolocation.data.results[0]?.geometry?.location.lat
                    }
                    lng={
                      get_geolocation.data.results[0]?.geometry?.location.lng
                    }
                  />
                )}
            </div>
          </div> */}
        </div>
      </div>
      <div
        className="bottom-bar"
        style={{
          gridTemplateColumns:
            get_assignement.data?.user_id === user_info.user?.id &&
            user_info.user?.account_type === "client"
              ? "repeat(6,1fr)"
              : "repeat(4,1fr)",
          gridTemplateRows:
            get_assignement.data?.user_id === user_info.user?.id
              ? "repeat(2,1fr)"
              : "1fr",
        }}
      >
        {user_info.user?.account_type !== "client" && (
          <div>
            {get_liked.data?.find(
              (item) => item.assignement_id === location.state?.id
            ) !== undefined ? (
              <BsHeartFill
                style={{ color: "#e31b23" }}
                onClick={() => {
                  user_info.user?.token
                    ? removeLikeHandler(location.state?.id)
                    : redirectLink.current.click();
                }}
              />
            ) : (
              <BsHeart
                onClick={() => {
                  user_info.user?.token
                    ? like_assignement()
                    : redirectLink.current.click();
                }}
              />
            )}
          </div>
        )}
        {get_assignement.data?.user_id === user_info.user?.id && (
          <div>
            <Link
              to="/dashboard/place-call"
              state={{ data: [get_assignement.data] }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                <BsPen />
                Edit
              </p>
            </Link>
          </div>
        )}
        {user_info.user?.account_type !== "client" && (
          <div style={{ position: "relative" }}>
            <BsShare
              onClick={() => {
                user_info.user?.token
                  ? setShowShare(true)
                  : redirectLink.current.click();
              }}
            />
            {showShare && (
              <div className="shareAssignement">
                <div>
                  <h4>
                    <b>Share this assignment</b>
                  </h4>
                  <div className="close" onClick={() => setShowShare(false)}>
                    <AiOutlineClose />
                  </div>
                </div>
                <div>
                  <FacebookShareButton
                    url={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                    quote={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                  >
                    <BsFacebook />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                  >
                    <AiFillTwitterCircle />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                  >
                    <BsLinkedin />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                  >
                    <IoLogoWhatsapp />
                  </WhatsappShareButton>
                  <EmailShareButton
                    subject="  "
                    body="  "
                    url={`https://curant24.nl/dashboard/view-assignement/${location.state?.id}`}
                    separator=""
                    style={{
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <MdEmail />
                  </EmailShareButton>
                </div>
              </div>
            )}
          </div>
        )}
        {like.data && user_info.user?.account_type === "freelancer" && (
          /*<MessageBox message={"You have saved this assignements. \n You can find it under the link <Link to='/saved-profiles'>Saved Assignments</Link>"}/>*/
          <div
            className="liked_assignement_msg"
            ref={(ref) => (messageBoxRef.current = ref)}
          >
            <div className="like_assignment_content">
              <p>
                You have saved this assignements. <br /> You can find it under
                the link.
              </p>
              <Link to="/saved-profiles" state={{ freelancer: true }}>
                Saved Assignements.
              </Link>
            </div>
            <div className="closeBtn" onClick={() => hideButton()}>
              <AiOutlineClose />
            </div>
          </div>
        )}
        {user_info.user?.account_type !== "client" && (
          <>
            <div
              onClick={() => {
                printDocument();
              }}
            >
              <img src="/images/pdfIcon.png" alt="" />
            </div>
            {/* <div>
                        <BiMessageDetail/>
                        <p>
                          Ask a question  
                        </p>
                      </div> */}
            <div
              style={{ borderRight: "none" }}
              onClick={() => {
                user_info.user?.token
                  ? setShowApply(!showApply)
                  : redirectLink.current.click();
              }}
            >
              <MdOutlineAddTask />
              <p>Apply</p>
            </div>
          </>
        )}
        {get_assignement.data?.user_id === user_info.user?.id && (
          <>
            <div>Status: {status}</div>
            <div
              className={status?.includes("Paused") ? "red opposite" : ""}
              onClick={() => {
                set_assignement_handler();
              }}
            >
              Pause Assignement
            </div>
            <div
              className={status?.includes("Paused") ? "" : "green opposite"}
              onClick={() => {
                set_assignement_handler();
              }}
            >
              Place Assignement
            </div>
            <div
              className={status?.includes("Paused") ? "red" : "green"}
              onClick={() => {
                deleteAssignement();
              }}
            >
              <BsTrash /> Remove
            </div>
            <div
              className={status === "Paused" ? "red" : "green"}
              onClick={() => {
                setShow_notif(!show_notif);
              }}
            >
              Notifications
              <BsBell />
            </div>
          </>
        )}
      </div>
      {!savePDF &&
        ((
          <div className="view-assignement-buttons">
            <button>
              {status === "Paused"
                ? "Assignment " + status
                : status === "Rejected"
                ? "Assignment " + status
                : status}
            </button>
            <button onClick={() => deleteAssignement()}>
              Remove
              <BsTrash />
            </button>
            <Link
              to="/dashboard/place-call"
              state={{ data: get_assignement.data }}
            >
              <button>
                Edit
                <BsPen />
              </button>
            </Link>
            <button
              className={status === "Paused" && "red"}
              onClick={() => {
                set_assignement_handler();
              }}
            >
              Pause job
            </button>
            <button
              className={status !== "Paused" && "green"}
              onClick={() => {
                set_assignement_handler();
              }}
            >
              Place job
            </button>
            <button
              className={status === "Paused" ? "red" : "green"}
              onClick={() => {
                setShow_notif(!show_notif);
              }}
            >
              Notifications
              <BsBell />
            </button>
          </div>
        ),
        show_notif &&
          user_info.user?.account_type === "client" &&
          get_assignement.data?.user_id === user_info.user?.id && (
            <div className="view-assignement-notifications">
              <p>Notifications</p>
              <textarea
                name="status_message"
                id=""
                onChange={(e) => {
                  user_info.user?.token
                    ? setStatusMessage(e.target.value)
                    : redirectLink.current.click();
                }}
                defaultValue={
                  (statusMessage || status) === "Paused"
                    ? (statusMessage || status).replace(/.$/, " Assignement")
                    : statusMessage || status
                }
                placeholder="Your message here"
                cols="90"
                style={{ width: "100%" }}
                rows="10"
              ></textarea>
              <button
                className="save"
                onClick={() => {
                  user_info.user?.token
                    ? updateStatusMessage()
                    : redirectLink.current.click();
                }}
              >
                Save
              </button>
            </div>
          ))}
      <div className="buttons">
        <Link
          to={location.state?.target || "/dashboard/assignements"}
          state={{ stopSearch: location.state?.stopSearch }}
        >
          <button
            onClick={() => {
              set_assignement.data = undefined;
              get_geolocation.data = undefined;
            }}
          >
            Back
          </button>
        </Link>
      </div>
      <Link
        to="/dashboard/assignements"
        style={{ display: "none" }}
        ref={(ref) => ref !== null && (linkRef.current = ref)}
        state={{ message: delete_assignement.data }}
      ></Link>
      {!savePDF && <DashboardBarBottom user_id={userId} />}
      {user_info.user?.account_type === "freelancer" && showApply && (
        <div className="apply" tabindex="-1">
          <div className="apply-bg" onClick={() => setShowApply(false)}></div>
          <div
            className={applySubmit ? "apply-dialog  submit" : "apply-dialog "}
          >
            {!applySubmit ? (
              showApplyMotiv ? (
                <div className="apply-content">
                  <div className="apply-header">
                    <h4 className="apply-title">
                      <b>
                        {showLatestMotiv
                          ? "Your previous motivation(s)"
                          : "briefly indicate why you would like this job"}
                      </b>
                    </h4>
                    <div>
                      <AiOutlineClose
                        onClick={() => {
                          setShowApply(false);
                          setApplySubmit(false);
                          setShowApplyMotiv(false);
                          setCharNum(3000);
                          setShowLatestMotiv(false);
                        }}
                      />
                    </div>
                  </div>
                  {!showLatestMotiv ? (
                    <>
                      <div className="apply-body">
                        <Link
                          to=""
                          onClick={() => {
                            setShowLatestMotiv(true);
                            setApplyMotivation(latestMotiv || []);
                          }}
                        >
                          <HiDocumentDuplicate /> view your previous motivations
                        </Link>
                        <div className="apply-form">
                          <textarea
                            name="motivation"
                            id=""
                            defaultValue={applyMotivation}
                            maxLength={"3000"}
                            cols="30"
                            rows="5"
                            onChange={(e) => {
                              setCharNum(3000 - e.target.value.length);
                              setApplyMotivation(e.target.value);
                            }}
                          ></textarea>
                          <span>{charNum}</span>
                        </div>
                      </div>
                      <div className="apply-footer">
                        <button type="button" onClick={() => apply()}>
                          send application
                        </button>
                        <button
                          type="button"
                          className="back"
                          onClick={() => {
                            setShowApplyMotiv(false);
                            setShowLatestMotiv(false);
                          }}
                        >
                          go back
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="apply-latest-motiv">
                      <Swiper slidesPerView={1} navigation>
                        {latestMotiv?.map((item) => (
                          <>
                            <SwiperSlide>
                              <div>
                                <span>Motivation</span>
                                <h1>{item.job_name}</h1>
                                <p>{item.motivation}</p>
                                <div
                                  className="apply-footer"
                                  style={{
                                    marginLeft: "-20px",
                                    position: "absolute",
                                    bottom: "0",
                                    padding: "0",
                                    width: "80%",
                                    left: "15%",
                                  }}
                                >
                                  {showLatestMotiv ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowLatestMotiv(false);
                                        setApplyMotivation(item.motivation);
                                      }}
                                    >
                                      Copy and customize
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => apply()}
                                    >
                                      send application
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="back"
                                    onClick={() => {
                                      setShowApplyMotiv(false);
                                      setShowLatestMotiv(false);
                                    }}
                                  >
                                    go back
                                  </button>
                                </div>
                              </div>
                            </SwiperSlide>
                          </>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>
              ) : (
                <div className="apply-content">
                  <div className="apply-header">
                    <h4 className="apply-title">
                      <b>
                        {user_info.user?.user_name} you apply with these contact
                        details
                      </b>
                    </h4>
                    <div>
                      <AiOutlineClose
                        onClick={() => {
                          setShowApply(false);
                          setApplySubmit(false);
                          setShowApplyMotiv(false);
                          setCharNum(3000);
                        }}
                      />
                    </div>
                  </div>
                  <div className="apply-body">
                    <p>{user_info.user?.email}</p>
                    <div className="apply-form">
                      <input
                        type="text"
                        name="phone_no"
                        id=""
                        defaultValue={applyPhoneNo}
                        className={error ? "error" : ""}
                        placeholder="Your phone number"
                        onChange={(e) => setApplyPhoneNo(e.target.value)}
                      />
                      {error && (
                        <span style={{ color: "darkred" }}>
                          Please enter your phone number
                        </span>
                      )}
                      <div>
                        <p
                          className="link"
                          onClick={() => setShowApplyMotiv(true)}
                        >
                          write your motivation
                        </p>
                        <p>(optional)</p>
                      </div>
                    </div>
                  </div>
                  <div className="apply-footer">
                    <button
                      type="button"
                      onClick={() => {
                        apply();
                      }}
                    >
                      Yes apply
                    </button>
                    <button
                      type="button"
                      className="back"
                      onClick={() => setShowApply(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="apply-content">
                <div className="apply-header">
                  <h4 className="apply-title">
                    <b>Your application has been sent.</b>
                  </h4>
                  <div>
                    <AiOutlineClose
                      onClick={() => {
                        setShowApply(false);
                        setApplySubmit(false);
                        setShowApplyMotiv(false);
                        setCharNum(3000);
                      }}
                    />
                  </div>
                </div>
                <div className="apply-body">
                  <p>We have sent a confirmation of your application to</p>
                  <p>{user_info.user?.email}</p>
                  <div className="apply-form">
                    <div>
                      <p>
                        We will contact you within 2 working days. If you have
                        any question,
                      </p>
                      <p>please contact us.</p>
                    </div>
                  </div>
                </div>
                <div className="apply-footer">
                  <button
                    type="button"
                    className="back"
                    onClick={() => {
                      setApplySubmit(false);
                      setShowApply(false);
                      setShowApplyMotiv(false);
                    }}
                  >
                    continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Link
        to="/login"
        state={{
          target:
            "/dashboard/view-assignement?id=" +
            location.state?.id +
            "&user_id=" +
            location.state?.user_id,
        }}
        ref={(ref) => ref !== null && (redirectLink.current = ref)}
      ></Link>
    </div>
  );
}
