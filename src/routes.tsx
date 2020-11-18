import React from 'react';
import { useTranslation } from 'react-i18next';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import iconHeader from '../assets/icon_header.png';

import Home from './pages/Home';
import Settings from './pages/Settings';
import RecentPhoneList from './pages/RecentPhoneList';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#25d366',
          },
        }}
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            header: () => <Header title={t('SettingsPage')} backButton />,
          }}
        />
        <Screen
          name="RecentPhoneList"
          component={RecentPhoneList}
          options={{
            headerShown: true,
            header: () => (
              <Header title={t('RecentPhoneListPage')} backButton />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
