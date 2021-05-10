import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppContextProvider } from './AppContext';
import { ScreenController } from './ScreenController';
import AppLoading from 'expo-app-loading';
import * as firebase from 'firebase';
import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black,
} from '@expo-google-fonts/noto-sans-jp';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansJP_100Thin,
    NotoSansJP_300Light,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    NotoSansJP_900Black,
  });

  if (!firebase.apps.length) {
    console.log('initializing firebae', firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  }

  if (!fontsLoaded || !firebase.apps.length) return <AppLoading />;
  return (
    <AppContextProvider>
      <ScreenController />
      <StatusBar style='auto' />
    </AppContextProvider>
  );
}
