import React from "react";
import "./dashboardBar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout_action } from "../../state/Actions/UserAction";
import { AiOutlineSearch } from "react-icons/ai";

export default function DashboardBar({ register = false, pdf = false }) {
  const user_info = useSelector((state) => state.user_info);
  const get_personal = useSelector((state) => state.get_personal);
  // console.log(get_personal);
  const dispatch = useDispatch();
  const logout_account = (e) => {
    sessionStorage.removeItem("user_info");
    sessionStorage.removeItem("admin");
    dispatch(logout_action(user_info.user.token));
    window.location.replace("/");
  };
  return (
    <div className="topBar">
      <div className="image">
        <Link to="/">
          <img
            src="/images/logo.png"
            style={{ width: pdf ? "100px" : "200px" }}
            alt=""
          />
        </Link>
      </div>
      <div className="links">
        {register ? (
          <>
            <Link to="">Help & Contact</Link>
            <Link to="">For companies</Link>
            <Link to="">For freelancers</Link>
            <Link to="">About us</Link>
          </>
        ) : pdf ? (
          <div style={{ marginRight: "20px" }}>
            <p>info@curant24.com</p>
            <p>www.curant24.nl</p>
            <p>www.curant24.be</p>
            <p>www.curant24.com</p>
          </div>
        ) : (
          <>
            <Link to="/dashboard">Home</Link>
            <Link to="/forum"><img src="/images/Forums_black.png" alt="" width={30} style={{marginRight: "10px"}} />Forum</Link>
            <Link to="/search">
              <AiOutlineSearch />
              Seek
            </Link>
            {get_personal.user?.account_type !== "client" && (
              <Link
                to={`/dashboard/${
                  get_personal.user &&
                  get_personal.user.account_type === "client"
                    ? "place-call"
                    : "assignement-alerts"
                }`}
              >
                {get_personal.user?.account_type === "client"
                  ? "To call to action"
                  : "Assignement alerts"}
              </Link>
            )}
            <Link to="/dashboard/invite">To invite</Link>
            <Link to="/dashboard/settings">Institutions</Link>
          </>
        )}
        {!pdf && (
          <>
            <Link to="/faq">FAQ</Link>
            {register ? (
              <Link to="/login">Login</Link>
            ) : user_info.user?.email ? (
              <Link to="" onClick={(e) => logout_account(e)}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
