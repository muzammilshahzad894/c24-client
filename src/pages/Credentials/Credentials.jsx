/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsSearch, BsTrash } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import DashboardBarBottom from "../../components/DashboardBarBottom/DashboardBarBottom";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import Select from "react-select";
import {
  addDiplomat,
  addDiplomatType_action,
  delete_diplomat_action,
  getDiplomatType_action,
  getDocuments,
} from "../../state/Actions/UserAction";
import "./credentials.scss";
import { MdAddCircle } from "react-icons/md";

export default function Credentials() {
  const user_info = useSelector((state) => state.user_info);
  const add_diplomat = useSelector((state) => state.add_diplomat);
  const get_documents = useSelector((state) => state.get_documents);
  const add_diplomat_type = useSelector((state) => state.add_diplomat_type);
  const get_diplomat_types = useSelector((state) => state.get_diplomat_types);
  const [documents, setDocuments] = useState([]);
  let [type, setType] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const data = new FormData();
  const dispatch = useDispatch();
  //handle message rendering after savings
  const linkRef = useRef();
  //ref to show uploaded files
  const embedRef = useRef();

  //select values
  const [select, setSelect] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [addDiplomatType, setAddDiplomatType] = useState("");
  //ref to show name of files
  const filenameRef = useRef([]);
  let message = { message: add_diplomat.data && add_diplomat.data.message };

  // useEffect
  useEffect(() => {
    if (get_diplomat_types.data) {
      setSelect(
        get_diplomat_types.data.map((item) => {
          return { value: item, label: item };
        })
      );
    }
  }, [get_diplomat_types]);

  /*
    useEffect(()=>{
        if(add_diplomat.data&&add_diplomat.data.status===true&&add_diplomat.data.message){
            add_diplomat.data.message&&(add_diplomat.data.message = null)
            linkRef.current.click();
        }
    },[add_diplomat])
    */
  useEffect(() => {
    dispatch(getDocuments(user_info.user?.token));
    dispatch(getDiplomatType_action(user_info.user?.token));
  }, [add_diplomat.data]);

  useEffect(() => {
    if (get_documents.data && get_documents.data[1]) {
      setDocuments(get_documents.data[1]);
    }
  }, [get_documents.data]);

  useEffect(() => {
    if (get_documents.data && get_documents.data[1]) {
      if (!type) {
        setType(documents[0]?.type);
      }
    }
  }, [documents]);

  useEffect(() => {
    if (get_documents.data && get_documents.data[1]) {
      if (type) {
        setDocuments(get_documents.data[1] /*.filter(item=>item.type===type)*/);
      }
    }
  }, [type, get_documents.data]);

  const hanldeInputChange = (e) => {
    e.target.files[0].diplomat_type = type;
    console.log(e.target.files[0]);
    data.set("pic", e.target.files[0]);
    setFiles([...files, e.target.files[0]]);
    e.target.files = [];
  };
  const handleAddDiplomat = (e) => {
    e.preventDefault();
    if (type.length > 0) {
      files.map((item) => {
        data.set(item.name, item);
        return item;
      });
      data.set("type-of-diplomat", JSON.stringify({ type }));
      setFiles([]);
      dispatch(addDiplomat(data, user_info.user.token));
    } else {
      window.scrollTo(0, 0);
      setError("Please select a file type");
    }
  };

  const handleSearch = (e) => {
    setType(e.value);
  };
  const createOption = (input) => {
    setType(input);
    dispatch(addDiplomatType_action({ type: input }, user_info.user?.token));
    dispatch(getDiplomatType_action(user_info.user?.token));
    setSearchValue("");
  };
  const deleteDiplomat = (id) => {
    dispatch(delete_diplomat_action(id, user_info.user.token));
    dispatch(getDocuments(user_info.user.token));
  };
  console.log(files);
  return get_documents.loading || add_diplomat.loading ? (
    <LoadingBox big />
  ) : (
    <div className="credentials">
      <DashboardBar />
      <div className="content">
        {error && <MessageBox status="failure" message={error} />}
       <div className="main-header">
       <div className="title">
          <h1>Institutions - Diplomas and Certificates</h1>
        </div>
        <div className="information">
            <button><img src="/images/information-icon.png" alt="information" width={25} /></button>
            <div className="information-text">
                <h4>How do I upload a document:</h4>
                <h4>Step 1: Choose type of diploma</h4>
                <h4>Step 2: Choose file</h4>
                <h4>Step 3: Click on add</h4>
            </div>
        </div>
       </div>
        <div className="pre-info">
          <p>
            The User declares to have the required diplomas prescribed under the
            Childcare Act and will upload them. Without the required diplomas,
            the user may not make himself. <br />
            available for work. If he/she does, the user is liable for the
            damage caused and a fine of € 5,000 is due.
          </p>
        </div>
        <div className="info">
          <p>
            Upload your Diplomas or Certificates on this page. Preferences is a
            digital extract from diploma register, otherwise ensure a good
            quality scan. These documents are used by <br />
            <b style={{ color: "red" }}>Curant24</b> check your profile and also
            shared with clients where you work.
          </p>
          <a
            href="https://duo.nl/particulier/uittreksel-diplomagegevens-downloaden.jsp"
            target="_blank"
          >
            Download here (free of charge) an official extract from the diploma
            register
          </a>
        </div>
        {add_diplomat_type.data && (
          <MessageBox message={add_diplomat_type.data} />
        )}
        {add_diplomat.data && add_diplomat.data.message && (
          <MessageBox message={add_diplomat.data.message} />
        )}
        <div className="type-diplomat">
          <h3>Type diplomat</h3>
          <Select
            options={select}
            value={{ label: type, value: type }}
            onChange={handleSearch}
            noOptionsMessage={(e) => {
              setSearchValue(e.inputValue);
              return "No results found. You can write and select the diploma name yourself.";
            }}
            isSearchable
          />
          {searchValue.length > 0 && (
            <div
              className="add-diplomat"
              onClick={() => createOption(searchValue)}
            >
              <MdAddCircle />
            </div>
          )}
          {/* <div className="type-diplomat-select">
                        <div className='type-diplomat-select-header' onClick={()=>setShowSelect(!showSelect)}>
                            <p>
                                {
                                    type?.length>0 ? type : "Select diplomat type"
                                }
                            </p>
                            {
                                showSelect?(
                                    <AiFillCaretUp/>
                                ):(
                                    <AiFillCaretDown/>
                                )
                            }
                        </div>
                        
                            showSelect&&(
                                <>
                                    <div className='type-diplomat-select-input'>
                                        <BsSearch/>
                                        <input type="text" placeholder='search' onChange={e=>e.target.value.length===0?setSelect(selectValues):setSelect(select.filter(item=>item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))}/>
                                    </div>
                                    {
                                        select.length>0?(
                                            <div className="type-diplomat-select-items">
                                                {
                                                    select.map(item=>(
                                                        <div onClick={()=>{setType(item);setShowSelect(false)}}>
                                                            {item}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ):(
                                            <p className='no-result-found'>
                                                No results found. You can write and select the diploma name yourself.
                                            </p>
                                        )
                                    }
                                </>
                            )
                       
                    </div> */}
        </div>
        {documents && (
          <div className="existing-documents">
            <div className="embed">
              <h3>Documents</h3>
              <div>
                {documents.map((item) => (
                  <div style={{ width: "300px" }}>
                    <a
                      href={item.diplomat_certificate}
                      title="download"
                      download
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p
                          ref={(ref) =>
                            ref !== null &&
                            (filenameRef.current["diplomat_certificate"] = ref)
                          }
                        >
                          {item.type}
                        </p>
                        <BsTrash onClick={() => deleteDiplomat(item.id)} />
                      </div>
                      <embed
                        src={item.diplomat_certificate}
                        width="200px"
                        height="100px"
                      ></embed>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="form">
          <div className="input">
            <input
              type="file"
              name="diplomat"
              id=""
              onChange={(e) => hanldeInputChange(e)}
            />
            <Link
              to="/dashboard/settings"
              state={message}
              ref={(ref) => ref !== null && (linkRef.current = ref)}
            ></Link>

            {add_diplomat.data && add_diplomat.data.status === false && (
              <h3 className="fail">{add_diplomat.data.message}</h3>
            )}
          </div>
          <div className="embed new-files">
            {files.map((item, index) => (
              /*item.diplomat_type===type&&*/ <>
                <span>{type}</span>
                {URL.createObjectURL(item)?.includes(".pdf") ? (
                  <embed
                    src={URL.createObjectURL(item)}
                    title="document"
                    width={"500px"}
                    height={"500px"}
                  />
                ) : (
                  <img
                    alt=""
                    src={URL.createObjectURL(item)}
                    title="document"
                    width={"500px"}
                    height={"500px"}
                  />
                )}
                <button
                  className="delete"
                  onClick={() => {
                    data.delete(item.name);
                    setFiles(files.filter((elt, key) => key !== index));
                  }}
                >
                  Delete
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="buttons">
          <Link to="/dashboard/settings">
            <button className="back">Back</button>
          </Link>
          <button onClick={(e) => handleAddDiplomat(e)}>Add Diploma</button>
        </div>
      </div>
      <DashboardBarBottom />
    </div>
  );
}
