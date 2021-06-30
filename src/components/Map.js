import React from "react";
import { Map as MapLeaflet , TileLayer } from "react-leaflet";
import './Map.css';

function Map({ center, zoom }) {
  return (
    <div className="map">
      <MapLeaflet center={center} zoom={zoom}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        
      </MapLeaflet>
    </div>
  );
}

export default Map;