import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppContextProvider } from './AppContext';
import { ScreenController } from './ScreenController';

export default function App() {
  return (
    <AppContextProvider>
      <ScreenController />
      <StatusBar style='auto' />
    </AppContextProvider>
  );
}
