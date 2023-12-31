import React, { useState,useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import "./footer.scss";
import { Link } from "react-router-dom";

export default function Footer({ selectedLanguage, changeCountryHandler }) {
  const [language, setLanguage]= useState("");
  const lang = selectedLanguage ? selectedLanguage : localStorage.getItem('language') ? localStorage.getItem('language') : 'dutch';

  useEffect(() => {
  setLanguage(lang);
  }, [selectedLanguage]);

  const changeLanguage = (langParam) => {
    if (langParam === "dutch") {
      localStorage.setItem("language", 'dutch');
    } else {
      localStorage.setItem("language", langParam);
    }

  };
  return (
    <div className="footer">
      <div className="left-footer">
        <div className="logo-info">
          <div className="footer-logo-img">
            <img src="/images/logo.png" alt="" />
          </div>
          <div className="footer-logo-info">
            <span>info@curant24.com</span>
          </div>
          <div className="footer-logo-social">
            <AiFillFacebook />
            <BsInstagram />
            <IoLogoYoutube />
            <BsLinkedin />
          </div>
          <div className="footer-logo-rights">
            <span>
              © {new Date().getFullYear()} Curant24, Terms - General - Privacy - Coockiestament
            </span>
          </div>
        </div>
      </div>
      <div className="right-footer">
        <div className="col-lg-4">
          <div className="footer-margin">
            <h4>For Companies</h4>
            <div>
              <Link to="/search">Find a professional</Link>
              <Link to="">How does it work</Link>
              <Link to="/join">Register for free</Link>
              <Link to="/faq">FAQ for Companies</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <h4>For freelancers</h4>
            <div>
              <Link to="/search">Find an assignment</Link>
              <Link to="">How does it work</Link>
              <Link to="/join">Register for free</Link>
              <Link to="">I want to become a freelancer</Link>
              <Link to="/faq">FAQ for freelancers</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="footer-margin">
            <h4>About Curant24</h4>
            <div>
              <Link to="/">About us</Link>
              <Link to="">Support</Link>
              <Link to="">Working at Curant24</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <h4>Contact</h4>
            <div>
              <Link to="/">Call me back</Link>
              <Link
                to="/contact?user=freelancer"
                onClick={() => window.scrollTo(0, 0)}
              >
                Freelancer
              </Link>
              <Link
                to="/contact?user=client"
                onClick={() => window.scrollTo(0, 0)}
              >
                Client
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          <div className="footer-lan">
            {/* <h4>You can always change your location and language</h4> */}
            <div className="language-change-box">
              <div className="input-label">
                {/* <p className="loc-p">Choose your location</p> */}
                <p className="lag-p">Choose your language</p>
              </div>
              <div className="contentInput">
                {/* <select
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
                </div> */}
                <select
                  name="Country"
                  onChange={(e) => {
                    localStorage.setItem("language", e.target.value);
                    setLanguage(e.target.value);
                    changeCountryHandler ? changeCountryHandler(e.target.value) : changeLanguage(e.target.value);
                  }}
                >
                  <option value="" disabled>Select language</option>
                  <option value="dutch" selected={language === "dutch" ? true : false}>Netherlands - NL</option>
                   
                  <option value="english" selected={language !== "dutch" ? true : false}>
                    English - EN</option>
                </select>
                <div className="country">
                  <div style={{ cursor: "pointer" }}>
                    <img
                      src={language === 'dutch' ? '/images/netherland_flag.png' : '/images/countries/usa_flag.png'}
                      className="flag"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
