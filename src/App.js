import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");

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
      console.log(data)
      console.log("countryInfoooo", countryInfo)
    })
  }

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     fetch("https://disease.sh/v3/covid-19/countries")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const countries = data.map((country) => ({
  //           name: country.country,
  //           value: country.countryInfo.iso2,
  //         }));
          
  //         setCountries(countries);
         
  //       });
  //   };

  //   getCountriesData();
  // }, []);



  // const onCountryChange = async (e) => {
  //   const countryCode = e.target.value;

  //   const url =
  //     countryCode === "worldwide"
  //       ? "https://disease.sh/v3/covid-19/all"
  //       : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  //   await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setInputCountry(countryCode);
  //       setCountryInfo(data);
  //       console.log(data)
  //      console.log("countryInfoooo", countryInfo)
  //     });
  // };

  return (
    <div className="app">
      <div className="container">
        <div className="row">
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
            <div className="row my-3 app__stats">
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
          </div>


          <div className="col-lg-4 bg-white app__right">
            World
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
