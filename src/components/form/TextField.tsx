import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface RadioOptions {
  value: string | number;
  label: string;
}

const TextFieldInput = ({ ...props }: TextFieldProps) => {
  return <TextField {...props} />;
};

export default TextFieldInput;
