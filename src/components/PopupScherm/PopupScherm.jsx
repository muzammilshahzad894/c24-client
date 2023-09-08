import React, { useState } from "react";
import "./PopupScherm.scss";

const PopupScherm = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div
      className="popup-cunstruction-wrapper"
      style={{ display: showPanel ? "flex" : "none" }}
    //   onClick={() => setShowPanel(false)}
    >
      <div className="popup-cunstruction-elt">
        <div className="pop_up_area">
          <div className="card_box">
            <div className="logo_image">
              <img src="/images/logo-website-icon.png" alt="image" />
            </div>
            <div className="top_area">
              <div className="text">
                <h2>Welcome to curant24</h2>
                <p>
                  Seems like you are coming from The Netherlands. You are on the
                  Dutch Curant24 page.
                </p>
                <p>
                  Where you can only find assignments and freelancers in the
                  Netherlands.
                </p>
              </div>
            </div>
            <div className="bottom_area">
              <div className="top_text">
                <h3>You can always change your location and language</h3>
              </div>
              <div className="country_lang">
              <select
                  name="Country"
                  
                >
                  <option value="">select Country</option>
                  <option value="India">India</option>
                  <option value="Nederland">Nederland</option>
                  <option value="Duitsland">Duitsland</option>
                  <option value="Polen">Polen</option>
                  <option value="Luxemburg">Luxemburg</option>
                  <option value="IJsland">IJsland</option>
                  <option value="Kroatie">Kroatie</option>
                  <option value="Servië">Servië</option>
                  <option value="Macedonië">Macedonië</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="UK">UK</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Spanje">Spanje</option>
                  <option value="Griekenland">Griekenland</option>
                  <option value="Zweden">Zweden</option>
                  <option value="Litouwen">Litouwen</option>
                  <option value="Letland">Letland</option>
                  <option value="Estland">Estland</option>
                  <option value="Zwitserland">Zwitserland</option>
                  <option value="Finland">Finland</option>
                </select>
                <div className="country">
                  <div style={{ cursor: "pointer" }}>
                    <img
                      src="/images/netherland_flag.png"
                      className="flag"
                      alt
                    />
                  </div>
                </div>
                <select
                  name="Country"
                  onChange={(e) => {
                    localStorage.setItem("language", e.target.value);
                    }
                  }
                >
                  <option value="">select language</option>
                  <option value="dutch">Dutch-English</option>
                  <option value="German-English">German-English</option>
                  <option value="English-Portuguese">English-Portuguese</option>
                  <option value="English-Spanisch">English-Spanisch</option>
                  <option value="English-French">English-French</option>
                  <option value="English">English</option>
                </select>
                <div className="country">
                  <div style={{ cursor: "pointer" }}>
                    <img
                      src="/images/netherland_flag.png"
                      className="flag"
                      alt
                    />
                  </div>
                </div>
              </div>
              
            </div>
            <div className="button_area">
              <div className="input_box">
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">Don't show this message again.</label>
              </div>
              <div className="buttons">
                <button onClick={() => setShowPanel(false)}>
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupScherm;
