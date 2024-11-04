import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ExperimentVariant = 'A' | 'B';

interface ExperimentContextType {
  variants: Record<string, ExperimentVariant>;
  trackEvent: (name: string, data?: Record<string, unknown>) => void;
}

const ExperimentContext = createContext<ExperimentContextType | null>(null);

export function ExperimentProvider({ children }: { children: React.ReactNode }) {
  const [variants, setVariants] = useLocalStorage<Record<string, ExperimentVariant>>(
    'ab-variants',
    {}
  );

  // Simulated analytics tracking
  const trackEvent = (name: string, data?: Record<string, unknown>) => {
    console.log(`[Analytics] ${name}:`, data);
  };

  // Assign variants on first visit
  useEffect(() => {
    const experiments = ['pricing-layout'];
    
    experiments.forEach(experimentId => {
      if (!variants[experimentId]) {
        setVariants(prev => ({
          ...prev,
          [experimentId]: Math.random() > 0.5 ? 'A' : 'B'
        }));
      }
    });
  }, [variants, setVariants]);

  return (
    <ExperimentContext.Provider value={{ variants, trackEvent }}>
      {children}
    </ExperimentContext.Provider>
  );
}

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within ExperimentProvider');
  }
  return context;
};