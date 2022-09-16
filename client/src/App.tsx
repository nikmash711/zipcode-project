import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
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

  const [selectedCountry, setSelectedCountry] = useState('US');
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string);
  };

  const [zipCode, setZipCode] = useState('');
  const handleZipCodeChange = (event: any) => {
    setZipCode(event.target.value as string);
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
    <>
      {' '}
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
      <TextField
        id="outlined-basic"
        label="Zip Code"
        variant="outlined"
        value={zipCode}
        onChange={handleZipCodeChange}
      />
    </>
  ) : null;
};
