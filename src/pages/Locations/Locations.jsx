import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import DashboardBar from '../../components/DashboardBar/DashboardBar';
import DashboardBarBottom from '../../components/DashboardBarBottom/DashboardBarBottom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import SingleLocation from '../../components/SingleLocation/SingleLocation';
import { get_client_orga_action, get_locations_action, start_location_saving_action } from '../../state/Actions/UserAction';
import "./locations.scss";

export default function Locations() {
    const get_client_orga = useSelector(state=>state.get_client_orga);
    const locations = useSelector(state=>state.get_locations);
    const set_locations = useSelector(state=>state.set_locations);
    const add_locations = useSelector(state=>state.add_locations);
    const delete_locations = useSelector(state=>state.delete_locations);
    const user_info = useSelector(state=>state.user_info);
    let message = (set_locations.data||set_locations.error||add_locations.data||add_locations.error||delete_locations.data||delete_locations.error||"")
    const dispatch = useDispatch();

    const location_handler = e=>{
        e.preventDefault()
        dispatch(start_location_saving_action(true))
    }
    useEffect(()=>{
        dispatch(get_locations_action(user_info.user.token))
        dispatch(get_client_orga_action(user_info.user.token))
    },[dispatch, user_info.user.token])

    useEffect(()=>{
        if(set_locations.data||set_locations.error||add_locations.data||add_locations.error||delete_locations.data||delete_locations.error){
            set_locations.data = set_locations.error = add_locations.data = add_locations.error = delete_locations.error = delete_locations.data = null;
        }
    },[add_locations, delete_locations, message.length, set_locations])
    if(message.length>0){
        return (
            <Navigate to={"/dashboard/settings"} 
            state={{message}}
            />
        )
    }
    console.log(message);
  return (
      (add_locations.loading||set_locations.loading||locations.loading)?<LoadingBox big/>:(
    <div className='locations'>
        <DashboardBar/>
        <div className="locations-content">
            <div className="locations-header">
                <h1>
                    Settings - Locations
                </h1>
            </div>
            <div className="locations-text">
                <p>
                    On this page you can create different locations / departements of 1 company. <br />
                    In this way. the freelancers can contact the right departement / location of the company <br />
                    directly. 
                    <br />
                    <br />
                    You can also place separate assignements with the different <br />
                    locations / departments. This way you can manage everything in 1 account.
                </p>
            </div>
            <div className="locations-form">
                <form>
                    <fieldset>
                        <legend>
                            {
                                get_client_orga.data&&get_client_orga.data.orga_name
                            }
                        </legend>
                        <div className="single-locations">
                            {
                                locations.data&&locations.data.map((item,index)=>(
                                    <SingleLocation data={item} key={index}/>
                                ))
                            }
                            {
                                (locations.data&&!locations.data[0])&&(
                                    <SingleLocation data={{}} nv/>
                                )
                            }
                        </div>
                        <div className="back-save-buttons">
                            <Link to={"/dashboard/settings"}>
                                <button className="back">
                                        Back
                                </button>
                            </Link>
                            <button className="save" onClick={e=>location_handler(e)}>
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
  )
}
