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
  isDisabled?: boolean;
  listOfCountries: Country[];
  onSubmit: (event: React.MouseEvent, country: string, zipCode: string) => void;
}

export const Form: React.FC<FormProps> = ({
  error,
  isDisabled,
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
    <form>
      <FormControl fullWidth>
        <InputLabel id="select-country-label">Countries</InputLabel>
        <Select
          labelId="select-country-label"
          id="select-country-label"
          value={selectedCountry}
          label="Age"
          onChange={handleCountryChange}
          disabled={isDisabled}
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
          disabled={isDisabled}
        />
      </FormControl>
      <Button
        onClick={(event) => onSubmit(event, selectedCountry, selectedZipCode)}
        variant="contained"
        type="submit"
        fullWidth
        // Don't allow the user to submit an empty zip.
        disabled={isDisabled || !selectedZipCode.trim()}
      >
        Get City and State
      </Button>
    </form>
  );
};
