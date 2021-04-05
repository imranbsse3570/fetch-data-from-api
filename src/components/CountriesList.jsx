const CountriesList = ({ countries, onChange }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          onChange(e.target.selectedOptions[0].value);
        }}
      >
        {countries.map((country) => (
          <option key={country.slug} value={country.slug}>
            {country.countryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesList;
