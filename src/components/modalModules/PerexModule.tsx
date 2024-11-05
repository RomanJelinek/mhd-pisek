import { Typography } from '@mui/material';

export interface PerexModuleProps {
  content: string;
}

const PerexModule = ({ content }: PerexModuleProps) => {
  return <Typography textAlign="justify">{content}</Typography>;
};

export default PerexModule;
