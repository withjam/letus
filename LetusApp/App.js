import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppContextProvider } from './AppContext';
import { ScreenController } from './ScreenController';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black,
} from '@expo-google-fonts/noto-sans-jp';

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansJP_100Thin,
    NotoSansJP_300Light,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    NotoSansJP_900Black,
  });

  if (!fontsLoaded) return <AppLoading />;
  return (
    <AppContextProvider>
      <ScreenController />
      <StatusBar style='auto' />
    </AppContextProvider>
  );
}
