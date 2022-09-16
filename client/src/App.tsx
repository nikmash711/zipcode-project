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
import store from 'store2';

import {
  useCountriesQuery,
  useZipInformationLazyQuery,
  ZipInformation,
} from './utils/__generated__/graphql';

export const App: React.FC = () => {
  // State
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedZipCode, setSelectedZipCode] = useState('');

  // onChange handlers
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string);
  };

  const handleZipCodeChange = (event: any) => {
    setSelectedZipCode(event.target.value as string);
  };

  // Queries
  const {
    loading: loadingCountriesData,
    error: errorCountriesData,
    data: countriesData,
  } = useCountriesQuery();
  const listOfCountries = countriesData?.countries;

  const [
    getZipInformation,
    {
      loading: loadingZipInformation,
      error: errorZipInformation,
      data: zipInformationData,
    },
  ] = useZipInformationLazyQuery();

  // Submit form fn
  const onSubmit = async () => {
    const {
      loading: loadingZipInformation,
      error: errorZipInformation,
      data: zipInformationData,
    } = await getZipInformation({
      variables: { country: selectedCountry, zipCode: selectedZipCode },
    });
    // TODO If there's an error - handle it and return out of fn

    // Keep track of search history using local storage.
    if (zipInformationData?.zipInformation) {
      let searchHistoryFromStore: ZipInformation[] | null =
        store.get('searchHistory');
      // If we already have search history in the store, let's update it.
      if (searchHistoryFromStore) {
        // If the length of the search history is already 5, remove the oldest (first) search/
        if (searchHistoryFromStore.length === 5) {
          searchHistoryFromStore.shift();
        }
        // Add the most recent search.
        searchHistoryFromStore.push(zipInformationData.zipInformation);
        store.set('searchHistory', searchHistoryFromStore);
      }
      // If we don't, let's create and set search history.
      else {
        let searchHistory = [zipInformationData.zipInformation];
        store.set('searchHistory', searchHistory);
      }
    }
  };

  const showLoading = loadingCountriesData || !listOfCountries;
  const showError = errorCountriesData;
  const searchHistory: ZipInformation[] | null = store.get('searchHistory');

  // Put search history in array, and then list the array backwards (so most recent searches are first)

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
      <div>City: {zipInformationData?.zipInformation?.city}</div>
      <div>State: {zipInformationData?.zipInformation?.state}</div>
      {searchHistory &&
        searchHistory.map((searchItem) => <div>{searchItem.state}</div>)}
    </>
  ) : null;
};
