import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Countries from "./components/Countries";
import SearchForm from "./components/SearchForm";
import Notification from "./components/Notification";

function App() {
  const [newCountry, setNewCountry] = useState("");
  const [queryCountry, setQueryCountry] = useState(null);
  const [countries, setCountries] = useState(null);
  const [notification, setNotification] = useState(null);


  useEffect(() => {
    if (queryCountry) {
      // Make the API call directly in onSearch
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const queryCountryLower = queryCountry.toLowerCase();
          const countriesToUpdate = response.data.filter((c) => {
            return c.name.common.toLowerCase().includes(queryCountryLower);
          });
          setCountries(countriesToUpdate)
          setNewCountry(queryCountry)
          setNotification(null);
        })
        .catch((error) => {
          console.error("Error fetching country data:", error);
        });
    }
  }, [queryCountry]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (newCountry == "") {
      alert("Specify search qeury");
      return;
    }

    // first clear the list of rendered items
    setCountries(null);
    // and show notification that the search is in process
    setNotification("Searching...");
    // and set query country to initiate useEffect hook
    setQueryCountry(newCountry);
  };

  const handleShowSingle = (country) => {
    setQueryCountry(country)
  }
  

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        onChange={(event) => setNewCountry(event.target.value)}
      />
      <Notification notification={notification} />
      <Countries countriesList={countries} onShowCountry={handleShowSingle} />
    </>
  );
}

export default App;
