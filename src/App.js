import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import numeral from 'numeral';
import "leaflet/dist/leaflet.css";
import './App.css';

const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

function App() {

  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");
  const [tableData,setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => setCountryInfo(data))
  },[])

  useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then (data => {
        setMapCountries(data)
        const countries = data.map(country => country.country
        )
        setCountries(countries);
        let sortedData = [...data].sort((a,b) => b.cases - a.cases);
        setTableData(sortedData);
      })
    }, [])

  const onCountryChange=  async (e) => {
    const countryName = e.target.value;
    console.log(countryName)
    const url = countryName === "worldwide" ? 
    'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryName}`;

     await fetch(url)
    .then(res => res.json())
    .then(data => {
      setInputCountry(countryName);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long ]);
      setMapZoom(4)
    })
  }

  return (
    <div className="app">
      
        <div className="row mx-5">
          <div className="col-lg-8 app__left">

            <div className="row app__header">
              <div className="col-lg-6 col-md-6 col-sm-5 ">
                <h3>Covid-19 Tracker</h3>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-7  d-flex justify-content-end align-items-center">
                <select 
                    className="form-select" 
                    onChange={onCountryChange} 
                    value={country}>

                    <option value="worldwide">Worldwide</option>
                    {countries.map(country => (
                    <option value={country}>{country}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row my-2 app__stats">
                <div className="col-lg-4 col-md-4">
                  <InfoBox 
                  isRed
                  active={casesType==='cases'}
                  onClick={e => setCasesType('cases')}
                  title="Coronavirus cases" 
                  cases={prettyPrintStat(countryInfo.todayCases)} 
                  total={prettyPrintStat(countryInfo.cases)} />
                </div>

                <div className="col-lg-4 col-md-4">
                  <InfoBox 
                  active={casesType==='recovered'}
                  onClick={e => setCasesType('recovered')}
                  title="Recovered"
                   cases={prettyPrintStat(countryInfo.todayRecovered)} 
                  total={prettyPrintStat(countryInfo.recovered)} />
                </div>

                <div className="col-lg-4 col-md-4">
                  <InfoBox 
                  isRed
                  active={casesType==='deaths'}
                  onClick={e => setCasesType('deaths')}
                  title="Deaths" 
                  cases={prettyPrintStat(countryInfo.todayDeaths)} 
                  total={prettyPrintStat(countryInfo.deaths)} />
                </div>
            </div>
            <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
          </div>
          


          <div className="card col-lg-4 bg-white app__right">
            <h4 className="side__title">Live Cases By Country</h4>
            <Table countries={tableData} />
            <h4 className="side__title">Worldwide New {casesType}</h4>
            <LineGraph casesType={casesType} />
          </div>

        </div>
      
    </div>
  );
}

export default App;
