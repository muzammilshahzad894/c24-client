import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import DashboardBarBottom from "../../components/DashboardBarBottom/DashboardBarBottom";
import { MdLogin } from "react-icons/md";
import { FaGraduationCap, FaSuitcase } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GiSpanner } from "react-icons/gi";
import { VscFileSubmodule } from "react-icons/vsc";
import { CgFileDocument } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { ImLocation } from "react-icons/im";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_account_action,
  getCompanyInfo,
  getDocuments,
  getPersonalInfo,
  get_reserve_action,
  get_user_competency_action,
  get_work_experience_action,
} from "../../state/Actions/UserAction";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import {
  BsCurrencyEuro,
  BsFillPencilFill,
  BsFillPersonFill,
  BsHeart,
} from "react-icons/bs";
export default function Settings() {
  const delete_account = useSelector((state) => state.delete_account);
  const user_info = useSelector((state) => state.user_info);
  const get_personal = useSelector((state) => state.get_personal);
  const get_reserve = useSelector((state) => state.get_reserve);
  const location = useLocation({});
  const dispatch = useDispatch();
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
    dispatch(get_reserve_action(user_info.user?.token));
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

  const remove_account = () => {
    dispatch(delete_account_action(user_info.user.token));
    sessionStorage.removeItem("user_info");
  };
  if (delete_account.message) {
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  }

  if (!user_info.user.email) {
    window.location.replace("/login");
  }
  useEffect(() => {
    dispatch(getPersonalInfo(user_info.user.token));
    window.scrollTo(0, 0);
  }, [dispatch, user_info.user.token]);
  console.log(location);
  return get_personal.loading ? (
    <LoadingBox big />
  ) : (
    <div className="settings">
      <DashboardBar />
      <div className="content">
        {
          /*account not complete message*/

          user_info.user?.account_type === "client" ? (
            <h4 style={{ color: "red", textAlign: "center" }}>
              Note: Your company account has not yet been activated. <br />
              Please check your mailbox.
            </h4>
          ) : personalInfo === 100 &&
            companyDetails === 100 &&
            document === 100 &&
            diplomas === 100 &&
            workXP === 100 &&
            introVideo === 100 ? (
            <></>
          ) : (
            <h4 style={{ color: "red", textAlign: "center" }}>
              ! Note: Account is not complete. <br />
              Click{" "}
              <Link style={{ color: "red" }} to="/complete-registration">
                here to complete registration {">>"}
              </Link>
            </h4>
          )
        }
        <div className="title">
          <h1>Institutions</h1>
          {location && location.state && location.state.message && (
            <div className="settings-message-box">
              <Link to="/dashboard/settings" state={{}}>
                <MessageBox message={location.state.message} />
              </Link>
            </div>
          )}
          {delete_account.message && (
            <MessageBox message={delete_account.message} />
          )}
          <div className="curant-and-image">
            <img
              src={`${
                get_personal.user &&
                (get_personal.user.picture
                  ? get_personal.user.picture
                  : "/images/logo.png")
              }`}
              alt=""
            />
            <div>
              <span>Curant24</span>
              <Link to={`/dashboard/settings/profile/${user_info.user?.id}`}>
                View your profile and ratings
              </Link>
            </div>
          </div>
          {get_personal?.user?.account_type === "freelancer" && (
            <Link to="/dashboard/settings/reserve">
              <div className="reserve-img">
                <img src="/images/reserve_service.PNG" alt="" />
                <h3>
                  My reserve services ({get_reserve.data?.at(0)?.id ? 1 : 0})
                </h3>
              </div>
            </Link>
          )}
        </div>
        <div className="links">
          <div className="link">
            <MdLogin />
            <Link to="/dashboard/settings/change-password">
              Change Password
            </Link>
          </div>
          {user_info.user.account_type === "freelancer" ? (
            <>
              <div className="link">
                <AiFillHome />
                <Link to="/dashboard/settings/personal-information">
                  Personal information
                </Link>
              </div>
              <div className="link">
                <FaSuitcase />
                <Link to="/dashboard/settings/company-details">
                  Company details
                </Link>
              </div>
              <div className="link">
                <GiSpanner />
                <Link to="/dashboard/settings/competences">Competencies</Link>
              </div>
              <div className="link">
                <VscFileSubmodule />
                <Link to="/dashboard/settings/documents">Documents</Link>
              </div>
              <div className="link">
                <FaGraduationCap />
                <Link to="/dashboard/settings/credentials">
                  Diplomas and certificates
                </Link>
              </div>
              <div className="link">
                <CgFileDocument />
                <Link to="/dashboard/settings/work-experience">
                  Work experience
                </Link>
              </div>
              <div className="link">
                <IoCloseSharp />
                <Link to="/dashboard/settings/">Exclude companies</Link>
              </div>
            </>
          ) : (
            <>
              <div className="link">
                <AiFillHome />
                <Link to="/dashboard/settings/organisation-data">
                  Organisation Data
                </Link>
              </div>
              <div className="link">
                <ImLocation />
                <Link to="/dashboard/settings/locations">Locations</Link>
              </div>
              <div className="link">
                <BsFillPersonFill />
                <Link to="/dashboard/settings/accounts">Accounts</Link>
              </div>
              <div className="link">
                <BsFillPencilFill />
                <Link to="/dashboard/settings/manage-locations">
                  Manage Locations
                </Link>
              </div>
              <div className="link">
                <BsCurrencyEuro />
                <Link to="/dashboard/settings/hourly-rates">Hourly Rates</Link>
              </div>
              <div className="link">
                <BsHeart />
                <Link to="/favorites">Favorite freelancers</Link>
              </div>
            </>
          )}
          <div className="link">
            <IoIosNotifications />
            <Link
              to={
                user_info.user?.account_type === "freelancer"
                  ? "/dashboard/assignement-alerts"
                  : "/dashboard/notifications"
              }
            >
              {user_info.user?.account_type === "freelancer"
                ? "assignement alerts"
                : "Notifications"}
            </Link>
          </div>
          <div className="link">
            <img
              src="/images/icon-management.png"
              alt=""
              style={{ width: "25px", marginRight: "10px" }}
            />
            <Link to="management">Management</Link>
          </div>
        </div>
        <div className="deleteProfile">
          <button onClick={() => remove_account()}>
            <IoCloseSharp />
            Delete profile
          </button>
        </div>
      </div>
      <DashboardBarBottom />
    </div>
  );
}
