import type { RouteProp as RoutePropBase } from '@react-navigation/native';

export type StackParamList = {
  TalentDetailScreen: undefined;
  AuthScreen: undefined;
  MainScreen: undefined;
  BookingScreen: undefined;
  HomeScreen: undefined;
  EnrollAsTalentScreen: undefined;
  BookingDetailScreen: undefined;
  BookLocationScreen: undefined;
  BookingPaymentScreen: undefined;
  OrderSummaryScreen: undefined;
  EditProfileScreen: undefined;
  EditPageScreen: undefined;
  VideoPlayer: {
    id?: string;
  };
};

export type RouteProp<T extends keyof StackParamList> = RoutePropBase<StackParamList, T>;
