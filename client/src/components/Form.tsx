import {
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { Country } from 'utils/__generated__/graphql';

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
      <Grid container alignItems="flex-start" spacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth disabled={isDisabled}>
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
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth disabled={isDisabled}>
            <TextField
              id="zipcode-label"
              placeholder="Type your postal code here"
              label="Postal Code"
              variant="outlined"
              value={selectedZipCode}
              onChange={handleZipCodeChange}
              error={!!error}
              helperText={error}
              disabled={isDisabled}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={(event) =>
              onSubmit(event, selectedCountry, selectedZipCode)
            }
            variant="contained"
            type="submit"
            fullWidth
            // Don't allow the user to submit an empty zip.
            disabled={isDisabled || !selectedZipCode.trim()}
          >
            Get Location
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
