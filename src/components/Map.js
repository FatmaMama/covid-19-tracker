import React from "react";
import { Map as MapLeaflet , TileLayer, Circle, Popup } from "react-leaflet";
import './Map.css';
import numeral from "numeral"

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 900,
  },
};


const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
         </div>
      </Popup>
    </Circle>
  ));

export default function Map({ center, zoom, countries, casesType}) {

  return (
    <div className="map my-md-3 my-sm-3">
      <MapLeaflet center={center} zoom={zoom}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapLeaflet>
    </div>
  );
}

