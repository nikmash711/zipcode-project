import { CircularProgress, Divider, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useState } from 'react';
import store from 'store2';

import { Form } from 'components/Form';
import { SearchHistory } from 'components/SearchHistory';
import {
  useCountriesQuery,
  useZipInformationLazyQuery,
  ZipInformation,
} from 'utils/__generated__/graphql';

const searchHistoryKey = 'searchHistory';

export const App: React.FC = () => {
  // State:
  const [searchHistory, setSearchHistory] = useState<ZipInformation[] | null>(
    store.get(searchHistoryKey)
  );

  // Queries:
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
  const zipInformation = zipInformationData?.zipInformation;

  // Handlers:

  const handleClearSearchHistory = () => {
    // Update state.
    setSearchHistory(null);
    // Update the store.
    store.set(searchHistoryKey, null);
  };

  const handleSubmitForm = async (
    event: React.MouseEvent,
    country: string,
    zipCode: string
  ) => {
    event.preventDefault();
    const { data: zipInformationData } = await getZipInformation({
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

  return (
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
        Find Your Location
      </Typography>
      {loadingCountriesData ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : listOfCountries ? (
        <Form
          isDisabled={loadingZipInformation || loadingCountriesData}
          error={errorZipInformation?.message}
          listOfCountries={listOfCountries}
          onSubmit={handleSubmitForm}
        />
      ) : null}
      <br />
      {zipInformation && (
        <Typography variant="h6" align="center" gutterBottom color={blue[700]}>
          <PlaceIcon style={{ verticalAlign: 'sub' }} />{' '}
          <span>
            {zipInformation.city}, {zipInformation.state}
          </span>
        </Typography>
      )}
      {searchHistory && searchHistory.length > 0 && (
        <>
          <Divider sx={{ margin: '24px 0' }} />
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
  );
};
