'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface ProgressContextProps {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  maxSteps: number;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(
  undefined,
);

export const ProgressProvider = ({
  children,
  maxSteps,
}: {
  children: ReactNode;
  maxSteps: number;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const setStep = (step: number) => setCurrentStep(Math.min(step, maxSteps));
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
  const previousStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const value = { currentStep, setStep, nextStep, previousStep, maxSteps };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
