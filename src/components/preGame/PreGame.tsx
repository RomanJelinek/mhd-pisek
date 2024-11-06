'use client';

import { useProgress } from '@/context/ProgressContext';
import { useUser } from '@/context/UserContext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { IconPicker } from './icon-picker/IconPicker';
import { Instructions } from './instructions/Instructions';
import { Name } from './name/Name';

enum PreGameSteps {
  NAME = 1,
  ICON_PICKER = 2,
  INSTRUCTIONS = 3,
}

const nicknameSchema = z.string().min(1, 'Zadejte jméno hráče či týmu.');

const PreGame = () => {
  const { currentStep, nextStep, previousStep } = useProgress();
  const { nickname } = useUser();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const steps: { [key in PreGameSteps]: JSX.Element } = {
    [PreGameSteps.NAME]: <Name error={error} />,
    [PreGameSteps.ICON_PICKER]: <IconPicker />,
    [PreGameSteps.INSTRUCTIONS]: <Instructions />,
  };

  const validateStep = () => {
    if (currentStep === PreGameSteps.NAME) {
      const result = nicknameSchema.safeParse(nickname);
      if (!result.success) {
        setError(result.error.errors[0].message);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep === PreGameSteps.INSTRUCTIONS) {
        router.push('/');
      } else {
        nextStep();
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        flex="1"
        p={2}
      >
        {steps[currentStep as PreGameSteps] || <div>Invalid step</div>}
      </Box>
      <Box display="flex" justifyContent="center" mt="auto" mb={2} gap={1}>
        {currentStep > PreGameSteps.NAME && (
          <Button
            variant="outlined"
            onClick={previousStep}
            startIcon={<KeyboardArrowLeftIcon />}
          >
            Předchozí krok
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNextStep}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Další krok
        </Button>
      </Box>
    </Container>
  );
};

export default PreGame;
