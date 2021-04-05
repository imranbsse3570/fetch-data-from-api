import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CountriesList from "./components/CountriesList";
import CountryData from "./components/CountryData";

function App() {
  const [countries, setCountries] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [covid19Data, setCovid19Data] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState({});

  const onCountriesChange = (slug) => {
    setSelectedCountryData(
      ...covid19Data.filter((countryData) => {
        return countryData.slug === slug;
      })
    );
  };

  useEffect(function () {
    async function fetchingData() {
      // const responsePromise = await fetch("https://api.covid19api.com/summary");
      // const data = await responsePromise.json();
      const responseData = await axios.get(
        "https://api.covid19api.com/summary"
      );

      const data = responseData.data;

      const globalData = data.Global;
      const countriesData = data.Countries;

      const countriesName = [
        { countryName: "Global", slug: "global" },
        ...countriesData.map((country) => {
          return {
            countryName: country.Country,
            slug: country.Slug,
          };
        }),
      ];

      const countriesCovidData = [
        {
          slug: "global",
          newRecoverd: globalData.NewRecovered,
          newConfirmed: globalData.NewConfirmed,
          newDeaths: globalData.NewDeaths,
          totalConfirmed: globalData.TotalConfirmed,
          totalDeaths: globalData.TotalDeaths,
          totalRecovered: globalData.TotalRecovered,
        },
        ...countriesData.map((country) => {
          return {
            slug: country.Slug,
            newRecoverd: country.NewRecovered,
            newConfirmed: country.NewConfirmed,
            newDeaths: country.NewDeaths,
            totalConfirmed: country.TotalConfirmed,
            totalDeaths: country.TotalDeaths,
            totalRecovered: country.TotalRecovered,
          };
        }),
      ];

      setCountries(countriesName);
      setDataLoaded(true);
      setCovid19Data(countriesCovidData);
    }

    fetchingData();
  }, []);

  if (dataLoaded) {
    return (
      <div>
        <CountriesList countries={countries} onChange={onCountriesChange} />
        <CountryData countryData={selectedCountryData} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
