import React from "react";
import CookieConsent from "react-cookie-consent";
import "./Cookies.scss";

const Cookies_box = () => {
  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleDecline = () => {
    console.log("Declined");
  };

  return (
    <>
     <div className="cookies-g">
     <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="myCookieConsent"
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        declineButtonStyle={{
          color: "#4e503b",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
        }}
        buttonWrapperClasses="btnclass"
        buttonClasses="acceptBtn"
        onAccept={handleAccept}
        onDecline={handleDecline}
      >
        <div className="cookies_area">
          <div className="image">
            <i class="bx bxs-cookie"></i>
          </div>
          <div className="bottom_text">
            <h5>Cookies</h5>
            <p>
              This website use cookies to help you have a superior and make
              admissile browsing experience on the website
            </p>
            <h4>Privacy policy</h4>
          </div>
          <div className="bottom_side">
            <div className="icon">
              <i class="bx bxs-cog"></i>
            </div>
            <div className="button_1">
              <button>Close</button>
            </div>
          </div>
        </div>
      </CookieConsent>
     </div>
    </>
  );
};

export default Cookies_box;
