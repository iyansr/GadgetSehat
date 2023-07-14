import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import OnboardingScreen from '@gs/modules/Onboarding/Screen/OnboardingScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;