import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation from './src/navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/service/AuthContext';
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {

        setAppIsReady(true);
        await SplashScreen.hideAsync();

      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    initializeApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    // <AuthProvider>
      <Navigation />
    // </AuthProvider>
  )

};

export default App;

const styles = StyleSheet.create({});
