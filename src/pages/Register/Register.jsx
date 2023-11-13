import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./register.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  add_competency_action,
  add_locations_action,
  get_all_competencies_action,
  registerAction,
  setPersonalInfo,
} from "../../state/Actions/UserAction";
import { useRef } from "react";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
export default function Register() {
  const urlParams = new URLSearchParams(window.location.search);
  const user_info = useSelector((state) => state.user_info);
  const set_personal = useSelector((state) => state.set_personal);
  const get_all_competencies = useSelector(
    (state) => state.get_all_competencies
  );
  const check_code = useSelector((state) => state.check_code);
  const userRef = useRef(urlParams.get("user"));
  const user = userRef.current;
  const [error, setError] = useState("");
  let userRegister = useRef({
    checked_comp: [],
    sent: false,
    agreeTerms: false,
    address: "",
    picture:
      user === "client"
        ? "/images/profile-client.png"
        : "/images/profile-freelancer.png",
  });
  const imageRef = useRef({
    src:
      user === "client"
        ? "/images/profile-client.png"
        : "/images/profile-freelancer.png",
  });
  const inputRef = useRef([]);
  const welcomeRef = useRef();
  const submitRef = useRef();
  const [validPassword, setValidPassword] = useState(null);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  let mytimeout = useRef();

  const inputFormData = new FormData();
  const dispatch = useDispatch();
  const location = useLocation();

  //redirection link back to page
  const linkRef = useRef();

  const all_comp = get_all_competencies.competencies
    ? get_all_competencies.competencies
    : [];
  let checked_comp = [];
  let unchecked_comp = [];

  useEffect(() => {
    dispatch(get_all_competencies_action());
  }, [dispatch]);

  useEffect(() => {
    setVerifyEmail(check_code.data?.valid);
    setShowVerifyEmail(false);
    setTimeout(() => {
      if (check_code.data) {
        check_code.data.message = null;
      }
    }, 1000);
  }, [check_code.data]);

  //handling register action for users
  const registerUser = (e) => {
    e.preventDefault();
    //setError(null)
    window.scrollTo(0, 0);
    let token;
    for (const [key, item] of Object.entries(userRegister.current)) {
      if (item && item.value && item.value.length > 0) {
        userRegister.current[key] = item.value;
      }
    }
    if (user_info?.user?.token) {
      token = user_info.user.token;
      userRegister.current.max_travel_distance = 0;
      userRegister.current.work_experience = "";
      userRegister.current.birthday = null;
      userRegister.current.bsn = "";
      userRegister.current.competences = "";
      userRegister.current.address = userRegister.current.address || "";
      userRegister.current.postcode = userRegister.current.postcode || "";
      userRegister.current.city = userRegister.current.city || "";
      userRegister.current.orga_name = userRegister.current.orga_name || "";

      if (userRegister.current.address.length > 0 || user === "client") {
        if (userRegister.current.checked_comp.length > 0) {
          dispatch(
            add_competency_action(userRegister.current.checked_comp, token)
          );
        }
        inputFormData.set("picture", userRegister.current.picture);
        inputFormData.set("info", JSON.stringify(userRegister.current));
        dispatch(setPersonalInfo(inputFormData, token));
        if (user === "client") {
          dispatch(
            add_locations_action(user_info.user.token, {
              location: "",
              name: userRegister.current.user_name,
              address: "",
              postcode: "",
              city: "",
              phone: userRegister.current.phone_no,
              information: "",
            })
          );
        }
      }
    } else {
      if (userRegister.current.email.includes("@")) {
        if (userRegister.current.first_name.length > 0) {
          if (userRegister.current.last_name.length > 0) {
            if (
              (userRegister.current.address &&
                userRegister.current.address.length > 0) ||
              user === "client"
            ) {
              if (
                (userRegister.current.postcode &&
                  userRegister.current.postcode.length > 0) ||
                user === "client"
              ) {
                if (
                  (userRegister.current.city &&
                    userRegister.current.city.length > 0) ||
                  user === "client"
                ) {
                  if (!/[a-z]/gi.test(userRegister.current.phone_no)) {
                    if (userRegister.current.agreeTerms) {
                      if (validPassword) {
                        /*if(verifyEmail){*/

                        if (
                          userRegister.current.password ===
                          userRegister.current.confirm_password
                        ) {
                          if (
                            userRegister.current.picture ||
                            user === "client"
                          ) {
                            if (
                              (userRegister.current.orga_name === undefined &&
                                user === "freelancer") ||
                              (userRegister.current.orga_name.length > 0 &&
                                user === "client")
                            ) {
                              dispatch(
                                registerAction({
                                  email: userRegister.current.email.trim(),
                                  password: userRegister.current.password,
                                  type: user,
                                  orga_name: userRegister.current.orga_name,
                                  phone_no: userRegister.current.phone_no,
                                  user_name: userRegister.current.user_name,
                                  first_name: userRegister.current.first_name,
                                  last_name: userRegister.current.last_name,
                                })
                              );
                              console.log("creating user");
                              userRegister.current.sent = true;
                            } else {
                              setError("Please add organasation name");
                            }
                          } else {
                            setError("Please add a picture");
                          }
                        } else {
                          setError("password is not identical");
                        }
                        /*}else{
                                                        setError("Verify your email please.")
                                                    }*/
                      } else {
                        setError("Please enter a valid password");
                      }
                    } else {
                      setError(
                        "You must agree to term and conditions before going any further "
                      );
                    }
                  } else {
                    setError("Please add your phone number");
                  }
                } else {
                  setError("Please add your city");
                }
              } else {
                setError("Please Enter your postcode");
              }
            } else {
              setError("Please Enter your address");
            }
          } else {
            setError("Please Enter your last name");
          }
        } else {
          setError("Please Enter your first name");
        }
      } else {
        setError("email must contain @");
      }
    }
  };
  //handle login for freelancers
  useEffect(() => {
    if (
      user_info.user &&
      user_info.user.token &&
      set_personal.loading === undefined
    ) {
      submitRef.current.click();
    }
    if (user_info.error || error) {
      window.scrollTo(0, 0);
      userRegister.current.sent = false;
      setTimeout(() => {
        user_info.error = null;
      }, 1000);
    }
    if (inputRef.current.length > 0) {
      inputRef.current.map(
        (item) =>
        (item.checked =
          userRegister.current.checked_comp.indexOf(parseInt(item.value)) ===
            -1
            ? false
            : true)
      );
    }
  });

  useEffect(() => {
    if (set_personal.message) {
      sessionStorage.setItem("user_info", JSON.stringify(user_info));
      set_personal.message = null;
      if (location.state?.target) {
        if (location.state?.target === "/dashboard/place-call") {
          if (user_info.user?.account_type === "client") {
            linkRef.current.click();
          } else {
            mytimeout.current = setTimeout(() => {
              window.location.replace("/");
            }, 7000);
          }
        } else {
          linkRef.current.click();
        }
      } else {
        mytimeout.current = setTimeout(() => {
          window.location.replace("/");
        }, 7000);
      }
    }
  }, [set_personal.message, user_info]);
  useEffect(() => {
    if (showVerifyEmail) {
      window.scrollTo(0, 0);
      document.body.style.height = "100vh";
      document.body.style.width = "100vw";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.width = "auto";
      document.body.style.overflow = "auto";
    }
  }, [showVerifyEmail]);
  //handling image change
  const handle_input_change = (e) => {
    imageRef.current.src = URL.createObjectURL(e.target.files[0]);
    userRegister.current.picture = e.target.files[0];
    //inputFormData.set("picture",e.target.files[0])
    console.log(userRegister.current.picture);
  };

  //handle competences
  const handle_competence = (e) => {
    if (e.target.checked) {
      if (!checked_comp.includes(e.target.value)) {
        checked_comp.push(parseInt(e.target.value));
        unchecked_comp = unchecked_comp.filter(
          (item) => item !== parseInt(e.target.value)
        );
        inputRef.current[inputRef.current.indexOf(e.target)].checked = true;
      }
    } else {
      if (checked_comp.includes(parseInt(e.target.value))) {
        checked_comp = checked_comp.filter(
          (item) => item !== parseInt(e.target.value)
        );
        unchecked_comp.push(parseInt(e.target.value));
        inputRef.current[inputRef.current.indexOf(e.target)].checked = false;
      }
    }
    userRegister.current.checked_comp = checked_comp;
  };
  //password validator
  const validatePasswordHandler = (str) => {
    if (str.length === 0) {
      setValidPassword(null);
    }
    if (
      str !== userRegister.current["first_name"] &&
      str !== userRegister.current["last_name"] &&
      str.length >= 8 &&
      /\w+/g.test(str) &&
      /[A-Z]/g.test(str)
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };
  return get_all_competencies.loading ? (
    <LoadingBox big />
  ) : (
    <div className="register">
      {set_personal.message ? (
        <div className="welcome" ref={(ref) => (welcomeRef.current = ref)}>
          <div className="welcome-title">
            <h2>
              Welcome,{" "}
              {(userRegister.current.first_name.value ||
                userRegister.current.first_name) +
                " " +
                (userRegister.current.last_name.value ||
                  userRegister.current.last_name)}
            </h2>
          </div>
          <div className="welcome-content">
            <div className="welcome-text">
              {user === "client" ? (
                <p>
                  Thank you for registering as a client for Curant24. <br />
                  <br />
                  We are a company that has been mediating freelancers and
                  clients worldwide in every conceivable industry for years.
                  <br />
                  <br />
                  You can find a suitable freelancer on Curant24 for all your
                  projects. And Curant24 will help you with that. <br />
                  <Link
                    to="/dashboard"
                    onClick={() => clearTimeout(mytimeout.current)}
                  >
                    Go To Dashboard
                  </Link>
                </p>
              ) : (
                <p>
                  Thank you for registering as a freelancer for Curant24. <br />
                  We are a company that has been mediating freelancers and
                  clients worldwide in every conceivable industry for years.
                  <br />
                  <br />
                  There is a suitable project for every freelancer on Curant24.{" "}
                  <br />
                  <Link
                    to="/dashboard"
                    onClick={() => clearTimeout(mytimeout.current)}
                  >
                    Go To Dashboard
                  </Link>
                </p>
              )}
            </div>
            {/* <div className="welcome-dashboard-link">
                                <Link to="/dashboard" onClick={()=>clearTimeout(mytimeout.current)}>
                                    Go To Dashboard
                                </Link>
                            </div> */}
          </div>
        </div>
      ) : (
        <div id="register-page">
          <DashboardBar register={true} />
          {user_info.error && (
            <MessageBox message={user_info.error.data} status={"failure"} />
          )}
          {check_code?.data?.message && (
            <MessageBox
              message={check_code?.data?.message}
              status={check_code?.data?.valid ? "success" : "failure"}
            />
          )}
          {error && (
            <MessageBox
              message={error}
              status={"failure"}
              onClick={() => setError(null)}
            />
          )}
          <div className="freelancer-register">
            <div className="freelancer-register-content">
              {/* <VerifyEmail func={()=>setShowVerifyEmail(false)} show={showVerifyEmail} email={userRegister.current["email"]?.value}/> */}
              <div className="title">
                <h1>
                  Register as a {user?.charAt(0).toUpperCase() + user?.slice(1)}
                  .
                </h1>
              </div>
              <div className="content">
                {/* <div className="row">
                                    <h1>User Name</h1>
                                    <div className="input">
                                        <input required type="text"  placeholder='User name' name="user_name" ref={ref=>ref!==null&&(userRegister.current[ref.name] = ref)} />
                                        <span>Choose your username here</span>
                                    </div>
                                </div> */}
                <div className="row">
                  <h1>Email Address</h1>

                  <div className="input">
                    <input
                      required
                      type="text"
                      placeholder="Email address"
                      name="email"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                    {/* <Link to="" onClick={()=>{userRegister.current["email"]?.value?.length>0&&setShowVerifyEmail(true)}}>
                                            Verify Email here
                                        </Link>*/}
                  </div>
                </div>
                <div className="row">
                  <h1>Password</h1>
                  <div className="input">
                    <input
                      required
                      type="password"
                      onChange={(e) => validatePasswordHandler(e.target.value)}
                      placeholder="Password"
                      name="password"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                    {validPassword !== null && (
                      <span
                        style={{ color: validPassword ? "#147536" : "red" }}
                      >
                        {validPassword ? "Strong" : "Weak"}
                      </span>
                    )}
                    <ul>
                      <li>
                        Your password cannot be the same as your first or last
                        name
                      </li>
                      <li>
                        Your password must be at least 8 letters or numbers
                      </li>
                      <li>
                        Your password must contain at least 1 capital letter
                      </li>
                      <li>Your password cannot contain only numbers</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <h1>Confirm Password</h1>
                  <div className="input">
                    <input
                      required
                      type="password"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                    <span>Enter the same password again</span>
                  </div>
                </div>
                <div className="row">
                  <h1>First Name</h1>
                  <div className="input">
                    <input
                      required
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <h1>Last Name</h1>
                  <div className="input">
                    <input
                      required
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <h1>Photo</h1>
                  <div className="input">
                    <img
                      src={
                        user === "client"
                          ? "/images/profile-client.png"
                          : "/images/profile-freelancer.png"
                      }
                      alt=""
                      ref={(ref) => (imageRef.current = ref)}
                    />
                    <input
                      required
                      type="file"
                      name="picture"
                      onChange={(e) => handle_input_change(e)}
                    />
                  </div>
                </div>
                {user === "freelancer" ? (
                  <>
                    <div className="row">
                      <h1>Country</h1>
                      <div className="input">
                        {/* <input
                          required
                          type="text"
                          placeholder="Country"
                          name="country"
                          ref={(ref) =>
                            ref !== null &&
                            (userRegister.current[ref.name] = ref)
                          }
                        /> */}
                        <select
                          name="country"
                          ref={(ref) =>
                            ref !== null &&
                            (userRegister.current[ref.name] = ref)
                          }
                        >
                          <option value="">select Country</option>
                          <option value="Nederland">Nederland</option>
                          <option value="Duitsland">Duitsland</option>
                          <option value="UK">UK</option>
                          <option value="België">België</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Spanje">Spanje</option>
                          <option value="Frankrijk">Frankrijk</option>
                          <option value="Italie">Italie</option>
                          <option value="Oostenrijk">Oostenrijk</option>
                          <option value="Polen">Polen</option>
                          <option value="Tsjechië">Tsjechië</option>
                          <option value="Ierland">Ierland</option>
                          <option value="Denemarken">Denemarken</option>
                          <option value="Slowakije">Slowakije</option>
                          <option value="Hongarije">Hongarije</option>
                          <option value="Roemenie">Roemenie</option>
                          <option value="Griekenland">Griekenland</option>
                          <option value="Zweden">Zweden</option>
                          <option value="Noorwegen">Noorwegen</option>
                          <option value="Finland">Finland</option>
                          <option value="Litouwen">Litouwen</option>
                          <option value="Letland">Letland</option>
                          <option value="Estland">Estland</option>
                          <option value="Zwitserland">Zwitserland</option>
                          <option value="Luxemburg">Luxemburg</option>
                          <option value="Ijsland">Ijsland</option>
                          <option value="Kroatie">Kroatie</option>
                          <option value="Servië">Servië</option>
                          <option value="Macedonië">Macedonië</option>
                          <option value="Bosnië en Herzegovina">Bosnië en Herzegovina</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Kosovo">Kosovo</option>
                          <option value="Rusland">Rusland</option>
                          <option value="Turkije">Turkije</option>
                          <option value="India">India</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Zuid-Korea">Zuid-Korea</option>
                          <option value="Vietman">Vietman</option>
                          <option value="UAE">UAE</option>
                          <option value="Saudi arabia">Saudi arabia</option>
                          <option value="Irak">Irak</option>
                          <option value="Quatar">Quatar</option>
                          <option value="Brazilie">Brazilie</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Chile">Chile</option>
                          <option value="USA">USA</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Peru">Peru</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Australia">Australia</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Libya">Libya</option>
                          <option value="Egypt">Egypt</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Tunisia">Tunisia</option>

                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <h1>Address</h1>
                      <div className="input">
                        <input
                          required
                          type="text"
                          placeholder="Address"
                          name="address"
                          ref={(ref) =>
                            ref !== null &&
                            (userRegister.current[ref.name] = ref)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <h1>Postcode</h1>
                      <div className="input">
                        <input
                          required
                          type="text"
                          placeholder="Postcode"
                          name="postcode"
                          ref={(ref) =>
                            ref !== null &&
                            (userRegister.current[ref.name] = ref)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <h1>City</h1>
                      <div className="input">
                        <input
                          required
                          type="text"
                          placeholder="City"
                          name="city"
                          ref={(ref) =>
                            ref !== null &&
                            (userRegister.current[ref.name] = ref)
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                                            <h1>Competences</h1>
                                            <div className="competences">
                                            {
                                            all_comp.map((item,index)=>(
                                            <div key={index}>
                                                <input required type="checkbox"  name={item.competence} id={item.competence} value={item.id}   ref={ref=>((ref!==null)&&(!inputRef.current.includes(ref)))&&(inputRef.current.push(ref))}  onChange={e=>handle_competence(e)}/>
                                                <h4>{item.competence}</h4>
                                            </div>
                                        ))
                                    }
                                            </div>
                                        </div> */}
                  </>
                ) : (
                  <div className="row">
                    <h1>Organasation Name</h1>
                    <div className="input">
                      <input
                        required
                        type="text"
                        placeholder="Organasation Name"
                        name="orga_name"
                        ref={(ref) =>
                          ref !== null && (userRegister.current[ref.name] = ref)
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <h1>Phone Number</h1>
                  <div className="input">
                    <input
                      required
                      type="number"
                      placeholder="Phone number"
                      name="phone_no"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <h1>How do you know us?</h1>
                  <div className="input">
                    <select
                      placeholder="-----------"
                      name="how_did_you_know_us"
                      ref={(ref) =>
                        ref !== null && (userRegister.current[ref.name] = ref)
                      }
                    >
                      <option value="Through acquintances friends ">
                        Through acquintances / friends
                      </option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Jobbird">Jobbird</option>
                      <option value="Childcare Total">Childcare Total</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Google Advertentie">
                        Google Advertentie
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <h1>Requirements</h1>
                  <div className="agreeTerms">
                    <input
                      required
                      type="checkbox"
                      name="terms"
                      id=""
                      onChange={() =>
                      (userRegister.current.agreeTerms =
                        !userRegister.current.agreeTerms)
                      }
                    />
                    <p>
                      I agree with the <a href="/terms-condition" target="_blank">
                        Terms of use </a> and{" "}
                      <a href="/privacy-policy" target="_blank">Privacy Statement</a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="registerButton">
                    <button
                      ref={(ref) => ref !== null && (submitRef.current = ref)}
                      onClick={(e) => registerUser(e)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link
        to={location.state?.target || ""}
        state={location.state}
        ref={(ref) => ref !== null && (linkRef.current = ref)}
      ></Link>
    </div>
  );
}
