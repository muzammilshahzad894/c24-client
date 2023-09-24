import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_timecard_file_action,
  set_timecard_action,
} from "../../state/Actions/UserAction";
import "./timecard.scss";
import { HiArrowDown } from "react-icons/hi";

export default function TimeCard({ card }) {
  const [TimesheetFile, setTimesheetFile] = useState([]);
  const [SignedTimesheetFile, setSignedTimesheetFile] = useState([]);
  const [CompleteInvoiceFile, setCompleteInvoiceFile] = useState([]);
  const [EmptyInvoice, setEmptyInvoice] = useState([]);
  const [showSaveReminder, setShowSaveReminder] = useState(false);
  const [toggleUploadFileState, settoggleUploadFileState] = useState(
    card.signed_timesheet && card.signed_timesheet.length > 0
  );
  let [showAddAttention, setShowAddAttention] = useState(
    card.attention === 1
  );
  const [status, setstatus] = useState(card.status);
  const dataRef = useRef([]);
  const inputRef = useRef([]);
  const downloadTimesheet = useRef([]);
  const downloadSignedTimesheet = useRef([]);
  const downloadCompleteInvoice = useRef([]);
  const downloadEmptyInvoice = useRef([]);
  const dispatch = useDispatch();
  const data = new FormData();
  const user_info = useSelector((state) => state.user_info);
  const login_management = useSelector((state) => state.login_management);
  const get_timecards = useSelector((state) => state.get_timecards);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (
      SignedTimesheetFile.length > 0 ||
      CompleteInvoiceFile.length > 0 ||
      TimesheetFile.length > 0 ||
      EmptyInvoice.length > 0
    ) {
      saveData();
    }
  }, [
    SignedTimesheetFile.length,
    CompleteInvoiceFile.length,
    TimesheetFile.length,
    EmptyInvoice.length,
  ]);

  let statuscode = true;
  useEffect(() => {
    const selectedValue = localStorage.getItem("selectedValue");
    if (selectedValue) {

      setShowAddAttention(selectedValue == 'Rejected'?true:false);
      
      // Set the selected value in the select box
      document.querySelector('select[name="status"]').value = selectedValue;

      // Update other state or do any necessary actions based on the selected value

      // Rest of your code
      // setShowAddAttention(selectedValue === "Approved");
      setstatus(selectedValue);
    }
  }, []);

  const showFileInputs = (name) => {
    inputRef.current[name].click();
  };

  const handleFileChange = (e) => {
    if (e.target.name === "timesheet") {
      setTimesheetFile((TimesheetFile) => {
        return [...TimesheetFile, e.target.files[0]];
      });
    } else if (e.target.name === "complete_invoice") {
      setCompleteInvoiceFile((CompleteInvoiceFile) => {
        return [...CompleteInvoiceFile, e.target.files[0]];
      });
    } else if (e.target.name === "empty_invoice") {
      setEmptyInvoice((EmptyInvoice) => {
        return [...EmptyInvoice, e.target.files[0]];
      });
    } else {
      card.attention = 0;
      setstatus("Submitted");
      setShowAddAttention(false);
      settoggleUploadFileState(true);

      if (login_management.message?.admin) {
        setShowSaveReminder(true);
      }

      setSignedTimesheetFile((SignedTimesheetFile) => {
        return [...SignedTimesheetFile, e.target.files[0]];
      });
    }
    // pRef.current[e.target.name].innerHTML = `<li> ${e.target.files[0].name} </li>`;
  };
  const deleteFile = (name, key) => {
    if (name === "timesheet") {
      setTimesheetFile(TimesheetFile.filter((item, index) => index !== key));
    } else {
      setSignedTimesheetFile(
        SignedTimesheetFile.filter((item, index) => index !== key)
      );
      settoggleUploadFileState(false);
      setShowAddAttention(false);
      if (SignedTimesheetFile.length === 0) {
        setShowSaveReminder(false);
      }
    }
  };
  const delete_file_handler = (name, id) => {
    dispatch(delete_timecard_file_action(name, id, user_info.user.token));
  };
  const saveData = () => {
    let saved_data = {};
    dataRef.current.map((item) => {
      saved_data[item.name] = item.value;
      return item;
    });

    saved_data.id = card.id;
    if (login_management.message?.admin) {
      TimesheetFile.map((item) => data.append("timesheet", item));
      SignedTimesheetFile.map((item) => data.append("signed_timesheet", item));
      CompleteInvoiceFile.map((item) => data.append("complete_invoice", item));
      EmptyInvoice.map((item) => data.append("empty_invoice", item));
    }
    saved_data.attention = showAddAttention ? 1 : 0;
    !saved_data.status && (saved_data.status = "Submitted");
    saved_data.isAdmin = login_management.message?.admin;

    data.set("info", JSON.stringify(saved_data));
    dispatch(set_timecard_action(data, user_info.user.token));
  };
  return (
    <div className="timecard-wrapper">
      <div className="timecard-row">
        <div className="timecard-company-input">
          {login_management.message?.admin ? (
            user_info.user?.account_type === "client" ? (
              <div style={{ display: "block" }}>
                <input
                  type="text"
                  placeholder=""
                  maxLength={200}
                  name="freelancer_name"
                  defaultValue={card.freelancer_name}
                  ref={(ref) => ref != null && dataRef.current.push(ref)}
                  style={{ marginBottom: "5px", marginLeft: "15px" }}
                />
                {/** employer input is also company_name */}
                <input
                  type="text"
                  placeholder=""
                  maxLength={200}
                  name="employer"
                  defaultValue={card.employer}
                  ref={(ref) => ref != null && dataRef.current.push(ref)}
                  style={{ marginBottom: "5px", marginLeft: "15px" }}
                />
              </div>
            ) : (
              <input
                type="text"
                placeholder="Company 1"
                name="employer"
                defaultValue={card.employer}
                ref={(ref) => ref != null && dataRef.current.push(ref)}
              />
            )
          ) : (
            <p>
              {user_info.user?.account_type === "client" &&
                (card.freelancer_name || "blank")}{" "}
              <br />
              {card.employer || "blank"}
            </p>
          )}
        </div>
        <div className="timecard-status">
          {toggleUploadFileState ? (
            <div className={`submitted ${showAddAttention && "red-flag"}`}>
              <div
                style={{
                  border:
                    login_management?.message?.admin ||
                    user_info.user?.account_type === "client"
                      ? "1px #000 solid"
                      : "none",
                  justifyContent:
                    login_management?.message?.admin ||
                    user_info.user?.account_type === "client"
                      ? "space-between"
                      : "center",
                }}
              >
                {login_management.message?.admin ||
                user_info.user?.account_type === "client" ? (
                  <>
                    <h3>{status}</h3>
                    <h3 className="status">
                      {status === "Rejected" ? (
                        <AiOutlineClose className="pending" />
                      ) : (
                        <MdOutlineDone className="done" />
                      )}
                    </h3>
                  </>
                ) : (
                  <div style={{ display: "block", marginLeft: "0px" }}>
                    <p>{status}</p>
                    <p>{card.attention_text}</p>
                  </div>
                )}
              </div>
              {
                /*login_management.message?.admin&&*/ <>
                  {/* <input type="text"ref={ref=>ref!=null&&(dataRef.current.push(ref))} defaultValue={status} name="status" />
                                         onClick={()=>setShowAddAttention(!showAddAttention)}*/}
                  <div
                    className={`attention ${showAddAttention && "red-flag"}`}
                  >
                    <span>Attention</span>
                    <CgDanger />
                  </div>
                </>
              }
              {(showAddAttention && login_management.message?.admin) ||
              user_info.user?.account_type === "client" ? (
                <>
                  {/* <p style={{background:"#fff",width:"100%",height:"40px",margin:"0",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            Make a choice
                                        </p> */}
                  <div className="attention_textarea">
                    <select
                      name="status"
                      id=""
                      ref={(ref) => ref != null && dataRef.current.push(ref)}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        localStorage.setItem("selectedValue", selectedValue);

                        e.target.value === "Approved"
                          ? setShowAddAttention(false)
                          : setShowAddAttention(true);
                        setstatus(
                          e.target.value.length > 0 ? e.target.value : ""
                        );
                        saveData();
                      }}
                    >
                      <option value="">Make a choice</option>
                      <option
                        value="Approved"
                        className="{card.status === 'Approved' ? 'attention' : 'attention red-flag'}"
                        selected={card.status === "Approved"}
                      >
                        Approved
                      </option>
                      <option
                        value="Rejected"
                        className="{card.status === 'Rejected' ? 'attention red-flag' : 'attention'}"
                        selected={card.status === "Rejected"}
                      >
                        Rejected
                      </option>
                    </select>
                  </div>
                  <textarea
                    name="attention_text"
                    style={{ width: "200px", resize: "none" }}
                    defaultValue={card.attention_text}
                    placeholder="Write a comment"
                    ref={(ref) => ref != null && dataRef.current.push(ref)}
                    reid=""
                    cols="60"
                    rows="2"
                  ></textarea>
                </>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <>
              {/* <h3>
                                {card.status}
                            </h3>
                            <h3 className="status">
                                <AiOutlineClose className='pending'/>
                            </h3> */}
              <div className="blank_">
                <p>No files were uploaded yet</p>
              </div>
            </>
          )}
        </div>
        <div className="timecard-week">
          {/* <select name="week" id="" ref={ref=>ref!=null&&(dataRef.current.push(ref))}>
                    {a.map((item,key)=>(
                        <option key={key} value={new Date().getFullYear() + '-' +item} selected={(new Date().getFullYear() + '-' +item===card.week)}>{new Date().getFullYear() + '-' +item}</option>
                        ))}
                </select> */}
          {login_management.message?.admin ? (
            <input
              type="week"
              name="week"
              id=""
              defaultValue={card.week}
              ref={(ref) => ref != null && dataRef.current.push(ref)}
            />
          ) : (
            <p>
              Week {card.week?.replace("W", "")?.split("-").reverse().join("-")}
            </p>
          )}
          {/* <AiTwotoneCalendar/> */}
        </div>
        {user_info.user?.account_type === "freelancer" && (
          <div className="timecard-download">
            <ul name="timesheet" style={{ listStyle: "none" }}>
              {login_management.message?.admin
                ? TimesheetFile.length > 0 &&
                  TimesheetFile.map((item, key) => (
                    <div key={key}>
                      <li>
                        {item.name?.length > 15
                          ? item.name.split(".")[0].slice(0, 5) +
                            "..." +
                            item.name.slice(item.name.length - 6)
                          : item.name}
                      </li>
                      <button onClick={() => deleteFile("timesheet", key)}>
                        Delete
                      </button>
                    </div>
                  ))
                : card.timesheet?.map((elt, key) => (
                    <li key={key}>
                      <a
                        href={elt.timesheet}
                        download
                        style={{ display: "none" }}
                        ref={(ref) =>
                          ref !== null && downloadTimesheet.current.push(ref)
                        }
                      >
                        {elt.timesheet?.split("/")[3]?.length > 15
                          ? elt.timesheet?.split("/")[3]?.slice(0, 8) +
                            "..." +
                            elt.timesheet
                              ?.split("/")[3]
                              ?.slice(elt.timesheet?.split("/")[3]?.length - 8)
                          : elt.timesheet}
                      </a>
                    </li>
                  ))}
              {!login_management.message?.admin &&
                (card.timesheet?.length > 0 ? (
                  <div
                    className="download-button"
                    style={{ flexDirection: "row" }}
                    onClick={() =>
                      downloadTimesheet.current?.map((item) => item.click())
                    }
                  >
                    <HiArrowDown style={{ overflow: "visible" }} />
                    <h4>DOWNLOAD</h4>
                  </div>
                ) : (
                  <div
                    className="download-button"
                    style={{ flexDirection: "row" }}
                  >
                    <HiArrowDown style={{ overflow: "visible" }} />
                    <h4>No downloads available</h4>
                  </div>
                ))}
            </ul>
            {login_management?.message?.admin && (
              <div>
                <button
                  className="upload"
                  onClick={() => showFileInputs("timesheet")}
                >
                  Upload
                </button>
                <input
                  type="file"
                  accept=".pdf"
                  name="timesheet"
                  style={{ display: "none" }}
                  id=""
                  ref={(ref) =>
                    ref !== null && (inputRef.current["timesheet"] = ref)
                  }
                  onChange={(e) => handleFileChange(e)}
                />
                <div className="download-files">
                  {card.timesheet &&
                    card.timesheet?.map((item) => (
                      <>
                        <a
                          href={item.timesheet}
                          download
                          target="_blank"
                          rel="noreferrer"
                          style={{ marginLeft: "10px" }}
                        >
                          {item.timesheet &&
                          item.timesheet.split("/")[3]?.length > 15
                            ? item.timesheet.split("/")[3]?.slice(0, 8) +
                              "..." +
                              item.timesheet
                                .split("/")[3]
                                ?.slice(
                                  item.timesheet.split("/")[3]?.length - 8
                                )
                            : item.timesheet.split("/")[3]}
                        </a>
                        <button
                          onClick={() =>
                            delete_file_handler("timesheet", item.id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="timecard-upload-signed-timesheet">
          <ul name="signed_timesheet" style={{ listStyle: "none" }}>
            {!login_management.message?.admin &&
            user_info.user?.account_type === "freelancer"
              ? SignedTimesheetFile.length > 0 &&
                SignedTimesheetFile.map((item, key) => (
                  <div key={key}>
                    <li>
                      {item.name?.length > 15
                        ? item.name.split(".")[0].slice(0, 5) +
                          "..." +
                          item.name.slice(item.name.length - 6)
                        : item.name}
                    </li>
                    <button onClick={() => deleteFile("signed_timesheet", key)}>
                      Delete
                    </button>
                  </div>
                ))
              : card.signed_timesheet?.map((elt, key) => (
                  <li key={key}>
                    <a
                      href={elt.signed_timesheet}
                      download
                      style={{ display: "none" }}
                      ref={(ref) =>
                        ref !== null &&
                        downloadSignedTimesheet.current.push(ref)
                      }
                    >
                      {elt.signed_timesheet?.split("/")[3]?.length > 15
                        ? elt.signed_timesheet?.split("/")[3]?.slice(0, 8) +
                          "..." +
                          elt.signed_timesheet
                            ?.split("/")[3]
                            ?.slice(
                              elt.signed_timesheet?.split("/")[3]?.length - 8
                            )
                        : elt.signed_timesheet}
                    </a>
                  </li>
                ))}
            {((login_management.message?.admin &&
              user_info.user?.account_type === "freelancer") ||
              (!login_management.message?.admin &&
                user_info.user?.account_type === "client")) &&
              (card.signed_timesheet?.length > 0 ? (
                <div
                  className="download-button"
                  style={{ flexDirection: "row" }}
                  onClick={() =>
                    downloadSignedTimesheet.current?.map((item) => item.click())
                  }
                >
                  <HiArrowDown style={{ overflow: "visible" }} />
                  <h4>DOWNLOAD</h4>
                </div>
              ) : (
                <div
                  className="download-button"
                  style={{ flexDirection: "row" }}
                >
                  <HiArrowDown style={{ overflow: "visible" }} />
                  <h4>No downloads available</h4>
                </div>
              ))}
          </ul>
          {((!login_management.message?.admin &&
            user_info.user?.account_type === "freelancer") ||
            (login_management.message?.admin &&
              user_info.user?.account_type === "client")) && (
            <div>
              {card.signed_timesheet?.map((item) => (
                <div>
                  <a
                    href={item && item.signed_timesheet}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item && item.signed_timesheet.split("/")[3]?.length > 15
                      ? item.signed_timesheet.split("/")[3]?.slice(0, 8) +
                        "..." +
                        item.signed_timesheet
                          .split("/")[3]
                          ?.slice(
                            item.signed_timesheet.split("/")[3]?.length - 8
                          )
                      : item.signed_timesheet.split("/")[3]}
                  </a>
                  <button
                    onClick={() =>
                      delete_file_handler("signed_timesheet", item.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className="upload"
                onClick={() => showFileInputs("signed_timesheet")}
              >
                Upload
              </button>
              <input
                type="file"
                accept=".pdf"
                name="signed_timesheet"
                id=""
                style={{ display: "none" }}
                ref={(ref) =>
                  ref !== null && (inputRef.current["signed_timesheet"] = ref)
                }
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          )}
          {showSaveReminder && (
            <div className="save-button-reminder">
              <BsExclamationTriangle />
              <p>
                Don't forget to press the save button when you have uploaded the
                document. Otherwise the file will not be saved.
              </p>
            </div>
          )}
        </div>

        {user_info.user?.account_type === "freelancer" && <div></div>}
        {user_info.user?.account_type === "freelancer" && (
          <>
            <div></div>
            <div></div>
            <div className="invoice-empty-example" style={{ width: "300px" }}>
              <h4>
                Download empty <br />
                invoice example here
              </h4>
              <ul name="empty_invoice" style={{ listStyle: "none" }}>
                {login_management.message?.admin
                  ? EmptyInvoice.length > 0 &&
                    EmptyInvoice.map((item, key) => (
                      <div key={key}>
                        <li>
                          {item.name?.length > 15
                            ? item.name.split(".")[0].slice(0, 5) +
                              "..." +
                              item.name.slice(item.name.length - 6)
                            : item.name}
                        </li>
                        <button
                          onClick={() => deleteFile("empty_invoice", key)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  : card.empty_invoice?.map((elt, key) => (
                      <li key={key}>
                        <a
                          href={elt.empty_invoice}
                          download
                          style={{ display: "none" }}
                          ref={(ref) =>
                            ref !== null &&
                            downloadEmptyInvoice.current?.push(ref)
                          }
                        >
                          {elt.empty_invoice?.split("/")[3]?.length > 15
                            ? elt.empty_invoice?.split("/")[3]?.slice(0, 8) +
                              "..." +
                              elt.empty_invoice
                                ?.split("/")[3]
                                ?.slice(
                                  elt.empty_invoice?.split("/")[3]?.length - 8
                                )
                            : elt.empty_invoice}
                        </a>
                      </li>
                    ))}
                {!login_management.message?.admin &&
                  user_info.user?.account_type === "freelancer" &&
                  (card.empty_invoice?.length > 0 ? (
                    <div
                      className="download-button"
                      style={{ flexDirection: "row", justifyContent: "center" }}
                      onClick={() =>
                        downloadEmptyInvoice.current?.map((item) =>
                          item.click()
                        )
                      }
                    >
                      <HiArrowDown style={{ overflow: "visible" }} />
                      <h4>DOWNLOAD</h4>
                    </div>
                  ) : (
                    <div
                      className="download-button"
                      style={{ flexDirection: "row" }}
                    >
                      <HiArrowDown style={{ overflow: "visible" }} />
                      <h4>No downloads available</h4>
                    </div>
                  ))}
              </ul>
              {login_management.message?.admin && (
                <div>
                  <button
                    className="upload"
                    onClick={() => showFileInputs("empty_invoice")}
                  >
                    Upload
                  </button>
                  {card.empty_invoice?.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "125px !important",
                        marginLeft: "5px",
                      }}
                    >
                      <a
                        href={item && item.empty_invoice}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item && item.empty_invoice.split("/")[3]?.length > 15
                          ? item.empty_invoice.split("/")[3]?.slice(0, 8) +
                            "..." +
                            item.empty_invoice
                              .split("/")[3]
                              ?.slice(
                                item.empty_invoice.split("/")[3]?.length - 8
                              )
                          : item.empty_invoice.split("/")[3]}
                      </a>
                      <button
                        className="delete"
                        onClick={() =>
                          delete_file_handler("empty_invoice", item.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    accept=".pdf"
                    name="empty_invoice"
                    id=""
                    style={{ display: "none" }}
                    ref={(ref) =>
                      ref !== null && (inputRef.current["empty_invoice"] = ref)
                    }
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
              )}
            </div>
          </>
        )}
        <div className="upload-complete-invoice">
          {user_info.user?.account_type === "freelancer" && (
            <h4>
              {login_management.message?.admin
                ? "Download the "
                : "Upload your"}{" "}
              complete <br />
              invoice in PDF format here
            </h4>
          )}
          {(login_management.message?.admin &&
            user_info.user?.account_type === "freelancer") ||
          (!login_management.message?.admin &&
            user_info.user?.account_type === "client")
            ? card.complete_invoice?.map((elt, key) => (
                <li key={key} style={{ display: "none" }}>
                  <a
                    href={elt.complete_invoice}
                    download
                    style={{ display: "none" }}
                    ref={(ref) =>
                      ref !== null && downloadCompleteInvoice.current.push(ref)
                    }
                  >
                    {elt.complete_invoice?.split("/")[3]?.length > 15
                      ? elt.complete_invoice?.split("/")[3]?.slice(0, 8) +
                        "..." +
                        elt.complete_invoice
                          ?.split("/")[3]
                          ?.slice(
                            elt.complete_invoice?.split("/")[3]?.length - 8
                          )
                      : elt.complete_invoice}
                  </a>
                </li>
              ))
            : CompleteInvoiceFile.length > 0 &&
              CompleteInvoiceFile.map((item, key) => (
                <div key={key}>
                  <li>
                    {item.name?.length > 15
                      ? item.name.split(".")[0].slice(0, 5) +
                        "..." +
                        item.name.slice(item.name.length - 6)
                      : item.name}
                  </li>
                  <button onClick={() => deleteFile("complete_invoice", key)}>
                    Delete
                  </button>
                </div>
              ))}
          {((login_management.message?.admin &&
            user_info.user?.account_type === "freelancer") ||
            (!login_management.message?.admin &&
              user_info.user?.account_type === "client")) &&
            (card.signed_timesheet?.length > 0 ? (
              <div
                className="download-button"
                style={{ flexDirection: "row" }}
                onClick={() =>
                  downloadCompleteInvoice.current?.map((item) => item.click())
                }
              >
                <HiArrowDown style={{ overflow: "visible" }} />
                <h4>DOWNLOAD</h4>
              </div>
            ) : (
              <div className="download-button" style={{ flexDirection: "row" }}>
                <HiArrowDown style={{ overflow: "visible" }} />
                <h4>No downloads available</h4>
              </div>
            ))}
          {((!login_management.message?.admin &&
            user_info.user?.account_type === "freelancer") ||
            (login_management.message?.admin &&
              user_info.user?.account_type === "client")) && (
            <>
              {card.complete_invoice?.map((item) => (
                <div>
                  <a
                    href={item && item.complete_invoice}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item && item.complete_invoice.split("/")[3]?.length > 15
                      ? item.complete_invoice.split("/")[3]?.slice(0, 8) +
                        "..." +
                        item.complete_invoice
                          .split("/")[3]
                          ?.slice(
                            item.complete_invoice.split("/")[3]?.length - 8
                          )
                      : item.complete_invoice.split("/")[3]}
                  </a>
                  <button
                    onClick={() =>
                      delete_file_handler("complete_invoice", item.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className="upload"
                onClick={() => showFileInputs("complete_invoice")}
              >
                Upload
              </button>
            </>
          )}
          <input
            type="file"
            accept=".pdf"
            name="complete_invoice"
            id=""
            style={{ display: "none" }}
            ref={(ref) =>
              ref !== null && (inputRef.current["complete_invoice"] = ref)
            }
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        {
          <div className="timecard-save">
            <button onClick={() => saveData()}>Save</button>
          </div>
        }
      </div>
    </div>
  );
}
