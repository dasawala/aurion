import React, { useState } from 'react';
import { ViewState } from './types';
import { Landing } from './components/Landing';
import { AgentApp } from './components/AgentApp';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);

  // Transition function
  const launchApp = () => {
    // In a real app, this would handle Wallet Connection logic
    // For demo, we transition state
    setCurrentView(ViewState.APP);
  };

  const goBack = () => {
    setCurrentView(ViewState.LANDING);
  };

  return (
    <>
      {currentView === ViewState.LANDING ? (
        <Landing onLaunch={launchApp} />
      ) : (
        <AgentApp onBack={goBack} />
      )}
    </>
  );
};

export default App;