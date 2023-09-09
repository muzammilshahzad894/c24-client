import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import { useDropzone } from "react-dropzone";
import { MdDone } from "react-icons/md";
import { IoIosAdd, IoIosCloseCircle } from "react-icons/io";
import "./loading-rocket.scss";
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaEuroSign } from "react-icons/fa";
import { BsFillCheckCircleFill, BsTrashFill } from "react-icons/bs";
import { lang } from "../../languages_data";
import ReactDOM from "react-dom";
import "./placeCall.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  add_assignement_action,
  getPersonalInfo,
  get_all_competencies_action,
  get_client_orga_action,
  get_locations_action,
  set_assignement_action,
  set_lang_action,
} from "../../state/Actions/UserAction";
import countries from "./country-states.json";
//import all_cities from './cities.json'
import { SelectDatepicker } from "react-select-datepicker";
import LangSelect from "../../components/LangSelect/LangSelect";
import all_cities from "./worldcities.json";
import { IoAddOutline } from "react-icons/io5";
import LoadingRocket from "../../components/LoadingBox/Loading-rocket";

export default function PlaceCall() {
  const user_info = useSelector((state) => state.user_info);
  const get_client_orga = useSelector((state) => state.get_client_orga);
  const add_assignement = useSelector((state) => state.add_assignement);
  const set_assignement = useSelector((state) => state.set_assignement);
  const get_locations = useSelector((state) => state.get_locations);
  const get_personal = useSelector((state) => state.get_personal);
  const set_lang = useSelector((state) => state.set_lang);
  const location = useLocation();
  const progressRef = useRef([]);
  const skillsRef = useRef();
  const required_cert_ref = useRef();
  const linkRef = useRef();
  const addOptionRef = useRef();
  const [addedOptions, setAddedOptions] = useState([]);
  const [AssignmentModified, setAssignmentModified] = useState(false);
  const [
    can_this_assignement_be_carried_out_continously,
    setCan_this_assignement_be_carried_out_continously,
  ] = useState(
    location.state?.data &&
      (location.state?.data?.at(0)
        ?.can_this_assignement_be_carried_out_continously ||
        "")
  );
  const [childCare, setChildCare] = useState(
    location.state?.data && (location.state?.data?.at(0)?.industry || "")
  );
  let infoRef = useRef({
    price_type: "Asking price",
    what_may_be_charged: [],
    payements_term: "30 days",
    working_days: [],
    working_hours: "",
    assignement_on_location: "In consultation",
  });
  const [i, setI] = useState(0);
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState(
    location.state?.data?.at(0)?.province || ""
  );
  const [skills, setSkills] = useState(
    [
      ...new Set(
        location?.state?.data?.at(0)?.skills?.map((item) => item?.skill)
      ),
    ] || []
  );
  const [required_cert, setRequired_cert] = useState(
    [
      ...new Set(
        location?.state?.data
          ?.at(0)
          ?.certificates?.map((item) => item?.certificate)
      ),
    ] || []
  );
  const showAddOptionRef = useRef();
  const [priceType, setPriceType] = useState("Asking price");
  const [toggler, setToggler] = useState(
    location.state?.data && location.state?.data?.at(0)?.start_asap === 1
  );
  const [checked_comp, setChecked_comp] = useState(
    location.state?.data ? location.state?.data?.at(0)?.checked_comp : []
  );
  const [start_date, setStart_date] = useState(
    location.state?.data
      ? new Date(location.state?.data?.at(0).starting_date)
      : new Date()
  );
  const [deadline, setDeadline] = useState(
    location.state?.data
      ? new Date(location.state?.data?.at(0).deadline)
      : new Date()
  );
  //state to know if we modify the assignement or not
  const [modify, setModify] = useState(
    location.state?.data
      ? {
          state: location.state !== null,
          assignement_id: location.state?.data?.at(0)?.id,
        }
      : {}
  );
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2020);
  const [projectDay, setProjectDay] = useState(1);
  const [projectMonth, setProjectMonth] = useState(1);
  const [projectYear, setProjectYear] = useState(2020);
  const [startingDateRadio, setStartingDateRadio] = useState(false);
  const [ProjectEndTimeOrEstimation, setProjectEndTimeOrEstimation] =
    useState(false);
  const [showReqCertInput, setShowReqCertInput] = useState(false);
  const [showEuroSign, SetshowEuroSign] = useState(true);
  const [error, setError] = useState(null);
  const get_lang = useSelector((state) => state.get_lang);
  const langRef = useRef({ lang: [], level: [] });
  const divRef = useRef([]);
  const [J, setJ] = useState(location.state?.data?.at(0)?.fav_lang ? 0 : 1);

  //country select
  const countrySelect = useRef([]);
  const province = useRef([]);
  useEffect(() => {
    for (const [key, item] of Object.entries(countries.country)) {
      countrySelect.current.push({ key, item });
    }
    for (const [key, item] of Object.entries(countries.states)) {
      province.current.push({ key, item });
    }
  }, []);

  if (location.state?.data?.at(0)) {
    location.state.data.at(0).working_days = [
      ...new Set(location.state?.data?.at(0)?.days?.map((item) => item.day)),
    ];
    //location.state.data.at(0).what_may_be_charged = [...new Set(location?.state?.data?.at(0)?.what_may_be_charged?.map(item=>item?.what_may_be_charged))]
  }
  const onDateChange = (e) => {
    setStart_date(new Date(e?.target?.value));
  };
  const onDeadlineDateChange = (e) => {
    setDeadline(new Date(e?.target?.value));
  };

  const dispatch = useDispatch();
  const get_all_competencies = useSelector(
    (state) => state.get_all_competencies
  );

  const all_comp = get_all_competencies.competencies
    ? get_all_competencies.competencies
    : [];

  //upload file variables preview size name
  const [files, setFiles] = useState(
    [
      ...new Set(
        location.state?.data
          ?.at(0)
          ?.files?.map((item) => ({
            preview: item?.file,
            name: item?.file?.split("/")[2],
            size: 1000000,
          }))
          .map((item) => item.preview)
      ),
    ] || []
  );
  const [filesToDelete, setFilesToDelete] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".pdf"],
    },
    maxSize: 15728640,
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      ]);
    },
  });

  useEffect(() => {
    if (files.length > 0 && typeof files[0] === "string") {
      setFiles(
        files.map((item) => ({
          preview: item,
          name: item.split("/")[2],
          size: 1000000,
        }))
      );
    }
  }, [files]);

  useEffect(() => {
    progressRef.current[0].classList.add("activated");
    dispatch(get_all_competencies_action());
    dispatch(get_locations_action(user_info.user.token));
    dispatch(getPersonalInfo(user_info.user.token));
  }, [dispatch, user_info.user.token]);

  console.log(location.state?.data?.at(0));

  useEffect(() => {
    if (add_assignement.data || AssignmentModified) {
      let info = { data: [] };
      for (let i = 0; i < langRef.current?.lang?.length; i++) {
        info.data.push({
          lang: langRef.current.lang[i]?.value,
          level: langRef.current.level[i]?.value,
        });
      }
      if (AssignmentModified) {
        info.assignement_id = location.state?.data?.at(0).id;
        info.update = true;
      } else {
        info.assignement_id = add_assignement.data;
      }
      dispatch(set_lang_action(info, user_info.user.token));
    }
  }, [
    AssignmentModified,
    add_assignement,
    dispatch,
    location.state?.data,
    user_info.user.token,
  ]);

  useEffect(() => {
    const countryKey = countrySelect.current.find(
      (item) => item.key === country
    )?.item;
    console.log(countryKey);
    let arr = [];
    /*for(const [key,value] of Object.entries(all_cities)){
            if(key===countryKey){
                arr = value;
            }
        }*/
    console.log(province);
    arr = all_cities.filter(
      (item) =>
        item.admin_name === provinceSelect || item.city_ascii === provinceSelect
    );
    console.log(arr);
    arr = arr
      .map((item) => item.city)
      ?.filter((item) => item !== provinceSelect);
    console.log(arr);
    console.log(arr);
    setCities(arr);
    if (infoRef.current["place"]) {
      infoRef.current["place"].value = "";
    }
  }, [country, provinceSelect]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i]);

  useEffect(() => {
    dispatch(get_client_orga_action(user_info.user.token));
  }, [user_info.user.token, dispatch]);

  const addSkillHandler = () => {
    if (skillsRef.current.value.length > 0) {
      setSkills([...skills, skillsRef.current.value]);
      skillsRef.current.value = "";
    }
  };

  //redirecting user after adding assignement successfully
  useEffect(() => {
    if (set_lang.data) {
      add_assignement.data = null;
      set_lang.data = null;
      document.getElementById("postimghidden").style.display = "flex";
      setTimeout(() => {
        linkRef.current.click();
      }, 2000);
    }
  }, [add_assignement, set_lang]);

  useEffect(() => {
    infoRef.current.checked_comp = checked_comp;
  }, [checked_comp]);

  const removeSkillHandler = (id) => {
    setSkills(skills.filter((item, key) => key !== id));
  };

  const addRequiredCertHandler = (item) => {
    if (item !== "select a document type") {
      if (item === "other") {
        setShowReqCertInput(true);
      } else {
        //setShowReqCertInput(false)
        required_cert_ref.current && (required_cert_ref.current.value = "");
        setRequired_cert([...required_cert, item]);
      }
    }
  };
  const removeFile = (index) => {
    setFilesToDelete([
      ...filesToDelete,
      files.find((item, key) => index === key),
    ]);
    setFiles(files.filter((item, key) => index !== key));
  };
  const removeRequiredCertHandler = (id) => {
    setRequired_cert(required_cert.filter((item, key) => key !== id));
  };

  const progressBarHandler = (n = 1) => {
    progressRef.current = [...new Set(progressRef.current)];
    let j = i;
    setError(null);
    if (n > 0) {
      if (i === 0) {
        if (infoRef.current["pay_type"]?.length > 0) {
          setI(i + n);
          j = i + n;
        }
      } else if (i === 1) {
        if (
          infoRef.current["job_name"].value?.length > 0 &&
          start_date.getDate() > 0 &&
          infoRef.current["contact_person"]?.length > 0 &&
          infoRef.current["assignement_on_location"]?.length > 0 &&
          country.length > 0 &&
          provinceSelect.length > 0 &&
          infoRef.current["place"].value?.length > 0 &&
          infoRef.current["relationship_with_client"]?.length > 0 &&
          infoRef.current.working_days?.length > 0 &&
          infoRef.current.working_hours?.length > 0
        ) {
          setI(i + n);
          j = i + n;
        } else {
          setError("Pleae note, you must fill in all fields marked with * ");
        }
      } else if (i === 2) {
        if (
          infoRef.current["industry"]?.length > 0 &&
          infoRef.current["description_of_activities"]?.value?.length > 0 &&
          ((infoRef.current[
            "can_this_assignement_be_carried_out_continously"
          ] === "no" &&
            infoRef.current["description_construction_stop"].value.length >
              0) ||
            infoRef.current[
              "can_this_assignement_be_carried_out_continously"
            ] === "yes")
        ) {
          setI(i + n);
          j = i + n;
        } else {
          setError("Pleae note, you must fill in all fields marked with * ");
        }
      } else if (i === 3) {
        document.getElementById("loderhidden").style.display = "flex";

        setTimeout(() => {
          if (
            infoRef.current["payements_term"]?.length > 0 &&
            infoRef.current["what_may_be_charged"]?.length > 0 &&
            infoRef.current["currency"]?.length > 0
          ) {
            /*&& infoRef.current["other"].length>0*/
            if (infoRef.current["pay_type"].includes("pay per piece")) {
              if (
                infoRef.current["price_per_piece"]?.value?.length > 0 ||
                infoRef.current["opening_price"]?.value?.length > 0
              ) {
                save_job();
              } else {
                setError(
                  "Pleae note, you must fill in all fields marked with * "
                );
              }
            }
            if (infoRef.current["pay_type"].includes("pay per hour")) {
              console.log("here");
              if (
                infoRef.current["hourly_wage"]?.value?.length > 0 ||
                (infoRef.current["hourly_wage_from"]?.value?.length > 0 &&
                  infoRef.current["hourly_wage_to"]?.value?.length > 0)
              ) {
                save_job();
              } else {
                setError(
                  "Pleae note, you must fill in all fields marked with * "
                );
              }
            }
          } else {
            setError("Pleae note, you must fill in all fields marked with * ");
          }
        }, 4000);
      }
    } else {
      setI(i + n);
      j = i + n;
      if (skillsRef.current) {
        skillsRef.current.value = "";
      }
    }
    progressRef.current.map((item, index) => {
      if (index === j) {
        item.classList.remove("done");
        item.classList.add("activated");
      }
      if (index < j) {
        item.classList.remove("activated");
        item.classList.add("done");
        ReactDOM.render(<MdDone />, item.children[0].childNodes[0]);
      }
      if (index > j) {
        item.classList.remove("activated");
        item.classList.remove("done");
        item.children[0].childNodes[0].innerHTML = "";
      }
      return item;
    });
  };
  const handle_competence = (e) => {
    checked_comp.push(parseInt(e.target.value));
    setChecked_comp([...new Set(checked_comp)]);
  };
  //delete language row
  const deleteLang = (elt, idx) => {
    console.log(location);
    setJ(J - 1);
    if (location?.state?.data?.at(0)?.fav_lang) {
      location.state.data.at(0).fav_lang = location.state.data
        .at(0)
        .fav_lang.filter((item) => item?.lang !== elt?.lang);
    }

    langRef.current.level = langRef.current.level.filter(
      (item, id) => id !== idx
    );
    langRef.current.lang = langRef.current.lang.filter(
      (item, id) => id !== idx
    );
  };
  console.log(J);
  //handling what may be charged input
  const checkboxHandler = (e) => {
    if (e.target.checked) {
      infoRef.current.what_may_be_charged.push(e.target.value);
    } else {
      infoRef.current.what_may_be_charged =
        infoRef.current.what_may_be_charged.filter(
          (item) => item !== e.target.value
        );
    }
  };
  //saving the data
  const save_job = () => {
    const data = {};
    let formdata = new FormData();
    for (const [key, item] of Object.entries(infoRef.current)) {
      if (item) {
        data[key] = item.value || item.checked || item;
      }
    }
    data.country = countries.country[country];
    data.province = provinceSelect;
    data.hourly_wage_from =
      data.hourly_wage_from && data.hourly_wage_from.length > 0
        ? data.hourly_wage_from
        : data.hourly_wage;
    data.hourly_wage_to =
      data.hourly_wage_to && data.hourly_wage_to.length > 0
        ? data.hourly_wage_to
        : data.hourly_wage;
    data.starting_date = toggler ? new Date() : start_date;
    data.deadline = deadline;
    data.skills = skills;
    data.required_certificates = required_cert;
    data.start_asap = toggler;
    console.log(data);
    formdata.append("info", JSON.stringify(data));
    files.map((file, index) => {
      formdata.append("file" + index, file);
      return index;
    });
    if (modify.state) {
      data.files_to_delete = filesToDelete;
      formdata.set("info", JSON.stringify(data));
      dispatch(
        set_assignement_action(
          formdata,
          location.state?.data?.at(0).assignement_id ||
            location.state?.data?.at(0).id,
          user_info.user.token
        )
      );
    } else {
      dispatch(add_assignement_action(formdata, user_info.user.token));
    }
  };
  useEffect(() => {
    if (location.state?.data) {
      infoRef.current.pay_type = location.state?.data?.at(0)?.pay_type;
      progressBarHandler();
      setCountry(
        countrySelect.current?.find(
          (item) => item.item === location.state?.data?.at(0)?.country
        )?.key
      );
      for (const [key, value] of Object.entries(location.state?.data?.at(0))) {
        if (infoRef.current[key]?.defaultValue === undefined) {
          infoRef.current[key] = value;
        }
      }
      infoRef.current["working_days"].push(location.state?.data?.at(0).day);
      infoRef.current["what_may_be_charged"] = location.state?.data
        ?.at(0)
        .what_may_be_charged?.map((item) => item?.what_may_be_charged);
      if (typeof infoRef.current["what_may_be_charged"][0] !== "string") {
        infoRef.current["what_may_be_charged"].shift();
      }
      setAddedOptions(
        infoRef.current["what_may_be_charged"].filter(
          (item) =>
            item !== "KM allowance - 0.19 per KM" &&
            item !== "Parking costs (with copy of receipt) " &&
            item !== "Consumables" &&
            item !== "Tarief is all-in"
        )
      );
    }
  }, []);
  console.log(location.state);
  console.log(infoRef.current["what_may_be_charged"]);
  useEffect(() => {
    if (AssignmentModified) {
      setModify({ assignement_id: location.state?.data?.at(0).assignement_id });
      linkRef.current.click();
    }
  }, [add_assignement, location.state?.data, AssignmentModified]);

  useEffect(() => {
    if (set_assignement.data !== undefined) {
      set_assignement.data = undefined;
      setAssignmentModified(true);
    }
  }, [set_assignement]);

  if (get_personal.user?.account_type === "freelancer") {
    return <Navigate to="/dashboard" />;
  }
  console.log(infoRef.current["currency"]);
  return add_assignement.loading ? (
    <LoadingRocket big />
  ) : (
    <div className="place-call">
      <DashboardBar />
      <div className="place-call-content">
        <div className="place-call-header">
          <h1>PLACE ASSIGNEMENT</h1>
          <div className="place-call-progress-bar">
            <div
              className="place-call-progress-item"
              ref={(ref) => ref !== null && progressRef.current.push(ref)}
            >
              <div>
                <span></span>
              </div>
            </div>
            <div
              className="place-call-progress-item"
              ref={(ref) => ref !== null && progressRef.current.push(ref)}
            >
              <div>
                <span></span>
              </div>
            </div>
            <div
              className="place-call-progress-item"
              ref={(ref) => ref !== null && progressRef.current.push(ref)}
            >
              <div>
                <span></span>
              </div>
            </div>
            <div
              className="place-call-progress-item"
              ref={(ref) => ref !== null && progressRef.current.push(ref)}
            >
              <div>
                <span></span>
              </div>
            </div>
          </div>
          <div className="place-call-progress-bar-labels">
            <div className="place-call-progress-label">
              <p>Choose Type</p>
            </div>
            <div className="place-call-progress-label">
              <p>Make an assignement</p>
            </div>
            <div className="place-call-progress-label">
              <p>Activities</p>
            </div>
            <div className="place-call-progress-label">
              <p>Cost</p>
            </div>
          </div>
        </div>
        <div className="place-call-info">
          {error && (
            <div className="error-place-call">
              <p>
                Please note, you must fill in all <br />
                fields marked with *
              </p>
              <AiFillCloseCircle onClick={() => setError(null)} />
            </div>
          )}
          {i === 0 ? (
            <>
              <div className="two-types-place-call-header">
                <h3>Choose an assignement type</h3>
                <span>what kind of order do you want to place</span>
              </div>
              <div className="twoTypes">
                <div
                  className="pay-per-hour"
                  onClick={() => {
                    infoRef.current["pay_type"] = "pay per hour";
                    progressBarHandler();
                  }}
                >
                  <img src="/images/logo.png" alt="" />
                  <h1>Pay per hour</h1>
                  <Link to="">create assignement on hourly basis</Link>
                </div>
                <div
                  className="pay-per-piece"
                  onClick={() => {
                    infoRef.current["pay_type"] = "pay per piece";
                    progressBarHandler();
                  }}
                >
                  <img src="/images/logo.png" alt="" />
                  <h1>Pay per piece</h1>
                  <Link to="">Create an order with unit prices.</Link>
                </div>
              </div>
            </>
          ) : i === 1 ? (
            <>
              <div className="place-call-info-first-page-header">
                <h3>What is the assignement about?</h3>
              </div>
              <div className="place-call-info-first-page-form">
                <div className="row vestiging">
                  <p>Location</p>
                  <div className="vestiging">
                    <select
                      name="vestiging"
                      id=""
                      onChange={(e) =>
                        e.target.value !== "" &&
                        (infoRef.current["vestiging"] = e.target.value)
                      }
                    >
                      <option value="">---------------</option>
                      {get_locations.data?.map((item, index) => (
                        <option
                          selected={
                            item.location ===
                            (location.state?.data?.at(0).vestiging ||
                              infoRef.current["vestiging"])
                          }
                          value={item.location}
                          key={index}
                        >
                          {item.location}
                        </option>
                      ))}
                    </select>
                    <span>
                      Choose the location / departement that applies to the
                      assignement
                    </span>
                  </div>
                </div>
                <div className="row">
                  <p>
                    Assignment name <span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="example: office building"
                    name="job_name"
                    ref={(ref) =>
                      ref !== null && (infoRef.current[ref.name] = ref)
                    }
                    defaultValue={
                      location.state?.data?.at(0)?.job_name ||
                      infoRef.current["job_name"]?.value
                    }
                  />
                </div>
                <div className="row start-asap">
                  <p>
                    Start as soon as possible <span className="red">*</span>
                  </p>

                  <div className="toggler" onClick={() => setToggler(!toggler)}>
                    <span className={`main ${toggler ? "active" : ""}`}>
                      {toggler ? (
                        <BsFillCheckCircleFill
                          style={{
                            color: "green",
                            marginTop: "1px",
                            fontSize: "28px",
                          }}
                        />
                      ) : (
                        <AiFillCloseCircle style={{ color: "red" }} />
                      )}
                    </span>
                  </div>
                </div>
                {!toggler && (
                  <>
                    <div className="row starting_date">
                      <p>
                        Starting date <span className="red">*</span>
                      </p>
                      {/* <div>
                                                    <input type="date" defaultValue={start_date?.toISOString().substring(0,10)} name="start_date"onChange={(e)=>onDateChange(e)} id="" />
                                                </div> */}
                      <div className="starting_date_content">
                        <div
                          className={startingDateRadio ? "row hide-row" : "row"}
                          onClick={() => setStartingDateRadio(false)}
                        >
                          <input
                            type="radio"
                            name="start_date"
                            checked={!startingDateRadio}
                            id=""
                            onChange={() => {
                              setStart_date(new Date());
                            }}
                          />
                          <span>In Consultation</span>
                        </div>
                        <div
                          className={startingDateRadio ? "row" : "row hide-row"}
                          onClick={() => setStartingDateRadio(true)}
                        >
                          <input
                            type="radio"
                            name="start_date"
                            id=""
                            checked={startingDateRadio}
                          />
                          <div>
                            <select
                              name="day"
                              id=""
                              onChange={(e) => {
                                e.target?.value !== "Day" &&
                                  setDay(e.target.value);
                                onDateChange({
                                  target: {
                                    value: year + "-" + month + "-" + day,
                                  },
                                });
                              }}
                            >
                              <option value="Day">Day</option>
                              {Array.from({ length: 31 }, (_, i) =>
                                i + 1 < 10 ? "0" + (i + 1) : i + 1
                              ).map((item) => (
                                <option value={item} selected={item == day}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <select
                              name="Month"
                              id=""
                              onChange={(e) => {
                                e.target?.value !== "Month" &&
                                  setMonth(e.target.value);
                                onDateChange({
                                  target: {
                                    value: year + "-" + month + "-" + day,
                                  },
                                });
                              }}
                            >
                              <option value="Month">Month</option>
                              {Array.from({ length: 12 }, (_, i) =>
                                i + 1 < 10 ? "0" + (i + 1) : i + 1
                              ).map((item) => (
                                <option value={item} selected={month == item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <select
                              name="Year"
                              id=""
                              onChange={(e) => {
                                e.target?.value !== "Year" &&
                                  setYear(e.target.value);
                                onDateChange({
                                  target: {
                                    value: year + "-" + month + "-" + day,
                                  },
                                });
                              }}
                            >
                              <option value="Year">Year</option>
                              {Array.from(
                                { length: 20 },
                                (_, i) => i + 1 + 2021
                              ).map((item) => (
                                <option value={item} selected={item == year}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* <input type="date" placeholder='choose a starting date' name="starting_date" id="" ref={ref=>ref!==null&&(infoRef.current[ref.name]=ref)} /> */}
                    </div>
                    <div className="row starting_date">
                      <p>
                        Assignment end time * <br />
                        Or estimated time
                      </p>
                      <div className="starting_date_content">
                        <div
                          className={
                            ProjectEndTimeOrEstimation ? "row hide-row" : "row"
                          }
                          onClick={() => setProjectEndTimeOrEstimation(false)}
                        >
                          <input
                            type="radio"
                            name="job_duration"
                            checked={!ProjectEndTimeOrEstimation}
                          />
                          <span>Assignment end time</span>
                        </div>
                        <div
                          className={
                            ProjectEndTimeOrEstimation ? "row hide-row" : "row"
                          }
                        >
                          <select
                            name="day"
                            id=""
                            onChange={(e) => {
                              e.target?.value !== "Day" &&
                                setProjectDay(e.target.value);
                              infoRef.current["job_duration"] =
                                projectYear +
                                "-" +
                                projectMonth +
                                "-" +
                                projectDay;
                            }}
                          >
                            <option value="Day">Day</option>
                            {Array.from({ length: 31 }, (_, i) =>
                              i + 1 < 10 ? "0" + (i + 1) : i + 1
                            ).map((item) => (
                              <option
                                value={item}
                                selected={item == projectDay}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          <select
                            name="Month"
                            id=""
                            onChange={(e) => {
                              e.target?.value !== "Month" &&
                                setProjectMonth(e.target.value);
                              infoRef.current["job_duration"] =
                                projectYear +
                                "-" +
                                projectMonth +
                                "-" +
                                projectDay;
                            }}
                          >
                            <option value="Month">Month</option>
                            {Array.from({ length: 12 }, (_, i) =>
                              i + 1 < 10 ? "0" + (i + 1) : i + 1
                            ).map((item) => (
                              <option
                                value={item}
                                selected={item == projectMonth}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          <select
                            name="Year"
                            id=""
                            onChange={(e) => {
                              e.target?.value !== "Year" &&
                                setProjectYear(e.target.value);
                              infoRef.current["job_duration"] =
                                projectYear +
                                "-" +
                                projectMonth +
                                "-" +
                                projectDay;
                            }}
                          >
                            <option value="Year">Year</option>
                            {Array.from(
                              { length: 20 },
                              (_, i) => i + 1 + 2022
                            ).map((item) => (
                              <option
                                value={item}
                                selected={item == projectYear}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          className={
                            !ProjectEndTimeOrEstimation ? "row hide-row" : "row"
                          }
                          style={{ flexDirection: "column" }}
                          onClick={() => setProjectEndTimeOrEstimation(true)}
                        >
                          <div style={{ margin: "10px 0" }}>
                            <input
                              type="radio"
                              name="job_duration"
                              id=""
                              checked={ProjectEndTimeOrEstimation}
                            />
                            <span>Estimated time assignment</span>
                          </div>
                          <select
                            name="job_duration"
                            id=""
                            onChange={(e) =>
                              e.target.value !== "Select a lead time" &&
                              (infoRef.current["job_duration"] = e.target.value)
                            }
                          >
                            <option value="Select a lead time">
                              Select a lead time
                            </option>
                            <option
                              value="<1 month"
                              selected={
                                (location.state?.data?.at(0)?.job_duration ||
                                  infoRef.current["job_duration"]) ===
                                "<1 month"
                              }
                            >
                              {"<"}1 month
                            </option>
                            <option
                              value="1-3 months"
                              selected={
                                (location.state?.data?.at(0)?.job_duration ||
                                  infoRef.current["job_duration"]) ===
                                "1-3 months"
                              }
                            >
                              1-3 months
                            </option>
                            <option
                              value="3-6 months"
                              selected={
                                (location.state?.data?.at(0)?.job_duration ||
                                  infoRef.current["job_duration"]) ===
                                "3-6 months"
                              }
                            >
                              3-6 months
                            </option>
                            <option
                              value=">6 months"
                              selected={
                                location.state?.data?.at(0)?.job_duration ===
                                ">6 months"
                              }
                            >
                              {">"}6 months
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="row deadline">
                  <p>Deadline for registeration</p>
                  <div>
                    <input
                      type="date"
                      name="deadline"
                      defaultValue={deadline?.toISOString().substring(0, 10)}
                      onChange={(e) => onDeadlineDateChange(e)}
                    />
                  </div>
                </div>
                <div className="row">
                  <p>
                    Working days / hours <span className="red">*</span>
                  </p>
                  <div className="working-days-hours">
                    <div className="working-days">
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("monday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "monday"
                            ) !== -1
                          }
                          value="monday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Monday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("tuesday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "tuesday"
                            ) !== -1
                          }
                          value="tuesday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Tuesday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("wednesday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "wednesday"
                            ) !== -1
                          }
                          value="wednesday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Wednesday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("thursday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "thursday"
                            ) !== -1
                          }
                          value="thursday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Thursday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("friday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "friday"
                            ) !== -1
                          }
                          value="friday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Friday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("saturday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "saturday"
                            ) !== -1
                          }
                          value="saturday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Saturday</p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="working_days"
                          defaultChecked={
                            (location.state !== null &&
                              location.state?.data
                                ?.at(0)
                                ?.working_days?.indexOf("sunday") !== -1) ||
                            infoRef.current["working_days"].indexOf(
                              "sunday"
                            ) !== -1
                          }
                          value="sunday"
                          onChange={(e) => {
                            e.target.checked
                              ? infoRef.current["working_days"].push(
                                  e.target.value
                                )
                              : (infoRef.current["working_days"] =
                                  infoRef.current["working_days"].filter(
                                    (item) => item !== e.target.value
                                  ));
                          }}
                        />
                        <p>Sunday</p>
                      </div>
                    </div>
                    <div className="working-hours">
                      <div>
                        <input
                          type="radio"
                          name="working_hours"
                          defaultChecked={
                            location.state?.data?.at(0)?.working_hours ===
                              "fulltime" ||
                            infoRef.current["working_hours"] === "fulltime"
                          }
                          value="fulltime"
                          onClick={(e) =>
                            (infoRef.current["working_hours"] = e.target.value)
                          }
                        />
                        <p>Fulltime</p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="working_hours"
                          defaultChecked={
                            location.state?.data?.at(0)?.working_hours ===
                              "partime" ||
                            infoRef.current["working_hours"] === "partime"
                          }
                          value="partime"
                          onClick={(e) =>
                            (infoRef.current["working_hours"] = e.target.value)
                          }
                        />
                        <p>Parttime</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <p>
                    Contact Person <span className="red">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="contact person"
                    defaultValue={
                      location.state?.data?.at(0).contact_person ||
                      infoRef.current["contact_person"]
                    }
                    onChange={(e) =>
                      (infoRef.current["contact_person"] = e.target.value)
                    }
                  />
                  {/* <select name="contact_person" id="" onChange={(e)=>e.target.value!=="select a contact"&&(infoRef.current["contact_person"] = e.target.value)}>
                                            <option value="select a contact">Select a contact</option>
                                            <option selected={location.state?.data?.at(0)?.contact_person===get_client_orga.data?.orga_name} value={get_client_orga.data&&get_client_orga.data.orga_name}>{get_client_orga.data&&get_client_orga.data.orga_name}</option>
                                        </select> */}
                </div>
                <div className="row" style={{ position: "relative" }}>
                  <div className="location-rows">
                    <div>
                      <p>
                        Assignement on location <span className="red">*</span>
                      </p>
                      <select
                        name="assignement_on_location"
                        onChange={(e) =>
                          (infoRef.current["assignement_on_location"] =
                            e.target.value)
                        }
                      >
                        <option value="In consultation">In consultation</option>
                        <option
                          selected={
                            location.state?.data?.at(0)
                              ?.assignement_on_location === "Yes" ||
                            infoRef.current["assignement_on_location"] === "Yes"
                          }
                          value="Yes"
                        >
                          Yes
                        </option>
                        <option
                          selected={
                            location.state?.data?.at(0)
                              ?.assignement_on_location === "No" ||
                            infoRef.current["assignement_on_location"] === "No"
                          }
                          value="No"
                        >
                          No
                        </option>
                      </select>
                    </div>
                    <div>
                      <p>
                        Country <span className="red">*</span>
                      </p>
                      <select
                        name="country"
                        onChange={(e) => {
                          e.target.value !== "select country ----" &&
                            setCountry(e.target.value);
                        }}
                      >
                        <option value="select country ----">
                          Select country -----
                        </option>
                        {countrySelect.current.map((item, index) => (
                          <option
                            value={item.key}
                            key={index}
                            selected={
                              location.state?.data?.at(0)?.country ===
                                item.item || country === item.key
                            }
                          >
                            {item.item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p>
                        Province <span className="red">*</span>
                      </p>
                      {province.current.find((item) => item.key === country)
                        ?.item.length > 0 ? (
                        <select
                          name="province"
                          onChange={(e) =>
                            e.target.value !== "choose province----" &&
                            setProvinceSelect(e.target.value)
                          }
                        >
                          <option value="choose province----">
                            choose province ----
                          </option>
                          {province.current.map((item) => {
                            if (item.key === country) {
                              return item.item?.map((elt, idx) => {
                                return (
                                  <option
                                    key={idx}
                                    value={elt.name}
                                    selected={
                                      location.state?.data?.at(0)?.province ===
                                        elt.name || provinceSelect === elt.name
                                    }
                                  >
                                    {elt.name}
                                  </option>
                                );
                              });
                            }
                          })}
                        </select>
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter province name"
                          defaultValue={
                            location.state?.data?.at(0)?.province ||
                            provinceSelect
                          }
                          name="province"
                          onChange={(e) => setProvinceSelect(e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <p>
                        Place <span className="red">*</span>
                      </p>
                      <select
                        name="place"
                        style={{ display: cities.length > 0 ? "flex" : "none" }}
                        onChange={(e) => {
                          e.target.value !== "select city ----" &&
                            (infoRef.current["place"].value = e.target.value);
                        }}
                      >
                        <option value="select city ----">
                          Select City -----
                        </option>
                        {cities?.map((item, idx) => (
                          <option
                            value={item}
                            key={idx}
                            selected={
                              location.state?.data?.at(0)?.place === item ||
                              infoRef.current["place"]?.value === item
                            }
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        style={{ display: cities.length > 0 ? "none" : "flex" }}
                        placeholder="enter city name"
                        defaultValue={
                          location.state?.data?.at(0)?.place ||
                          infoRef.current["place"]?.value
                        }
                        name="place"
                        ref={(ref) =>
                          ref !== null && (infoRef.current[ref.name] = ref)
                        }
                      />
                    </div>
                    <div>
                      <p>
                        Relationship with customer{" "}
                        <span className="red">*</span>
                      </p>
                      <select
                        name="relationship_with_client"
                        onChange={(e) =>
                          (infoRef.current["relationship_with_client"] =
                            e.target.value)
                        }
                      >
                        <option
                          value=""
                          selected={
                            location.state?.data?.at(0)
                              ?.relationship_with_client === "Select Option" ||
                            infoRef.current["relationship_with_client"] ===
                              "Select Option"
                          }
                        >
                          Select Option
                        </option>
                        {/* <option
                          value="I am the client / end customer myself"
                          selected={
                            location.state?.data?.at(0)
                              ?.relationship_with_client ===
                              "I am the client / end customer myself" ||
                            infoRef.current["relationship_with_client"] ===
                              "Select Option"
                          }
                        >
                          I am the client / end customer myself
                        </option> */}
                        <option
                          value="Intermediary"
                          selected={
                            location.state?.data?.at(0)
                              ?.relationship_with_client === "Intermediary" ||
                            infoRef.current["relationship_with_client"] ===
                              "Intermediary"
                          }
                        >
                          Intermediary
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row buttons">
                  <Link to="/dashboard">
                    <button className="back">Back</button>
                  </Link>
                  <button onClick={() => progressBarHandler()}>Further</button>
                </div>
              </div>
            </>
          ) : i === 2 ? (
            <>
              <div className="place-call-info-second-page-header">
                <h3>
                  Description <span className="red">*</span>
                </h3>
              </div>
              <div className="place-call-info-second-page-form">
                <div className="row">
                  <p>Description of activities</p>
                  <textarea
                    name="description_of_activities"
                    maxLength={"2000"}
                    id=""
                    cols="70"
                    rows="10"
                    ref={(ref) =>
                      ref !== null && (infoRef.current[ref.name] = ref)
                    }
                    defaultValue={
                      location.state?.data?.at(0).description_of_activities ||
                      infoRef.current["description_of_activities"]?.value
                    }
                  ></textarea>
                </div>
                <div className="row">
                  <p>
                    Industry <span className="red">*</span>
                  </p>
                  <select
                    title="Select Job Industry"
                    name="industry"
                    onChange={(e) => {
                      e.target.value !== "Selecteer een branche" &&
                        (infoRef.current["industry"] = e.target.value);
                      setChildCare(e.target.value);
                    }}
                  >
                    <option value="Selecteer een branche">
                      Selecteer een branche
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Construction" ||
                        infoRef.current["industry"] === "Construction"
                      }
                      value="Construction"
                    >
                      Construction
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Electrical" ||
                        infoRef.current["industry"] === "Electrical"
                      }
                      value="Electrical"
                    >
                      Electrical
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Installation" ||
                        infoRef.current["industry"] === "Installation"
                      }
                      value="Installation"
                    >
                      Installation
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Infrastructure" ||
                        infoRef.current["industry"] === "Infrastructure"
                      }
                      value="Infrastructure"
                    >
                      Infrastructure
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Industrial" ||
                        infoRef.current["industry"] === "Industrial"
                      }
                      value="Industrial"
                    >
                      Industrial
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Health care and well being" ||
                        infoRef.current["industry"] ===
                          "Health care and well being"
                      }
                      value="Health care and well being"
                    >
                      Health care and well being
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Trade and services" ||
                        infoRef.current["industry"] === "Trade and services"
                      }
                      value="Trade and services"
                    >
                      Trade and services
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry === "IT" ||
                        infoRef.current["industry"] === "IT"
                      }
                      value="IT"
                    >
                      IT
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Justice, security and public administration" ||
                        infoRef.current["industry"] ===
                          "ustice, security and public administration"
                      }
                      value="Justice, security and public administration"
                    >
                      Justice, security and public administration
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Environment and Agriculture" ||
                        infoRef.current["industry"] ===
                          "Environment and Agriculture"
                      }
                      value="Environment and Agriculture"
                    >
                      Environment and Agriculture
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Media and communication" ||
                        infoRef.current["industry"] ===
                          "Media and communication"
                      }
                      value="Media and communication"
                    >
                      Media and communication
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Education, culture and science" ||
                        infoRef.current["industry"] ===
                          "Education, culture and science"
                      }
                      value="Education, culture and science"
                    >
                      Education, culture and science
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Engineering, production and construction" ||
                        infoRef.current["industry"] ===
                          "Engineering, production and construction"
                      }
                      value="Engineering, production and construction"
                    >
                      Engineering, production and construction
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Tourism, recreation and catering" ||
                        infoRef.current["industry"] ===
                          "Tourism, recreation and catering"
                      }
                      value="Tourism, recreation and catering"
                    >
                      Tourism, recreation and catering
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry ===
                          "Transport and Logistics" ||
                        infoRef.current["industry"] === "ransport and Logistics"
                      }
                      value="Transport and Logistics"
                    >
                      Transport and Logistics
                    </option>
                    <option
                      selected={
                        location.state?.data?.at(0)?.industry === "Childcare" ||
                        infoRef.current["industry"] === "Childcare"
                      }
                      value="Childcare"
                    >
                      Childcare
                    </option>
                  </select>
                </div>
                <div className="row">
                  {childCare === "Childcare" && (
                    <>
                      <div className="row">
                        <p>Competences</p>
                        <div className="competences">
                          <select
                            name="competences"
                            id=""
                            onChange={(e) => handle_competence(e)}
                          >
                            {all_comp.map((item, index) => (
                              <option
                                value={item.id}
                                selected={checked_comp.includes(item.id)}
                                key={index}
                              >
                                {item.competence}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="show-competences">
                          {checked_comp?.length > 0 &&
                            checked_comp?.map((item) => (
                              <div className="competence">
                                {
                                  all_comp.find((elt) => elt.id === item)
                                    ?.competence
                                }
                                <AiOutlineClose
                                  onClick={() =>
                                    setChecked_comp(
                                      checked_comp.filter((elt) => elt !== item)
                                    )
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="row">
                  <p>Skills</p>
                  <div>
                    <input
                      type="text"
                      placeholder="Add your skills"
                      name="skill"
                      ref={(ref) => ref !== null && (skillsRef.current = ref)}
                    />
                    <IoIosAdd onClick={() => addSkillHandler()} />
                  </div>
                  {skills.map((item, index) => (
                    <div className="show-skills" key={index}>
                      {item}
                      <AiOutlineClose
                        onClick={() => removeSkillHandler(index)}
                      />
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="fav_lang" style={{ flexDirection: "column" }}>
                    <p>
                      Witch languages should the freelancer be able to speak for
                      the assignement? {"  "}
                      <span className="red">*</span>
                    </p>
                    <div className="lang_select">
                      {(location.state?.data?.at(0)?.fav_lang || [])
                        ?.concat(Array.from({ length: J }, (_, index) => index))
                        .map((elt, idx) => (
                          <div className="select_lang_elt" name="lang">
                            <select
                              name="lang"
                              ref={(ref) =>
                                ref !== null &&
                                (langRef.current.lang[idx] = ref)
                              }
                              id=""
                            >
                              {Object.entries(lang)?.map((item) => (
                                <option
                                  selected={
                                    elt?.lang
                                      ? item[0] === elt?.lang
                                      : item[0] === "en"
                                  }
                                  value={item[0]}
                                >
                                  {item[1]}
                                </option>
                              ))}
                            </select>
                            <div>
                              <select
                                name="level"
                                ref={(ref) =>
                                  ref !== null &&
                                  (langRef.current.level[idx] = ref)
                                }
                                id=""
                              >
                                <option
                                  value="basic"
                                  selected={elt?.level === "basic"}
                                >
                                  Basis
                                </option>
                                <option
                                  value="limited"
                                  selected={elt?.level === "limited"}
                                >
                                  Limited
                                </option>
                                <option
                                  value="professional"
                                  selected={elt?.level === "professional"}
                                >
                                  Professional
                                </option>
                                <option
                                  value="mother_tongue"
                                  selected={elt?.level === "mother_tongue"}
                                >
                                  Mother tongue
                                </option>
                              </select>
                              {idx !== 0 && (
                                <BsTrashFill
                                  onClick={() => deleteLang(elt, idx)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                    <button
                      ref={(ref) =>
                        ref !== null && (divRef.current["button"] = ref)
                      }
                      onClick={() => setJ(J + 1)}
                    >
                      <IoAddOutline />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <p>Required certificate and documents</p>
                  <div className="selected-document-type">
                    {required_cert?.length > 0 &&
                      required_cert.map((item, index) => (
                        <div className="show-skills" key={index}>
                          {item}
                          <AiOutlineClose
                            onClick={() => removeRequiredCertHandler(index)}
                          />
                        </div>
                      ))}
                  </div>
                  <div>
                    <select
                      name="required_certifications"
                      onChange={(e) => addRequiredCertHandler(e.target.value)}
                      id=""
                    >
                      <option value="select a document type">
                        Select a document type
                      </option>
                      <optgroup label="General">
                        <option value="liability insurance">
                          Liability insurance
                        </option>
                        <option value="Designation / Designation Policy">
                          Designation / Designation Policy
                        </option>
                        <option value="Emergency Response">
                          Emergency Response
                        </option>
                        <option value="Generic Port Instruction">
                          Generic Port Instruction (GPI)
                        </option>
                        <option value="Forklift truck">Forklift truck</option>
                        <option value="Aerial work platform certificate">
                          Aerial work platform certificate
                        </option>
                        <option value="VCA Basic Safety">
                          VCA Basic Safety
                        </option>
                        <option value="VCA VOL">VCA VOL</option>
                        <option value="MOISTURE">MOISTURE</option>
                        <option value="VVB">VVB</option>
                      </optgroup>
                      <optgroup label="electrical engineering">
                        <option value="Installation Expert Fire Alarm, IDB">
                          Installation Expert Fire Alarm, IDB
                        </option>
                        <option value="Security installation technicien, MVB">
                          Security installation technicien, MVB
                        </option>
                        <option value="NEN 1010">NEN 1010</option>
                        <option value="NEN 3140">NEN 3140</option>
                        <option value="Maintenance Expert fire Alarm, ODB">
                          Maintenance Expert fire Alarm, ODB
                        </option>
                        <option value="Project Planning Expert fire Alarm, PDB">
                          Project Planning Expert fire Alarm, PDB
                        </option>
                        <option value="Technicien Security installations, TBV">
                          Technicien Security installations, TBV
                        </option>
                      </optgroup>
                      <optgroup label="Infra">
                        <option value="Asbestos recognition">
                          Asbestos recognition
                        </option>
                        <option value="AT-BRA">AT-BRA</option>
                        <option value="AT-BLS">AT-BLS</option>
                        <option value="CKB ICE">CKB ICE</option>
                        <option value="DLP training">DLP training</option>
                        <option value="DC training">DC training</option>
                        <option value="LRH and sm all fire extinguishers">
                          LRH and small fire extinguishers
                        </option>
                        <option value="NEN-EN50110-1">NEN-EN50110-1</option>
                        <option value="Stipel certificate Basic">
                          Stipel certificate Basic
                        </option>
                        <option value="Stipel certificate PCE">
                          Stipel certificate PCE
                        </option>
                        <option value="TCVT Litfing">TCVT Litfing</option>
                        <option value="Hoisting and poaching training">
                          Hoisting and poaching training
                        </option>
                        <option value="VOP BEI">VOP BEI</option>
                        <option value="VP High Voltage">VP High Voltage</option>
                        <option value="VP Viag">VP Viag</option>
                        <option value="VRI for public transport technician">
                          VRI for public transport technician
                        </option>
                        <option value="Working safely along the road">
                          Working safely along the road
                        </option>
                        <option value="WION">WION</option>
                        <option value="Work at height">Work at height</option>
                      </optgroup>
                      <optgroup label="Installation technology">
                        <option value="air conditioning technology">
                          air conditioning technology
                        </option>
                        <option value="Basic climate technology, KLI">
                          Basic climate technology, KLI
                        </option>
                        <option value="Proof of Workmanship (CO)">
                          Proof of Workmanship (CO)
                        </option>
                        <option value="F-gases 1">F-gases 1</option>
                        <option value="F-gases 2">F-gases 2</option>
                        <option value="Designing climate control installations, KLI-C">
                          Designing climate control installations, KLI-C
                        </option>
                        <option value="Climate technology general, KLI-A">
                          Climate technology general, KLI-A
                        </option>
                        <option value="Refrigeration technology">
                          Refrigeration technology
                        </option>
                        <option value="Failure analysis in climate systems, KLI-B">
                          Failure analysis in climate systems, KLI-B
                        </option>
                        <option value="Heat pump installations">
                          Heat pump installations
                        </option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
                    {showReqCertInput && (
                      <div>
                        <input
                          type="text"
                          placeholder="Add your certificates"
                          name="skill"
                          ref={(ref) =>
                            ref !== null && (required_cert_ref.current = ref)
                          }
                        />
                        <IoIosAdd
                          onClick={() =>
                            addRequiredCertHandler(
                              required_cert_ref.current?.value
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                  {toggler && (
                    <div className={"row"} style={{ flexDirection: "column" }}>
                      <p>
                        Estimated time assignment <span className="red">*</span>
                      </p>
                      <select
                        name="job_duration"
                        id=""
                        onChange={(e) =>
                          e.target.value !== "Select a lead time" &&
                          (infoRef.current["job_duration"] = e.target.value)
                        }
                      >
                        <option value="Select a lead time">
                          Select a lead time
                        </option>
                        <option
                          value="<1 month"
                          selected={
                            location.state?.data?.at(0)?.job_duration ===
                              "<1 month" ||
                            infoRef.current["job_duration"] === "<1 month"
                          }
                        >
                          {"<"}1 month
                        </option>
                        <option
                          value="1-3 months"
                          selected={
                            location.state?.data?.at(0)?.job_duration ===
                              "1-3 months" ||
                            infoRef.current["job_duration"] === "1-3 months"
                          }
                        >
                          1-3 months
                        </option>
                        <option
                          value="3-6 months"
                          selected={
                            location.state?.data?.at(0)?.job_duration ===
                              "3-6 months" ||
                            infoRef.current["job_duration"] === "3-6 months"
                          }
                        >
                          3-6 months
                        </option>
                        <option
                          value=">6 months"
                          selected={
                            location.state?.data?.at(0)?.job_duration ===
                              ">6 months" ||
                            infoRef.current["job_duration"] === ">6 months"
                          }
                        >
                          {">"}6 months
                        </option>
                      </select>
                    </div>
                  )}
                  <div className="row">
                    <p>
                      Can this assignement be carried out continously{" "}
                      <span className="red">*</span>
                    </p>
                    <div>
                      <label htmlFor="">yes</label>
                      <input
                        type="radio"
                        defaultChecked={
                          location.state?.data?.at(0)
                            ?.can_this_assignement_be_carried_out_continously ===
                            "yes" ||
                          infoRef.current[
                            "can_this_assignement_be_carried_out_continously"
                          ] === "yes"
                        }
                        name="can_this_assignement_be_carried_out_continously"
                        id=""
                        value="yes"
                        onClick={() => {
                          infoRef.current[
                            "can_this_assignement_be_carried_out_continously"
                          ] = "yes";
                          setCan_this_assignement_be_carried_out_continously(
                            "yes"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="">no</label>
                      <input
                        type="radio"
                        defaultChecked={
                          location.state?.data?.at(0)
                            ?.can_this_assignement_be_carried_out_continously ===
                            "no" ||
                          infoRef.current[
                            "can_this_assignement_be_carried_out_continously"
                          ] === "no"
                        }
                        name="can_this_assignement_be_carried_out_continously"
                        id=""
                        value="no"
                        onClick={() => {
                          infoRef.current[
                            "can_this_assignement_be_carried_out_continously"
                          ] = "no";
                          setCan_this_assignement_be_carried_out_continously(
                            "no"
                          );
                        }}
                      />
                    </div>
                  </div>
                  {infoRef.current["pay_type"] === "pay per piece" && (
                    <div className="row">
                      <div>
                        <div>
                          <p>
                            Number of units <span className="red">*</span>
                          </p>
                          <input
                            type="number"
                            defaultValue={
                              location.state?.data?.at(0).number_of_units
                            }
                            placeholder="Note here, the number of units, example 100"
                            name="number_of_units"
                            ref={(ref) =>
                              ref !== null && (infoRef.current[ref.name] = ref)
                            }
                          />
                        </div>
                        <div>
                          <p>
                            Type of installation object{" "}
                            <span className="red">*</span>
                          </p>
                          <input
                            type="text"
                            placeholder="example: meter cable"
                            defaultValue={
                              location.state?.data?.at(0)
                                .type_of_installation_object
                            }
                            name="type_of_installation_object"
                            ref={(ref) =>
                              ref !== null &&
                              (infoRef.current["type_of_installation_object"] =
                                ref)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {can_this_assignement_be_carried_out_continously === "no" && (
                    <div className="row">
                      <p>
                        Description construction stop{" "}
                        <span className="red">*</span>
                      </p>
                      <textarea
                        maxLength={"2000"}
                        defaultValue={
                          location.state?.data?.at(0)
                            .description_construction_stop
                        }
                        name="description_construction_stop"
                        id=""
                        cols="30"
                        rows="5"
                        ref={(ref) =>
                          ref !== null && (infoRef.current[ref.name] = ref)
                        }
                      ></textarea>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="place-call-info-second-page-second-header">
                    <p>ATTACHMENTS</p>
                    <div className="file-zone">
                      <span>
                        Assembly instructions, pictures or other important
                        files. It is not allowed to upload files with address
                        details. <br />
                        <br />
                        <b style={{ color: "red" }}>
                          !Please note that it is not allowed to upload files
                          with contact or address information
                        </b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row file">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>Upload file.</p>
                    <pre className="allowed-files">
                      Allowed file types: .pdf, .jpg, .jpeg, .png{"\n"}
                      Maximum file size: 15 MB
                    </pre>
                  </div>
                  <div className="show-selected-files">
                    {files.map((file, index) => (
                      <div key={file?.name}>
                        <div>
                          {file?.preview?.includes("pdf") ? (
                            <embed src={file?.preview} alt="" />
                          ) : (
                            <img src={file?.preview} alt="" />
                          )}
                        </div>
                        <div className="selected-file-info">
                          <div>
                            <p>
                              {((file?.size || 0) / 1024 ** 2).toFixed(2)} MB
                            </p>
                            <p>{file?.name}</p>
                          </div>
                          <div className="remove-selected-file">
                            <p onClick={() => removeFile(index)}>Remove file</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row buttons">
                  <button
                    className="back"
                    onClick={() => progressBarHandler(-1)}
                  >
                    Back
                  </button>
                  <button onClick={() => progressBarHandler()}>Further</button>
                </div>
              </div>
            </>
          ) : i === 3 ? (
            <>
              <div className="place-call-info-third-page-header">
                <h3>
                  COST <span className="red">*</span>
                </h3>
              </div>
              <div className="place-call-info-third-page-form">
                <div
                  className="row cost"
                  style={{
                    alignItems:
                      infoRef.current["pay_type"] === "pay per piece"
                        ? "flex-end !important"
                        : "center !important",
                  }}
                >
                  <div>
                    {/* <p>
                                                Price Type
                                            </p>
                                            <h4>
                                                <b>
                                                    { infoRef.current["pay_type"]==="pay per hour"?"Hourly wage":"Asking price"}
                                                </b>
                                            </h4> */}
                    <select
                      name="price_type"
                      id=""
                      onChange={(e) => {
                        infoRef.current["price_type"] = e.target.value;
                        setPriceType(e.target.value);
                      }}
                    >
                      <option
                        value="Asking price"
                        selected={
                          location.state?.data?.at(0).price_type ===
                            "Asking price" || priceType === "Asking price"
                        }
                      >
                        Asking price
                      </option>
                      <option
                        value="from - to"
                        selected={
                          location.state?.data?.at(0).price_type ===
                            "from - to" || priceType === "from - to"
                        }
                      >
                        Offer
                      </option>

                      <option
                        value="Maximum budget"
                        selected={
                          location.state?.data?.at(0).price_type ===
                            "Maximum budget" || priceType === "Maximum budget"
                        }
                      >
                        Maximum budget
                      </option>
                    </select>
                  </div>
                  <div>
                    {infoRef.current["pay_type"] === "pay per piece" ? (
                      infoRef.current["price_type"] === "Asking price" ? (
                        <>
                          <p>Price Per piece</p>
                          <input
                            type="text"
                            placeholder="Enter Currency"
                            id="hourly_rate_input"
                            defaultValue={
                              location.state?.data?.at(0).price_per_piece ||
                              infoRef.current["price_per_piece"]?.value
                            }
                            name="price_per_piece"
                            ref={(ref) =>
                              ref !== null && (infoRef.current[ref.name] = ref)
                            }
                          />
                          <div id="currency">
                            {infoRef.current["currency"]?.length > 0 ? (
                              infoRef.current["currency"]
                            ) : (
                              <FaEuroSign
                                style={{
                                  display: showEuroSign ? "none" : "flex",
                                }}
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Opening Price</p>
                          <input
                            type="text"
                            defaultValue={
                              location.state?.data?.at(0)?.opening_price ||
                              infoRef?.current["opening_price"]?.value
                            }
                            placeholder="Enter Currency"
                            name="opening_price"
                            id="hourly_rate_input"
                            ref={(ref) =>
                              ref !== null && (infoRef.current[ref.name] = ref)
                            }
                          />
                          <div id="currency">
                            {infoRef.current["currency"]?.length > 0 ? (
                              infoRef.current["currency"]
                            ) : (
                              <FaEuroSign
                                style={{
                                  display: showEuroSign ? "none" : "flex",
                                }}
                              />
                            )}
                          </div>
                        </>
                      )
                    ) : infoRef.current["price_type"] === "Asking price" ? (
                      <>
                        <p>Hourly Rate</p>
                        <input
                          type="number"
                          id="hourly_rate_input"
                          defaultValue={
                            location.state?.data?.at(0).hourly_wage ||
                            infoRef.current["hourly_wage"]?.value
                          }
                          placeholder="Enter Currency"
                          name="hourly_wage"
                          ref={(ref) =>
                            ref !== null && (infoRef.current[ref.name] = ref)
                          }
                        />
                        <div id="currency">
                          {infoRef.current["currency"]?.length > 0 ? (
                            infoRef.current["currency"]
                          ) : (
                            <FaEuroSign
                              style={{
                                display: showEuroSign ? "none" : "flex",
                              }}
                            />
                          )}
                        </div>
                      </>
                    ) : infoRef.current["price_type"] === "Maximum budget" ? (
                      <>
                        <p>Hourly Rate</p>
                        <input
                          type="number"
                          id="hourly_rate_input"
                          defaultValue={
                            location.state?.data?.at(0).hourly_wage ||
                            infoRef.current["hourly_wage"]?.value
                          }
                          placeholder="Enter Currency"
                          name="hourly_wage"
                          ref={(ref) =>
                            ref !== null && (infoRef.current[ref.name] = ref)
                          }
                        />
                        <div id="currency">
                          {infoRef.current["currency"]?.length > 0 ? (
                            infoRef.current["currency"]
                          ) : (
                            <FaEuroSign
                              style={{
                                display: showEuroSign ? "none" : "flex",
                              }}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p>Hourly Rate</p>
                        <input
                          type="number"
                          placeholder="From"
                          defaultValue={
                            infoRef.current["hourly_wage_from"]?.value ||
                            location.state?.data?.at(0).hourly_wage_from
                          }
                          name="hourly_wage_from"
                          id=""
                          ref={(ref) =>
                            ref !== null && (infoRef.current[ref.name] = ref)
                          }
                        />
                        {infoRef.current["currency"] || <FaEuroSign />}
                        <input
                          type="number"
                          placeholder="To"
                          defaultValue={
                            infoRef.current["hourly_wage_to"]?.value ||
                            location.state?.data?.at(0).hourly_wage_to
                          }
                          name="hourly_wage_to"
                          id=""
                          ref={(ref) =>
                            ref !== null && (infoRef.current[ref.name] = ref)
                          }
                        />
                        {infoRef.current["currency"] || <FaEuroSign />}
                      </>
                    )}
                    {infoRef.current["price_type"] !== "Asking price" && (
                      <AiOutlineInfoCircle
                        className="info"
                        title="Set an opening price per piece. And give the 
                                                     freelancers a chance to undercut against  each other. 
                                                     For an optimal price."
                      />
                    )}
                  </div>
                </div>
                <div className="row">
                  <p>
                    What may be charged <span className="red">*</span>
                  </p>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={
                        infoRef.current["what_may_be_charged"].indexOf(
                          "KM allowance - 0.19 per KM"
                        ) !== -1
                      }
                      name="what_may_be_charged"
                      id=""
                      value="KM allowance - 0.19 per KM"
                      onChange={(e) => checkboxHandler(e)}
                    />
                    <p>KM allowance - 0.19 per KM</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={
                        infoRef.current["what_may_be_charged"].indexOf(
                          "Parking costs (with copy of receipt) "
                        ) !== -1
                      }
                      name="what_may_be_charged"
                      id=""
                      value="Parking costs (with copy of receipt) "
                      onChange={(e) => checkboxHandler(e)}
                    />
                    <p>Parking costs (with copy of receipt)</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={
                        infoRef.current["what_may_be_charged"].indexOf(
                          "Consumables"
                        ) !== -1
                      }
                      name="what_may_be_charged"
                      id=""
                      value="Consumables"
                      onChange={(e) => checkboxHandler(e)}
                    />
                    <p>Consumables</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={
                        infoRef.current["what_may_be_charged"].indexOf(
                          "Tarief is all-in"
                        ) !== -1
                      }
                      name="what_may_be_charged"
                      id=""
                      value="Tarief is all-in"
                      onChange={(e) => checkboxHandler(e)}
                    />
                    <p>Tarief is all-in</p>
                  </div>
                  {addedOptions.map((item, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        defaultChecked={
                          infoRef.current["what_may_be_charged"].indexOf(
                            item
                          ) !== -1
                        }
                        name="what_may_be_charged"
                        id=""
                        value={item}
                        onChange={(e) => checkboxHandler(e)}
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                  <div>
                    <Link
                      to=""
                      onClick={() =>
                        (showAddOptionRef.current.style.display = "flex")
                      }
                    >
                      + Add another option
                    </Link>
                  </div>
                  <div
                    style={{ display: "none" }}
                    ref={(ref) =>
                      ref !== null && (showAddOptionRef.current = ref)
                    }
                  >
                    <input
                      type="text"
                      name="add_option"
                      id=""
                      ref={(ref) =>
                        ref !== null && (addOptionRef.current = ref)
                      }
                    />
                    <button
                      className="add_option_button"
                      onClick={() =>
                        setAddedOptions([
                          ...addedOptions,
                          addOptionRef.current.value,
                        ])
                      }
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="row">
                  <p>
                    Currency <span className="red">*</span>
                  </p>
                  <select
                    name="currency"
                    id=""
                    style={{ width: "50%", borderRadius: "4px" }}
                    onChange={(e) => {
                      infoRef.current["currency"] = e.target.value;
                      if (e.target.value.length > 0) {
                        SetshowEuroSign(false);
                        document.getElementById(
                          "hourly_rate_input"
                        ).placeholder = e.target.value;
                        /*document.getElementById("currency").innerText += `
                                                ${e.target.value}
                                            `*/
                      } else {
                        document.getElementById(
                          "hourly_rate_input"
                        ).placeholder = "EUR";
                        SetshowEuroSign(true);
                        //ReactDOM.render(<FaEuroSign/>,document.getElementById("currency"))
                      }
                    }}
                  >
                    <option value={""}>select a currency</option>
                    <option
                      value="AFN"
                      selected={infoRef.current["currency"] === "AFN"}
                    >
                      Afghan Afghani
                    </option>
                    <option
                      value="ALL"
                      selected={infoRef.current["currency"] === "ALL"}
                    >
                      Albanian Lek
                    </option>
                    <option
                      value="DZD"
                      selected={infoRef.current["currency"] === "DZD"}
                    >
                      Algerian Dinar
                    </option>
                    <option
                      value="AOA"
                      selected={infoRef.current["currency"] === "AOA"}
                    >
                      Angolan Kwanza
                    </option>
                    <option
                      value="ARS"
                      selected={infoRef.current["currency"] === "ARS"}
                    >
                      Argentine Peso
                    </option>
                    <option
                      value="AMD"
                      selected={infoRef.current["currency"] === "AMD"}
                    >
                      Armenian Dram
                    </option>
                    <option
                      value="AWG"
                      selected={infoRef.current["currency"] === "AWG"}
                    >
                      Aruban Florin
                    </option>
                    <option
                      value="AUD"
                      selected={infoRef.current["currency"] === "AUD"}
                    >
                      Australian Dollar
                    </option>
                    <option
                      value="AZN"
                      selected={infoRef.current["currency"] === "AZN"}
                    >
                      Azerbaijani Manat
                    </option>
                    <option
                      value="BSD"
                      selected={infoRef.current["currency"] === "BSD"}
                    >
                      Bahamian Dollar
                    </option>
                    <option
                      value="BHD"
                      selected={infoRef.current["currency"] === "BHD"}
                    >
                      Bahraini Dinar
                    </option>
                    <option
                      value="BDT"
                      selected={infoRef.current["currency"] === "BDT"}
                    >
                      Bangladeshi Taka
                    </option>
                    <option
                      value="BBD"
                      selected={infoRef.current["currency"] === "BBD"}
                    >
                      Barbadian Dollar
                    </option>
                    <option
                      value="BYR"
                      selected={infoRef.current["currency"] === "BYR"}
                    >
                      Belarusian Ruble
                    </option>
                    <option
                      value="BEF"
                      selected={infoRef.current["currency"] === "BEF"}
                    >
                      Belgian Franc
                    </option>
                    <option
                      value="BZD"
                      selected={infoRef.current["currency"] === "BZD"}
                    >
                      Belize Dollar
                    </option>
                    <option
                      value="BMD"
                      selected={infoRef.current["currency"] === "BMD"}
                    >
                      Bermudan Dollar
                    </option>
                    <option
                      value="BTN"
                      selected={infoRef.current["currency"] === "BTN"}
                    >
                      Bhutanese Ngultrum
                    </option>
                    <option
                      value="BOB"
                      selected={infoRef.current["currency"] === "BOB"}
                    >
                      Bolivian Boliviano
                    </option>
                    <option
                      value="BAM"
                      selected={infoRef.current["currency"] === "BAM"}
                    >
                      Bosnia-Herzegovina Convertible Mark
                    </option>
                    <option
                      value="BWP"
                      selected={infoRef.current["currency"] === "BWP"}
                    >
                      Botswanan Pula
                    </option>
                    <option
                      value="BRL"
                      selected={infoRef.current["currency"] === "BRL"}
                    >
                      Brazilian Real
                    </option>
                    <option
                      value="GBP"
                      selected={infoRef.current["currency"] === "GBP"}
                    >
                      British Pound Sterling
                    </option>
                    <option
                      value="BND"
                      selected={infoRef.current["currency"] === "BND"}
                    >
                      Brunei Dollar
                    </option>
                    <option
                      value="BGN"
                      selected={infoRef.current["currency"] === "BGN"}
                    >
                      Bulgarian Lev
                    </option>
                    <option
                      value="BIF"
                      selected={infoRef.current["currency"] === "BIF"}
                    >
                      Burundian Franc
                    </option>
                    <option
                      value="KHR"
                      selected={infoRef.current["currency"] === "KHR"}
                    >
                      Cambodian Riel
                    </option>
                    <option
                      value="CAD"
                      selected={infoRef.current["currency"] === "CAD"}
                    >
                      Canadian Dollar
                    </option>
                    <option
                      value="CVE"
                      selected={infoRef.current["currency"] === "CVE"}
                    >
                      Cape Verdean Escudo
                    </option>
                    <option
                      value="KYD"
                      selected={infoRef.current["currency"] === "KYD"}
                    >
                      Cayman Islands Dollar
                    </option>
                    <option
                      value="XOF"
                      selected={infoRef.current["currency"] === "XOF"}
                    >
                      CFA Franc BCEAO
                    </option>
                    <option
                      value="XAF"
                      selected={infoRef.current["currency"] === "XAF"}
                    >
                      CFA Franc BEAC
                    </option>
                    <option
                      value="XPF"
                      selected={infoRef.current["currency"] === "XPF"}
                    >
                      CFP Franc
                    </option>
                    <option
                      value="CLP"
                      selected={infoRef.current["currency"] === "CLP"}
                    >
                      Chilean Peso
                    </option>
                    <option
                      value="CNY"
                      selected={infoRef.current["currency"] === "CNY"}
                    >
                      Chinese Yuan
                    </option>
                    <option
                      value="COP"
                      selected={infoRef.current["currency"] === "COP"}
                    >
                      Colombian Peso
                    </option>
                    <option
                      value="KMF"
                      selected={infoRef.current["currency"] === "KMF"}
                    >
                      Comorian Franc
                    </option>
                    <option
                      value="CDF"
                      selected={infoRef.current["currency"] === "CDF"}
                    >
                      Congolese Franc
                    </option>
                    <option
                      value="CRC"
                      selected={infoRef.current["currency"] === "CRC"}
                    >
                      Costa Rican ColÃ³n
                    </option>
                    <option
                      value="HRK"
                      selected={infoRef.current["currency"] === "HRK"}
                    >
                      Croatian Kuna
                    </option>
                    <option
                      value="CUC"
                      selected={infoRef.current["currency"] === "CUC"}
                    >
                      Cuban Convertible Peso
                    </option>
                    <option
                      value="CZK"
                      selected={infoRef.current["currency"] === "CZK"}
                    >
                      Czech Republic Koruna
                    </option>
                    <option
                      value="DKK"
                      selected={infoRef.current["currency"] === "DKK"}
                    >
                      Danish Krone
                    </option>
                    <option
                      value="DJF"
                      selected={infoRef.current["currency"] === "DJF"}
                    >
                      Djiboutian Franc
                    </option>
                    <option
                      value="DOP"
                      selected={infoRef.current["currency"] === "DOP"}
                    >
                      Dominican Peso
                    </option>
                    <option
                      value="XCD"
                      selected={infoRef.current["currency"] === "XCD"}
                    >
                      East Caribbean Dollar
                    </option>
                    <option
                      value="EGP"
                      selected={infoRef.current["currency"] === "EGP"}
                    >
                      Egyptian Pound
                    </option>
                    <option
                      value="ERN"
                      selected={infoRef.current["currency"] === "ERN"}
                    >
                      Eritrean Nakfa
                    </option>
                    <option
                      value="EEK"
                      selected={infoRef.current["currency"] === "EEK"}
                    >
                      Estonian Kroon
                    </option>
                    <option
                      value="ETB"
                      selected={infoRef.current["currency"] === "ETB"}
                    >
                      Ethiopian Birr
                    </option>
                    <option
                      value="EUR"
                      selected={infoRef.current["currency"] === "EUR"}
                    >
                      Euro
                    </option>
                    <option
                      value="FKP"
                      selected={infoRef.current["currency"] === "FKP"}
                    >
                      Falkland Islands Pound
                    </option>
                    <option
                      value="FJD"
                      selected={infoRef.current["currency"] === "FJD"}
                    >
                      Fijian Dollar
                    </option>
                    <option
                      value="GMD"
                      selected={infoRef.current["currency"] === "GMD"}
                    >
                      Gambian Dalasi
                    </option>
                    <option
                      value="GEL"
                      selected={infoRef.current["currency"] === "GEL"}
                    >
                      Georgian Lari
                    </option>
                    <option
                      value="DEM"
                      selected={infoRef.current["currency"] === "DEM"}
                    >
                      German Mark
                    </option>
                    <option
                      value="GHS"
                      selected={infoRef.current["currency"] === "GHS"}
                    >
                      Ghanaian Cedi
                    </option>
                    <option
                      value="GIP"
                      selected={infoRef.current["currency"] === "GIP"}
                    >
                      Gibraltar Pound
                    </option>
                    <option
                      value="GRD"
                      selected={infoRef.current["currency"] === "GRD"}
                    >
                      Greek Drachma
                    </option>
                    <option
                      value="GTQ"
                      selected={infoRef.current["currency"] === "GTQ"}
                    >
                      Guatemalan Quetzal
                    </option>
                    <option
                      value="GNF"
                      selected={infoRef.current["currency"] === "GNF"}
                    >
                      Guinean Franc
                    </option>
                    <option
                      value="GYD"
                      selected={infoRef.current["currency"] === "GYD"}
                    >
                      Guyanaese Dollar
                    </option>
                    <option
                      value="HTG"
                      selected={infoRef.current["currency"] === "HTG"}
                    >
                      Haitian Gourde
                    </option>
                    <option
                      value="HNL"
                      selected={infoRef.current["currency"] === "HNL"}
                    >
                      Honduran Lempira
                    </option>
                    <option
                      value="HKD"
                      selected={infoRef.current["currency"] === "HKD"}
                    >
                      Hong Kong Dollar
                    </option>
                    <option
                      value="HUF"
                      selected={infoRef.current["currency"] === "HUF"}
                    >
                      Hungarian Forint
                    </option>
                    <option
                      value="ISK"
                      selected={infoRef.current["currency"] === "ISK"}
                    >
                      Icelandic KrÃ³na
                    </option>
                    <option
                      value="INR"
                      selected={infoRef.current["currency"] === "INR"}
                    >
                      Indian Rupee
                    </option>
                    <option
                      value="IDR"
                      selected={infoRef.current["currency"] === "IDR"}
                    >
                      Indonesian Rupiah
                    </option>
                    <option
                      value="IRR"
                      selected={infoRef.current["currency"] === "IRR"}
                    >
                      Iranian Rial
                    </option>
                    <option
                      value="IQD"
                      selected={infoRef.current["currency"] === "IQD"}
                    >
                      Iraqi Dinar
                    </option>
                    <option
                      value="ILS"
                      selected={infoRef.current["currency"] === "ILS"}
                    >
                      Israeli New Sheqel
                    </option>
                    <option
                      value="ITL"
                      selected={infoRef.current["currency"] === "ITL"}
                    >
                      Italian Lira
                    </option>
                    <option
                      value="JMD"
                      selected={infoRef.current["currency"] === "JMD"}
                    >
                      Jamaican Dollar
                    </option>
                    <option
                      value="JPY"
                      selected={infoRef.current["currency"] === "JPY"}
                    >
                      Japanese Yen
                    </option>
                    <option
                      value="JOD"
                      selected={infoRef.current["currency"] === "JOD"}
                    >
                      Jordanian Dinar
                    </option>
                    <option
                      value="KZT"
                      selected={infoRef.current["currency"] === "KZT"}
                    >
                      Kazakhstani Tenge
                    </option>
                    <option
                      value="KES"
                      selected={infoRef.current["currency"] === "KES"}
                    >
                      Kenyan Shilling
                    </option>
                    <option
                      value="KWD"
                      selected={infoRef.current["currency"] === "KWD"}
                    >
                      Kuwaiti Dinar
                    </option>
                    <option
                      value="KGS"
                      selected={infoRef.current["currency"] === "KGS"}
                    >
                      Kyrgystani Som
                    </option>
                    <option
                      value="LAK"
                      selected={infoRef.current["currency"] === "LAK"}
                    >
                      Laotian Kip
                    </option>
                    <option
                      value="LVL"
                      selected={infoRef.current["currency"] === "LVL"}
                    >
                      Latvian Lats
                    </option>
                    <option
                      value="LBP"
                      selected={infoRef.current["currency"] === "LBP"}
                    >
                      Lebanese Pound
                    </option>
                    <option
                      value="LSL"
                      selected={infoRef.current["currency"] === "LSL"}
                    >
                      Lesotho Loti
                    </option>
                    <option
                      value="LRD"
                      selected={infoRef.current["currency"] === "LRD"}
                    >
                      Liberian Dollar
                    </option>
                    <option
                      value="LYD"
                      selected={infoRef.current["currency"] === "LYD"}
                    >
                      Libyan Dinar
                    </option>
                    <option
                      value="LTL"
                      selected={infoRef.current["currency"] === "LTL"}
                    >
                      Lithuanian Litas
                    </option>
                    <option
                      value="MOP"
                      selected={infoRef.current["currency"] === "MOP"}
                    >
                      Macanese Pataca
                    </option>
                    <option
                      value="MKD"
                      selected={infoRef.current["currency"] === "MKD"}
                    >
                      Macedonian Denar
                    </option>
                    <option
                      value="MGA"
                      selected={infoRef.current["currency"] === "MGA"}
                    >
                      Malagasy Ariary
                    </option>
                    <option
                      value="MWK"
                      selected={infoRef.current["currency"] === "MWK"}
                    >
                      Malawian Kwacha
                    </option>
                    <option
                      value="MYR"
                      selected={infoRef.current["currency"] === "MYR"}
                    >
                      Malaysian Ringgit
                    </option>
                    <option
                      value="MVR"
                      selected={infoRef.current["currency"] === "MVR"}
                    >
                      Maldivian Rufiyaa
                    </option>
                    <option
                      value="MRO"
                      selected={infoRef.current["currency"] === "MRO"}
                    >
                      Mauritanian Ouguiya
                    </option>
                    <option
                      value="MUR"
                      selected={infoRef.current["currency"] === "MUR"}
                    >
                      Mauritian Rupee
                    </option>
                    <option
                      value="MXN"
                      selected={infoRef.current["currency"] === "MXN"}
                    >
                      Mexican Peso
                    </option>
                    <option
                      value="MDL"
                      selected={infoRef.current["currency"] === "MDL"}
                    >
                      Moldovan Leu
                    </option>
                    <option
                      value="MNT"
                      selected={infoRef.current["currency"] === "MNT"}
                    >
                      Mongolian Tugrik
                    </option>
                    <option
                      value="MAD"
                      selected={infoRef.current["currency"] === "MAD"}
                    >
                      Moroccan Dirham
                    </option>
                    <option
                      value="MZM"
                      selected={infoRef.current["currency"] === "MZM"}
                    >
                      Mozambican Metical
                    </option>
                    <option
                      value="MMK"
                      selected={infoRef.current["currency"] === "MMK"}
                    >
                      Myanmar Kyat
                    </option>
                    <option
                      value="NAD"
                      selected={infoRef.current["currency"] === "NAD"}
                    >
                      Namibian Dollar
                    </option>
                    <option
                      value="NPR"
                      selected={infoRef.current["currency"] === "NPR"}
                    >
                      Nepalese Rupee
                    </option>
                    <option
                      value="ANG"
                      selected={infoRef.current["currency"] === "ANG"}
                    >
                      Netherlands Antillean Guilder
                    </option>
                    <option
                      value="TWD"
                      selected={infoRef.current["currency"] === "TWD"}
                    >
                      New Taiwan Dollar
                    </option>
                    <option
                      value="NZD"
                      selected={infoRef.current["currency"] === "NZD"}
                    >
                      New Zealand Dollar
                    </option>
                    <option
                      value="NIO"
                      selected={infoRef.current["currency"] === "NIO"}
                    >
                      Nicaraguan CÃ³rdoba
                    </option>
                    <option
                      value="NGN"
                      selected={infoRef.current["currency"] === "NGN"}
                    >
                      Nigerian Naira
                    </option>
                    <option
                      value="KPW"
                      selected={infoRef.current["currency"] === "KPW"}
                    >
                      North Korean Won
                    </option>
                    <option
                      value="NOK"
                      selected={infoRef.current["currency"] === "NOK"}
                    >
                      Norwegian Krone
                    </option>
                    <option
                      value="OMR"
                      selected={infoRef.current["currency"] === "OMR"}
                    >
                      Omani Rial
                    </option>
                    <option
                      value="PKR"
                      selected={infoRef.current["currency"] === "PKR"}
                    >
                      Pakistani Rupee
                    </option>
                    <option
                      value="PAB"
                      selected={infoRef.current["currency"] === "PAB"}
                    >
                      Panamanian Balboa
                    </option>
                    <option
                      value="PGK"
                      selected={infoRef.current["currency"] === "PGK"}
                    >
                      Papua New Guinean Kina
                    </option>
                    <option
                      value="PYG"
                      selected={infoRef.current["currency"] === "PYG"}
                    >
                      Paraguayan Guarani
                    </option>
                    <option
                      value="PEN"
                      selected={infoRef.current["currency"] === "PEN"}
                    >
                      Peruvian Nuevo Sol
                    </option>
                    <option
                      value="PHP"
                      selected={infoRef.current["currency"] === "PHP"}
                    >
                      Philippine Peso
                    </option>
                    <option
                      value="PLN"
                      selected={infoRef.current["currency"] === "PLN"}
                    >
                      Polish Zloty
                    </option>
                    <option
                      value="QAR"
                      selected={infoRef.current["currency"] === "QAR"}
                    >
                      Qatari Rial
                    </option>
                    <option
                      value="RON"
                      selected={infoRef.current["currency"] === "RON"}
                    >
                      Romanian Leu
                    </option>
                    <option
                      value="RUB"
                      selected={infoRef.current["currency"] === "RUB"}
                    >
                      Russian Ruble
                    </option>
                    <option
                      value="RWF"
                      selected={infoRef.current["currency"] === "RWF"}
                    >
                      Rwandan Franc
                    </option>
                    <option
                      value="SVC"
                      selected={infoRef.current["currency"] === "SVC"}
                    >
                      Salvadoran ColÃ³n
                    </option>
                    <option
                      value="WST"
                      selected={infoRef.current["currency"] === "WST"}
                    >
                      Samoan Tala
                    </option>
                    <option
                      value="SAR"
                      selected={infoRef.current["currency"] === "SAR"}
                    >
                      Saudi Riyal
                    </option>
                    <option
                      value="RSD"
                      selected={infoRef.current["currency"] === "RSD"}
                    >
                      Serbian Dinar
                    </option>
                    <option
                      value="SCR"
                      selected={infoRef.current["currency"] === "SCR"}
                    >
                      Seychellois Rupee
                    </option>
                    <option
                      value="SLL"
                      selected={infoRef.current["currency"] === "SLL"}
                    >
                      Sierra Leonean Leone
                    </option>
                    <option
                      value="SGD"
                      selected={infoRef.current["currency"] === "SGD"}
                    >
                      Singapore Dollar
                    </option>
                    <option
                      value="SKK"
                      selected={infoRef.current["currency"] === "SKK"}
                    >
                      Slovak Koruna
                    </option>
                    <option
                      value="SBD"
                      selected={infoRef.current["currency"] === "SBD"}
                    >
                      Solomon Islands Dollar
                    </option>
                    <option
                      value="SOS"
                      selected={infoRef.current["currency"] === "SOS"}
                    >
                      Somali Shilling
                    </option>
                    <option
                      value="ZAR"
                      selected={infoRef.current["currency"] === "ZAR"}
                    >
                      South African Rand
                    </option>
                    <option
                      value="KRW"
                      selected={infoRef.current["currency"] === "KRW"}
                    >
                      South Korean Won
                    </option>
                    <option
                      value="XDR"
                      selected={infoRef.current["currency"] === "XDR"}
                    >
                      Special Drawing Rights
                    </option>
                    <option
                      value="LKR"
                      selected={infoRef.current["currency"] === "LKR"}
                    >
                      Sri Lankan Rupee
                    </option>
                    <option
                      value="SHP"
                      selected={infoRef.current["currency"] === "SHP"}
                    >
                      St. Helena Pound
                    </option>
                    <option
                      value="SDG"
                      selected={infoRef.current["currency"] === "SDG"}
                    >
                      Sudanese Pound
                    </option>
                    <option
                      value="SRD"
                      selected={infoRef.current["currency"] === "SRD"}
                    >
                      Surinamese Dollar
                    </option>
                    <option
                      value="SZL"
                      selected={infoRef.current["currency"] === "SZL"}
                    >
                      Swazi Lilangeni
                    </option>
                    <option
                      value="SEK"
                      selected={infoRef.current["currency"] === "SEK"}
                    >
                      Swedish Krona
                    </option>
                    <option
                      value="CHF"
                      selected={infoRef.current["currency"] === "CHF"}
                    >
                      Swiss Franc
                    </option>
                    <option
                      value="SYP"
                      selected={infoRef.current["currency"] === "SYP"}
                    >
                      Syrian Pound
                    </option>
                    <option
                      value="STD"
                      selected={infoRef.current["currency"] === "STD"}
                    >
                      São Tomé and Príncipe Dobra
                    </option>
                    <option
                      value="TJS"
                      selected={infoRef.current["currency"] === "TJS"}
                    >
                      Tajikistani Somoni
                    </option>
                    <option
                      value="TZS"
                      selected={infoRef.current["currency"] === "TZS"}
                    >
                      Tanzanian Shilling
                    </option>
                    <option
                      value="THB"
                      selected={infoRef.current["currency"] === "THB"}
                    >
                      Thai Baht
                    </option>
                    <option
                      value="TOP"
                      selected={infoRef.current["currency"] === "TOP"}
                    >
                      Tongan pa'anga
                    </option>
                    <option
                      value="TTD"
                      selected={infoRef.current["currency"] === "TTD"}
                    >
                      Trinidad & Tobago Dollar
                    </option>
                    <option
                      value="TND"
                      selected={infoRef.current["currency"] === "TND"}
                    >
                      Tunisian Dinar
                    </option>
                    <option
                      value="TRY"
                      selected={infoRef.current["currency"] === "TRY"}
                    >
                      Turkish Lira
                    </option>
                    <option
                      value="TMT"
                      selected={infoRef.current["currency"] === "TMT"}
                    >
                      Turkmenistani Manat
                    </option>
                    <option
                      value="UGX"
                      selected={infoRef.current["currency"] === "UGX"}
                    >
                      Ugandan Shilling
                    </option>
                    <option
                      value="UAH"
                      selected={infoRef.current["currency"] === "UAH"}
                    >
                      Ukrainian Hryvnia
                    </option>
                    <option
                      value="AED"
                      selected={infoRef.current["currency"] === "AED"}
                    >
                      United Arab Emirates Dirham
                    </option>
                    <option
                      value="UYU"
                      selected={infoRef.current["currency"] === "UYU"}
                    >
                      Uruguayan Peso
                    </option>
                    <option
                      value="USD"
                      selected={infoRef.current["currency"] === "USD"}
                    >
                      US Dollar
                    </option>
                    <option
                      value="UZS"
                      selected={infoRef.current["currency"] === "UZS"}
                    >
                      Uzbekistan Som
                    </option>
                    <option
                      value="VUV"
                      selected={infoRef.current["currency"] === "VUV"}
                    >
                      Vanuatu Vatu
                    </option>
                    <option
                      value="VEF"
                      selected={infoRef.current["currency"] === "VEF"}
                    >
                      Venezuelan BolÃ­var
                    </option>
                    <option
                      value="VND"
                      selected={infoRef.current["currency"] === "VND"}
                    >
                      Vietnamese Dong
                    </option>
                    <option
                      value="YER"
                      selected={infoRef.current["currency"] === "YER"}
                    >
                      Yemeni Rial
                    </option>
                    <option
                      value="ZMK"
                      selected={infoRef.current["currency"] === "ZMK"}
                    >
                      Zambian Kwacha
                    </option>
                  </select>
                </div>
                <div className="row">
                  <p>
                    Payments terms <span className="red">*</span>
                  </p>
                  <select
                    name="payements_term"
                    onChange={(e) =>
                      (infoRef.current["payements_term"] = e.target.value)
                    }
                  >
                    <option
                      value="30 days"
                      selected={
                        infoRef.current["payements_term"] === "30 days" ||
                        location.state?.data?.at(0).payements_term === "30 days"
                      }
                    >
                      30 Days
                    </option>
                    <option
                      value="14 days"
                      selected={
                        infoRef.current["payements_term"] === "14 days" ||
                        location.state?.data?.at(0).payements_term === "14 days"
                      }
                    >
                      14 Days
                    </option>
                    <option
                      value="7 days"
                      selected={
                        infoRef.current["payements_term"] === "7 days" ||
                        location.state?.data?.at(0).payements_term === "7 days"
                      }
                    >
                      7 Days
                    </option>
                  </select>
                </div>
                {/* <div className="row">
                                        <p>
                                            Other
                                        </p>
                                        <div>
                                            <input type="checkbox" defaultChecked={location.state?.data?.at(0).other} name="other" value="Show assignement in overviews" id="" onChange={e=>(e.target.checked?(infoRef.current['other'] = e.target.value):(infoRef.current['other'] = ""))}/>
                                            <p>
                                                Show assignement in overviews
                                            </p>
                                        </div>
                                    </div> */}
                <div className="row buttons">
                  <div className="row buttons">
                    <button
                      className="back"
                      onClick={() => progressBarHandler(-1)}
                    >
                      Back
                    </button>
                    <button onClick={() => progressBarHandler()}>
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <Link
            to="/dashboard/preview-assignement"
            state={{ id: modify?.assignement_id || add_assignement?.data }}
            style={{ display: "none" }}
            ref={(ref) => ref !== null && (linkRef.current = ref)}
          ></Link>
        </div>
      </div>
      <div
        className="loading-rocket big"
        style={{ display: "none" }}
        id="loderhidden"
      >
        <img src="/images/rocket.gif" alt="" />
        <p class="job_success_message">Congratulations, your assignment has now been placed</p>
      </div>
      <div
        className="loading-rocket big"
        style={{ display: "none" }}
        id="postimghidden"
      >
        <img src="/images/assignment_pic_at_end.png" alt="" />
        <p class="job_success_message">Congratulations, your assignment has now been placed</p>
      </div>
    </div>
  );
}