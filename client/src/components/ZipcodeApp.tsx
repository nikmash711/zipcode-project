import { Divider, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useState } from 'react';
import store from 'store2';
import { Form } from './Form';
import { SearchHistory } from './SearchHistory';

import {
  useCountriesQuery,
  useZipInformationLazyQuery,
  ZipInformation,
} from '../utils/__generated__/graphql';
import { blue } from '@mui/material/colors';

const searchHistoryKey = 'searchHistory';

// TODO interface for state
export const App: React.FC = () => {
  // State
  const [searchHistory, setSearchHistory] = useState<ZipInformation[] | null>(
    store.get(searchHistoryKey)
  );

  const handleClearSearchHistory = () => {
    // Update state.
    setSearchHistory(null);
    // Update the store.
    store.set(searchHistoryKey, null);
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
  const handleSubmit = async (
    event: React.MouseEvent,
    country: string,
    zipCode: string
  ) => {
    event.preventDefault();
    const {
      loading: loadingZipInformation, // TODO: disable submit while loading;
      data: zipInformationData,
    } = await getZipInformation({
      variables: { country, zipCode },
    });

    if (zipInformationData?.zipInformation) {
      // If we already have search history, let's update it.
      if (searchHistory) {
        let searchHistoryCopy = [...searchHistory];
        // If the length of the search history is already 5, remove the oldest (first) search.
        if (searchHistoryCopy.length === 5) {
          searchHistoryCopy.shift();
        }
        // Add the most recent search.
        searchHistoryCopy = [
          ...searchHistoryCopy,
          zipInformationData.zipInformation,
        ];

        // Update store and update state.
        setSearchHistory(searchHistoryCopy);
        store.set(searchHistoryKey, searchHistoryCopy);
      }
      // If we don't, let's create and set search history.
      else {
        let searchHistory = [zipInformationData.zipInformation];
        setSearchHistory(searchHistory);
        store.set(searchHistoryKey, searchHistory);
      }
    }
  };

  const showLoading = loadingCountriesData || !listOfCountries;
  const showError = errorCountriesData;

  // TODO: add loading state
  // TODO: add error state - what if it's the wrong zipcode?
  return showLoading ? (
    <div>loading</div>
  ) : showError ? (
    <div>error</div>
  ) : listOfCountries ? (
    <div
      style={{
        maxWidth: 500,
        margin: 'auto',
        border: '1px solid black',
        borderRadius: 16,
        padding: 20,
      }}
    >
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        Find Your City and State From Your Zipcode!
      </Typography>
      <Form
        isDisabled={loadingZipInformation || loadingCountriesData}
        error={errorZipInformation?.message}
        listOfCountries={listOfCountries}
        onSubmit={handleSubmit}
      />
      <br />
      {zipInformationData?.zipInformation && (
        <Typography variant="h6" align="center" gutterBottom color={blue[700]}>
          <PlaceIcon style={{ verticalAlign: 'sub' }} />{' '}
          <span>
            {zipInformationData.zipInformation.city},{' '}
            {zipInformationData.zipInformation.state}
          </span>
        </Typography>
      )}
      <Divider sx={{ margin: '24px 0' }} />
      {searchHistory && searchHistory.length > 0 && (
        <>
          <Typography variant="h5" style={{ marginBottom: 12 }}>
            Recent Search History:
          </Typography>
          <SearchHistory
            // Reverse the array so we're showing the newest searches first like a stack
            searchHistory={[...searchHistory].reverse()}
            handleClearSearchHistory={handleClearSearchHistory}
          />
        </>
      )}
    </div>
  ) : null;
};
