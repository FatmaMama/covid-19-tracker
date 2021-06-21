import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");
  const [tableData,setTableData] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => setCountryInfo(data))
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then (data => {
        const countries = data.map(country => country.country
        )
        setCountries(countries)
        let sortedData = [...data].sort((a,b) => b.cases - a.cases);
        setTableData(sortedData)
      })
    }
    getCountriesData()
    
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
      setInputCountry(countryName)
      setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      
        <div className="row mx-5">
          <div className="col-lg-8 app__left">

            <div className="row app__header">
              <div className="col-lg-6">
                <h3>Covid-19 Tracker</h3>
              </div>

              <div className="col-lg-6 d-flex justify-content-end align-items-center">
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
            <div className="row my-4 app__stats">
                <div className="col-lg-4">
                  <InfoBox title="Coronavirus cases" 
                  cases={countryInfo.todayCases} 
                  total={countryInfo.cases} />
                </div>

                <div className="col-lg-4">
                  <InfoBox title="Recovered"
                   cases={countryInfo.todayRecovered} 
                  total={countryInfo.recovered} />
                </div>

                <div className="col-lg-4">
                  <InfoBox title="Deaths" 
                  cases={countryInfo.todayDeaths} 
                  total={countryInfo.deaths} />
                </div>
            </div>
            <Map />
          </div>
          


          <div className="card col-lg-4 bg-white app__right">
            <h4>Live Cases By Country</h4>
            <Table countries={tableData} />
            <h4>Worldwide New Cases</h4>
          </div>

        </div>
      
    </div>
  );
}

export default App;
