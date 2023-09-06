import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import "./map.scss"
import { GoLocation } from 'react-icons/go';


export default function Map({place,address,lat,lng}) {

    //API key for map
    let key = "AIzaSyAyMJJSkvDYmNiDfVUHugX1dhB4ys5d-9I";
    let zoomLevel=17
    const [switcher, setSwitcher] = useState(false)
    setTimeout(() => {
      setSwitcher(true)
    }, 5000);
    //fetch the lat,lng of address 

      //green pin component
      const LocationPin = ({ text , lat , lng}) => (
        <div className="pin" lat = {lat} lng={lng}>
            <GoLocation/>
            <p className="pin-text">{text}</p>
          </div>
      )
  return (
    <div className="google-map">
      {
        switcher&&(
            <GoogleMapReact
            bootstrapURLKeys={{
                key
              }}
              defaultCenter={{address:place+","+address,lat,lng}}
              defaultZoom={zoomLevel}
            >
            <LocationPin text={place} lat={lat} lng={lng}/>
            </GoogleMapReact>
        )
      }
  </div>
  )
}
