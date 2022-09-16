import { ApolloError } from '@apollo/client';
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
import { Country } from '../utils/__generated__/graphql';

interface FormProps {
  error?: string;
  listOfCountries: Country[];
  onSubmit: (country: string, zipCode: string) => void;
}

export const Form: React.FC<FormProps> = ({
  error,
  listOfCountries,
  onSubmit,
}) => {
  //State
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedZipCode, setSelectedZipCode] = useState('');

  // onChange handlers
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string);
  };
  const handleZipCodeChange = (event: any) => {
    setSelectedZipCode(event.target.value as string);
  };
  return (
    <div>
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
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Zip Code"
          variant="outlined"
          value={selectedZipCode}
          onChange={handleZipCodeChange}
          error={!!error}
          helperText={error}
        />
      </FormControl>
      <Button
        onClick={() => onSubmit(selectedCountry, selectedZipCode)}
        variant="contained"
      >
        Get City and State
      </Button>
    </div>
  );
};
