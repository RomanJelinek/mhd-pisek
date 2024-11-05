'use client';

import { useUser } from '@/context/UserContext';
import {
  Avatar,
  Box,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const emojiOptions = ['😀', '🚀', '🐶', '🌈', '👑', '🍕', '🌍', '⚽️'];

const IconPicker = () => {
  const { icon, setIcon } = useUser();
  const [selectedEmoji, setSelectedEmoji] = useState<string>(icon);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEmoji(event.target.value);
    setIcon(event.target.value);
  };

  // Responsive sizing for avatar and card dimensions
  const avatarSize = isSmallScreen ? 80 : 100;
  const cardSize = isSmallScreen ? 80 : 100;
  const fontSize = isSmallScreen ? 46 : 60;

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Link href="/">Dashboard</Link>
      <Typography variant="h4" align="center" gutterBottom>
        Vyber si sveho avatara!
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Bude znazornovat Tvou polohu na mape
      </Typography>

      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Avatar
          sx={{ width: avatarSize, height: avatarSize, fontSize: fontSize }}
        >
          {selectedEmoji}
        </Avatar>
      </Box>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="emoji"
          name="emoji"
          value={selectedEmoji}
          onChange={handleEmojiChange}
          sx={{ justifyContent: 'center' }}
        >
          <Grid container spacing={2} justifyContent="center">
            {emojiOptions.map((emoji) => (
              <Grid item xs={3} key={emoji}>
                <Card
                  sx={{
                    height: cardSize,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    boxShadow:
                      selectedEmoji === emoji
                        ? '0px 4px 20px rgba(0, 128, 0, 0.3)'
                        : '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <FormControlLabel
                    value={emoji}
                    control={
                      <Radio
                        checked={selectedEmoji === emoji}
                        icon={
                          <Typography sx={{ fontSize: fontSize, opacity: 0.7 }}>
                            {emoji}
                          </Typography>
                        }
                        checkedIcon={
                          <Typography sx={{ fontSize: fontSize }}>
                            {emoji}
                          </Typography>
                        }
                      />
                    }
                    label=""
                    sx={{ m: 0 }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default IconPicker;
