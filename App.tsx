import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';

import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

import * as Updates from 'expo-updates';

import { I18nextProvider } from 'react-i18next';
import i18 from './src/locales';

import Loading from './src/components/Loading';

import Routes from './src/routes';

const App: React.FC = () => {
  useEffect(() => {
    async function updateApp(): Promise<void> {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
      }
    }

    updateApp();
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#128c7e',
        }}
      >
        <ActivityIndicator size="large" color="#ece5dd" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <I18nextProvider i18n={i18}>
          <StatusBar style="light" backgroundColor="#075e54" />
          <Routes />
        </I18nextProvider>
      </Suspense>
    </>
  );
};

export default App;
