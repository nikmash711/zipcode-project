import React, { useState } from 'react';
import store from 'store2';
import { Form } from './components/Form';
import { SearchHistory } from './components/SearchHistory';

import {
  useCountriesQuery,
  useZipInformationLazyQuery,
  ZipInformation,
} from './utils/__generated__/graphql';

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
  const handleSubmit = async (country: string, zipCode: string) => {
    const {
      loading: loadingZipInformation, // TODO: disable submit while loading;
      error: errorZipInformation,
      data: zipInformationData,
    } = await getZipInformation({
      variables: { country, zipCode },
    });
    // TODO If there's an error - handle it and return out of fn

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
    <div>
      <Form
        error={errorZipInformation?.message}
        listOfCountries={listOfCountries}
        onSubmit={handleSubmit}
      />
      <br />
      <div>City: {zipInformationData?.zipInformation?.city}</div>
      <div>State: {zipInformationData?.zipInformation?.state}</div>
      <br />
      {searchHistory && searchHistory.length > 0 && (
        <SearchHistory
          // Reverse the array so we're showing the newest searches first like a stack
          searchHistory={[...searchHistory].reverse()}
          handleClearSearchHistory={handleClearSearchHistory}
        />
      )}
    </div>
  ) : null;
};
