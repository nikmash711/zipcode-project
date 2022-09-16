import { Button } from '@mui/material';
import React from 'react';
import { ZipInformation } from '../utils/__generated__/graphql';

interface SearchHistoryProps {
  searchHistory: ZipInformation[];
  handleClearSearchHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  handleClearSearchHistory,
}) => (
  <div>
    {/* WE NEED UNIQUE KEYS */}
    {searchHistory.map((searchItem) => (
      <div key={searchItem.zipCode}>{searchItem.city}</div>
    ))}
    <Button onClick={handleClearSearchHistory} variant="contained">
      Clear Search History
    </Button>
  </div>
);
