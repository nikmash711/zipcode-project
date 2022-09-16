import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import {
  useCountriesQuery,
  useZipInformationQuery,
} from './utils/__generated__/graphql';

export const App: React.FC = () => {
  const {
    loading: loadingZipInformation,
    error: errorZipInformation,
    data: zipInformationData,
  } = useZipInformationQuery({
    variables: { country: 'us', zipCode: '91403' },
  });
  const {
    loading: loadingCountriesData,
    error: errorCountriesData,
    data: countriesData,
  } = useCountriesQuery();
  const listOfCountries = countriesData?.countries;

  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string);
  };

  const showLoading =
    loadingZipInformation || loadingCountriesData || !listOfCountries;
  const showError = errorCountriesData || errorZipInformation;

  // TODO: add loading state
  // TODO: add error state
  return showLoading ? (
    <div>loading</div>
  ) : showError ? (
    <div>error</div>
  ) : listOfCountries ? (
    <FormControl fullWidth>
      <InputLabel id="select-country-label">Countries</InputLabel>
      <Select
        labelId="select-country-label"
        id="select-country-label"
        value={selectedCountry}
        label="Age"
        onChange={handleCountryChange}
      >
        {listOfCountries?.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null;
};
