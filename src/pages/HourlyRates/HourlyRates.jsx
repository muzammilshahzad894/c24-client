import React from 'react'
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import "./hourlyRates.scss";

export default function HourlyRates() {
  return (
      <div className="hourly-rates">
        <DashboardBar/>
          <div className="hourly-rates-content">
            <div className="hourly-rates-header">
              <h1>
                Settings - Hourly rates
              </h1>
            </div>
            <div className="hourly-rates-info">
              <div className="row">
                <div>
                  <h4>
                    <b>
                      Competences
                    </b>
                  </h4>
                </div>
                <div>
                  <h4>
                    <b>
                      Hourly rate (excl. VAT) 
                    </b>
                  </h4>
                </div>
                <div>
                  <h4>
                    <b>
                      Hourly rate (incl. VAT / exempt) 
                    </b>
                  </h4>
                </div>
                <div>
                  <h4>
                    <b>
                      remove
                    </b>
                  </h4>
                </div>
              </div>

              <div className="row">
                <div>
                  <p>
                    Standard
                  </p>
                </div>
                <div>
                  <input type="number" name="" value={"35.00"} id="" />
                </div>
                <div>
                  <input type="number" value={42.35}/>
                </div>
                <div>

                </div>
              </div>


              <div className="row">
                <div>
                  <p>
                    Standard
                  </p>
                </div>
                <div>
                  <input type="number" name="" value={"35.00"} id="" />
                </div>
                <div>
                  <input type="number" value={42.35}/>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>

              <div className="row">
                <div>
                  <p>
                    Standard
                  </p>
                </div>
                <div>
                  <input type="number" name="" value={"40.00"} id="" />
                </div>
                <div>
                  <input type="number" value={"48.40"}/>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>

              <div className="row">
                <div>
                  <p>
                    Standard
                  </p>
                </div>
                <div>
                  <input type="number" name="" value={"40.00"} id="" />
                </div>
                <div>
                  <input type="number" value={"48.40"}/>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>

              <div className="row">
                <div>
                  <p>
                    Standard
                  </p>
                </div>
                <div>
                  <input type="number" name="" value={"25.00"} id="" />
                </div>
                <div>
                  <input type="number" value={30.25}/>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>

              <div className="row">
                <div>
                  <select name="">
                      <option value="" selected="">---------</option>

                      <option value="baby">KDV Babygroep</option>

                      <option value="dreumes">KDV Dreumes</option>

                      <option value="peuter">KDV Peuters</option>

                      <option value="verticaal">KDV Verticale groep</option>

                      <option value="speelzaal">Peuterspeelzaal</option>

                      <option value="bso">Buitenschoolse opvang</option>

                      <option value="vve">VVE / Voorschool</option>

                      <option value="pedagoog">Pedagogisch Coach</option>

                      <option value="pbgl">Persoonlijk Begeleider</option>

                      <option value="wbgl">Woon Begeleider</option>

                      <option value="abgl">Activiteiten Begeleider</option>

                      <option value="kantoor">Kantoor</option>

                      <option value="lvd">Leidingevende</option>

                      <option value="okido">Okido</option>
                  </select>
                </div>
                <div>
                  <input type="number" name="" id="" />
                </div>
                <div>
                  <input type="number" />
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>
              <div className="row back-save-buttons">
                <Link to="/dashboard/settings">
                  <button className='back'>
                    Back
                  </button>
                </Link>
                <button>
                  Save
                </button>
              </div>
            </div>
          </div>
          <DashboardBarBottom/>
      </div>
  )
}
