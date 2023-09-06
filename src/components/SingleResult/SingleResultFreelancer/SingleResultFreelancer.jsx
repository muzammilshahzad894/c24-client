import React, { useRef, useState } from "react";
import {
  BsCurrencyEuro,
  BsFacebook,
  BsHeart,
  BsHeartFill,
  BsLinkedin,
  BsShare,
  BsStarFill,
} from "react-icons/bs";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  AiFillTwitterCircle,
  AiOutlineClose,
  AiOutlineMore,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import "./singleResultFreelancer.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import {
  get_liked_action,
  like_action,
  remove_like_action,
} from "../../../state/Actions/UserAction";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import ReactStars from "react-rating-stars-component";

export default function SingleResultFreelancer({ data, sideBySide }) {
  const user_info = useSelector((state) => state.user_info);
  const get_liked = useSelector((state) => state.get_liked);
  const get_all_competencies = useRef();
  const get_user_competencies = useRef();
  const get_reviews = useRef();
  const get_documents = useRef();
  const [toggle, setToggle] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [toggleDiplomas, setToggleDiplomas] = useState(false);
  const [rate, setRate] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.includes("saved")) {
      data.user_id = data.freelancer_id;
    }
  }, [data, location.pathname]);

  useEffect(() => {
    //in order to get each user's data
    const getOtherUserInfo = async () => {
      try {
        get_documents.current = await axios.get("/api/user/get-documents", {
          headers: {
            token: user_info.user.token,
          },
          params: {
            id: data.user_id,
          },
        });

        get_all_competencies.current = await axios.get(
          "/api/user/all-competencies"
        );

        get_user_competencies.current = await axios.get(
          "/api/user/competencies",
          {
            headers: {
              token: user_info.user.token,
            },
            params: {
              id: data.user_id,
            },
          }
        );

        get_reviews.current = await axios.get("/api/user/get-reviews", {
          headers: {
            token: user_info.user?.token,
          },
          params: {
            id: data.user_id,
          },
        });
        get_documents.current = get_documents.current.data;
        get_all_competencies.current = get_all_competencies.current.data;
        get_user_competencies.current = get_user_competencies.current.data;
        get_reviews.current = get_reviews.current.data?.at(0);
        if (get_reviews.current?.avg_rating) {
          setRate(get_reviews.current.avg_rating);
        } else {
          setRate(0);
        }
        setToggle(!toggle);
      } catch (error) {
        console.log(error);
      }
    };
    getOtherUserInfo();
  }, [data.user_id, dispatch, user_info.user.token]);

  const like_freelancer = () => {
    if (user_info.user?.account_type === "client") {
      dispatch(
        like_action(
          { table: "freelancers", id: data.user_id },
          user_info.user.token
        )
      );
      dispatch(get_liked_action("freelancers", user_info.user.token));
    }
  };

  const removeLikeHandler = (freelancer_id) => {
    if (user_info.user?.account_type === "client") {
      dispatch(
        remove_like_action(
          { table: "freelancers", id: freelancer_id },
          user_info.user.token
        )
      );
      dispatch(get_liked_action("freelancers", user_info.user.token));
    }
  };
  return (
    <div>
      <div
        className="single_result_user_info"
        style={{
          gridTemplateColumns: sideBySide ? "1fr" : "1fr 1fr 1fr",
          borderBottom: sideBySide ? "none" : "1px #555 solid",
        }}
      >
        <div
          className="single_result_user_profile"
          style={{ borderRight: sideBySide ? "none" : "1px #555 solid" }}
        >
          {sideBySide ? (
            <div className="single_result_user_profile_sidebyside">
              <div className="single_result_user_profile_sidebyside_share_hourly_rates">
                <div
                  className="single_result_user_love_share"
                  style={{ borderBottom: "none" }}
                >
                  {get_liked.data?.find(
                    (item) =>
                      item?.freelancer_id === data.user_id ||
                      item?.user_id === data.user_id
                  ) !== undefined ? (
                    <BsHeartFill
                      style={{ color: "#e31b23" }}
                      onClick={() => removeLikeHandler(data.user_id)}
                    />
                  ) : (
                    <BsHeart onClick={() => like_freelancer()} />
                  )}
                  <BsShare onClick={() => setShowShare(true)} />
                  {showShare && (
                    <div className="shareAssignement">
                      <div>
                        <h4>
                          <b>Share this profile</b>
                        </h4>
                        <div
                          className="close"
                          onClick={() => setShowShare(false)}
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                      <div>
                        <FacebookShareButton
                          url={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
                          quote={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
                        >
                          <BsFacebook />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
                        >
                          <AiFillTwitterCircle />
                        </TwitterShareButton>
                        <LinkedinShareButton
                          url={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
                        >
                          <BsLinkedin />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
                        >
                          <IoLogoWhatsapp />
                        </WhatsappShareButton>
                        <EmailShareButton
                          subject="  "
                          body="  "
                          url={`https://curant24.nl/dashboard/settings/profile/${data.user_id}`}
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
                  <AiOutlineMore />
                </div>
                <div
                  className="single_result_user_location_hourly_rate"
                  style={{
                    flexDirection: "column",
                    borderBottom: "none",
                    marginBottom: "75%",
                  }}
                >
                  <div style={{ height: "60px !important" }}>
                    <h4>
                      <span style={{ display: "flex" }}>
                        <p>Branche:</p>
                        <b>{data.branch || "not added"}</b>
                      </span>
                      <br />
                      <span style={{ display: "flex" }}>
                        <p>Profession:</p>
                        <b>{data.profession ? data.profession : "not added"}</b>
                      </span>
                    </h4>
                  </div>
                  <div>
                    <GoLocation />
                    <p
                      style={{
                        color: "black",
                        fontWeight: "400",
                        marginLeft: "5px",
                      }}
                    >
                      {data.city}
                    </p>
                  </div>
                  <div>
                    <p>Hourly Rate: </p>
                    <p style={{ color: "black", marginLeft: "5px" }}>
                      <b>
                        {data.hourly_rate?.length > 0
                          ? data.hourly_rate
                          : data.hourly_rate_inclusive?.length > 0
                          ? data.hourly_rate_inclusive
                          : "not added."}
                      </b>
                    </p>
                    {(data.hourly_rate?.length > 0 ||
                      data.hourly_rate_inclusive?.length > 0) &&
                      (data.currency && data.currency !== "EUR" ? (
                        data.currency
                      ) : (
                        <BsCurrencyEuro />
                      ))}
                  </div>
                  <div style={{ display: "block" }}>
                    <p>
                      Maximum travel <br /> distance :{" "}
                      <b>{data.max_travel_distance || "0"} KM</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="single_result_user_profile_image_ratings">
                <h2
                  style={{
                    marginTop: "0",
                    fontSize: "2rem",
                    width: "100%",
                    height: "50px",
                    textAlign: "center",
                  }}
                >
                  {data.first_name + " " + data.last_name}
                  {/* {data.user_name} */}
                </h2>
                <div className="single_result_user_profile_image_ratings_img">
                  <img
                    src={
                      !data.picture || data.picture === "undefined"
                        ? "/images/profile-freelancer.png"
                        : data.picture
                    }
                    alt=""
                  />
                </div>
                <div>
                  <h4>Rating</h4>
                  {rate !== null && (
                    <ReactStars
                      count={5}
                      edit={false}
                      size={24}
                      isHalf
                      value={rate}
                      activeColor="#ffd700"
                      style={{ alignSelf: "flex-start" }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="single_result_user_profile_name_job">
                <h2 style={{ height: "50px", textAlign: "center" }}>
                  {data.first_name + " " + data.last_name}
                </h2>
                <h4 style={{ textAlign: "center" }}>
                  <p>Profession:</p>
                  <b style={{ color: "rgb(255, 36, 36)" }}>
                    {data.profession || "not added"}
                  </b>
                </h4>
              </div>
              <div className="single_result_user_profile_image_ratings">
                <div className="single_result_user_profile_image_ratings_img">
                  <img src={data.picture || "/images/logo.png"} alt="" />
                </div>
                <div>
                  <h4>Rating</h4>
                  <div>
                    {rate !== null && (
                      <ReactStars
                        count={5}
                        edit={false}
                        size={24}
                        isHalf
                        value={rate}
                        activeColor="#ffd700"
                        style={{ alignSelf: "flex-start" }}
                      />
                    )}
                  </div>
                  <div
                    className="single_result_user_profile_view_profile"
                    style={{
                      borderBottom: "1px #ccc solid",
                      paddingBottom: "5px",
                    }}
                  >
                    <Link
                      style={{ marginRight: "25px" }}
                      to={`/dashboard/settings/profile/${data.user_id}`}
                      state={{
                        user_id: data.user_id,
                        target: data.target,
                        stopSearch: true,
                      }}
                    >
                      <button style={{ borderRight: "1px #555 solid" }}>
                        View profile
                      </button>
                    </Link>
                    <button style={{ marginLeft: "25px" }}>Confirm</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {!sideBySide && (
          <div className="single_result_user_location_hourly_rate_desc">
            <div
              className="single_result_user_location_hourly_rate"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr 1fr",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "start",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <GoLocation />
                  <p>{data.city}</p>
                </div>
                <div>
                  <p>
                    Hourly Rate:
                    <b style={{ color: "rgb(255, 36, 36)" }}>
                      {/*data.hourly_rate_inclusive?.length>0?data.hourly_rate_inclusive:*/}
                      {data.hourly_rate?.length > 0
                        ? data.hourly_rate
                        : " not added."}
                    </b>
                    {
                      //&&data.hourly_rate_inclusive?.length>0
                      data.currency ? (
                        data.currency
                      ) : data.hourly_rate?.length > 0 ? (
                        <BsCurrencyEuro />
                      ) : (
                        ""
                      )
                    }
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "start",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p>
                    Branche:
                    <b style={{ color: "rgb(255, 36, 36)" }}>
                      {data.branch || "not added"}
                    </b>
                  </p>
                </div>
                <div style={{ display: "block" }}>
                  <p>
                    Maximum travel <br /> distance :{" "}
                    <b>{data.max_travel_distance || "not added"} KM</b>
                  </p>
                </div>
              </div>
            </div>
            {!sideBySide ? (
              <>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "10px",
                    borderTop: "1px solid",
                  }}
                >
                  <div
                    className={`single_result_user_comp ${
                      !toggleDiplomas && "active"
                    }`}
                    style={{
                      borderBottom: sideBySide ? "none" : "1px #555 solid",
                    }}
                    onClick={() => setToggleDiplomas(false)}
                  >
                    <p>
                      <b>
                        Competences (
                        {get_user_competencies?.current?.length || 0})
                      </b>
                    </p>
                  </div>
                  <div
                    className={`single_result_user_diplomats ${
                      toggleDiplomas && "active"
                    }`}
                    onClick={() => setToggleDiplomas(true)}
                  >
                    <p>
                      <b>
                        Diplomas and certificates (
                        {get_documents.current
                          ? get_documents.current[1]?.length
                          : 0}
                        )
                      </b>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    height: "60px",
                    padding: "0 7px" /*overflowY:"scroll"*/,
                  }}
                >
                  {toggleDiplomas ? (
                    <ul style={{ padding: "0", listStyle: "none" }}>
                      {get_documents.current &&
                        get_documents.current[1]?.slice(0, 3)?.map((item) => (
                          <li>
                            <a href={item.diplomat_certificate} download>
                              {item.type}
                            </a>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <ul style={{ padding: "0", listStyle: "none" }}>
                      {get_all_competencies?.current?.length > 0 &&
                        get_user_competencies.current?.at(0) &&
                        get_user_competencies?.current
                          ?.slice(0, 3)
                          ?.map((item) => (
                            <li>
                              {
                                get_all_competencies?.current?.find(
                                  (elt) => (elt.id = item)
                                )?.competence
                              }
                            </li>
                          ))}
                    </ul>
                  )}
                </div>
                <div>
                  <b style={{ color: "rgb(255, 36, 36)" }}>
                    View the profile to see everything
                  </b>
                </div>
              </>
            ) : (
              <div className="single_result_user_desc sidebyside">
                <h3>About me:</h3>
                {data.about === null ? (
                  <p>Not added</p>
                ) : (
                  <p style={{ wordBreak: "break-all" }}>
                    {data.about?.slice(0, 350) +
                      (data.about?.length > 350 ? "...   " : "")}
                    {data.about?.length > 350 && (
                      <Link
                        to={`/dashboard/settings/profile/${data.user_id}`}
                        state={{
                          user_id: data.user_id,
                          target: data.target,
                          stopSearch: true,
                        }}
                      >
                        read more.
                      </Link>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        <div
          className="single_result_user_other_info"
          style={{
            flexDirection: sideBySide ? "column" : "column",
            borderLeft: sideBySide ? "none" : "1px #555 solid",
            borderTop: sideBySide ? "1px #555 solid" : "none",
          }}
        >
          {!sideBySide && (
            <div className="single_result_user_love_share">
              {get_liked.data?.find(
                (item) => item.freelancer_id === data.user_id
              ) !== undefined ? (
                <BsHeartFill
                  style={{ color: "#e31b23" }}
                  onClick={() => removeLikeHandler(data.user_id)}
                />
              ) : (
                <BsHeart onClick={() => like_freelancer()} />
              )}
              <BsShare />
              <AiOutlineMore />
            </div>
          )}
          {sideBySide ? (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  className={`single_result_user_comp ${
                    !toggleDiplomas && "active"
                  }`}
                  style={{
                    borderBottom: sideBySide ? "none" : "1px #555 solid",
                  }}
                  onClick={() => setToggleDiplomas(false)}
                >
                  <h3>
                    Competences ({get_user_competencies?.current?.length || 0})
                  </h3>
                </div>
                <div
                  className={`single_result_user_diplomats ${
                    toggleDiplomas && "active"
                  }`}
                  onClick={() => setToggleDiplomas(true)}
                >
                  <h3 style={{ margin: 0 }}>
                    Diplomas and certificates (
                    {get_documents.current
                      ? get_documents.current[1]?.length
                      : 0}
                    )
                  </h3>
                </div>
              </div>
              <div style={{ height: "60px" /*overflowY:"scroll"*/ }}>
                {toggleDiplomas ? (
                  <ul style={{ listStyle: "none", marginTop: "5px" }}>
                    {get_documents.current &&
                      get_documents.current[1]?.slice(0, 3)?.map((item) => (
                        <li>
                          <a href={item.diplomat_certificate} download>
                            {item.type}
                          </a>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <ul style={{ listStyle: "none", marginTop: "5px" }}>
                    {get_all_competencies?.current?.length > 0 &&
                      get_user_competencies?.current
                        ?.slice(0, 3)
                        ?.map((item) => (
                          <li>
                            {
                              get_all_competencies?.current?.find(
                                (elt) => elt.id === item
                              )?.competence
                            }
                          </li>
                        ))}
                  </ul>
                )}
              </div>
              <div>
                <b style={{ color: "rgb(255, 36, 36)" }}>
                  View the profile to see everything
                </b>
              </div>
            </>
          ) : (
            <div
              className="single_result_user_desc "
              style={{ padding: "0 3%" }}
            >
              <h3>About me:</h3>
              {data.about === null ? (
                <p>Not added</p>
              ) : (
                <p style={{ wordBreak: "break-all" }}>
                  {data.about?.slice(0, 800) +
                    (data.about?.length > 800 ? "...   " : "")}
                  {data.about?.length > 800 && (
                    <Link
                      to={`/dashboard/settings/profile/${data.user_id}`}
                      state={{
                        user_id: data.user_id,
                        target: data.target,
                        stopSearch: true,
                      }}
                    >
                      read more.
                    </Link>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
        {sideBySide && (
          <>
            <div className="single_result_user_desc sidebyside">
              <h3>About me:</h3>
              {data.about === null ? (
                <p>Not added</p>
              ) : (
                <p style={{ wordBreak: "break-all" }}>
                  {data.about?.slice(0, 250) +
                    (data.about?.length > 250 ? "...   " : "")}
                  {data.about?.length > 250 && (
                    <Link
                      to={`/dashboard/settings/profile/${data.user_id}`}
                      state={{
                        user_id: data.user_id,
                        target: data.target,
                        stopSearch: true,
                      }}
                    >
                      read more.
                    </Link>
                  )}
                </p>
              )}
            </div>
            <div className="single_result_user_profile_buttons">
              <Link
                style={{ marginRight: "10px" }}
                to={`/dashboard/settings/profile/${data.user_id}`}
                state={{
                  user_id: data.user_id,
                  target: data.target,
                  stopSearch: true,
                }}
              >
                <button style={{ borderRight: "1px #555 solid" }}>
                  View profile
                </button>
              </Link>
              <button style={{ marginLeft: "10px" }}>Confirm</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
