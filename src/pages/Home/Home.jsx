import React, { useState } from "react";
import "./home.scss";
import Cookies from "../Cookies/Cookies_box";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
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
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginAction, search_action } from "../../state/Actions/UserAction";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import all_cities from "../../pages/PlaceCall/worldcities.json";
import { useRef } from "react";
import HomeDescriptionClient from "../../components/HomeDescription/HomeDescriptionClient/HomeDescriptionClient";
import HomeDescriptionFreelancer from "../../components/HomeDescription/HomeDescriptionFreelancer/HomeDescriptionFreelancer";
import UnderCunstruction from "../../components/UnderConstruction/UnderCunstruction";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import PopupScherm from "../../components/PopupScherm/PopupScherm";
import "flag-icon-css/css/flag-icon.min.css";
import countryList from "../../components/CountryList/countries.json";


SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
export default function Home() {
  const user_info = useSelector((state) => state.user_info);
  const [searchProjects, setSearchProjects] = useState(
    !(user_info.user?.account_type === "client")
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoading, setShowLoading] = useState(true);
  const [showChangeCountry, setShowChangeCountry] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showcountryPopup, setShowcountryPopup] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [sortBy, setSortBy] = useState("");
  const [chooseLanguage, setChooseLanguage] = useState('');
  const [country, setCountry] = useState("Netherlands - NL");
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : null);
  const [selectCountry, setSelectCountry] = useState({ name: "Nederland", code: "nl" });

  const [countryImg, setCountryImg] = useState("/images/netherland_flag.png");
  const [countrymail, setCountryMail] = useState("www.curant.nl");
  const [temp, setTemp] = useState(0);
  const linkRef = useRef();
  const searchLinkRef = useRef();
  const research = useSelector((state) => state.research);
  const get_personal = useSelector((state) => state.get_personal);


  // console.log('lang is',lang);
  //slider elt
  var slider = useRef();

  //data object to store search values
  const searchData = {
    freelancer: {
      hourly_rate: {
        operation: "",
        values: 50,
      },
      user_name: {
        operation: "",
        values: "",
      },
      profession: {
        operation: "",
        values: "",
      },
      city: {
        operation: "",
        values: [],
      },
      postcode: {
        operation: "",
        values: "",
      },
      diplomat_certificate: {
        operation: "",
        values: "",
      },
      radius: {
        operation: "",
        values: 0,
      },
      currency: {
        operation: "like ",
        values: "EUR",
      },
      competency: {
        operation: "",
        values: "",
      },
    },
    assignment: {
      job_name: {
        operation: "",
        values: "",
      },
      industry: {
        operation: "",
        values: "",
      },
      country: {
        operation: "",
        values: "",
      },
      province: {
        operation: "",
        values: [],
      },
      working_hours: {
        operation: "",
        values: [],
      },
      job_duration: {
        operation: "",
        values: [],
      },
      pay_type: {
        operation: "",
        values: [],
      },
      radius: {
        operation: "",
        values: 0,
      },
    },
    table: !searchProjects ? "users" : "assignements",
  };
  const data = useRef(searchData);
  //translation function
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [user, setUser] = useState(user_info.user);
  // console.log('user is',user);

  const lang = localStorage.getItem('language');
  const countryName = localStorage.getItem('country');
  const countryCode = localStorage.getItem('countryCode');

  useEffect(() => {
    setTimeout(() => {
      console.log(lang)
      setShowLoading(false);
      if (lang === '') {
        setChooseLanguage('Netherland - EN')
      }
      else {
        setChooseLanguage(lang);
      }
      if (countryName === null && countryCode === null) {
        setSelectCountry({ name: "Nederland", code: "nl" });
      }
      else {
        setSelectCountry({ name: countryName, code: countryCode });
      }
    }, 3200);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("user_info")) {
      setUser({});
    }
    if (searchParams.get("email")) {
      dispatch(
        loginAction({
          email: searchParams.get("email"),
          password: searchParams.get("email"),
        })
      );
    }
    window.scrollTo(0, 0);
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (sessionStorage.getItem("searchData")) {
      data.current = JSON.parse(sessionStorage.getItem("searchData"));
    }
    searchHandler(
      false,
      searchProjects ? "job_name" : "profession",
      "like ",
      searchProjects
        ? data.current?.assignment?.job_name?.values
        : data.current?.freelancer?.profession?.values
    );
  }, [searchProjects]);

  //trigger search event once hourly wage has changed
  useEffect(() => {
    searchHandler(false, "hourly_rate", "<=", hourlyRate);

  }, [hourlyRate]);

  if (searchParams.get("email") && user_info.user && user_info.user.email) {
    sessionStorage.setItem("user_info", JSON.stringify(user_info));
    return <Navigate to="/Dashboard" />;
  }

  //change input handler
  function increaseValue() {
    if (slider) {
      slider.current.stepUp();
      setHourlyRate(slider.current.value);
      console.log(slider.current.value);
    }
  }

  function decreaseValue() {
    if (slider) {
      slider.current.stepDown();
      setHourlyRate(slider.current.value);
      // console.log(slider.current.value);
    }
  }

  //change country handler
  const changeCountryHandler = () => {
    if (chooseLanguage === "dutch") {
      setCountry("Netherland - NL");
      setSelectedLanguage('dutch');
      setShowCountryList(false);

      localStorage.setItem("language", 'dutch');
    } else {
      setCountry(chooseLanguage);
      setSelectedLanguage('Netherland - EN');
      localStorage.setItem("language", chooseLanguage);
      setShowCountryList(false);

    }

  };
  // const changeCountryHandler = () => {

  // }
  //getting cities within the radius
  function getCitiesWithinRadius(referenceLat, referenceLng, radius) {
    const R = 6371; // Earth's mean radius in km
    const resultArray = [];

    for (let i = 0; i < all_cities.length; i++) {
      const city = all_cities[i];
      const cityLat = parseFloat(city.lat);
      const cityLng = parseFloat(city.lng);
      const latDiff = ((cityLat - referenceLat) * Math.PI) / 180; // convert to radians
      const lngDiff = ((cityLng - referenceLng) * Math.PI) / 180; // convert to radians
      const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos((referenceLat * Math.PI) / 180) *
        Math.cos((cityLat * Math.PI) / 180) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      if (distance <= radius) {
        resultArray.push(city);
      }
    }

    return resultArray;
  }
  const handleCitySearch = (e) => {
    let str = e.target.value?.replace(/\s/g, "");
    let resultArr = [str + "%"];

    let city = all_cities
      ?.filter(
        (item) =>
          item.admin_name.toLowerCase() === str?.replace("%").toLowerCase() ||
          item.city_ascii.toLowerCase() === str?.replace("%").toLowerCase()
      )
      ?.at(0);

    resultArr = resultArr.concat(
      getCitiesWithinRadius(
        parseFloat(city?.lat),
        parseFloat(city?.lng),
        parseInt(
          searchProjects
            ? data.current?.assignment?.radius?.values
            : data.current?.freelancer?.radius?.values
        )
      )?.map((item) => item.admin_name + "%")
    );
    if (searchProjects) {
      data.current.assignment.province.values = [];
    } else {
      data.current.freelancer.city.values = [];
    }
    //treatement of the city search itself
    if (searchProjects) {
      //set the search to country since the postal code is linked to the country and by typing
      //the postal code on .nl website we only target those on the netherlands
      if (/\d/g.test(str)) {
        str = "Netherlands";
        if (data.current?.assignment?.province) {
          data.current.assignment.province.values = [];
        }
        searchHandler(false, "country", "like", "%" + str + "%");
      } else {
        if (data.current?.assignment?.country) {
          data.current.assignment.country.values = "";
        }

        searchHandler(false, "province", "like", resultArr);
      }
    } else {
      //searchHandler(false,"city","like",e.target.value+(e.target.value.length>0?"%":""))
      //searchHandler(false,"place","like",e.target.value+(e.target.value.length>0?"%":""))
      if (/\d/.test(str)) {
        searchHandler(false, "postcode", "like", str + "%");
        if (data.current.freelancer?.city) {
          data.current.freelancer.city.values = [];
        }
      } else {
        if (data.current.freelancer?.postcode) {
          data.current.freelancer.postcode.values = "";
        }
        searchHandler(false, "city", "like", resultArr);
      }
    }
  };

  //search function
  const searchHandler = (remove, key, op, value) => {
    let info = {},
      searchInfo = !searchProjects
        ? data.current.freelancer
        : data.current.assignment;
    //modifying the hourly_wage element with the new currency in case of currency change
    if (key === "currency") {
      if (value.length > 0) {
        document.getElementById("hourly_wage").innerText = `
          Hourly wage ${hourlyRate} ${value}
        `;
      } else {
        //€
        document.getElementById("hourly_wage").innerText = `
        Hourly wage ${hourlyRate} €
      `;
      }
    }
    //asserting new data to data obj
    if (searchInfo && searchInfo[key]) {
      //removing an element from the search
      if (remove) {
        searchInfo[key].values = searchInfo[key]?.values.filter(
          (item) => item !== value
        );
      } else {
        if (
          typeof searchInfo[key]?.values !== "string" &&
          typeof searchInfo[key]?.values !== "number"
        ) {
          if (typeof value !== "string") {
            searchInfo[key].values = [...searchInfo[key]?.values, ...value];
          } else {
            searchInfo[key]?.values.push(value);
          }
          searchInfo[key].values = [...new Set(searchInfo[key]?.values)];
        } else {
          searchInfo[key].values = value;
        }
      }
      searchInfo[key].operation = op;
      for (const [the_key, elt] of Object.entries(searchInfo)) {
        if (elt.values?.toString()?.length > 0 && the_key !== "radius") {
          info[the_key] = elt;
        }
      }
      if (!searchProjects) {
        data.current.freelancer = searchInfo;
      } else {
        data.current.assignment = searchInfo;
      }
      if (data.current) {
        //data.current =  JSON.parse(sessionStorage.getItem("searchData"));
        data.current.table = !searchProjects ? "users" : "assignements";
        sessionStorage.setItem("searchData", JSON.stringify(data.current));
      }
      info.table = !searchProjects ? "users" : "assignements";
      dispatch(search_action(info));
    }
  };
  return user_info.loading ? (
    <LoadingBox big />
  ) : (
    <div className="home">
      {/* <select name="languages" id="" onChange={(e)=>i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="nl">Dutch</option>
            </select> */}
      <PopupScherm />
      <Cookies />
      <div className="images">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          effect={"fade"}
          autoplay={{ delay: 7000 }}
          loop
        >
          <SwiperSlide>
            <img src={`/images/img1.png`} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`/images/img2.png`} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`/images/img3.png`} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`/images/img4.png`} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="content">
        <div className="topbar">
          <div className="left">
            <nav>
              <ul>
                <li>
                  <a href=" ">{/*t('help_contact')*/}Help & Contact |</a>
                </li>
                <li>
                  <a href="#companies" onClick={() => setTemp(2)}>
                    {" "}
                    {/*t("for_companies")*/} For Companies |{" "}
                  </a>
                </li>
                <li>
                  <a href="#freelancers" onClick={() => setTemp(3)}>
                    {" "}
                    {/*t("for_freelancers")*/} For Freelancers |
                  </a>
                </li>
                <li>
                  <a href="#aboutus" onClick={() => setTemp(1)}>
                    {" "}
                    {/*t("about_us")*/} About us |
                  </a>
                </li>
                <li>
                  <Link to="/faq">
                    FAQ
                    {/* {t("faq")} */} |
                  </Link>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/forum">
                    <img
                      src="/images/Forums_white.png"
                      alt="forums"
                      width={24}
                      style={{ marginRight: "5px" }}
                    />
                    Forum
                    {/* {t("faq")} */}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="right">
            <ul>
              <li>
                {user.email !== undefined ? (
                  <Link to="/Dashboard">
                    <span>My Curant24</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <span>Log in </span>
                    </Link>
                    |
                    <Link to="/join">
                      <span> Join now </span>
                    </Link>
                  </>
                )}{" "}
                |{" "}
                <span>
                  <AiOutlineMenu className="menuIcon" />{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="main">
          <div className="innerContent">
            <div className="inner-content-info">
              <img src="/images/logo.png" alt="" className="home-img" />
              <p>The mediation agency for freelancers and clients worldwide</p>
              <ul>
                <li>Find your</li>
                <li
                  className={!searchProjects ? "selected" : ""}
                  onClick={() => {
                    setShowAdvancedSearch(false);
                    setSearchProjects(false);
                  }}
                >
                  freelancer
                </li>
                <li>|</li>
                <li
                  className={searchProjects ? "selected" : ""}
                  onClick={() => {
                    setShowAdvancedSearch(false);
                    setSearchProjects(true);
                  }}
                >
                  Assignments
                </li>
              </ul>
              <div className="contentInput">
                {/* redirection link to search page */}
                <Link
                  to="/search"
                  ref={(ref) => ref !== null && (searchLinkRef.current = ref)}
                  state={{
                    ...data.current,
                    table: searchProjects ? "assignements" : "users",
                    sort_by: sortBy,
                    stopSearch: true,
                  }}
                ></Link>
                <input
                  type="text"
                  placeholder={
                    searchProjects
                      ? "Function or keyword"
                      : "Function or keyword"
                  }
                  onKeyPress={(e) =>
                    e.key === "Enter" && searchLinkRef.current?.click()
                  }
                  onChange={(e) => {
                    searchHandler(
                      false,
                      searchProjects ? "job_name" : "profession",
                      " like ",
                      e.target.value + (e.target.value.length > 0 ? "%" : "")
                    );
                    linkRef.current?.click();
                  }}
                />
                <div className="search-button">
                  <AiOutlineSearch
                    onClick={() => searchLinkRef.current.click()}
                  />
                </div>
                <div className="all">
                  <select
                    name="All fields"
                    id=""
                    onChange={(e) =>
                      searchHandler(
                        false,
                        searchProjects ? "industry" : "competency",
                        " = ",
                        e.target.value
                      )
                    }
                  >
                    <option value="">All fields</option>
                    <option
                      value="Construction"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Construction"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Construction"
                          )
                      }
                    >
                      Construction
                    </option>
                    <option
                      value="Electrical"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Electrical"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Electrical"
                          )
                      }
                    >
                      Electrical
                    </option>
                    <option
                      value="Installation"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Installation"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Installation"
                          )
                      }
                    >
                      Installation
                    </option>
                    <option
                      value="Infrastructure"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Infrastructure"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Infrastructure"
                          )
                      }
                    >
                      Infrastructure
                    </option>
                    <option
                      value="Industrial"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Industrial"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Industrial"
                          )
                      }
                    >
                      Industrial
                    </option>
                    <option
                      value="Health care and well being"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Health care and well being"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Health care and well being"
                          )
                      }
                    >
                      Health care and well being
                    </option>
                    <option
                      value="Trade and services"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Trade and services"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Trade and services"
                          )
                      }
                    >
                      Trade and services
                    </option>
                    <option
                      value="IT"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "IT"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "IT"
                          )
                      }
                    >
                      IT
                    </option>
                    <option
                      value="Justice, security and public administration"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Justice, security and public administration"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Justice, security and public administration"
                          )
                      }
                    >
                      Justice, security and public administration
                    </option>
                    <option
                      value="Environment and Agriculture"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Environment and Agriculture"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Environment and Agriculture"
                          )
                      }
                    >
                      Environment and Agriculture
                    </option>
                    <option
                      value="Media and communication"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Media and communication"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Media and communication"
                          )
                      }
                    >
                      Media and communication
                    </option>
                    <option
                      value="Education, culture and science"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Education, culture and science"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Education, culture and science"
                          )
                      }
                    >
                      Education, culture and science
                    </option>
                    <option
                      value="Engineering, production and construction"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Engineering, production and construction"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Engineering, production and construction"
                          )
                      }
                    >
                      Engineering, production and construction
                    </option>
                    <option
                      value="Tourism, recreation and catering"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Tourism, recreation and catering"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Tourism, recreation and catering"
                          )
                      }
                    >
                      Tourism, recreation and catering
                    </option>
                    <option
                      value="Transport and Logistics"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Transport and Logistics"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Transport and Logistics"
                          )
                      }
                    >
                      Transport and Logistics
                    </option>
                    <option
                      value="Childcare"
                      selected={
                        !searchProjects
                          ? data.current?.freelancer?.competency?.values.includes(
                            "Childcare"
                          )
                          : data.current?.assignment?.industry?.values.includes(
                            "Childcare"
                          )
                      }
                    >
                      Childcare
                    </option>
                  </select>
                  {/* <span>All</span>
                                    <img src="/images/angle_down.png" className='angleDown' alt="" /> */}
                </div>
                <div className="country">
                  <div
                    onClick={() => {
                      setShowChangeCountry(!showChangeCountry);
                      setShowCountryList(false);
                      setShowcountryPopup(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/images/angle_down.png"
                      className="angleDown"
                      alt=""
                    />

                    <span className={`flag-icon flag-icon-${selectCountry.code}`}
                      style={{
                        marginRight: '10px',
                      }}
                    ></span>
                  </div>
                  {showChangeCountry && (
                    <div className="change-country-container">
                      <div className="change-country-header">
                        <div className="d-flex justify-content-between pr-4 items-center">
                          <h5>Choose Language & Country</h5>
                          <p className="cursor-pointer" onClick={() => { setShowChangeCountry(false); setShowcountryPopup(false); setShowCountryList(false); }}><AiOutlineClose /></p>

                        </div>
                        <p className="text-center font-size">In which country are you looking for an assignment</p>
                        <div>
                          <input type="submit" className="country-input" value={selectCountry.name} onClick={() => { setShowcountryPopup(!showcountryPopup); setShowCountryList(false); }} />
                          <div style={{
                            position: "absolute",
                            marginRight: "10px",
                            height: "40px",
                            background: 'none',
                            right: '14px',
                            justifyContent: 'end',
                            gap: '12px',
                            marginTop: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '60px',
                          }} onClick={() => { setShowcountryPopup(!showcountryPopup); setShowCountryList(false); }}>
                            <img
                              src="/images/angle_down.png"
                              className=""
                              style={{
                                cursor: 'pointer'
                              }}
                              alt=""
                            />

                            <span className={`flag-icon flag-icon-${selectCountry.code}`}></span>

                          </div>


                        </div>
                        <p className="text-align-center  font-size mt-4">Choose your language</p>
                        <div>
                          <input type="submit" className="country-input" value={selectedLanguage === 'dutch' ? 'Netherland - NL' : 'Netherland - EN'} onClick={() => { setShowCountryList(!showCountryList); setShowcountryPopup(false); }} />
                          <div style={{
                            position: "absolute",
                            marginRight: "10px",
                            height: "40px",
                            background: 'none',
                            right: '14px',
                            justifyContent: 'end',
                            gap: '12px',
                            marginTop: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '60px',
                          }} onClick={() => { setShowCountryList(!showCountryList); setShowcountryPopup(false); }}>
                            <img
                              src="/images/angle_down.png"
                              className=""
                              alt=""
                              style={{
                                cursor: 'pointer'
                              }}
                            />
                            <img src="/images/netherland_flag.png" alt="" style={{
                              height: '14px',
                              width: '20px',
                            }} />

                          </div>
                        </div>
                        {showcountryPopup && (
                          <div
                            style={{
                              height: "320px",
                              position: "absolute",
                              right: "-320px",
                              backgroundColor: "white",
                              top: "0",
                              width: "300px",
                              zIndex: "999",
                              overflowY: showcountryPopup ? "scroll" : "hidden",
                              overflowX: "hidden",
                            }}
                          >
                            <ul className="countries_list">
                              {countryList.map((country, index) => (
                                <li
                                  key={index}
                                  value={country.value}
                                  onClick={() => {
                                    setSelectCountry({ name: country.name, code: country.code });
                                    setShowcountryPopup(false);
                                    localStorage.setItem('country', country.name);
                                    localStorage.setItem('countryCode', country.code);
                                  }}

                                >
                                  <span className={`flag-icon flag-icon-${country.code}`}></span>
                                  <p>{country.name}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {showCountryList && (
                          <div
                            style={{
                              height: "165px",
                              position: "absolute",
                              right: "-354px",
                              top: "164px",
                              backgroundColor: "white",
                              width: "350px",
                              zIndex: "999",
                            }}
                          >
                            <ul className="countries_list" style={{
                              paddingLeft: '10px',
                              border: 'none',
                            }}>

                              <h4>
                                {lang === "dutch" ? "Taalinstellingen" : "Language Settings"}
                              </h4>

                              <p>
                                {lang === "dutch" ? "Selecteer je voorkeurstaal" : "Select the language you prefer"}

                              </p>
                              <div style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                marginBottom: '10px',

                              }}

                              >
                                <input type="radio" name="dutch_language" id="dutch_language" style={{
                                  height: '20px',
                                  width: '20px',
                                  cursor: 'pointer',
                                }}
                                  onClick={() =>
                                    setChooseLanguage(
                                      "dutch",
                                    )
                                  }
                                  checked={chooseLanguage === 'dutch' ? true : false}
                                />
                                <label htmlFor="dutch_language" style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  color: '#000',
                                  marginBottom: '0',
                                  cursor: 'pointer',
                                }} onClick={() =>
                                  setChooseLanguage(
                                    "dutch",
                                  )
                                }>
                                  Netherland - NL
                                </label>
                              </div>
                              <div style={{
                                border: '1px solid #f1f1f1',
                                width: '80%',
                              }}>

                              </div>
                              <div style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                marginBottom: '10px',
                                cursor: 'pointer',
                              }}
                              >
                                <input type="radio" name="english_language" id="english_language" style={{
                                  height: '20px',
                                  width: '20px',
                                  cursor: 'pointer',
                                }}
                                  onClick={() =>
                                    setChooseLanguage(
                                      "Netherland - EN",
                                    )
                                  }
                                  checked={chooseLanguage === 'Netherland - EN' ? true : false}
                                />
                                <label htmlFor="english_language" style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  color: '#000',
                                  marginBottom: '0',
                                  cursor: 'pointer',
                                }}
                                  onClick={() =>
                                    setChooseLanguage(
                                      "Netherlands - EN",
                                    )
                                  }>English - En</label>
                              </div>
                              <p style={{
                                border: '1px solid gray',
                                width: '103%',
                                marginLeft: '-10px',
                                marginTop: '20px',
                              }}>
                              </p>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'start',
                                  alignItems: 'center',
                                  gap: '10px',
                                  paddingBottom: '10px',
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: '#fff',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    border: '1px solid rgb(218 211 211)',
                                    color: '#000'
                                  }}
                                  onClick={() => {
                                    setShowCountryList(false);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  style={{
                                    backgroundColor: '#fdd80f',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    color: '#000',
                                    border: '1px solid #fdd80f',
                                  }}
                                  onClick={() => {
                                    changeCountryHandler()
                                  }
                                  }
                                >
                                  Save changes
                                </button>

                              </div>

                              {/* <li
                                onClick={() =>
                                  changeCountryHandler(
                                    "Netherlands - EN",
                                    "/images/netherland_flag.png",
                                    "www.fr.curant24.com"
                                  )
                                }
                              >
                                <img src="/images/netherland_flag.png" alt="" />
                                <p>Netherlands - EN</p>
                              </li> */}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* <div className="change-country-footer">
                        <div>
                          <img src={countryImg} alt="" />
                          <p>You are on {countrymail}</p>
                        </div>
                        <div>
                          <Link
                            to=""
                            onClick={() => setShowCountryList(!showCountryList)}
                          >
                            Change country/region
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
              <ul className="bottom-list">
                <li onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                  Advanced Search
                </li>
                {showAdvancedSearch &&
                  (searchProjects ? (
                    <div className="bottom-list-advanced-search">
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4 style={{ width: "auto" }}>
                          Advanced search, for projects
                        </h4>
                        <AiOutlineClose
                          style={{ fontSize: "29px", cursor: "pointer" }}
                          onClick={() => setShowAdvancedSearch(false)}
                        />
                      </div>
                      <div className="advanced_search_filters">
                        <div className="advanced_search_hours_week">
                          <div>
                            <div style={{ marginBottom: "30px" }}>
                              <input
                                type="checkbox"
                                name="part_time_projects"
                                id=""
                                defaultChecked={data.current?.assignment?.working_hours?.values.includes(
                                  "part%"
                                )}
                                onChange={(e) =>
                                  e.target.checked
                                    ? searchHandler(
                                      false,
                                      "working_hours",
                                      "like",
                                      "part%"
                                    )
                                    : searchHandler(
                                      true,
                                      "working_hours",
                                      "like",
                                      "part%"
                                    )
                                }
                              />
                              <label htmlFor="part_time_projects">
                                Part-time
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name="full_time_projects"
                                defaultChecked={data.current?.assignment?.working_hours?.values.includes(
                                  "full%"
                                )}
                                onChange={(e) =>
                                  e.target.checked
                                    ? searchHandler(
                                      false,
                                      "working_hours",
                                      "like",
                                      "full%"
                                    )
                                    : searchHandler(
                                      true,
                                      "working_hours",
                                      "like",
                                      "full%"
                                    )
                                }
                              />
                              <label htmlFor="full_time_projects">
                                Full-time
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="advanced_search_type_of_assignment">
                          <div style={{ width: "170px" }}>
                            <p>Type of assignment</p>
                          </div>
                          <div className="advanced_search_show_assignment_type">
                            <div>
                              <p>All</p>
                              <input
                                type="radio"
                                defaultChecked={
                                  data.current?.assignment?.pay_type?.values
                                    ?.length === 0 ||
                                  data.current?.assignment?.pay_type?.values
                                    ?.length === 2
                                }
                                name="type_assignment"
                                id=""
                                onClick={(e) => {
                                  searchHandler(false, "pay_type", "like", [
                                    "%piece",
                                    "%hour",
                                  ]);
                                }}
                              />
                            </div>
                            <div>
                              <p>Apiece</p>
                              <input
                                type="radio"
                                name="type_assignment"
                                id=""
                                defaultChecked={data?.current?.assignment?.pay_type?.values?.includes(
                                  "%piece"
                                )}
                                onClick={(e) => {
                                  data.current?.assignment &&
                                    (data.current.assignment[
                                      "pay_type"
                                    ].values = data.current?.assignment[
                                      "pay_type"
                                    ]?.values.filter(
                                      (item) => item !== "%hour"
                                    ));
                                  searchHandler(
                                    false,
                                    "pay_type",
                                    "like",
                                    "%piece"
                                  );
                                }}
                              />
                            </div>
                            <div>
                              <p>Per hour</p>
                              <input
                                type="radio"
                                name="type_assignment"
                                id=""
                                defaultChecked={data?.current?.assignment?.pay_type?.values?.includes(
                                  "%hour"
                                )}
                                onClick={(e) => {
                                  data.current?.assignment &&
                                    (data.current.assignment[
                                      "pay_type"
                                    ].values = data.current?.assignment[
                                      "pay_type"
                                    ]?.values.filter(
                                      (item) => item !== "%piece"
                                    ));
                                  searchHandler(
                                    false,
                                    "pay_type",
                                    "like",
                                    "%hour"
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="advanced_search_estimated_time">
                          <div style={{ width: "170px" }}>
                            <div>
                              <p>Estimated lead time</p>
                            </div>
                            <div className="advanced_search_show_estimated_time_elts">
                              <div>
                                <p>{"<"} 1 month</p>
                                <input
                                  type="checkbox"
                                  name="estimated_time"
                                  id=""
                                  defaultChecked={data.current?.assignment?.job_duration?.values?.includes(
                                    "<1 month"
                                  )}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? searchHandler(
                                        false,
                                        "job_duration",
                                        "like",
                                        "<1 month"
                                      )
                                      : searchHandler(
                                        true,
                                        "job_duration",
                                        "like",
                                        "<1 month"
                                      )
                                  }
                                />
                              </div>
                              <div>
                                <p>1 - 3 months</p>
                                <input
                                  type="checkbox"
                                  name="estimated_time"
                                  id=""
                                  defaultChecked={data.current?.assignment?.job_duration?.values?.includes(
                                    "1-3 months"
                                  )}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? searchHandler(
                                        false,
                                        "job_duration",
                                        "like",
                                        "1-3 months"
                                      )
                                      : searchHandler(
                                        true,
                                        "job_duration",
                                        "like",
                                        "1-3 months"
                                      )
                                  }
                                />
                              </div>
                              <div>
                                <p>3 - 6 months</p>
                                <input
                                  type="checkbox"
                                  name="estimated_time"
                                  id=""
                                  defaultChecked={data.current?.assignment?.job_duration?.values?.includes(
                                    "3-6 months"
                                  )}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? searchHandler(
                                        false,
                                        "job_duration",
                                        "like",
                                        "3-6 months"
                                      )
                                      : searchHandler(
                                        true,
                                        "job_duration",
                                        "like",
                                        "3-6 months"
                                      )
                                  }
                                />
                              </div>
                              <div>
                                <p>{">"} 6 months</p>
                                <input
                                  type="checkbox"
                                  name="estimated_time"
                                  id=""
                                  defaultChecked={data.current?.assignment?.job_duration?.values?.includes(
                                    ">6 months"
                                  )}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? searchHandler(
                                        false,
                                        "job_duration",
                                        "like",
                                        ">6 months"
                                      )
                                      : searchHandler(
                                        true,
                                        "job_duration",
                                        "like",
                                        ">6 months"
                                      )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ marginRight: "10px", alignSelf: "baseline" }}
                        >
                          <p style={{ margin: "0", marginRight: "5px" }}>
                            Sort by
                          </p>
                          <select
                            name="sort_by"
                            id=""
                            style={{
                              border: "1px #ccc solid",
                              outline: "none",
                              borderRadius: "4px",
                            }}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="advanced_search_button"
                        style={{ display: "flex" }}
                      >
                        <button
                          style={{ width: "150px", height: "40px" }}
                          onClick={() => searchLinkRef.current.click()}
                        >
                          Show{" "}
                          {research.data &&
                            "(" +
                            (research.data?.length - 1 > 0
                              ? research.data?.length - 1
                              : 0) +
                            ")"}{" "}
                          results
                        </button>

                        <div style={{ display: "flex", marginLeft: "30px" }}>
                          <input
                            type="text"
                            placeholder="city or postal code"
                            style={{ width: "auto", border: "1px #555 solid" }}
                            onChange={(e) => handleCitySearch(e)}
                            defaultValue={data.current?.freelancer?.city?.values
                              ?.at(0)
                              ?.replace("%", "")}
                          />
                          <select
                            name="distance"
                            id=""
                            style={{
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                              width: "70px",
                            }}
                            onChange={(e) =>
                              searchHandler(
                                false,
                                "radius",
                                ">",
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              Select maximum travel distance
                            </option>
                            <option
                              value={10}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 10
                              }
                            >
                              {"<"} 10 Km
                            </option>
                            <option
                              value={20}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 20
                              }
                            >
                              {"<"} 20 Km
                            </option>
                            <option
                              value={30}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 30
                              }
                            >
                              {"<"} 30 Km
                            </option>
                            <option
                              value={40}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 40
                              }
                            >
                              {"<"} 40 Km
                            </option>
                            <option
                              value={50}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 50
                              }
                            >
                              {"<"}50 km
                            </option>
                            <option
                              value={60}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 60
                              }
                            >
                              {"<"}60 km
                            </option>
                            <option
                              value={70}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 70
                              }
                            >
                              {"<"}70 km
                            </option>
                            <option
                              value={80}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 80
                              }
                            >
                              {"<"}80 km
                            </option>
                            <option
                              value={90}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 90
                              }
                            >
                              {"<"}90 km
                            </option>
                            <option
                              value={100}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 100
                              }
                            >
                              {"<"}100 km
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bottom-list-advanced-search">
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4 style={{ width: "auto" }}>
                          Advanced search, find the right freelancer
                        </h4>
                        <AiOutlineClose
                          style={{ fontSize: "29px", cursor: "pointer" }}
                          onClick={() => setShowAdvancedSearch(false)}
                        />
                      </div>
                      <div className="advanced_search_filters">
                        <div className="advanced_search_hours_week">
                          <div>
                            <div>
                              <input
                                type="checkbox"
                                name="part_time_freelancer"
                                id=""
                                onChange={(e) =>
                                  e.target.checked
                                    ? searchHandler(
                                      false,
                                      "working_hours",
                                      "=",
                                      "parttime"
                                    )
                                    : searchHandler(
                                      true,
                                      "working_hours",
                                      "=",
                                      "parttime"
                                    )
                                }
                              />
                              <label htmlFor="part_time_freelancer">
                                Part-time
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name="full_time_freelancer"
                                onChange={(e) =>
                                  e.target.checked
                                    ? searchHandler(
                                      false,
                                      "working_hours",
                                      "=",
                                      "fulltime"
                                    )
                                    : searchHandler(
                                      true,
                                      "working_hours",
                                      "=",
                                      "fulltime"
                                    )
                                }
                              />
                              <label htmlFor="full_time_freelancer">
                                Full-time
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ flexDirection: "column", margin: "0px 0px" }}
                          className="hourly_wage"
                        >
                          <p style={{ marginBottom: "5px" }} id="hourly_wage">
                            Hourly wage{" "}
                            {hourlyRate +
                              (data.current?.freelancer?.currency?.values
                                ?.length > 0
                                ? data?.current?.freelancer?.currency?.values
                                : "€")}
                          </p>
                          {/* <HourlyRate/> */}
                          <div className="range-container">
                            <span
                              className="arrow-left"
                              onClick={() => decreaseValue()}
                            >
                              {" "}
                              <BiLeftArrow />{" "}
                            </span>
                            <input
                              type="range"
                              name=""
                              defaultValue={50}
                              step={1}
                              min={0}
                              max={2000}
                              id="myRange"
                              ref={(ref) =>
                                ref !== null && (slider.current = ref)
                              }
                              onChange={(e) => setHourlyRate(e.target.value)}
                              onInput={(e) => setHourlyRate(e.target.value)}
                              style={{ width: "100%" }}
                            />
                            <span
                              className="arrow-right"
                              onClick={() => increaseValue()}
                            >
                              {" "}
                              <BiRightArrow />{" "}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p style={{ fontSize: "11px" }}>0</p>
                            <p style={{ fontSize: "11px" }}>1000</p>
                            <p style={{ fontSize: "11px" }}>2000</p>
                          </div>
                        </div>
                        <select
                          name="currency"
                          id=""
                          style={{
                            borderLeft: "1px #555 solid",
                            height: "40px",
                            width: "150px",
                            marginLeft: "30px",
                            marginRight: "5px",
                            borderRadius: "10px",
                          }}
                          onChange={(e) =>
                            searchHandler(
                              false,
                              "currency",
                              "=",
                              e.target.value
                            )
                          }
                        >
                          <option value={""}>select a currency</option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AFN"
                            }
                            value="AFN"
                          >
                            Afghan Afghani
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ALL"
                            }
                            value="ALL"
                          >
                            Albanian Lek
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "DZD"
                            }
                            value="DZD"
                          >
                            Algerian Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AOA"
                            }
                            value="AOA"
                          >
                            Angolan Kwanza
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ARS"
                            }
                            value="ARS"
                          >
                            Argentine Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AMD"
                            }
                            value="AMD"
                          >
                            Armenian Dram
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AWG"
                            }
                            value="AWG"
                          >
                            Aruban Florin
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AUD"
                            }
                            value="AUD"
                          >
                            Australian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AZN"
                            }
                            value="AZN"
                          >
                            Azerbaijani Manat
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BSD"
                            }
                            value="BSD"
                          >
                            Bahamian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BHD"
                            }
                            value="BHD"
                          >
                            Bahraini Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BDT"
                            }
                            value="BDT"
                          >
                            Bangladeshi Taka
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BBD"
                            }
                            value="BBD"
                          >
                            Barbadian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BYR"
                            }
                            value="BYR"
                          >
                            Belarusian Ruble
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BEF"
                            }
                            value="BEF"
                          >
                            Belgian Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BZD"
                            }
                            value="BZD"
                          >
                            Belize Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BMD"
                            }
                            value="BMD"
                          >
                            Bermudan Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BTN"
                            }
                            value="BTN"
                          >
                            Bhutanese Ngultrum
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BOB"
                            }
                            value="BOB"
                          >
                            Bolivian Boliviano
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BAM"
                            }
                            value="BAM"
                          >
                            Bosnia-Herzegovina Convertible Mark
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BWP"
                            }
                            value="BWP"
                          >
                            Botswanan Pula
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BRL"
                            }
                            value="BRL"
                          >
                            Brazilian Real
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GBP"
                            }
                            value="GBP"
                          >
                            British Pound Sterling
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BND"
                            }
                            value="BND"
                          >
                            Brunei Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BGN"
                            }
                            value="BGN"
                          >
                            Bulgarian Lev
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "BIF"
                            }
                            value="BIF"
                          >
                            Burundian Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KHR"
                            }
                            value="KHR"
                          >
                            Cambodian Riel
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CAD"
                            }
                            value="CAD"
                          >
                            Canadian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CVE"
                            }
                            value="CVE"
                          >
                            Cape Verdean Escudo
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KYD"
                            }
                            value="KYD"
                          >
                            Cayman Islands Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "XOF"
                            }
                            value="XOF"
                          >
                            CFA Franc BCEAO
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "XAF"
                            }
                            value="XAF"
                          >
                            CFA Franc BEAC
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "XPF"
                            }
                            value="XPF"
                          >
                            CFP Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CLP"
                            }
                            value="CLP"
                          >
                            Chilean Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CNY"
                            }
                            value="CNY"
                          >
                            Chinese Yuan
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "COP"
                            }
                            value="COP"
                          >
                            Colombian Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KMF"
                            }
                            value="KMF"
                          >
                            Comorian Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CDF"
                            }
                            value="CDF"
                          >
                            Congolese Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CRC"
                            }
                            value="CRC"
                          >
                            Costa Rican ColÃ³n
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "HRK"
                            }
                            value="HRK"
                          >
                            Croatian Kuna
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CUC"
                            }
                            value="CUC"
                          >
                            Cuban Convertible Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CZK"
                            }
                            value="CZK"
                          >
                            Czech Republic Koruna
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "DKK"
                            }
                            value="DKK"
                          >
                            Danish Krone
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "DJF"
                            }
                            value="DJF"
                          >
                            Djiboutian Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "DOP"
                            }
                            value="DOP"
                          >
                            Dominican Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "XCD"
                            }
                            value="XCD"
                          >
                            East Caribbean Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "EGP"
                            }
                            value="EGP"
                          >
                            Egyptian Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ERN"
                            }
                            value="ERN"
                          >
                            Eritrean Nakfa
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "EEK"
                            }
                            value="EEK"
                          >
                            Estonian Kroon
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ETB"
                            }
                            value="ETB"
                          >
                            Ethiopian Birr
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "EUR"
                            }
                            value="EUR"
                          >
                            Euro
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "FKP"
                            }
                            value="FKP"
                          >
                            Falkland Islands Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "FJD"
                            }
                            value="FJD"
                          >
                            Fijian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GMD"
                            }
                            value="GMD"
                          >
                            Gambian Dalasi
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GEL"
                            }
                            value="GEL"
                          >
                            Georgian Lari
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "DEM"
                            }
                            value="DEM"
                          >
                            German Mark
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GHS"
                            }
                            value="GHS"
                          >
                            Ghanaian Cedi
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GIP"
                            }
                            value="GIP"
                          >
                            Gibraltar Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GRD"
                            }
                            value="GRD"
                          >
                            Greek Drachma
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GTQ"
                            }
                            value="GTQ"
                          >
                            Guatemalan Quetzal
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GNF"
                            }
                            value="GNF"
                          >
                            Guinean Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "GYD"
                            }
                            value="GYD"
                          >
                            Guyanaese Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "HTG"
                            }
                            value="HTG"
                          >
                            Haitian Gourde
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "HNL"
                            }
                            value="HNL"
                          >
                            Honduran Lempira
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "HKD"
                            }
                            value="HKD"
                          >
                            Hong Kong Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "HUF"
                            }
                            value="HUF"
                          >
                            Hungarian Forint
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ISK"
                            }
                            value="ISK"
                          >
                            Icelandic KrÃ³na
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "INR"
                            }
                            value="INR"
                          >
                            Indian Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "IDR"
                            }
                            value="IDR"
                          >
                            Indonesian Rupiah
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "IRR"
                            }
                            value="IRR"
                          >
                            Iranian Rial
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "IQD"
                            }
                            value="IQD"
                          >
                            Iraqi Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ILS"
                            }
                            value="ILS"
                          >
                            Israeli New Sheqel
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ITL"
                            }
                            value="ITL"
                          >
                            Italian Lira
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "JMD"
                            }
                            value="JMD"
                          >
                            Jamaican Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "JPY"
                            }
                            value="JPY"
                          >
                            Japanese Yen
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "JOD"
                            }
                            value="JOD"
                          >
                            Jordanian Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KZT"
                            }
                            value="KZT"
                          >
                            Kazakhstani Tenge
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KES"
                            }
                            value="KES"
                          >
                            Kenyan Shilling
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KWD"
                            }
                            value="KWD"
                          >
                            Kuwaiti Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KGS"
                            }
                            value="KGS"
                          >
                            Kyrgystani Som
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LAK"
                            }
                            value="LAK"
                          >
                            Laotian Kip
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LVL"
                            }
                            value="LVL"
                          >
                            Latvian Lats
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LBP"
                            }
                            value="LBP"
                          >
                            Lebanese Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LSL"
                            }
                            value="LSL"
                          >
                            Lesotho Loti
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LRD"
                            }
                            value="LRD"
                          >
                            Liberian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LYD"
                            }
                            value="LYD"
                          >
                            Libyan Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LTL"
                            }
                            value="LTL"
                          >
                            Lithuanian Litas
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MOP"
                            }
                            value="MOP"
                          >
                            Macanese Pataca
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MKD"
                            }
                            value="MKD"
                          >
                            Macedonian Denar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MGA"
                            }
                            value="MGA"
                          >
                            Malagasy Ariary
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MWK"
                            }
                            value="MWK"
                          >
                            Malawian Kwacha
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MYR"
                            }
                            value="MYR"
                          >
                            Malaysian Ringgit
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MVR"
                            }
                            value="MVR"
                          >
                            Maldivian Rufiyaa
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MRO"
                            }
                            value="MRO"
                          >
                            Mauritanian Ouguiya
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MUR"
                            }
                            value="MUR"
                          >
                            Mauritian Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MXN"
                            }
                            value="MXN"
                          >
                            Mexican Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MDL"
                            }
                            value="MDL"
                          >
                            Moldovan Leu
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MNT"
                            }
                            value="MNT"
                          >
                            Mongolian Tugrik
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MAD"
                            }
                            value="MAD"
                          >
                            Moroccan Dirham
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MZM"
                            }
                            value="MZM"
                          >
                            Mozambican Metical
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "MMK"
                            }
                            value="MMK"
                          >
                            Myanmar Kyat
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NAD"
                            }
                            value="NAD"
                          >
                            Namibian Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NPR"
                            }
                            value="NPR"
                          >
                            Nepalese Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ANG"
                            }
                            value="ANG"
                          >
                            Netherlands Antillean Guilder
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TWD"
                            }
                            value="TWD"
                          >
                            New Taiwan Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NZD"
                            }
                            value="NZD"
                          >
                            New Zealand Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NIO"
                            }
                            value="NIO"
                          >
                            Nicaraguan CÃ³rdoba
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NGN"
                            }
                            value="NGN"
                          >
                            Nigerian Naira
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KPW"
                            }
                            value="KPW"
                          >
                            North Korean Won
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "NOK"
                            }
                            value="NOK"
                          >
                            Norwegian Krone
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "OMR"
                            }
                            value="OMR"
                          >
                            Omani Rial
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PKR"
                            }
                            value="PKR"
                          >
                            Pakistani Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PAB"
                            }
                            value="PAB"
                          >
                            Panamanian Balboa
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PGK"
                            }
                            value="PGK"
                          >
                            Papua New Guinean Kina
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PYG"
                            }
                            value="PYG"
                          >
                            Paraguayan Guarani
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PEN"
                            }
                            value="PEN"
                          >
                            Peruvian Nuevo Sol
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PHP"
                            }
                            value="PHP"
                          >
                            Philippine Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "PLN"
                            }
                            value="PLN"
                          >
                            Polish Zloty
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "QAR"
                            }
                            value="QAR"
                          >
                            Qatari Rial
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "RON"
                            }
                            value="RON"
                          >
                            Romanian Leu
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "RUB"
                            }
                            value="RUB"
                          >
                            Russian Ruble
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "RWF"
                            }
                            value="RWF"
                          >
                            Rwandan Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SVC"
                            }
                            value="SVC"
                          >
                            Salvadoran ColÃ³n
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "WST"
                            }
                            value="WST"
                          >
                            Samoan Tala
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SAR"
                            }
                            value="SAR"
                          >
                            Saudi Riyal
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "RSD"
                            }
                            value="RSD"
                          >
                            Serbian Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SCR"
                            }
                            value="SCR"
                          >
                            Seychellois Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SLL"
                            }
                            value="SLL"
                          >
                            Sierra Leonean Leone
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SGD"
                            }
                            value="SGD"
                          >
                            Singapore Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SKK"
                            }
                            value="SKK"
                          >
                            Slovak Koruna
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SBD"
                            }
                            value="SBD"
                          >
                            Solomon Islands Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SOS"
                            }
                            value="SOS"
                          >
                            Somali Shilling
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ZAR"
                            }
                            value="ZAR"
                          >
                            South African Rand
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "KRW"
                            }
                            value="KRW"
                          >
                            South Korean Won
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "XDR"
                            }
                            value="XDR"
                          >
                            Special Drawing Rights
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "LKR"
                            }
                            value="LKR"
                          >
                            Sri Lankan Rupee
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SHP"
                            }
                            value="SHP"
                          >
                            St. Helena Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SDG"
                            }
                            value="SDG"
                          >
                            Sudanese Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SRD"
                            }
                            value="SRD"
                          >
                            Surinamese Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SZL"
                            }
                            value="SZL"
                          >
                            Swazi Lilangeni
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SEK"
                            }
                            value="SEK"
                          >
                            Swedish Krona
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "CHF"
                            }
                            value="CHF"
                          >
                            Swiss Franc
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "SYP"
                            }
                            value="SYP"
                          >
                            Syrian Pound
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "STD"
                            }
                            value="STD"
                          >
                            São Tomé and Príncipe Dobra
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TJS"
                            }
                            value="TJS"
                          >
                            Tajikistani Somoni
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TZS"
                            }
                            value="TZS"
                          >
                            Tanzanian Shilling
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "THB"
                            }
                            value="THB"
                          >
                            Thai Baht
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TOP"
                            }
                            value="TOP"
                          >
                            Tongan pa'anga
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TTD"
                            }
                            value="TTD"
                          >
                            Trinidad & Tobago Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TND"
                            }
                            value="TND"
                          >
                            Tunisian Dinar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TRY"
                            }
                            value="TRY"
                          >
                            Turkish Lira
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "TMT"
                            }
                            value="TMT"
                          >
                            Turkmenistani Manat
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "UGX"
                            }
                            value="UGX"
                          >
                            Ugandan Shilling
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "UAH"
                            }
                            value="UAH"
                          >
                            Ukrainian Hryvnia
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "AED"
                            }
                            value="AED"
                          >
                            United Arab Emirates Dirham
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "UYU"
                            }
                            value="UYU"
                          >
                            Uruguayan Peso
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "USD"
                            }
                            value="USD"
                          >
                            US Dollar
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "UZS"
                            }
                            value="UZS"
                          >
                            Uzbekistan Som
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "VUV"
                            }
                            value="VUV"
                          >
                            Vanuatu Vatu
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "VEF"
                            }
                            value="VEF"
                          >
                            Venezuelan BolÃ­var
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "VND"
                            }
                            value="VND"
                          >
                            Vietnamese Dong
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "YER"
                            }
                            value="YER"
                          >
                            Yemeni Rial
                          </option>
                          <option
                            selected={
                              data.current?.freelancer?.currency?.values ===
                              "ZMK"
                            }
                            value="ZMK"
                          >
                            Zambian Kwacha
                          </option>
                        </select>
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            placeholder="city or postal code"
                            style={{ width: "auto", border: "1px #555 solid" }}
                            onChange={(e) => handleCitySearch(e)}
                            defaultValue={data.current?.freelancer?.city?.values
                              ?.at(0)
                              ?.replace("%", "")}
                          />
                          <select
                            name="distance"
                            id=""
                            style={{
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                              width: "70px",
                            }}
                            onChange={(e) =>
                              searchHandler(
                                false,
                                "radius",
                                ">",
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              Select maximum travel distance
                            </option>
                            <option
                              value={10}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 10
                              }
                            >
                              {"<"} 10 Km
                            </option>
                            <option
                              value={20}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 20
                              }
                            >
                              {"<"} 20 Km
                            </option>
                            <option
                              value={30}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 30
                              }
                            >
                              {"<"} 30 Km
                            </option>
                            <option
                              value={40}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 40
                              }
                            >
                              {"<"} 40 Km
                            </option>
                            <option
                              value={50}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 50
                              }
                            >
                              {"<"}50 km
                            </option>
                            <option
                              value={60}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 60
                              }
                            >
                              {"<"}60 km
                            </option>
                            <option
                              value={70}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 70
                              }
                            >
                              {"<"}70 km
                            </option>
                            <option
                              value={80}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 80
                              }
                            >
                              {"<"}80 km
                            </option>
                            <option
                              value={90}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 90
                              }
                            >
                              {"<"}90 km
                            </option>
                            <option
                              value={100}
                              selected={
                                parseInt(
                                  data.current.freelancer?.radius?.values
                                ) === 100
                              }
                            >
                              {"<"}100 km
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="advanced_search_button">
                        <Link
                          to="/search"
                          state={{
                            ...data.current,
                            table: searchProjects ? "assignements" : "users",
                            sort_by: sortBy,
                            stopSearch: true,
                          }}
                        >
                          <button style={{ width: "150px", height: "40px" }}>
                            Show{" "}
                            {research.data &&
                              "(" +
                              (research.data?.length - 1 > 0
                                ? research.data?.length - 1
                                : 0) +
                              ")"}{" "}
                            results
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
            <div className="side-btn-btn">


              {
                user.account_type === "freelancer" ? (
                  <></>
                ) : (
                  <div className="right-section">
                    <div className="right-section-content" >
                      {
                        lang !== "dutch" ? (
                          <p style={{ textAlign: "center" }}>
                            Place a free assignment and <br />
                            find the right freelancer
                          </p>
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            Gratis opdracht plaatsen <br />
                            en vind de juiste freelancer
                          </p>

                        )

                      }
                      {
                        lang !== "dutch" ? (
                          user.email !== undefined ? (
                            <Link to="/dashboard/place-call">
                              <button>POST YOUR ASSIGNMENT</button>
                            </Link>
                          ) : (
                            <Link to="/join" className="links">
                              <button> Post your assignment</button>
                            </Link>
                          )
                        ) : (
                          user.email !== undefined ? (
                            <Link to="/dashboard/place-call">
                              <button>Plaats je opdracht</button>
                            </Link>
                          ) : (
                            <Link to="/join" className="links">
                              <button>Plaats je opdracht</button>
                            </Link>
                          )
                        )
                      }




                    </div>
                  </div>
                )
              }

              {user.email !== undefined ? (
                <></>
              ) : (
                <div className="left-section">
                  <div className="right-section-content">
                    {
                      lang !== "dutch" ? (
                        <>
                          <p>
                            Promote your self as a  <br />
                            freelauncer and find new  assignment
                          </p>
                          <Link className="links" to="/join">
                            <button >Create an account immediately</button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <p>
                            Promoot jezelf gratis els freelancer <br />
                            en vind nieuwe opdrachten
                          </p>
                          <Link to="/join" className="links">
                            <button >Direct account aanmaken </button>
                          </Link>
                        </>
                      )
                    }


                  </div>
                </div>
              )}
              {/* <div className={`loading ${!showLoading ? "hideLoading":""}`}>
                            <div className="loadingBar"></div>
                        </div> */}
              {/* {showLoading && <LoadingBox />} */}
            </div>
          </div>
          <div className="numbers">
            <div className="header">
              <h4>Curant24 Worldwide</h4>
            </div>
            <div className="numbers-content">
              <div>
                <h3>500.000+</h3>
                <span>Freelancers</span>
              </div>
              <div>
                <h3>250.000+</h3>
                <span>Buisnesses</span>
              </div>
              <div>
                <h3>1+ million</h3>
                <span>Assignments</span>
              </div>
            </div>
          </div>
        </div>
        {temp === 1 ? (
          <div className="home-aboutus" id="aboutus">
            <div className="home-content">
              <div className="content-wrapper">
                <div className="content-header">
                  <h3>About Us</h3>
                </div>
                <div className="content-info">
                  <p>
                    Voor Curant24 is bemiddelen alleen niet het belangrijkst,
                    wij kijken ook naar de persoon wat vind de freelancer en
                    opdrachtgever belangrijke zaken op de werkvloer. Op deze
                    manier kunnen wij de perfect match vinden voor onze
                    freelancers en de opdrachtgevers. <br /> <br />
                    Een match op papier tussen een freelancer en opdrachtgever
                    is niet altijd een match weten wij uit ervaring. En daar
                    ligt onze kracht om een perfecte match tussen beiden
                    partijen te vinden. <br /> <br />
                    Met als grote pluspunt wat wij vaak zien, word de freelancer
                    meerderen malen opnieuw ingepland door dezelfde
                    opdrachtgever door de goede match tussen beiden partijen.{" "}
                    <br /> <br />
                    Wat maakt ons uniek voor opdrachtgevers, wij beschikken over
                    een uitgebreid database met Freelancers van elke branche van
                    loodgieters tot aan freelancers die werken in de
                    kinderopvang. <br /> <br />
                    Voor elk assignment een passende freelancer <br /> <br />
                    Wat maakt ons uniek voor freelancers, wij hebben in al die
                    jaren dat wij actief zijn een groot database met
                    opdrachtgevers opgebouwd. Die altijd hun actuele nieuwe
                    projecten als eerste plaatsen op onze website. <br /> <br />
                    Er is altijd een passend assignment te vinden op Curant24{" "}
                    <br /> <br />
                    Een plek creëren waar alleen gekwalificeerde freelancers
                    zich kunnen presenteren. Wij screenen de Freelancers van a
                    tot z zodat u als opdrachtgever alleen met gekwalificeerde
                    gescreende freelancers zaken doet. <br /> <br />
                    Waar staan wij als Curant24 voor. Wij presenteren alleen
                    gekwalificeerde freelancers, erkende opdrachtgevers en
                    gescreende projectassignmenten waar wij 100 % achter staan.{" "}
                    <br /> <br />
                    Kwaliteit gaat voor kwantiteit. Het gaat er niet om hoeveel
                    freelancers, opdrachtgever, assignmenten wij presenteren het
                    gaat om de kwaliteit daarvan. Dat is het enigste wat telt
                    voor Curant24. Op deze manier doen wij graag zaken met
                    beiden partijen. <br /> <br />
                    Kwaliteit, eerlijkheid en betrouwbaarheid. <br /> <br />
                  </p>
                </div>
              </div>
              <div className="content-wrapper white">
                <div className="content-header">
                  <h3>About Us</h3>
                </div>
                <div className="content-info">
                  <p>
                    Curant 24 is opgericht in 2009 en heeft vestigingen in
                    verschillende landen wereldwijd. Curant24 is een
                    bemiddelingsbureau die freelancers uit elke branche met
                    opdrachtgevers samen brengt . <br /> <br />
                    Curant24 is onderdeel van NatureTower bv met ruim 100
                    medewerkers in dienst werelwijd. <br /> <br />
                  </p>
                </div>
              </div>
              <div className="content-wrapper">
                <div className="content-header">
                  <h3>About Us</h3>
                </div>
                <div className="content-info">
                  <div>
                    <p>
                      <u>Onze missie</u>
                    </p>
                    <span>
                      Een plek creëren waar elke freelancer van elke branche
                      zichzelf nationaal / internationaal kan presenteren om
                      snel een passend assignment te vinden. <br />
                      Voor elke freelancer is er een passend assignment te
                      vinden op Curant24 <br />
                      Een plek creëren waar opdrachtgevers snel en onbeperkt
                      kunnen zoeken naar de best passende freelancer voor hun
                      assignment. <br />
                      Voor elk denkbaar assignment is er een geschikte
                      freelancer te vinden op Curant24 <br />
                    </span>
                  </div>
                  <div>
                    <p>
                      <u>Onze Visie:</u>
                    </p>
                    <span>
                      In het zakenleven draait alles om betrouwbaarheid en
                      kwaliteit. Een betrouwbare plek creëren <br />
                      waar kwaliteit en eerlijkheid van de freelancer en
                      opdrachtgever <br />
                      voor gaat op kwantiteit.
                    </span>
                  </div>
                  <p>
                    <h3>Curant24</h3>
                    Zoek, overleg, en wij doen de rest
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : temp === 2 ? (
          <div className="home-companies" id="companies">
            {/* <div className="home-content">
                                <div className='content-wrapper'>
                                    <div className="content-header">
                                        <h3>Curant24 mediates</h3>
                                    </div>
                                    <div className="content-info">
                                        <p>
                                            Curant24 mediates organasations with flexible freelancers for a fair hourly rate.
                                        </p>
                                        <p>
                                            Helpls to absorb failures or shotages easily. Makes variable personnel cost manageable and the transfer to employment is free of charge.
                                        </p>
                                        <p>
                                            Curant24 is the flexible stand-in pool from Technology to childcare. We have freelancers in every branch.
                                        </p>
                                    </div>
                                </div>
                                <div className="content-wrapper white">
                                    <div className="content-header">
                                        <h3>
                                            Why choose Curant24
                                        </h3>
                                    </div>
                                    <div className="content-info">
                                        <div>
                                            <p>
                                                Affordable hourly rates.
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Place unlimited assignements and search for freelancers in our database.
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                The best professionals,screened and fairly judged.
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Free registration
                                            </p>
                                            <span>
                                                No subscription costs.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                Always a match available
                                            </p>
                                            <span>
                                                After more than 12 years, Curant24 has an expensive network of almost 100,000+ freelancers
                                                Worldwide. In the event of a sick report, a reserve rotation can be used. 
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                Good offer guaranteed 
                                            </p>
                                            <span>
                                                curant24 carefully checks all registrations for the correct qualifications. A personal interview follows and completes the freelancer's profile 
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                Controllable personnel costs.
                                            </p>
                                            <span>
                                                No more overcapacity and free cancellation up to 24 hours before the start of the service. Outflow of the self employed person to employment is free.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content-header">
                                        <h3>
                                            This is how registering as an organasation works
                                        </h3>
                                    </div>  
                                    <div className="content-info">
                                        <div>
                                            <p>
                                                <u>
                                                    1. Register
                                                </u>
                                            </p>
                                            <span>
                                                Register online without obligation and fill in the company profile
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    2. Place a call
                                                </u>
                                            </p>
                                            <span>
                                                Choose the location, date and times. Provide the required qualifications.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    3. Invite professionals
                                                </u>
                                            </p>
                                            <span>
                                                View the selection of professionals and tick the appropriate candidates.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    4. Waiting for reactions
                                                </u>
                                            </p>
                                            <span>
                                                The chosen professionals will be notified and confirmation will be sent as soon as there is a match.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            <HomeDescriptionClient />
          </div>
        ) : temp === 3 ? (
          <div className="home-freelancers" id="freelancers">
            {/* <div className="freelancer-content">
                                <div className="content-wrapper">
                                    <div className="content-header">
                                        <h3>
                                            Curant24 is here for you
                                        </h3>
                                    </div>
                                    <div className="content-info">
                                        <div>
                                            <p>
                                                1: Free for independent professionals.
                                            </p>
                                            <p>
                                                2: Helps you to become an independent entrepreneur.
                                            </p>
                                            <p>
                                                3: Makes your administration easy.
                                            </p>
                                            <p>
                                                4: Matches your agenda with flex services.
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <b>
                                                    Flexibility
                                                </b>
                                            </p>
                                            <p>
                                                You indicate in our online agenda when you can work, you decide which services you accept.
                                            </p>
                                            <p>
                                                Good income 
                                            </p>
                                            <p>
                                                The use of Curant24 is free of charge for freelancers, in addition, you determine the rate for which you want to work.
                                            </p>
                                            <p>
                                                Curant24 your perfect buisness partner.
                                            </p>
                                            <p>
                                                You do what you do best and we make the rest easy. 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-wrapper white">
                                    <div className="content-header">
                                        <h3>
                                            How it works
                                        </h3>
                                    </div>
                                    <div className="content-info">
                                        <div>
                                            <p>
                                                <u>
                                                    1. Register
                                                </u>
                                            </p>
                                            <span>
                                                Register yourself online without obligationand complete your profile.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    2. Screening
                                                </u>
                                            </p>
                                            <span>
                                                We screen whether you are suitable
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    3. Profile complete 
                                                </u>
                                            </p>
                                            <span>
                                                Complete your profile and have your documents approved.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                <u>
                                                    4. Get started!
                                                </u>
                                            </p>
                                            <span>
                                                You can now get started and choose from the assignments.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content-header">
                                        <h3>
                                            Sign Up as Freelancer
                                        </h3>
                                    </div>
                                    <div className="content-info">
                                        <div>
                                            <p>
                                                What do you need?
                                            </p>
                                            <span>
                                                The following is required to work as a freelancer. For example, if you do not have a valid VOG or if 
                                                you are not yet registered with the Chamber of Commerce, we will help you with that.
                                            </span>
                                        </div>
                                        <div>
                                            <p>
                                                1. Valid diplomat for childcare Diplomat check.
                                            </p>
                                            <p>
                                                2. Check here which regions we are active.
                                            </p>
                                            <p>
                                                3. Registration in the childcare register.
                                            </p>
                                            <p>
                                                4. Buisness Liability Insurance.
                                            </p>
                                            <p>
                                                5. Registeration with the Chamber of Commerce.
                                            </p>
                                            <p>
                                                6. (Optional) First Aid, Preschool and further certificates.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            <HomeDescriptionFreelancer />
          </div>
        ) : (
          <></>
        )}
        {/* <div className="footer">
                    <div className="advanced_search_button">
                        <Link to="/search" state={{...data.current,table:searchProjects?"assignements":"users",sort_by:sortBy}} ref={ref=>ref!==null&&(linkRef.current = ref)} >
                        </Link>
                    </div>
                    <p>
                    © 2021 Curant24
                    </p>
                </div> */}
        <Footer />
      </div>
    </div>
  );
}
