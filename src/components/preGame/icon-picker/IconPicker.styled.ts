import { Avatar, Card, Typography, styled } from '@mui/material';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.breakpoints.down('sm') ? '80px' : '100px',
  height: theme.breakpoints.down('sm') ? '80px' : '100px',
  fontSize: theme.breakpoints.down('sm') ? '46px' : '60px',
}));

export const IconCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  height: theme.breakpoints.down('sm') ? '80px' : '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  boxShadow: isSelected
    ? '0px 4px 20px rgba(0, 128, 0, 0.3)'
    : '0px 2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
}));

export const IconWrapper = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '46px' : '60px',
}));
