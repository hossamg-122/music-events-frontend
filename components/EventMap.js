import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
import "mapbox-gl/dist/mapbox-gl.css";
const EventMap = ({ event }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    
    zoom: 13,
  });
  useEffect(() => {
    Geocode.fromAddress(event.attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  Geocode.setLanguage("en");
  if (loading) return false;
  console.log(event.attributes.address);
  console.log(lat, lng);
  return (
    <ReactMapGl
      {...viewport}
      
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{width:"100%",height:"500px",}}
      onZoom={(vp) =>{ 
        console.log(vp)  
        setViewport(vp)}}
        onDrag={(vp) =>{ 
            console.log(vp)  
            setViewport(vp)}}
      
    >
      <Marker key={event.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
};

export default EventMap;
