import React, { useState } from "react";
import "./loading-rocket.scss";

export default function LoadingRocket({ big }) {
  const [showLoading, setShowLoading] = useState(true);

  setTimeout(() => {
    setShowLoading(false);
  }, 115000);

  return (
    <div className={big ? "loading-rocket big" : "loading-rocket"}>
      <img src="/images/rocket.gif" alt="" />
      <div className={`load ${!showLoading ? "hideLoading" : ""}`}>
        {/* <div className="loadingBar"></div> */}
      </div>
    </div>
  );
}
