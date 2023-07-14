import { StatusBar, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1C74BB" barStyle="light-content" />
      <Text>App</Text>
    </NavigationContainer>
  );
};

export default App;
