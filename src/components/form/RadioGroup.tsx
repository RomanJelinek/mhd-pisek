import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface RadioOptions {
  value: string | number;
  label: string;
}

const RadioButtonsGroup = ({
  options,
  label,
}: {
  options: RadioOptions[];
  label: string;
}) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
