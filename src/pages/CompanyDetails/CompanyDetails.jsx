import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import DashboardBarBottom from "../../components/DashboardBarBottom/DashboardBarBottom";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import {
  add_industry_action,
  getCompanyInfo,
  set_company_details,
} from "../../state/Actions/UserAction";
import "./companyDetails.scss";
export default function CompanyDetails() {
  const user_info = useSelector((state) => state.user_info);
  const get_company_data = useSelector((state) => state.get_company_data);
  const set_company_data = useSelector((state) => state.set_company_data);
  const dispatch = useDispatch();
  const inputRef = useRef([]);
  const linkRef = useRef();
  const [newInds, setNewInds] = useState(false);

  let message = { message: set_company_data.data };
  useEffect(() => {
    if (set_company_data.data && set_company_data.data.length > 0) {
      set_company_data.data && (set_company_data.data = null);
      linkRef.current?.click();
    }
  });
  useEffect(() => {
    dispatch(getCompanyInfo(user_info.user.token));
  }, [dispatch, user_info.user.token]);

  const set_comp_info = () => {
    let data = {};
    inputRef.current.map((item) => {
      if (
        item.value !== "Selecteer een branche" &&
        item.value.length > 0 &&
        item.value !== "select currency"
      ) {
        data[item.name] = item.value;
      } else {
        data[item.name] = get_company_data.data[item.name];
      }
      return data;
    });
    console.log(document.getElementById("new_ind")?.value);
    if (document.getElementById("new_ind")?.value) {
      data["new_ind"] = document.getElementById("new_ind")?.value;
      dispatch(
        add_industry_action(
          { industry: document.getElementById("new_ind")?.value },
          user_info.user?.token
        )
      );
    }
    dispatch(set_company_details(data, user_info.user.token));
  };
  return get_company_data.loading ? (
    <LoadingBox big />
  ) : (
    <div className="company-details">
      <DashboardBar />
      <div className="content">
        <div className="title">
          <h1>Settings - Company details</h1>
        </div>
        <div className="form">
          <div className="row">
            <h4>
              Company name{" "}
              <span
                className={get_company_data.data?.company_name ? "" : "red"}
              >
                *
              </span>
            </h4>
            <input
              required
              type="text"
              name="company_name"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.company_name.length > 0
                  ? get_company_data.data.company_name
                  : "Company name")
              }
            />
          </div>
          <div className="row">
            <h4>
              What is your profession{" "}
              <span className={get_company_data.data?.profession ? "" : "red"}>
                *
              </span>
            </h4>
            <input
              required
              type="text"
              name="profession"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.profession.length > 0
                  ? get_company_data.data.profession
                  : "Profession")
              }
            />
          </div>
          <div className="row" style={{ height: "60px", position: "relative" }}>
            <h4>
              Choose which branch you are active in{" "}
              <span className={"red"}>*</span>
            </h4>
            {newInds ? (
              <>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Add your own industry"
                  name="add_ind"
                  id="new_ind"
                />
                <Link
                  className="cancel-add-industry"
                  to=""
                  onClick={() => setNewInds(false)}
                >
                  Cancel
                </Link>
              </>
            ) : (
              <select
                title="Select Job Industry"
                name="branch"
                onChange={(e) => e.target.value === "other" && setNewInds(true)}
                ref={(ref) => ref !== null && inputRef.current.push(ref)}
              >
                <option value="Selecteer een branche">
                  Selecteer een branche
                </option>
                <option
                  selected={"Construction" === get_company_data?.data?.branch}
                  value="Construction"
                >
                  Bouw
                </option>
                <option
                  selected={"Electrical" === get_company_data?.data?.branch}
                  value="Electrical"
                >
                  Elektrotechniek
                </option>
                <option
                  selected={"Installation" === get_company_data?.data?.branch}
                  value="Installation"
                >
                  Installatietechniek
                </option>
                <option
                  selected={"Infrastructure" === get_company_data?.data?.branch}
                  value="Infrastructure"
                >
                  Infra
                </option>
                <option
                  selected={"Industrial" === get_company_data?.data?.branch}
                  value="Industrial"
                >
                  Industrie
                </option>
                <option
                  selected={
                    "Health care and well being" ===
                    get_company_data?.data?.branch
                  }
                  value="Health care and well being"
                >
                  Health care and well being
                </option>
                <option
                  selected={
                    "Trade and services" === get_company_data?.data?.branch
                  }
                  value="Trade and services"
                >
                  Trade and services
                </option>
                <option
                  selected={"IT" === get_company_data?.data?.branch}
                  value="IT"
                >
                  IT
                </option>
                <option
                  selected={
                    "Justice, security and public administration" ===
                    get_company_data?.data?.branch
                  }
                  value="Justice, security and public administration"
                >
                  Justice, security and public administration
                </option>
                <option
                  selected={
                    "Environment and Agriculture" ===
                    get_company_data?.data?.branch
                  }
                  value="Environment and Agriculture"
                >
                  Environment and Agriculture
                </option>
                <option
                  selected={
                    "Media and communication" === get_company_data?.data?.branch
                  }
                  value="Media and communication"
                >
                  Media and communication
                </option>
                <option
                  selected={
                    "Education, culture and science" ===
                    get_company_data?.data?.branch
                  }
                  value="Education, culture and science"
                >
                  Education, culture and science
                </option>
                <option
                  selected={
                    "Engineering, production and construction" ===
                    get_company_data?.data?.branch
                  }
                  value="Engineering, production and construction"
                >
                  Engineering, production and construction
                </option>
                <option
                  selected={
                    "Tourism, recreation and catering" ===
                    get_company_data?.data?.branch
                  }
                  value="Tourism, recreation and catering"
                >
                  Tourism, recreation and catering
                </option>
                <option
                  selected={
                    "Transport and Logistics" === get_company_data?.data?.branch
                  }
                  value="Transport and Logistics"
                >
                  Transport and Logistics
                </option>
                <option
                  selected={"Childcare" === get_company_data?.data?.branch}
                  value="Childcare"
                >
                  Childcare
                </option>
                {get_company_data.data?.added_industry?.map((item) => (
                  <option
                    value={item.industry}
                    selected={item.industry === get_company_data?.data?.branch}
                  >
                    {item.industry}
                  </option>
                ))}
                <option value="other">Another Industry</option>
              </select>
            )}
          </div>
          <div className="row">
            <h4>
              Company register number{" "}
              <span className={get_company_data.data?.cc_number ? "" : "red"}>
                *
              </span>
            </h4>
            <input
              required
              type="text"
              name="cc_number"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.cc_number.length > 0
                  ? get_company_data.data.cc_number
                  : "Write here, the registration number where your company is registered")
              }
            />
          </div>
          <div className="row">
            <h4>
              Account number{" "}
              <span
                className={get_company_data.data?.account_number ? "" : "red"}
              >
                *
              </span>
            </h4>
            <input
              required
              type="text"
              name="account_number"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.account_number.length > 0
                  ? get_company_data.data.account_number
                  : "Enter your account number here where you want to be paid")
              }
            />
          </div>
          <div className="row">
            <h4>
              VAT number{" "}
              <span className={get_company_data.data?.vat_number ? "" : "red"}>
                *
              </span>
            </h4>
            <input
              required
              type="text"
              name="vat_number"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.vat_number.length > 0
                  ? get_company_data.data.vat_number
                  : "Write here the VAT number of your company")
              }
            />
          </div>
          {/* <div className="row">
                        <h4>
                            VAT Choice (Invoices)
                        </h4>
                        <input required type="text" name='vat_choice' ref={ref=>ref!==null&&(inputRef.current.push(ref))} placeholder={get_company_data.data&&(get_company_data.data.vat_choice.length>0?get_company_data.data.vat_choice:'21% BTW')} />
                    </div> */}
          <div className="row">
            <h4>
              Hourly rate (excl. VAT){" "}
              <span className={get_company_data.data?.hourly_rate ? "" : "red"}>
                *
              </span>
            </h4>
            <input
              required
              type="number"
              name="hourly_rate"
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
              placeholder={
                get_company_data.data &&
                (get_company_data.data.hourly_rate.length > 0
                  ? get_company_data.data.hourly_rate
                  : "What is your hourly rate Excluding VAT")
              }
            />
          </div>
          {/* <div className="row">
                        <div className="hourly-rate-avg">
                            <p>
                                Hourly rate is on average between 30 and 35 €
                            </p>
                        </div>
                    </div> */}
          {/* <div className="row">
                        <h4>
                            Hourly rate (incl. VAT/exempt)  <span className={get_company_data.data?.hourly_rate_inclusive?"":"red"}>*</span>
                        </h4>
                        <input required type="number" name='hourly_rate_inclusive' ref={ref=>ref!==null&&(inputRef.current.push(ref))} placeholder={get_company_data.data&&(get_company_data.data.hourly_rate_inclusive.length>0?get_company_data.data.hourly_rate_inclusive:"Hourly rate (incl. VAT/exempt)")} />
                    </div> */}
          <div className="row">
            <h4>
              Choose your currency{" "}
              <span className={get_company_data.data?.currency ? "" : "red"}>
                *
              </span>
            </h4>
            <select
              name="currency"
              id=""
              ref={(ref) => ref !== null && inputRef.current.push(ref)}
            >
              <option value={"EUR"}>select currency</option>
              <option
                selected={get_company_data.data?.currency === "AFN"}
                value="AFN"
              >
                Afghan Afghani
              </option>
              <option
                selected={get_company_data.data?.currency === "ALL"}
                value="ALL"
              >
                Albanian Lek
              </option>
              <option
                selected={get_company_data.data?.currency === "DZD"}
                value="DZD"
              >
                Algerian Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "AOA"}
                value="AOA"
              >
                Angolan Kwanza
              </option>
              <option
                selected={get_company_data.data?.currency === "ARS"}
                value="ARS"
              >
                Argentine Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "AMD"}
                value="AMD"
              >
                Armenian Dram
              </option>
              <option
                selected={get_company_data.data?.currency === "AWG"}
                value="AWG"
              >
                Aruban Florin
              </option>
              <option
                selected={get_company_data.data?.currency === "AUD"}
                value="AUD"
              >
                Australian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "AZN"}
                value="AZN"
              >
                Azerbaijani Manat
              </option>
              <option
                selected={get_company_data.data?.currency === "BSD"}
                value="BSD"
              >
                Bahamian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "BHD"}
                value="BHD"
              >
                Bahraini Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "BDT"}
                value="BDT"
              >
                Bangladeshi Taka
              </option>
              <option
                selected={get_company_data.data?.currency === "BBD"}
                value="BBD"
              >
                Barbadian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "BYR"}
                value="BYR"
              >
                Belarusian Ruble
              </option>
              <option
                selected={get_company_data.data?.currency === "BEF"}
                value="BEF"
              >
                Belgian Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "BZD"}
                value="BZD"
              >
                Belize Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "BMD"}
                value="BMD"
              >
                Bermudan Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "BTN"}
                value="BTN"
              >
                Bhutanese Ngultrum
              </option>
              <option
                selected={get_company_data.data?.currency === "BOB"}
                value="BOB"
              >
                Bolivian Boliviano
              </option>
              <option
                selected={get_company_data.data?.currency === "BAM"}
                value="BAM"
              >
                Bosnia-Herzegovina Convertible Mark
              </option>
              <option
                selected={get_company_data.data?.currency === "BWP"}
                value="BWP"
              >
                Botswanan Pula
              </option>
              <option
                selected={get_company_data.data?.currency === "BRL"}
                value="BRL"
              >
                Brazilian Real
              </option>
              <option
                selected={get_company_data.data?.currency === "GBP"}
                value="GBP"
              >
                British Pound Sterling
              </option>
              <option
                selected={get_company_data.data?.currency === "BND"}
                value="BND"
              >
                Brunei Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "BGN"}
                value="BGN"
              >
                Bulgarian Lev
              </option>
              <option
                selected={get_company_data.data?.currency === "BIF"}
                value="BIF"
              >
                Burundian Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "KHR"}
                value="KHR"
              >
                Cambodian Riel
              </option>
              <option
                selected={get_company_data.data?.currency === "CAD"}
                value="CAD"
              >
                Canadian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "CVE"}
                value="CVE"
              >
                Cape Verdean Escudo
              </option>
              <option
                selected={get_company_data.data?.currency === "KYD"}
                value="KYD"
              >
                Cayman Islands Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "XOF"}
                value="XOF"
              >
                CFA Franc BCEAO
              </option>
              <option
                selected={get_company_data.data?.currency === "XAF"}
                value="XAF"
              >
                CFA Franc BEAC
              </option>
              <option
                selected={get_company_data.data?.currency === "XPF"}
                value="XPF"
              >
                CFP Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "CLP"}
                value="CLP"
              >
                Chilean Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "CNY"}
                value="CNY"
              >
                Chinese Yuan
              </option>
              <option
                selected={get_company_data.data?.currency === "COP"}
                value="COP"
              >
                Colombian Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "KMF"}
                value="KMF"
              >
                Comorian Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "CDF"}
                value="CDF"
              >
                Congolese Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "CRC"}
                value="CRC"
              >
                Costa Rican ColÃ³n
              </option>
              <option
                selected={get_company_data.data?.currency === "HRK"}
                value="HRK"
              >
                Croatian Kuna
              </option>
              <option
                selected={get_company_data.data?.currency === "CUC"}
                value="CUC"
              >
                Cuban Convertible Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "CZK"}
                value="CZK"
              >
                Czech Republic Koruna
              </option>
              <option
                selected={get_company_data.data?.currency === "DKK"}
                value="DKK"
              >
                Danish Krone
              </option>
              <option
                selected={get_company_data.data?.currency === "DJF"}
                value="DJF"
              >
                Djiboutian Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "DOP"}
                value="DOP"
              >
                Dominican Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "XCD"}
                value="XCD"
              >
                East Caribbean Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "EGP"}
                value="EGP"
              >
                Egyptian Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "ERN"}
                value="ERN"
              >
                Eritrean Nakfa
              </option>
              <option
                selected={get_company_data.data?.currency === "EEK"}
                value="EEK"
              >
                Estonian Kroon
              </option>
              <option
                selected={get_company_data.data?.currency === "ETB"}
                value="ETB"
              >
                Ethiopian Birr
              </option>
              <option
                selected={get_company_data.data?.currency === "EUR"}
                value="EUR"
              >
                Euro
              </option>
              <option
                selected={get_company_data.data?.currency === "FKP"}
                value="FKP"
              >
                Falkland Islands Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "FJD"}
                value="FJD"
              >
                Fijian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "GMD"}
                value="GMD"
              >
                Gambian Dalasi
              </option>
              <option
                selected={get_company_data.data?.currency === "GEL"}
                value="GEL"
              >
                Georgian Lari
              </option>
              <option
                selected={get_company_data.data?.currency === "DEM"}
                value="DEM"
              >
                German Mark
              </option>
              <option
                selected={get_company_data.data?.currency === "GHS"}
                value="GHS"
              >
                Ghanaian Cedi
              </option>
              <option
                selected={get_company_data.data?.currency === "GIP"}
                value="GIP"
              >
                Gibraltar Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "GRD"}
                value="GRD"
              >
                Greek Drachma
              </option>
              <option
                selected={get_company_data.data?.currency === "GTQ"}
                value="GTQ"
              >
                Guatemalan Quetzal
              </option>
              <option
                selected={get_company_data.data?.currency === "GNF"}
                value="GNF"
              >
                Guinean Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "GYD"}
                value="GYD"
              >
                Guyanaese Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "HTG"}
                value="HTG"
              >
                Haitian Gourde
              </option>
              <option
                selected={get_company_data.data?.currency === "HNL"}
                value="HNL"
              >
                Honduran Lempira
              </option>
              <option
                selected={get_company_data.data?.currency === "HKD"}
                value="HKD"
              >
                Hong Kong Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "HUF"}
                value="HUF"
              >
                Hungarian Forint
              </option>
              <option
                selected={get_company_data.data?.currency === "ISK"}
                value="ISK"
              >
                Icelandic KrÃ³na
              </option>
              <option
                selected={get_company_data.data?.currency === "INR"}
                value="INR"
              >
                Indian Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "IDR"}
                value="IDR"
              >
                Indonesian Rupiah
              </option>
              <option
                selected={get_company_data.data?.currency === "IRR"}
                value="IRR"
              >
                Iranian Rial
              </option>
              <option
                selected={get_company_data.data?.currency === "IQD"}
                value="IQD"
              >
                Iraqi Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "ILS"}
                value="ILS"
              >
                Israeli New Sheqel
              </option>
              <option
                selected={get_company_data.data?.currency === "ITL"}
                value="ITL"
              >
                Italian Lira
              </option>
              <option
                selected={get_company_data.data?.currency === "JMD"}
                value="JMD"
              >
                Jamaican Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "JPY"}
                value="JPY"
              >
                Japanese Yen
              </option>
              <option
                selected={get_company_data.data?.currency === "JOD"}
                value="JOD"
              >
                Jordanian Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "KZT"}
                value="KZT"
              >
                Kazakhstani Tenge
              </option>
              <option
                selected={get_company_data.data?.currency === "KES"}
                value="KES"
              >
                Kenyan Shilling
              </option>
              <option
                selected={get_company_data.data?.currency === "KWD"}
                value="KWD"
              >
                Kuwaiti Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "KGS"}
                value="KGS"
              >
                Kyrgystani Som
              </option>
              <option
                selected={get_company_data.data?.currency === "LAK"}
                value="LAK"
              >
                Laotian Kip
              </option>
              <option
                selected={get_company_data.data?.currency === "LVL"}
                value="LVL"
              >
                Latvian Lats
              </option>
              <option
                selected={get_company_data.data?.currency === "LBP"}
                value="LBP"
              >
                Lebanese Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "LSL"}
                value="LSL"
              >
                Lesotho Loti
              </option>
              <option
                selected={get_company_data.data?.currency === "LRD"}
                value="LRD"
              >
                Liberian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "LYD"}
                value="LYD"
              >
                Libyan Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "LTL"}
                value="LTL"
              >
                Lithuanian Litas
              </option>
              <option
                selected={get_company_data.data?.currency === "MOP"}
                value="MOP"
              >
                Macanese Pataca
              </option>
              <option
                selected={get_company_data.data?.currency === "MKD"}
                value="MKD"
              >
                Macedonian Denar
              </option>
              <option
                selected={get_company_data.data?.currency === "MGA"}
                value="MGA"
              >
                Malagasy Ariary
              </option>
              <option
                selected={get_company_data.data?.currency === "MWK"}
                value="MWK"
              >
                Malawian Kwacha
              </option>
              <option
                selected={get_company_data.data?.currency === "MYR"}
                value="MYR"
              >
                Malaysian Ringgit
              </option>
              <option
                selected={get_company_data.data?.currency === "MVR"}
                value="MVR"
              >
                Maldivian Rufiyaa
              </option>
              <option
                selected={get_company_data.data?.currency === "MRO"}
                value="MRO"
              >
                Mauritanian Ouguiya
              </option>
              <option
                selected={get_company_data.data?.currency === "MUR"}
                value="MUR"
              >
                Mauritian Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "MXN"}
                value="MXN"
              >
                Mexican Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "MDL"}
                value="MDL"
              >
                Moldovan Leu
              </option>
              <option
                selected={get_company_data.data?.currency === "MNT"}
                value="MNT"
              >
                Mongolian Tugrik
              </option>
              <option
                selected={get_company_data.data?.currency === "MAD"}
                value="MAD"
              >
                Moroccan Dirham
              </option>
              <option
                selected={get_company_data.data?.currency === "MZM"}
                value="MZM"
              >
                Mozambican Metical
              </option>
              <option
                selected={get_company_data.data?.currency === "MMK"}
                value="MMK"
              >
                Myanmar Kyat
              </option>
              <option
                selected={get_company_data.data?.currency === "NAD"}
                value="NAD"
              >
                Namibian Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "NPR"}
                value="NPR"
              >
                Nepalese Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "ANG"}
                value="ANG"
              >
                Netherlands Antillean Guilder
              </option>
              <option
                selected={get_company_data.data?.currency === "TWD"}
                value="TWD"
              >
                New Taiwan Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "NZD"}
                value="NZD"
              >
                New Zealand Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "NIO"}
                value="NIO"
              >
                Nicaraguan CÃ³rdoba
              </option>
              <option
                selected={get_company_data.data?.currency === "NGN"}
                value="NGN"
              >
                Nigerian Naira
              </option>
              <option
                selected={get_company_data.data?.currency === "KPW"}
                value="KPW"
              >
                North Korean Won
              </option>
              <option
                selected={get_company_data.data?.currency === "NOK"}
                value="NOK"
              >
                Norwegian Krone
              </option>
              <option
                selected={get_company_data.data?.currency === "OMR"}
                value="OMR"
              >
                Omani Rial
              </option>
              <option
                selected={get_company_data.data?.currency === "PKR"}
                value="PKR"
              >
                Pakistani Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "PAB"}
                value="PAB"
              >
                Panamanian Balboa
              </option>
              <option
                selected={get_company_data.data?.currency === "PGK"}
                value="PGK"
              >
                Papua New Guinean Kina
              </option>
              <option
                selected={get_company_data.data?.currency === "PYG"}
                value="PYG"
              >
                Paraguayan Guarani
              </option>
              <option
                selected={get_company_data.data?.currency === "PEN"}
                value="PEN"
              >
                Peruvian Nuevo Sol
              </option>
              <option
                selected={get_company_data.data?.currency === "PHP"}
                value="PHP"
              >
                Philippine Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "PLN"}
                value="PLN"
              >
                Polish Zloty
              </option>
              <option
                selected={get_company_data.data?.currency === "QAR"}
                value="QAR"
              >
                Qatari Rial
              </option>
              <option
                selected={get_company_data.data?.currency === "RON"}
                value="RON"
              >
                Romanian Leu
              </option>
              <option
                selected={get_company_data.data?.currency === "RUB"}
                value="RUB"
              >
                Russian Ruble
              </option>
              <option
                selected={get_company_data.data?.currency === "RWF"}
                value="RWF"
              >
                Rwandan Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "SVC"}
                value="SVC"
              >
                Salvadoran ColÃ³n
              </option>
              <option
                selected={get_company_data.data?.currency === "WST"}
                value="WST"
              >
                Samoan Tala
              </option>
              <option
                selected={get_company_data.data?.currency === "SAR"}
                value="SAR"
              >
                Saudi Riyal
              </option>
              <option
                selected={get_company_data.data?.currency === "RSD"}
                value="RSD"
              >
                Serbian Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "SCR"}
                value="SCR"
              >
                Seychellois Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "SLL"}
                value="SLL"
              >
                Sierra Leonean Leone
              </option>
              <option
                selected={get_company_data.data?.currency === "SGD"}
                value="SGD"
              >
                Singapore Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "SKK"}
                value="SKK"
              >
                Slovak Koruna
              </option>
              <option
                selected={get_company_data.data?.currency === "SBD"}
                value="SBD"
              >
                Solomon Islands Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "SOS"}
                value="SOS"
              >
                Somali Shilling
              </option>
              <option
                selected={get_company_data.data?.currency === "ZAR"}
                value="ZAR"
              >
                South African Rand
              </option>
              <option
                selected={get_company_data.data?.currency === "KRW"}
                value="KRW"
              >
                South Korean Won
              </option>
              <option
                selected={get_company_data.data?.currency === "XDR"}
                value="XDR"
              >
                Special Drawing Rights
              </option>
              <option
                selected={get_company_data.data?.currency === "LKR"}
                value="LKR"
              >
                Sri Lankan Rupee
              </option>
              <option
                selected={get_company_data.data?.currency === "SHP"}
                value="SHP"
              >
                St. Helena Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "SDG"}
                value="SDG"
              >
                Sudanese Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "SRD"}
                value="SRD"
              >
                Surinamese Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "SZL"}
                value="SZL"
              >
                Swazi Lilangeni
              </option>
              <option
                selected={get_company_data.data?.currency === "SEK"}
                value="SEK"
              >
                Swedish Krona
              </option>
              <option
                selected={get_company_data.data?.currency === "CHF"}
                value="CHF"
              >
                Swiss Franc
              </option>
              <option
                selected={get_company_data.data?.currency === "SYP"}
                value="SYP"
              >
                Syrian Pound
              </option>
              <option
                selected={get_company_data.data?.currency === "STD"}
                value="STD"
              >
                São Tomé and Príncipe Dobra
              </option>
              <option
                selected={get_company_data.data?.currency === "TJS"}
                value="TJS"
              >
                Tajikistani Somoni
              </option>
              <option
                selected={get_company_data.data?.currency === "TZS"}
                value="TZS"
              >
                Tanzanian Shilling
              </option>
              <option
                selected={get_company_data.data?.currency === "THB"}
                value="THB"
              >
                Thai Baht
              </option>
              <option
                selected={get_company_data.data?.currency === "TOP"}
                value="TOP"
              >
                Tongan pa'anga
              </option>
              <option
                selected={get_company_data.data?.currency === "TTD"}
                value="TTD"
              >
                Trinidad & Tobago Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "TND"}
                value="TND"
              >
                Tunisian Dinar
              </option>
              <option
                selected={get_company_data.data?.currency === "TRY"}
                value="TRY"
              >
                Turkish Lira
              </option>
              <option
                selected={get_company_data.data?.currency === "TMT"}
                value="TMT"
              >
                Turkmenistani Manat
              </option>
              <option
                selected={get_company_data.data?.currency === "UGX"}
                value="UGX"
              >
                Ugandan Shilling
              </option>
              <option
                selected={get_company_data.data?.currency === "UAH"}
                value="UAH"
              >
                Ukrainian Hryvnia
              </option>
              <option
                selected={get_company_data.data?.currency === "AED"}
                value="AED"
              >
                United Arab Emirates Dirham
              </option>
              <option
                selected={get_company_data.data?.currency === "UYU"}
                value="UYU"
              >
                Uruguayan Peso
              </option>
              <option
                selected={get_company_data.data?.currency === "USD"}
                value="USD"
              >
                US Dollar
              </option>
              <option
                selected={get_company_data.data?.currency === "UZS"}
                value="UZS"
              >
                Uzbekistan Som
              </option>
              <option
                selected={get_company_data.data?.currency === "VUV"}
                value="VUV"
              >
                Vanuatu Vatu
              </option>
              <option
                selected={get_company_data.data?.currency === "VEF"}
                value="VEF"
              >
                Venezuelan BolÃ­var
              </option>
              <option
                selected={get_company_data.data?.currency === "VND"}
                value="VND"
              >
                Vietnamese Dong
              </option>
              <option
                selected={get_company_data.data?.currency === "YER"}
                value="YER"
              >
                Yemeni Rial
              </option>
              <option
                selected={get_company_data.data?.currency === "ZMK"}
                value="ZMK"
              >
                Zambian Kwacha
              </option>
            </select>
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
              <button className="save" onClick={() => set_comp_info()}>
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
