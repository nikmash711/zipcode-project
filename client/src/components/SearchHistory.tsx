import { Button } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    {searchHistory.map((searchItem) => (
      <div key={uuidv4()}>{searchItem.city}</div>
    ))}
    <Button onClick={handleClearSearchHistory} variant="contained">
      Clear Search History
    </Button>
  </div>
);
