import { StatusBar } from 'react-native';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainStack from '@gs/lib/react-navigation/MainStack';

import '@gs/lib/google/googleSignIn';
import AuthProvider from '@gs/modules/auth/context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (__DEV__) {
  import('@gs/lib/reactotron').then(() => console.log('REACTOTRON!!'));
}

// Create a client
const queryClient = new QueryClient();

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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MainStack />
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
