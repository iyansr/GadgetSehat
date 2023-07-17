import type { RouteProp as RoutePropBase } from '@react-navigation/native';

export type StackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  EditProfileScreen: undefined;
  DashboardScreen: undefined;
  InitialScreen: undefined;
  ScreenBrightnessIntro: undefined;
  ScreenBrightnessSetting: undefined;
};

export type RouteProp<T extends keyof StackParamList> = RoutePropBase<StackParamList, T>;
