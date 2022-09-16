import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

import {
  useCountriesQuery,
  useZipInformationLazyQuery,
} from './utils/__generated__/graphql';

export const App: React.FC = () => {
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

  const [selectedZipCode, setSelectedZipCode] = useState('');
  const handleZipCodeChange = (event: any) => {
    setSelectedZipCode(event.target.value as string);
  };

  const [
    getZipInformation,
    {
      loading: loadingZipInformation,
      error: errorZipInformation,
      data: zipInformationData,
    },
  ] = useZipInformationLazyQuery();

  const onSubmit = () => {
    getZipInformation({
      variables: { country: selectedCountry, zipCode: selectedZipCode },
    });
  };

  const showLoading = loadingCountriesData || !listOfCountries;
  const showError = errorCountriesData;
  console.log(zipInformationData);

  // TODO: add loading state
  // TODO: add error state - what if it's the wrong zipcode?
  return showLoading ? (
    <div>loading</div>
  ) : showError ? (
    <div>error</div>
  ) : listOfCountries ? (
    <>
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
        value={selectedZipCode}
        onChange={handleZipCodeChange}
      />
      <Button onClick={onSubmit} variant="contained">
        Get City and State
      </Button>
    </>
  ) : null;
};
