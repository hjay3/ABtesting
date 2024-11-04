import React from 'react';
import { ExperimentProvider } from './contexts/ExperimentContext';
import { PricingPage } from './components/PricingPage';

function App() {
  return (
    <ExperimentProvider>
      <PricingPage />
    </ExperimentProvider>
  );
}

export default App;