import { Typography } from '@mui/material';
import React from 'react';

export interface PerexModuleProps {
  content: string;
}

const PerexModule = ({ content }: PerexModuleProps) => {
  return <Typography textAlign="justify">{content}</Typography>;
};

export default PerexModule;
