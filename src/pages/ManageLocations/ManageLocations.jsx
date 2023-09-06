import React from 'react'
import { Link } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import "./manageLocations.scss";

export default function ManageLocations() {
    const manageLocations = e=>{
        e.preventDefault();
    }
  return (
      <div className="manage-locations">
          <DashboardBar/>
          <div className="manage-locations-content">
              <div className="manage-locations-header">
                  <h1>
                      Settings - Planners by Locations
                  </h1>
              </div>
              <div className="manage-locations-info">
                  <form>
                      <fieldset>
                          <legend>
                              name
                          </legend>
                          <div className="row">
                              <h5>
                                  <b>
                                    Manage locations
                                  </b>
                              </h5>
                              <div>
                                  <input type="checkbox" name="location" id="" />
                                  <p>
                                      name,address,postcode city
                                  </p>
                              </div>
                          </div>
                          <div className="save-back-buttons">
                              <Link to="/dashboard/settings">
                                  <button className='back'>
                                      Back
                                  </button>
                              </Link>
                              <button onClick={(e)=>manageLocations(e)}>
                                  Save
                              </button>
                          </div>
                      </fieldset>
                  </form>
              </div>
          </div>
          <DashboardBarBottom/>
      </div>
  )
}
