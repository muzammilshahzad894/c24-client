import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import DashboardBarBottom from "../../components/DashboardBarBottom/DashboardBarBottom";
import LangSelect from "../../components/LangSelect/LangSelect";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import {
  delete_user_file,
  getPersonalInfo,
  setPersonalInfo,
  update_user_file,
} from "../../state/Actions/UserAction";
import "./personalInformation.scss";
export default function PersonalInformation() {
  const user_info = useSelector((state) => state.user_info);
  const get_personal = useSelector((state) => state.get_personal);
  const set_personal = useSelector((state) => state.set_personal);
  const update_user_files = useSelector((state) => state.update_user_files);
  const info = get_personal.user || {};
  const [about, setAbout] = useState("");
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const data = new FormData();
  const imageRef = useRef([]);
  const filesRef = useRef({});
  const inputRef = useRef({});
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(getPersonalInfo(user_info.user.token));
  }, [dispatch, user_info.user.token]);
  useEffect(() => {
    setAbout(get_personal.user && (get_personal.user.about || ""));
  }, [get_personal]);

  //to show messages after process ends
  const linkRef = useRef();

  let message = { message: set_personal.message };

  useEffect(() => {
    if (set_personal.message && set_personal.message.length > 0) {
      set_personal.message && (set_personal.message = null);
      linkRef.current.click();
    }
  });

  const handle_input_change = (e) => {
    imageRef.current["picture"].src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const changePersonalInfo = (e) => {
    e.preventDefault();
    setSave(true);
  };

  useEffect(() => {
    if (save) {
      //info["image"] = image.image;
      info.about = about;
      if (info.birthday) {
        info.birthday = info.birthday.split("T")[0];
      }
      if (info.email?.length === 0) {
        info.email = user_info.user?.email;
      }
      console.log(info);
      data.set("info", JSON.stringify(info));
      data.set("picture", image);
      dispatch(setPersonalInfo(data, user_info.user.token));
    }
  }, [save]);

  const hanldeFileSelect = (e) => {
    data.set(e.target.name, e.target.files[0]);
    filesRef.current[e.target.name].src = URL.createObjectURL(
      e.target.files[0]
    );
    if (e.target.name === "video") {
      filesRef.current[e.target.name]?.load();
    }
    //update the chosen file directely on the database
    let info = new FormData();
    info.set(e.target.name, e.target.files[0]);
    info.set("data", JSON.stringify({ file: e.target.name }));
    dispatch(update_user_file(info, user_info.user.token));
  };
  const deleteFiles = (name) => {
    let info = new FormData();
    info.set("data", JSON.stringify({ file: name }));
    dispatch(delete_user_file(info, user_info.user.token));
    dispatch(getPersonalInfo(user_info.user?.token));
  };

  //launch getPersonalInfo once file deleted
  useEffect(() => {
    if (update_user_files.data) {
      dispatch(getPersonalInfo(user_info.user?.token));
    }
  }, [update_user_files]);
  console.log(info);
  return get_personal.loading ? (
    <LoadingBox big />
  ) : (
    <div className="personal-information">
      <DashboardBar />

      {set_personal.error && (
        <div className="message">
          <MessageBox status="failure" message={set_personal.error} />
        </div>
      )}
      <div className="content">
        <div className="title">
          <h1>Settings - Personal data</h1>
        </div>
        <div className="form">
          <div className="row">
            <h3>Email address</h3>
            <input
              type="text"
              name="email"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={user_info.user?.email}
            />
          </div>
          <div className="row">
            <h3>First Name</h3>
            <input
              type="text"
              name="first_name"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.first_name && info.first_name.length > 0
                  ? info.first_name
                  : "First Name"
              }
            />
          </div>
          <div className="row">
            <h3>Last Name</h3>
            <input
              type="text"
              name="last_name"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.last_name && info.last_name.length > 0
                  ? info.last_name
                  : "Last Name"
              }
            />
          </div>
          <div className="row">
            <h3>Photo</h3>
            <div className="inputs">
              <img
                src={get_personal.user && get_personal.user.picture}
                name="picture"
                ref={(ref) =>
                  ref !== null && (imageRef.current[ref.name] = ref)
                }
                alt=""
              />
              <input
                type="file"
                name="picture"
                id=""
                onChange={(e) => handle_input_change(e)}
              />
              <p>Use a neat, professional profile picture.</p>
            </div>
            {get_personal.user?.picture && (
              <div className="delete-button">
                <button
                  className="delete"
                  onClick={() => deleteFiles("picture")}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="row">
            <h3>Address</h3>
            <input
              type="text"
              name="address"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.address && info.address.length > 0
                  ? info.address
                  : "Address"
              }
            />
          </div>
          <div className="row">
            <h3>Postcode</h3>
            <input
              type="text"
              name="postcode"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.postcode && info.postcode.length > 0
                  ? info.postcode
                  : "Postcode"
              }
            />
          </div>
          <div className="row">
            <h3>City</h3>
            <input
              type="text"
              name="city"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.city && info.city.length > 0 ? info.city : "City"
              }
            />
          </div>
          <div className="row">
            <h3>phone number</h3>
            <input
              type="text"
              name="phone_no"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              placeholder={
                info.phone_no && info.phone_no.length > 0
                  ? info.phone_no
                  : "phone number"
              }
            />
          </div>
          <div className="row">
            <p>
              A short profile text about yourself. This is visible to clients.
            </p>
          </div>
          <div className="row">
            <h3>Profile text</h3>
            <div className="inputs">
              <textarea
                value={about}
                id=""
                cols="30"
                rows="10"
                name="about"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <LangSelect save={save} />
          </div>
          <div className="row">
            <div className="video_text">
              <p>
                ! Upload an introductory video <br />
                <br />
                Upload an introductory video of approximation 30 seconds. <br />
                In which you tell who you are and what your profession is.
                <br />
                <br />
                In this way, the client and Curant24 can immediately see who you
                are.
                <br />
                <br />
                An intrudoctory video also speeds up the application <br />
                procedure.
              </p>
            </div>
            <div className="video">
              <video
                src={info.video}
                name="video"
                ref={(ref) => ref !== null && (filesRef.current["video"] = ref)}
                autoPlay
                muted
                controls
              >
                <source src={info.video} />
              </video>
              <input
                type="file"
                name="video"
                accept="video/*"
                ref={(ref) =>
                  ref !== null && (inputRef.current[ref.name] = ref)
                }
                style={{ display: "none" }}
                onChange={(e) => hanldeFileSelect(e)}
              />
              <div className="video-buttons">
                <div
                  className="modify-profile-video"
                  onClick={() => inputRef.current["video"].click()}
                >
                  <button>
                    Modify <BsPen />
                  </button>
                </div>
                <div
                  className="delete-profile-video"
                  onClick={() => deleteFiles("video")}
                >
                  <button>
                    Delete <BsTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <p>
              With this you are only visible to organizations in your
              environment
            </p>
          </div>
          <div className="row">
            <h3>Maximum Travel Distance (Km)</h3>
            <div className="inputs">
              <input
                type="number"
                name="max_travel_distance"
                onChange={(e) =>
                  (info[e.target.name] = e.target.value.toString())
                }
                placeholder={
                  info.max_travel_distance &&
                  info.max_travel_distance.length > 0 &&
                  (info.max_travel_distance.length > 0
                    ? info.max_travel_distance
                    : "Maximum Travel Distance (Km)")
                }
              />
            </div>
          </div>
          <div className="row">
            <p>Please indicate in which year you started working</p>
          </div>
          <div className="row">
            <h3>Work experience since</h3>
            <div className="inputs">
              <input
                type="number"
                id=""
                name="work_experience"
                onChange={(e) =>
                  (info[e.target.name] = e.target.value.toString())
                }
                placeholder={info.work_experience}
              />
            </div>
          </div>
          <div className="row">
            <h3>Date of birth</h3>
            <input
              type="date"
              name="birthday"
              onChange={(e) => (info[e.target.name] = e.target.value)}
              defaultValue={info.birthday?.split("T")[0]}
            />
          </div>
          <div className="row">
            <h3>ID number passport or ID card</h3>
            <div className="inputs">
              <input
                type="text"
                name="bsn"
                onChange={(e) => (info[e.target.name] = e.target.value)}
                placeholder={
                  info.bsn && info.bsn.length > 0
                    ? info.bsn
                    : "Enter the number, which is in your passport or identity card here"
                }
              />
            </div>
          </div>
          <div className="row">
            <p>
              {/* For freelancers who work in childcare. <br /> */}
              Your number is only used for the link in the register of persons. only by clients within whom we have special processing agreement.
              {/* <br />
              <br />
              The BSN number is only passed on to clients with whom a special
              agreement has been signed, these clients use the BSN number for
              linking in <br />
              the register of persons. */}
            </p>
          </div>
          <div className="row">
            <div className="back-save">
              <Link to="/dashboard/settings">
                <button className="back">Back</button>
              </Link>
              <Link
                to="/dashboard/settings"
                state={message}
                ref={(ref) => ref !== null && (linkRef.current = ref)}
              ></Link>
              <button className="save" onClick={(e) => changePersonalInfo(e)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <DashboardBarBottom />
    </div>
  );
}
