'use client';

import { useProgress } from '@/context/ProgressContext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Container } from '@mui/material';
import { IconPicker } from './icon-picker/IconPicker';
import { Name } from './name/Name';

const PreGame = () => {
  const { currentStep, nextStep, previousStep } = useProgress();

  const steps: { [key: number]: JSX.Element } = {
    1: <Name />,
    2: <IconPicker />,
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
        {steps[currentStep] || <div>Invalid step</div>}
      </Box>
      <Box display="flex" justifyContent="center" mt="auto" mb={2} gap={1}>
        {currentStep > 1 && (
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
          onClick={nextStep}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Další krok
        </Button>
      </Box>
    </Container>
  );
};

export default PreGame;
