const SingleCountry = ({ country }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-xl font-bold">{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
        <li key={code}>
           {name}
        </li>
      ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const Countries = ({ onShowCountry, countriesList }) => {

  if (!countriesList) return null;

  if (countriesList.length === 0) {
    return (
        <>
        <p>No results</p>
        </>
    )
  }

  if (countriesList.length > 10) {
    return (
      <>
        <p>Too many results, narrow down the search</p>
      </>
    );
  }

  if (countriesList.length === 1) {
    // TODO
    return <SingleCountry country={countriesList[0]} />;
  }

  return (
    <>
      <ul>
        {countriesList.map((country, index) => (
          <li key={index}>{country.name.common} <button onClick={()=> onShowCountry(country.name.common)}>Show</button> </li>
        ))}
      </ul>
    </>
  );
};

export default Countries;
