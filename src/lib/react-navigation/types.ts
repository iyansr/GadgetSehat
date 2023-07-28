import type { RouteProp as RoutePropBase } from '@react-navigation/native';

export type StackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  EditProfileScreen: undefined;
  DashboardScreen: undefined;
  InitialScreen: undefined;
  ScreenBrightnessIntro: undefined;
  ScreenBrightnessSetting: undefined;
  PhonePositionIntro: undefined;
  PhonePositionScreen: undefined;
  ScreenTimeIntro: undefined;
  HealthHistory: undefined;
  ScreenTime: undefined;
  HealthReportScreen: undefined;
};

export type RouteProp<T extends keyof StackParamList> = RoutePropBase<StackParamList, T>;
