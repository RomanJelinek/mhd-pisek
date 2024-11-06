'use client';

import { updateIcon } from '@/actions/userActions';
import { useUser } from '@/context/UserContext';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useState, useTransition } from 'react';
import { IconCard, IconWrapper, StyledAvatar } from './IconPicker.styled';

const emojiOptions = ['😀', '🚀', '🐶', '🌈', '👑', '🍕', '🌍', '⚽️'];

export const IconPicker = () => {
  const { icon, setIcon, nickname } = useUser();
  const [selectedEmoji, setSelectedEmoji] = useState<string>(icon);
  const [isPending, startTransition] = useTransition();

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIcon = event.target.value;
    setSelectedEmoji(newIcon);
    setIcon(newIcon);
    startTransition(async () => {
      await updateIcon(newIcon);
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {nickname}, vyber si svého avatara!
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Bude znázorňovat tvou polohu na mapě
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <StyledAvatar>{selectedEmoji}</StyledAvatar>
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
                <IconCard isSelected={selectedEmoji === emoji}>
                  <FormControlLabel
                    value={emoji}
                    control={
                      <Radio
                        checked={selectedEmoji === emoji}
                        icon={<IconWrapper>{emoji}</IconWrapper>}
                        checkedIcon={<IconWrapper>{emoji}</IconWrapper>}
                      />
                    }
                    label=""
                    sx={{ m: 0 }}
                  />
                </IconCard>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </>
  );
};
