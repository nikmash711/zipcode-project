import { Button, List, ListItem } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ZipInformation } from 'utils/__generated__/graphql';

interface SearchHistoryProps {
  searchHistory: ZipInformation[];
  handleClearSearchHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  handleClearSearchHistory,
}) => (
  <>
    <List>
      {searchHistory.map((searchItem) => (
        <ListItem key={uuidv4()} disablePadding style={{ paddingBottom: 8 }}>
          {searchItem.city}, {searchItem.state}, {searchItem.zipCode}
        </ListItem>
      ))}
    </List>
    <Button
      onClick={handleClearSearchHistory}
      variant="contained"
      color="success"
      fullWidth
    >
      Clear History
    </Button>
  </>
);
