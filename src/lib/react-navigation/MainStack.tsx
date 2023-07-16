import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import OnboardingScreen from '@gs/modules/Onboarding/Screen/OnboardingScreen';
import LoginScreen from '@gs/modules/Login/Screen/LoginScreen';
import EditProfileScreen from '@gs/modules/EditProfile/Screen/EditProfileScreen';
import DashboardScreen from '@gs/modules/Dahboard/Screens/DashboardScreen';
import InitialScreen from '@gs/modules/shared/screens/InitialScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
      }}>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
