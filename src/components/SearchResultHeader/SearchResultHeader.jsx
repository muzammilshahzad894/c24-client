import React, { useRef, useState } from "react";
import "./searchResultHeader.scss";
import { BsBell } from "react-icons/bs";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { search_action } from "../../state/Actions/UserAction";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useEffect } from "react";
import all_cities from "../../pages/PlaceCall/worldcities.json";

export default function SearchResultHeader({
  changeData,
  changeType,
  data,
  freelancerBool,
  switchSearch,
}) {
  const user_info = useSelector((state) => state.user_info);
  const [showChangeCountry, setShowChangeCountry] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showcountryPopup, setShowcountryPopup] = useState(false);
  
  const [selectCountry, setSelectCountry] = useState("Nederland");
  const [freelancer, setFreelancer] = useState(freelancerBool);
  const [searchProjects, setSearchProjects] = useState(!freelancer);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const linkRef = useRef();
  const [sortBy, setSortBy] = useState("");
  const [country, setCountry] = useState("Netherlands - NL");
  const [countryImg, setCountryImg] = useState("/images/netherland_flag.png");
  const research = useSelector((state) => state.research);
  const searchLinkRef = useRef();
  const [nv, setNv] = useState(research.data ? false : true);
  const location = useLocation();
  //data object to store search values
  const searchData = useRef({
    freelancer: {
      hourly_rate: {
        operation: "",
        values: "",
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
        operation: "",
        values: "",
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
    table: freelancer ? "users" : "assignements",
  });
  const dispatch = useDispatch();
  //data object to store search values
  const info = useRef(
    sessionStorage.getItem("searchData")
      ? JSON.parse(sessionStorage.getItem("searchData"))
      : data || searchData.current
  );
  useEffect(() => {
    if (research.data && research.data[0]) {
      setNv(false);
    }
  }, [research]);

  /**useEffect(()=>{
    searchHandler(false,(searchProjects?"job_name":"profession"),"like ","flush")
},[searchProjects])*/

  const countries = [
    { value: "nl", label: "netherlands", image: "/images/netherland_flag.png" },
    { value: "usa", label: "USA", image: "/images/countries/usa_flag.png" },
    { value: "india", label: "IN", image: "/images/countries/india_flag.png" },
    {
      value: "morocco",
      label: "MA",
      image: "/images/countries/morocco_flag.png",
    },
    {
      value: "france",
      label: "FR",
      image: "/images/countries/france_flag.png",
    },
    { value: "england", label: "EN", image: "/images/countries/england.png" },
  ];

  useEffect(() => {
    info.current = data;
  }, [data]);

  useEffect(() => {
    //initial search once data changes
    if (location.state?.stopSearch && research.data?.length > 0) {
      location.state && (location.state.stopSearch = false);
    } else {
      if (!freelancerBool) {
        searchHandler(
          false,
          "job_name",
          "like ",
          info.current?.assignment?.job_name?.values
        );
      } else {
        searchHandler(
          false,
          "hourly_rate",
          "<=",
          data?.freelancer?.hourly_rate?.values?.toString()?.length > 0
            ? data?.freelancer?.hourly_rate?.values
            : 50
        );
      }
    }
    //initialize location.state to info.current to assure saved data is shown

    window.scrollTo(0, 0);
    setFreelancer(freelancerBool);
    setSearchProjects(!freelancerBool);
  }, [data, freelancerBool, location.state, switchSearch, info.current]);

  //save search object once changed
  /*useEffect(()=>{
    changeData(info.current)
  },[info.current])*/

  useEffect(() => {
    if (info.current) {
      info.current.table = !searchProjects ? "users" : "assignements";
      //sessionStorage.setItem("searchData",JSON.stringify(info.current))
    }
    if (info.current?.hourly_rate) {
      info.current = searchData.current;
      //sessionStorage.setItem("searchData",JSON.stringify(info.current))
    }
  }, [searchProjects]);

  /*useEffect(()=>{
    if(searchProjects){
        searchHandler(false,"job_name","like ",info.current?.assignment?.job_name?.values)
      }else{
        searchHandler(false,"hourly_rate","<=",(data?.freelancer?.hourly_rate?.values?.toString()?.length>0)?data?.freelancer?.hourly_rate?.values:50)
        //searchHandler(false,"currency","like ","EUR")
      }
      
  },[data.hourly_rate?.values, searchProjects])*/
  //finding cities on the selected radius function
  /**
   * radius pre management
   *
   * 1 - get lat lng data of selected city.
   * 2 - get cities from data source in the pre selected radius
   * 3 - set the info object to them
   */
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
  const changeCountryHandler = (countryName, countryImage) => {
    if (countryName === "dutch") {
      setCountry("Nederland - NL");
      setCountryImg(countryImage);
      setShowCountryList(false);
      localStorage.setItem("language", 'dutch');
    } else {
      setCountry(countryName);
      setCountryImg(countryImage);
      setShowCountryList(false);
      localStorage.setItem("language", countryName);
    }
    
  };
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
            ? info.current?.assignment?.radius?.values
            : info.current?.freelancer?.radius?.values
        )
      )?.map((item) => item.admin_name + "%")
    );

    if (searchProjects) {
      if (info.current?.assignment?.province) {
        info.current.assignment.province.values = [];
      }
    } else {
      if (info.current.freelancer?.city) {
        info.current.freelancer.city.values = [];
      }
    }
    //treatement of the city search itself
    if (searchProjects || !freelancer) {
      //set the search to country since the postal code is linked to the country and by typing
      //the postal code on .nl website we only target those on the netherlands
      if (/\d/g.test(str)) {
        str = "Netherlands";
        if (info.current?.assignment?.province) {
          info.current.assignment.province.values = [];
        }
        searchHandler(false, "country", "like", "%" + str + "%");
      } else {
        if (info.current?.assignment?.country) {
          info.current.assignment.country.values = "";
        }

        searchHandler(false, "province", "like", resultArr);
      }
    } else {
      //searchHandler(false,"city","like",e.target.value+(e.target.value.length>0?"%":""))
      //searchHandler(false,"place","like",e.target.value+(e.target.value.length>0?"%":""))
      if (/\d/.test(str)) {
        searchHandler(false, "postcode", "like", str + "%");
        if (info.current.freelancer?.city) {
          info.current.freelancer.city.values = [];
        }
      } else {
        if (info.current.freelancer?.postcode) {
          info.current.freelancer.postcode.values = "";
        }
        searchHandler(false, "city", "like", resultArr);
      }
    }
  };
  const searchHandler = (remove, key, op, value) => {
    let searchInfo = !searchProjects
      ? info.current.freelancer
      : info.current.assignment;
    if (key === "industry" || key === "competency") {
      document.getElementById("all_fields").value = value.replace("%", "");
    }
    //asserting new data to data obj
    let the_info = {};
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
            searchInfo[key].values = searchInfo[key]?.values.concat(value);
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
        if (elt.values?.length > 0 || elt.values?.toString()?.length > 0) {
          if (the_key !== "radius") {
            the_info[the_key] = elt;
          }
        }
      }
      the_info.table = searchProjects ? "assignements" : "users";

      if (searchProjects) {
        info.current.assignment = searchInfo;
      } else {
        info.current.freelancer = searchInfo;
      }
      sessionStorage.setItem("searchData", JSON.stringify(info.current));
      changeData(info.current);

      //the_info.table = info.current.table;
      dispatch(search_action(the_info));
    }
  };
  return (
    <div className="search_methods_container">
      <div className="search_methods">
        {
          /*nv*/ false ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "30px",
              }}
            >
              <p style={{ fontSize: "22px" }}>
                What are you looking for ? <br />
                We are happy to help you
              </p>
              <div className="innerContent">
                <div className="inner-content-info">
                  <ul>
                    <li>Find your</li>
                    <li
                      className={!searchProjects ? "selected" : ""}
                      onClick={() => {
                        setShowAdvancedSearch(false);
                        setSearchProjects(false);
                        data.current = searchData.current;
                        changeType(false);
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
                        data.current = searchData.current;
                        changeType(true);
                      }}
                    >
                      Assignments
                    </li>
                  </ul>
                  <div className="contentInput">
                    <input
                      type="text"
                      placeholder={
                        searchProjects
                          ? "Search projects based on keyword and industry"
                          : "Search freelancers based on profession and keyword"
                      }
                      onChange={(e) => {
                        e.target.value.length === 0
                          ? searchHandler(
                              false,
                              searchProjects ? "job_name" : "profession",
                              "like ",
                              ""
                            )
                          : searchHandler(
                              false,
                              searchProjects ? "job_name" : "profession",
                              "like ",
                              e.target.value +
                                (e.target.value.length > 0
                                  ? "%"
                                  : "") /*,linkRef.current?.click()*/
                            );
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
                        id="all_fields_search_header"
                        onChange={(e) =>
                          searchHandler(
                            false,
                            searchProjects ? "industry" : "competency",
                            "like ",
                            e.target.value +
                              (e.target.value.length > 0 ? "%" : "")
                          )
                        }
                      >
                        <option value="">All fields</option>
                        <option
                          value="Construction"
                          selected={
                            !searchProjects
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Construction"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Electrical"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Installation"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Infrastructure"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Industrial"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Health care and well being"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Trade and services"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "IT"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Justice, security and public administration"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Environment and Agriculture"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Media and communication"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Education, culture and science"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Engineering, production and construction"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Tourism, recreation and catering"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Transport and Logistics"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                              ? info.current?.freelancer?.competency?.values.includes(
                                  "Childcare"
                                )
                              : info.current?.assignment?.industry?.values.includes(
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
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="/images/angle_down.png"
                          className="angleDown"
                          alt=""
                        />
                        <img src={countryImg} className="flag" alt="" />
                      </div>
                  
                    </div>
                  </div>
                  <ul className="bottom-list">
                    <li
                      onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    >
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
                              Advanced search, for Assignments
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
                                    name="type_assignment"
                                    id=""
                                    onChange={(e) =>
                                      searchHandler(false, "pay_type", "=", [
                                        " pay per piece",
                                        "pay per hour",
                                      ])
                                    }
                                  />
                                </div>
                                <div>
                                  <p>Apiece</p>
                                  <input
                                    type="radio"
                                    name="type_assignment"
                                    id=""
                                    onChange={(e) =>
                                      searchHandler(
                                        false,
                                        "pay_type",
                                        "=",
                                        "pay per piece"
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <p>Per hour</p>
                                  <input
                                    type="radio"
                                    name="type_assignment"
                                    id=""
                                    onChange={(e) =>
                                      searchHandler(
                                        false,
                                        "pay_type",
                                        "=",
                                        "pay per hour"
                                      )
                                    }
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
                                      onChange={(e) =>
                                        e.target.checked
                                          ? searchHandler(
                                              false,
                                              "job_duration",
                                              "like",
                                              "< 1 month"
                                            )
                                          : searchHandler(
                                              true,
                                              "job_duration",
                                              "like",
                                              "< 1 month"
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
                                      onChange={(e) =>
                                        e.target.checked
                                          ? searchHandler(
                                              false,
                                              "job_duration",
                                              "like",
                                              "> 6 month"
                                            )
                                          : searchHandler(
                                              true,
                                              "job_duration",
                                              "like",
                                              "> 6 month"
                                            )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                marginRight: "10px",
                                alignSelf: "baseline",
                              }}
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
                          <div className="advanced_search_button">
                            <Link
                              to="/search"
                              state={{
                                ...data.current,
                                table: searchProjects
                                  ? "assignements"
                                  : "users",
                                sort_by: sortBy,
                              }}
                              ref={(ref) =>
                                ref !== null && (searchLinkRef.current = ref)
                              }
                            >
                              <button
                                style={{ width: "150px", height: "40px" }}
                              >
                                Show{" "}
                                {research.data &&
                                  "(" + research.data?.length + ")"}{" "}
                                results
                              </button>
                            </Link>
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
                          </div>
                          <div className="advanced_search_filters">
                            <div className="advanced_search_hours_week">
                              <div>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="_freelancer"
                                    id=""
                                  />
                                  <label htmlFor="_freelancer">Part-time</label>
                                </div>
                                <div>
                                  <input type="checkbox" name="_freelancer" />
                                  <label htmlFor="_freelancer">Full-time</label>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                flexDirection: "column",
                                width: "200px",
                                margin: "0 20px",
                              }}
                            >
                              <p style={{ marginBottom: "5px" }}>Hourly wage</p>
                              <input
                                type="range"
                                name=""
                                min={0}
                                max={150}
                                id=""
                                style={{ width: "100%" }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p style={{ fontSize: "11px" }}>0</p>
                                <p style={{ fontSize: "11px" }}>75</p>
                                <p style={{ fontSize: "11px" }}>150</p>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <input
                                type="text"
                                name={searchProjects ? "city" : "postcode"}
                                placeholder={
                                  searchProjects
                                    ? "city "
                                    : "city or postal code"
                                }
                                id="first_city_input"
                                defaultValue={
                                  searchProjects
                                    ? info.current?.assignment?.province?.values
                                        ?.length > 0
                                      ? info.current?.assignment?.province?.values
                                          ?.at(0)
                                          ?.replace("%", "")
                                      : info.current?.assignment?.country?.values?.replace(
                                          "%",
                                          ""
                                        )
                                    : info.current?.freelancer?.postcode?.values
                                        ?.length > 0
                                    ? info.current?.freelancer?.postcode?.values?.replace(
                                        "%",
                                        ""
                                      )
                                    : info.current?.freelancer?.city?.values
                                        ?.at(0)
                                        ?.replace("%", "")
                                }
                                style={{
                                  width: "auto",
                                  border: "1px #555 solid",
                                }}
                                onChange={(e) => handleCitySearch(e)}
                              />
                              <select
                                name="distance"
                                id=""
                                style={{
                                  borderTopRightRadius: "10px",
                                  borderBottomRightRadius: "10px",
                                  width: "70px",
                                }}
                                onChange={(e) => {
                                  if (e.target.value === "") {
                                    if (searchProjects) {
                                      searchHandler(
                                        false,
                                        "job_name",
                                        "like ",
                                        info.current?.assignment?.job_name
                                          ?.values
                                      );
                                    } else {
                                      searchHandler(
                                        false,
                                        "user_name",
                                        "like "
                                      );
                                    }
                                  } else {
                                    //searchHandler(false,"radius",">=",parseInt(e.target.value))
                                    info.current.assignment.radius.values =
                                      e.target.value;
                                    handleCitySearch({
                                      target: {
                                        value: searchProjects
                                          ? info.current?.assignment?.province
                                              ?.values
                                          : info.current?.freelancer?.city
                                              ?.values,
                                      },
                                    });
                                  }
                                }}
                              >
                                <option value="">All</option>
                                <option
                                  value={10}
                                  selected={
                                    info.current?.assignment?.radius?.values ===
                                    10
                                  }
                                >
                                  {"<"} 10 Km
                                </option>
                                <option
                                  value={20}
                                  selected={
                                    info.current?.assignment?.radius?.values ===
                                    20
                                  }
                                >
                                  {"<"} 20 Km
                                </option>
                                <option
                                  value={30}
                                  selected={
                                    info.current?.assignment?.radius?.values ===
                                    30
                                  }
                                >
                                  {"<"} 30 Km
                                </option>
                                <option
                                  value={40}
                                  selected={
                                    info.current?.assignment?.radius?.values ===
                                    40
                                  }
                                >
                                  {"<"} 40 Km
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="advanced_search_button">
                            <Link
                              to="/search"
                              state={{
                                ...data.current,
                                table: searchProjects
                                  ? "assignements"
                                  : "users",
                                sort_by: sortBy,
                              }}
                            >
                              <button
                                style={{ width: "150px", height: "40px" }}
                              >
                                Show{" "}
                                {research.data &&
                                  "(" + research.data?.length + ")"}{" "}
                                results
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex" }}>
                <div className={searchProjects ? "active" : ""}>
                  <h1
                    style={{
                      marginRight: "20px",
                      color: "#ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSearchProjects(true);
                      data.current = searchData.current;
                      changeType(false);
                    }}
                  >
                    Find an assignment
                  </h1>
                  {searchProjects ? (
                    <h3>That suits you</h3>
                  ) : (
                    <h3>That suits your assignment</h3>
                  )}
                </div>
                <div className={!searchProjects ? "active" : ""}>
                  <h1
                    style={{ color: "#ccc", cursor: "pointer" }}
                    onClick={() => {
                      setSearchProjects(false);
                      data.current = searchData.current;
                      changeType(true);
                    }}
                  >
                    Find a Freelancer
                  </h1>
                </div>
              </div>
              <h3>
                {(research.data?.length > 0 ? research.data?.length - 1 : 0) +
                  " " +
                  (!searchProjects
                    ? "freelancer" + (research.data?.length - 1 > 1 ? "s" : "")
                    : "assignment" +
                      (research.data?.length - 1 > 1 ? "s" : "")) +
                  " found!"}
              </h3>
              <div className="search_methods_inputs">
                <input
                  type="text"
                  placeholder="function or keyword" /*defaultValue={data?(data.table==="assignements"?data.job_name?.values.replace(/%/g,""):data.profession?.values.replace(/%/g,"")):""}*/
                  onChange={(e) => {
                    e.target.value.length === 0
                      ? searchHandler(
                          false,
                          searchProjects ? "job_name" : "profession",
                          "like ",
                          ""
                        )
                      : searchHandler(
                          false,
                          searchProjects ? "job_name" : "profession",
                          "like ",
                          e.target.value +
                            (e.target.value.length > 0 ? "%" : "")
                        );
                  }}
                  value={
                    searchProjects
                      ? info.current?.assignment?.job_name?.values?.replace(
                          "%",
                          ""
                        )
                      : info.current?.freelancer?.profession?.values?.replace(
                          "%",
                          ""
                        )
                  }
                />
                <select
                  name="All fields"
                  id="all_fields_search_header"
                  onChange={(e) =>
                    searchHandler(
                      false,
                      searchProjects ? "industry" : "competency",
                      " like ",
                      e.target.value + (e.target.value?.length > 0 ? "%" : "")
                    )
                  }
                >
                  <option value="">All fields</option>
                  <option
                    value="Construction"
                    selected={
                      !searchProjects
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Construction"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Electrical"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Installation"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Infrastructure"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Industrial"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Health care and well being"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Trade and services"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "IT"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Justice, security and public administration"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Environment and Agriculture"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Media and communication"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Education, culture and science"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Engineering, production and construction"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Tourism, recreation and catering"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Transport and Logistics"
                          )
                        : info.current?.assignment?.industry?.values.includes(
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
                        ? info.current?.freelancer?.competency?.values.includes(
                            "Childcare"
                          )
                        : info.current?.assignment?.industry?.values.includes(
                            "Childcare"
                          )
                    }
                  >
                    Childcare
                  </option>
                </select>
                <input
                  type="text"
                  placeholder={
                    searchProjects ? "city " : "city or postal code"
                  } /*defaultValue={data?(data.city?.values.length>=0?data.city?.values.replace(/%/g,""):data.place?.values.replace(/%/g,"")):""}*/
                  defaultValue={
                    searchProjects
                      ? info.current?.assignment?.province?.values
                          ?.at(0)
                          ?.replace("%", "")
                      : info.current?.freelancer?.postcode?.values?.length > 0
                      ? info.current?.freelancer?.postcode?.values?.replace(
                          "%",
                          ""
                        )
                      : info.current?.freelancer?.city?.values
                          ?.at(0)
                          ?.replace("%", "") || ""
                  }
                  onChange={(e) => handleCitySearch(e)}
                />
                {/* <Select
                  value="countries"
                  className="countries"
                  options={countries}
                  placeholder="Select country"
                  formatOptionLabel={(country) => (
                    <div className="country-option">
                      <img src={country.image} alt={country.value} />
                    </div>
                  )}
                /> */}
                {/* <select placeholder="Select country" name="country" 
                 onClick={() => {
                  setShowChangeCountry(!showChangeCountry);
                  setShowCountryList(false);
                }}
                >
                  <option className="country-option">Select Country</option>
                  {countries?.map((item) => (
                    <option className="country-option" value={item.value}>{item?.value}</option>
                  ))}
                </select> */}
              <input type="button" value="Select country" className=""  onClick={() => {
                          setShowChangeCountry(!showChangeCountry);
                          setShowCountryList(false);
                        }} style={{
                          borderRadius:'5px',
                        }}/>
                
                {showChangeCountry && (
                    <div className="change-country-container">
                      <div className="change-country-header">
                        <div className="d-flex justify-content-between pr-4 items-center">
                          <h5>Choose Language & Country</h5>
                          <p className="cursor-pointer" onClick={() => { setShowChangeCountry(false); setShowcountryPopup(false); setShowCountryList(false); }}><AiOutlineClose /></p>

                        </div>
                        <p className="text-center font-size">In which country are you looking for an assignment</p>
                        <div>
                          <input type="submit" className="country-input"
                           value={selectCountry} onClick={() => { setShowcountryPopup(!showcountryPopup); setShowCountryList(false); }} />
                        </div>
                        <p className="text-align-center  font-size mt-4">Choose your language</p>
                        <div>
                          <input type="button" className="country-input" value={country} onClick={() => { setShowCountryList(!showCountryList); setShowcountryPopup(false); }} />
                        </div>
                        {showcountryPopup && (
                          <div
                            style={{
                              height: "320px",
                              position: "absolute",
                              right: "-310px",
                              backgroundColor: "white",
                              top: "0",
                              width: "300px",
                              zIndex: "999",
                              overflowY: showcountryPopup ? "scroll" : "hidden",
                              overflowX: "hidden",
                            }}
                          >
                            <ul className="countries_list">
                              <li value="India" onClick={() => {
                                setSelectCountry("India");
                                setShowcountryPopup(false);
                              }}>

                                <p>India</p>
                              </li >
                              <li value="Nederland" onClick={() => {
                                setSelectCountry("Nederland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Nederland</p>
                              </li>
                              <li value="Duitsland" onClick={() => {
                                setSelectCountry("Duitsland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Duitsland</p>
                              </li>
                              <li value="UK" onClick={() => {
                                setSelectCountry("UK");
                                setShowcountryPopup(false);
                              }}>
                                <p>UK</p>
                              </li>
                              <li value="België" onClick={() => {
                                setSelectCountry("België");
                                setShowcountryPopup(false);
                              }}>
                                <p>België</p>
                              </li>
                              <li value="Portugal" onClick={() => {
                                setSelectCountry("Portugal");
                                setShowcountryPopup(false);
                              }}>
                                <p>Portugal</p>
                              </li>
                              <li value="Spanje" onClick={() => {
                                setSelectCountry("Spanje");
                                setShowcountryPopup(false);
                              }}>
                                <p>Spanje</p>
                              </li>
                              <li value="Frankrijk" onClick={() => {
                                setSelectCountry("Frankrijk");
                                setShowcountryPopup(false);
                              }}>
                                <p>Frankrijk</p>
                              </li>
                              <li value="Italie" onClick={() => {
                                setSelectCountry("Italie");
                                setShowcountryPopup(false);
                              }}>
                                <p>Italie</p>
                              </li>
                              <li value="Oostenrijk" onClick={() => {
                                setSelectCountry("Oostenrijk");
                                setShowcountryPopup(false);
                              }}>
                                <p>Oostenrijk</p>
                              </li>
                              <li value="Polen" onClick={() => {
                                setSelectCountry("Polen");
                                setShowcountryPopup(false);
                              }}>
                                <p>Polen</p>
                              </li>
                              <li value="Tsjechië" onClick={() => {
                                setSelectCountry("Tsjechië");
                                setShowcountryPopup(false);
                              }}>
                                <p>Tsjechië</p>
                              </li>
                              <li value="Slovenië" onClick={() => {
                                setSelectCountry("Slovenië");
                                setShowcountryPopup(false);
                              }}>
                                <p>Ierland</p>
                              </li>
                              <li value="Denemarken" onClick={() => {
                                setSelectCountry("Denemarken");
                                setShowcountryPopup(false);
                              }}>
                                <p>Denemarken</p>
                              </li>
                              <li value="Slowakije" onClick={() => {
                                setSelectCountry("Slowakije");
                                setShowcountryPopup(false);
                              }}>
                                <p>Slowakije</p>
                              </li>
                              <li value="Hongarije" onClick={() => {
                                setSelectCountry("Hongarije");
                                setShowcountryPopup(false);
                              }}>
                                <p>Hongarije</p>
                              </li>
                              <li value="Roemenie" onClick={() => {
                                setSelectCountry("Roemenie");
                                setShowcountryPopup(false);
                              }}>
                                <p>Roemenie</p>
                              </li>
                              <li value="Bulgarije" onClick={() => {
                                setSelectCountry("Bulgarije");
                                setShowcountryPopup(false);
                              }}>
                                <p>Griekenland</p>
                              </li>
                              <li value="Zweden" onClick={() => {
                                setSelectCountry("Zweden");
                                setShowcountryPopup(false);
                              }}>
                                <p>Zweden</p>
                              </li>
                              <li value="Noorwegen" onClick={() => {
                                setSelectCountry("Noorwegen");
                                setShowcountryPopup(false);
                              }}>
                                <p>Noorwegen</p>
                              </li>
                              <li value="Finland" onClick={() => {

                                setSelectCountry("Finland");
                                setShowcountryPopup(false);
                              }}>

                                <p>Finland</p>
                              </li>
                              <li value="Litouwen" onClick={() => {
                                setSelectCountry("Litouwen");
                                setShowcountryPopup(false);
                              }}>

                                <p>Litouwen</p>
                              </li>
                              <li value="Letland" onClick={() => {
                                setSelectCountry("Letland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Letland</p>
                              </li>
                              <li value="Estland" onClick={() => {
                                setSelectCountry("Estland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Estland</p>
                              </li>
                              <li value="Zwitserland" onClick={() => {
                                setSelectCountry("Zwitserland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Zwitserland</p>
                              </li>
                              <li value="Luxemburg" onClick={() => {
                                setSelectCountry("Luxemburg");
                                setShowcountryPopup(false);
                              }}>
                                <p>Luxemburg</p>
                              </li>
                              <li value="Ijsland" onClick={() => {
                                setSelectCountry("Ijsland");
                                setShowcountryPopup(false);
                              }}>

                                <p>Ijsland</p>
                              </li>
                              <li value="Kroatie" onClick={() => {
                                setSelectCountry("Kroatie");
                                setShowcountryPopup(false);
                              }}>
                                <p>Kroatie</p>
                              </li>
                              <li value="Servië" onClick={() => {
                                setSelectCountry("Servië");
                                setShowcountryPopup(false);
                              }}>
                                <p>Servië</p>
                              </li>
                              <li value="Macedonië" onClick={() => {
                                setSelectCountry("Macedonië");
                                setShowcountryPopup(false);
                              }}>
                                <p>Macedonië</p>
                              </li>
                              <li value="Bosnië en Herzegovina" onClick={() => {
                                setSelectCountry("Bosnië en Herzegovina");
                                setShowcountryPopup(false);
                              }}>
                                <p>Bosnië en Herzegovina</p>
                              </li>
                              <li value="Montenegro" onClick={() => {
                                setSelectCountry("Montenegro");
                                setShowcountryPopup(false);
                              }}>
                                <p>Montenegro</p>
                              </li>
                              <li value="Kosovo" onClick={() => {
                                setSelectCountry("Kosovo");
                                setShowcountryPopup(false);
                              }}>
                                <p>Kosovo</p>
                              </li>
                              <li value="Rusland" onClick={() => {
                                setSelectCountry("Rusland");
                                setShowcountryPopup(false);
                              }}>
                                <p>Rusland</p>
                              </li>
                              <li value="Turkije" onClick={() => {
                                setSelectCountry("Turkije");
                                setShowcountryPopup(false);
                              }}>
                                <p>Turkije</p>
                              </li>
                              <li value="China" onClick={() => {
                                setSelectCountry("China");
                                setShowcountryPopup(false);
                              }}>
                                <p>China</p>
                              </li>
                              <li value="Japan" onClick={() => {
                                setSelectCountry("Japan");
                                setShowcountryPopup(false);
                              }}>
                                <p>Japan</p>
                              </li>
                              <li value="Pakistan" onClick={() => {
                                setSelectCountry("Pakistan");
                                setShowcountryPopup(false);
                              }}>
                                <p>Pakistan</p>
                              </li>
                              <li value="Zuid-Korea" onClick={() => {
                                setSelectCountry("Zuid-Korea");
                                setShowcountryPopup(false);
                              }}>
                                <p>Zuid-Korea</p>
                              </li>
                              <li value="Vietman" onClick={() => {
                                setSelectCountry("Vietman");
                                setShowcountryPopup(false);
                              }}>
                                <p>Vietman</p>
                              </li>
                              <li value="UAE" onClick={() => {
                                setSelectCountry("UAE");
                                setShowcountryPopup(false);
                              }}>
                                <p>UAE</p>
                              </li>
                              <li value="Saudi arabia" onClick={() => {
                                setSelectCountry("Saudi arabia");
                                setShowcountryPopup(false);
                              }}>
                                <p>Saudi arabia</p>
                              </li>
                              <li value="Iran" onClick={() => {
                                setSelectCountry("Iran");
                                setShowcountryPopup(false);
                              }}>
                                <p>Irak</p>
                              </li>
                              <li value="Quatar" onClick={() => {
                                setSelectCountry("Quatar");
                                setShowcountryPopup(false);
                              }}>
                                <p>Quatar</p>
                              </li>
                              <li value="Brazilie" onClick={() => {
                                setSelectCountry("Brazilie");
                                setShowcountryPopup(false);
                              }}>
                                <p>Brazilie</p>
                              </li>
                              <li value="Bolivia" onClick={() => {
                                setSelectCountry("Bolivia");
                                setShowcountryPopup(false);
                              }}>
                                <p>Bolivia </p>
                              </li>
                              <li value="Argentinie" onClick={() => {
                                setSelectCountry("Argentinie");
                                setShowcountryPopup(false);
                              }}>
                                <p>Argentina</p>
                              </li>
                              <li value="Chile" onClick={() => {
                                setSelectCountry("Chile");
                                setShowcountryPopup(false);
                              }}>
                                <p>Chile</p>
                              </li>
                              <li value="USA" onClick={() => {
                                setSelectCountry("USA");
                                setShowcountryPopup(false);
                              }}>
                                <p>USA</p>
                              </li>
                              <li value="Colombia" onClick={() => {
                                setSelectCountry("Colombia");
                                setShowcountryPopup(false);
                              }}>
                                <p>Colombia</p>
                              </li>
                              <li value="Peru" onClick={() => {
                                setSelectCountry("Peru");
                                setShowcountryPopup(false);
                              }}>
                                <p>Peru</p>
                              </li>
                              <li value="Venezuela" onClick={() => {
                                setSelectCountry("Venezuela");
                                setShowcountryPopup(false);
                              }}>
                                <p>Venezuela</p>
                              </li>
                              <li value="Paraguay" onClick={() => {
                                setSelectCountry("Paraguay");
                                setShowcountryPopup(false);
                              }}>
                                <p>Paraguay</p>
                              </li>
                              <li value="Uruguay" onClick={() => {
                                setSelectCountry("Uruguay");
                                setShowcountryPopup(false);
                              }}>
                                <p>Uruguay</p>
                              </li>
                              <li value="Mexico" onClick={() => {
                                setSelectCountry("Mexico");
                                setShowcountryPopup(false);
                              }}>
                                <p>Mexico</p>
                              </li>
                              <li value="Australia" onClick={() => {
                                setSelectCountry("Australia");
                                setShowcountryPopup(false);
                              }}>
                                <p>Australia</p>
                              </li>
                              <li value="Morocco" onClick={() => {
                                setSelectCountry("Morocco");
                                setShowcountryPopup(false);
                              }}>
                                <p>Morocco</p>
                              </li>
                              <li value="Algeria" onClick={() => {
                                setSelectCountry("Algeria");
                                setShowcountryPopup(false);
                              }}>
                                <p>Algeria</p>
                              </li>
                              <li value="Libya" onClick={() => {
                                setSelectCountry("Libya");
                                setShowcountryPopup(false);
                              }}>
                                <p>Libya</p>
                              </li>
                              <li value="Egypt" onClick={() => {
                                setSelectCountry("Egypt");
                                setShowcountryPopup(false);
                              }}>
                                <p>Egypt</p>
                              </li>
                              <li value="South Africa" onClick={() => {
                                setSelectCountry("South Africa");
                                setShowcountryPopup(false);
                              }}>
                                <p>South Africa</p>
                              </li>
                              <li value="Tunisia" onClick={() => {
                                setSelectCountry("Tunisia");
                                setShowcountryPopup(false);
                              }}>
                                <p>Tunisia</p>
                              </li>

                            </ul>
                          </div>
                        )}
                        {showCountryList && (
                          <div
                            style={{
                              height: "100px",
                              position: "absolute",
                              right: "-304px",
                              top: "164px",
                              backgroundColor: "white",
                              width: "300px",
                              zIndex: "999",
                              overflowY: showCountryList ? "scroll" : "hidden",
                              overflowX: "hidden",
                            }}
                          >
                            <ul className="countries_list">

                              <li
                                onClick={() =>
                                  changeCountryHandler(
                                    "dutch",
                                    "/images/netherland_flag.png",
                                    "www.curant.nl"
                                  )
                                }
                              >
                                <img src="/images/netherland_flag.png" alt="" />
                                <p>Netherlands - NL</p>
                              </li>
                              <li
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
                              </li>
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
                <select
                  name="distance"
                  id=""
                  onChange={(e) => {
                    if (e.target.value === 0) {
                      if (searchProjects) {
                        searchHandler(
                          false,
                          "job_name",
                          "like ",
                          info.current?.assignment?.job_name?.values
                        );
                      } else {
                        searchHandler(false, "user_name", "like ", "");
                      }
                    } else {
                      if (searchProjects) {
                        info.current.assignment.radius.values = e.target.value;
                      } else {
                        info.current.freelancer.radius.values = e.target.value;
                      }
                      handleCitySearch({
                        target: {
                          value: searchProjects
                            ? info.current?.assignment?.province?.values
                                ?.at(0)
                                ?.replace("%", "")
                            : info.current?.freelancer?.city?.values
                                ?.at(0)
                                ?.replace("%", ""),
                        },
                      });
                    }
                  }}
                >
                  <option
                    value={0}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      0
                    }
                  >
                    All
                  </option>
                  <option
                    value={5}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      5
                    }
                  >
                    {"<"} 5 km{" "}
                  </option>
                  <option
                    value={10}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      10
                    }
                  >
                    {"<"}10 km
                  </option>
                  <option
                    value={20}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      20
                    }
                  >
                    {"<"}20 km
                  </option>
                  <option
                    value={30}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      30
                    }
                  >
                    {"<"}30 km
                  </option>
                  <option
                    value={40}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      40
                    }
                  >
                    {"<"}40 km
                  </option>
                  <option
                    value={50}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      50
                    }
                  >
                    {"<"}50 km
                  </option>
                  <option
                    value={60}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      60
                    }
                  >
                    {"<"}60 km
                  </option>
                  <option
                    value={70}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      70
                    }
                  >
                    {"<"}70 km
                  </option>
                  <option
                    value={80}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      80
                    }
                  >
                    {"<"}80 km
                  </option>
                  <option
                    value={90}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      90
                    }
                  >
                    {"<"}90 km
                  </option>
                  <option
                    value={100}
                    selected={
                      (searchProjects
                        ? parseInt(info.current?.assignment?.radius?.values)
                        : parseInt(info.current?.freelancer?.radius?.values)) ==
                      100
                    }
                  >
                    {"<"}100 km
                  </option>
                </select>
                <button
                  className="search_methods_seek"
                  onClick={() => {
                    searchHandler(
                      false,
                      searchProjects ? "job_name" : "profession",
                      "like ",
                      searchProjects
                        ? info.current?.assignment?.job_name?.values
                        : info.current?.freelancer?.profession?.values
                    );
                  }}
                >
                  Seek
                </button>
                <AiOutlineInfoCircle
                  title={`Choose the location and \n maximum radius where you \n want to search the ${
                    !freelancer ? "assignments" : "freelancers"
                  }`}
                />
              </div>
            </div>
          )
        }
      </div>
      <div className="search_methods_user_links">
        {user_info.user.token &&
          (user_info.user?.account_type === "freelancer" ? (
            <>
              <div>
                <Link to="/dashboard/my-assignement-alerts">
                  My assignement alerts
                </Link>
                <Link to="/saved-profiles" state={{ freelancer: true }}>
                  Saved assignments
                </Link>
                <Link to="/my-applications">My applications</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/saved-profiles" state={{ freelancer }}>
                  Saved profiles freelancers
                </Link>
                <Link to="/view-invitations">Overview invitations</Link>
              </div>
            </>
          ))}
        {user_info.user?.token && (
          <div>
            <Link to="/dashboard/assignement-alerts">
              <BsBell />
              Set up assignment alert
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
