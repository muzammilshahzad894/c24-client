import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import DashboardBarBottom from "../../components/DashboardBarBottom/DashboardBarBottom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyInfo,
  getDocuments,
  getPersonalInfo,
  get_user_competency_action,
  get_work_experience_action,
} from "../../state/Actions/UserAction";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { BsClock } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { useRef } from "react";
export default function Dashboard() {
  const user_info = useSelector((state) => state.user_info);
  const get_personal = useSelector((state) => state.get_personal);
  const dispatch = useDispatch();
  const delete_account = useSelector((state) => state.delete_account);
  const get_company_data = useSelector((state) => state.get_company_data);
  const get_documents = useSelector((state) => state.get_documents);
  const get_work_experience = useSelector((state) => state.get_work_experience);
  const get_user_competency = useSelector((state) => state.get_user_competency);
  const [personalInfo, setPersonalInfo] = useState(0);
  const [companyDetails, setCompanyDetails] = useState(0);
  const [document, setDocument] = useState(0);
  const [diplomas, setDiplomas] = useState(0);
  const [introVideo, setIntroVideo] = useState(0);
  const [workXP, setWorkXP] = useState(0);
  const [competencies, setCompetencies] = useState(0);
  const account_verified_ref = useRef();

  //checking if the profile's files are complete to determine wether the link shows or not
  const checker = () => {
    let personalInfoPercent = 0;
    let companyDetailsPercent = 0;
    let documentPercent = 0;
    let diplomasPercent = 0;
    for (const [key, value] of Object.entries(get_personal.user)) {
      if (
        key !== "id" &&
        key !== "user_key" &&
        key !== "created_at" &&
        key !== "updated_at" &&
        key !== "competencies" &&
        key !== "rating"
      ) {
        if (value?.length > 0) {
          personalInfoPercent++;
        }
      }
    }
    for (const [key, value] of Object.entries(get_company_data.data)) {
      if (key !== "id" && key !== "user_id") {
        if (value?.length > 0) {
          companyDetailsPercent++;
        }
      }
    }
    if (
      get_documents.data &&
      get_documents.data[0] &&
      get_documents.data[0][0]
    ) {
      for (const [key, value] of Object.entries(get_documents.data[0][0])) {
        if (key !== "user_id") {
          if (value?.length > 0) {
            documentPercent++;
          }
        }
      }
    }
    get_documents.data[1]?.map((item) => {
      if (item?.diplomat_certificate?.length > 0) {
        diplomasPercent = 1;
      }
      return item;
    });

    if (get_personal.user?.video) {
      setIntroVideo(100);
    }
    if (get_work_experience.work_xp[0]?.id) {
      setWorkXP(100);
    }
    if (
      get_user_competency.competencies &&
      get_user_competency.competencies[0]
    ) {
      setCompetencies(100);
    }
    setPersonalInfo(
      Math.floor((personalInfoPercent / 16) * 100) > 100
        ? 100
        : Math.floor((personalInfoPercent / 16) * 100)
    );
    setCompanyDetails(Math.floor((companyDetailsPercent / 9) * 100));
    setDocument(Math.floor((documentPercent / 5) * 100));
    setDiplomas(Math.floor((diplomasPercent / 1) * 100));
  };
  useEffect(() => {
    dispatch(getPersonalInfo(user_info.user?.token));
    dispatch(getCompanyInfo(user_info.user?.token));
    dispatch(getDocuments(user_info.user?.token));
    dispatch(get_work_experience_action(user_info.user?.token));
    dispatch(get_user_competency_action(user_info.user?.token));
  }, [dispatch, user_info.user?.token]);

  useEffect(() => {
    if (
      get_personal.user &&
      get_company_data.data &&
      get_documents.data &&
      get_work_experience.work_xp
    ) {
      checker();
    }
  }, [
    get_company_data,
    get_documents.data,
    get_personal.user,
    get_work_experience.work_xp,
  ]);
  if (!user_info.user.email) {
    window.location.replace("/login");
  }
  useEffect(() => {
    dispatch(getPersonalInfo(user_info.user.token));
  }, [dispatch, user_info.user.token]);
  return get_personal.loading ? (
    <LoadingBox big />
  ) : (
    <div className="dashboard">
      <DashboardBar />
      <div className="banner">
        <div
          className="title"
          style={{
            marginBottom:
              get_personal.user?.account_type === "client" ? "20px" : "0px",
          }}
        >
          <h1>
            Welcome to Curant24,{" "}
            {get_personal.user &&
              get_personal.user.first_name?.charAt(0).toUpperCase() +
                get_personal.user.first_name?.slice(1) +
                " " +
                get_personal.user.last_name}
          </h1>
        </div>
        <div className="welcome-message">
          {user_info.user?.verified ? (
            user_info.user?.account_type === "client" ? (
              <h3
                className="success"
                ref={(ref) =>
                  ref !== null && (account_verified_ref.current = ref)
                }
              >
                Your company account is <br />
                now activated.{" "}
                <AiFillCloseCircle
                  onClick={() =>
                    (account_verified_ref.current.style.display = "none")
                  }
                />
              </h3>
            ) : (
              <h3
                className="success"
                ref={(ref) =>
                  ref !== null && (account_verified_ref.current = ref)
                }
              >
                Your account is now activated.{" "}
                <AiFillCloseCircle
                  onClick={() =>
                    (account_verified_ref.current.style.display = "none")
                  }
                />
              </h3>
            )
          ) : (
            <>
              <p>
                <b>
                  Note: Your{" "}
                  {user_info.user?.account_type === "client" ? " company " : ""}{" "}
                  account has not yet been activated <br />
                  Please check your mailbox.
                </b>
              </p>
              {user_info.user?.account_type === "client" ? (
                <p>
                  Thank you for registering as a client for Curant24 . <br />
                  We are a company that has been mediating freelancers and
                  clients worldwide in every conceivable industry for years.{" "}
                  <br />
                  You can find a suitable freelancer on Curant24 for all your
                  projects. And Curant24 will help you with that.
                </p>
              ) : personalInfo === 100 &&
                companyDetails === 100 &&
                document === 100 &&
                diplomas === 100 &&
                workXP === 100 &&
                introVideo === 100 ? (
                <></>
              ) : (
                <p>
                  Note : Account is not complete. <br /> <br />
                  Nice that you have signed up with Curant24, to work through us
                  as a freelancer. We hope for a long-term <br />
                  cooperation. <br />
                  <br />
                  With us you are always assured of work. We can offer you
                  different projects of your choice. <br />
                  Before we can place you on a project, you must complete your
                  account. <br />
                  Click the link to see which documents we still need. <br />
                  <br />
                  As soon as your account is complete, we will immediatly get to
                  work for you. <br /> <br />
                  <b>If you have not entered an hourly rate. Your profile is not visible in the search results. <br />
                  Enter your hourly rate directly in the company details. By clicking on the link below.</b> <br /><br />
                  Thank you.
                  <br />
                  <br />
                  <Link to="/complete-registration">
                    <b>Complete registration {">>"}</b>
                  </Link>
                </p>
              )}
            </>
          )}
        </div>
        {/* {
            get_personal.user?.account_type!=="client"&& 
                <div className="needInformation" >
                    <p>
                        Nice that you have signed up for Curant24 and want to start as a self-employed person in childcare.
                        Before you can really get started as a self-employed person, you complete your profile and visit our office for a screening interview. Your account will then be activated and you can get started via our platform. 
                    </p>
                    <u>We need the following information from you, complete your profile under settings:</u>
                    <ul>
                        <li>
                            Valid childcare diploma.<Link to="/dashboard"> Do the diploma check.</Link>
                        </li>
                        <li>
                            Registration in the<Link to="/dashboard"> childcare register .</Link>
                        </li>
                        <li>
                            Business liability insurance.<Link to="/dashboard">. ( For example this one )</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Registration with the Chamber of Commerce .</Link>
                        </li>
                        <li className="optional">
                            (Optional) First Aid, Preschool and further certificates.
                        </li>
                    </ul>

                    <Link to="/dashboard" className='once-profile-complete'>
                        As soon as your profile is complete, make an appointment here for a screening interview.
                    </Link>
                    <div className="questions">
                        <p>Do you have a question? Look under <Link to="/dashboard"> frequently asked questions</Link> .</p>
                    </div>
                </div>
            } */}
      </div>
      <div className="navigation">
        <div className="icons">
          {get_personal.user?.account_type === "freelancer" ? (
            <div className="freelancer-icon">
              <Link to="/dashboard/availability">
                <div className="icon availability">
                  <img src="/images/calendar.svg" alt="" />
                  <p>Availability</p>
                </div>
              </Link>
              <Link to="/dashboard/assignement-alerts">
                <div className="icon bell">
                  <img src="/images/bell.svg" alt="" />
                  <p>Set assignement alert</p>
                </div>
              </Link>
              <Link to="/dashboard/assignements">
                <div className="icon briefcase">
                  <img src="/images/briefcase.svg" alt="" />
                  <p>My Assignments</p>
                </div>
              </Link>

              <Link to="/dashboard/contracts">
                <div className="icon bar-chart">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 384 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16 2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
                  </svg>
                  <p>Contracts</p>
                </div>
              </Link>

              <Link to="/dashboard/timecards">
                <div className="icon euro">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BsClock />
                    <img src="/images/euro.svg" alt="" />
                  </div>
                  <p>
                    {user_info.user?.account_type === "client"
                      ? "Timecards & invoices Freelancers"
                      : "Send your invoices and Timecard"}
                  </p>
                </div>
              </Link>
              <Link to="/dashboard/invite">
                <div className="icon add-user">
                  <img src="/images/add-user.svg" alt="" />
                  <p>To invite</p>
                </div>
              </Link>
              <Link
                to={
                  user_info.user?.account_type === "client"
                    ? "/dashboard/organisaties"
                    : "/dashboard/invoices-overview"
                }
              >
                <div className="icon book">
                  {/* <img src="/images/book.svg" alt="" /> */}
                  {user_info.user?.account_type === "client" ? (
                    <>
                      <FiUsers />
                      <p>My freelancers</p>
                    </>
                  ) : (
                    <>
                      <AiOutlineFileText />
                      <p>
                        Overview of my sent <br />
                        Invoices and Timecards
                      </p>
                    </>
                  )}
                </div>
              </Link>
              <Link to="/faq">
                <div className="icon chat">
                  <img src="/images/chat.svg" alt="" />
                  <p>FAQ</p>
                </div>
              </Link>
              <Link to="/dashboard/settings">
                <div className="icon gears">
                  <img src="/images/gears.svg" alt="" />
                  <p>Institutions</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="clients-icons">
              <Link to="/dashboard/place-call">
                <div className="icon bell">
                  <img src="/images/bell.svg" alt="" />
                  <p>Place Assignment</p>
                </div>
              </Link>
              <Link to="/dashboard/assignements">
                <div className="icon briefcase">
                  <img src="/images/briefcase.svg" alt="" />
                  <p>Assignements</p>
                </div>
              </Link>
              <Link to="/faq">
                <div className="icon chat">
                  <img src="/images/chat.svg" alt="" />
                  <p>FAQ</p>
                </div>
              </Link>
              <Link to="/dashboard/settings">
                <div className="icon gears">
                  <img src="/images/gears.svg" alt="" />
                  <p>Institutions</p>
                </div>
              </Link>
              <Link to="/dashboard/timecards">
                <div className="icon euro">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BsClock />
                    <img src="/images/euro.svg" alt="" />
                  </div>
                  <p>
                    {user_info.user?.account_type === "client"
                      ? "Timecards & invoices Freelancers"
                      : "Send your invoices and Timecard"}
                  </p>
                </div>
              </Link>
              <Link to="/dashboard/invite">
                <div className="icon add-user">
                  <img src="/images/add-user.svg" alt="" />
                  <p>To invite</p>
                </div>
              </Link>
              <Link
                to={
                  user_info.user?.account_type === "client"
                    ? "/dashboard/organisaties"
                    : "/dashboard/invoices-overview"
                }
              >
                <div className="icon book">
                  {/* <img src="/images/book.svg" alt="" /> */}
                  {user_info.user?.account_type === "client" ? (
                    <>
                      <FiUsers />
                      <p>My freelancers</p>
                    </>
                  ) : (
                    <>
                      <AiOutlineFileText />
                      <p>
                        Overview of my sent <br />
                        Invoices and Timecards
                      </p>
                    </>
                  )}
                </div>
              </Link>
              <Link to="/dashboard/contracts">
                <div className="icon bar-chart">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 384 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16 2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
                  </svg>
                  <p>Contracts</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <DashboardBarBottom user_id={user_info.user?.id} />
    </div>
  );
}
