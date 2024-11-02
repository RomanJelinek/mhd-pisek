'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressContextProps {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
}

const ProgressContext =
  createContext<ProgressContextProps | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const setStep = (step: number) => setCurrentStep(step);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const previousStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  return (
    <ProgressContext.Provider
      value={{ currentStep, setStep, nextStep, previousStep }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context)
    throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
