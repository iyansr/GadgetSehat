import type { RouteProp as RoutePropBase } from '@react-navigation/native';

export type StackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
};

export type RouteProp<T extends keyof StackParamList> = RoutePropBase<StackParamList, T>;
