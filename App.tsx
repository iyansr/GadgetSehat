import { StatusBar } from 'react-native';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainStack from '@gs/lib/react-navigation/MainStack';

const App = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
          text: '#171717',
          primary: '#1C74BB',
        },
        dark: false,
      }}>
      <StatusBar backgroundColor="#1C74BB" barStyle="light-content" />
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
