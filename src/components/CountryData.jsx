const CountryData = ({ countryData }) => {
  console.log(Object.keys(countryData));
  console.log(countryData[Object.keys(countryData)[0]]);
  return (
    <div>
      {Object.keys(countryData).map((key) => (
        <p key={key}>
          {key}: {countryData[key]}
        </p>
      ))}
    </div>
  );
};

export default CountryData;
