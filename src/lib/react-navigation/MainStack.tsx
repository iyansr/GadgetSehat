import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { StackParamList } from './types';
import OnboardingScreen from '@gs/modules/Onboarding/Screen/OnboardingScreen';
import LoginScreen from '@gs/modules/Login/Screen/LoginScreen';
import EditProfileScreen from '@gs/modules/EditProfile/Screen/EditProfileScreen';
import DashboardScreen from '@gs/modules/Dahboard/Screens/DashboardScreen';
import InitialScreen from '@gs/modules/shared/screens/InitialScreen';
import ScreenBrightnessIntro from '@gs/modules/screen-brightness/screens/ScreenBrightnessIntro';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import useNavigation from './useNavigation';
import ScreenBrightnessSetting from '@gs/modules/screen-brightness/screens/ScreenBrightnessSetting';
import PhonePositionIntro from '@gs/modules/phone-position/screen/PhonePositionIntro';
import PhonePositionScreen from '@gs/modules/phone-position/screen/PhonePositionScreen';
import ScreenTimeIntro from '@gs/modules/screen-time/screens/ScreenTimeIntro';
import ScreenTime from '@gs/modules/screen-time/screens/ScreenTime';

const Stack = createNativeStackNavigator<StackParamList>();

const HeaderBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} className="p-3 -ml-4">
      <ChevronLeft />
    </TouchableOpacity>
  );
};

const MainStack = () => {
  const headerOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#1C74BB',
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 18,
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    headerLeft: HeaderBack,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
        ...headerOptions,
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
      <Stack.Screen
        name="ScreenBrightnessIntro"
        component={ScreenBrightnessIntro}
        options={{ title: 'Pencahayaan Gadget' }}
      />
      <Stack.Screen
        name="ScreenBrightnessSetting"
        component={ScreenBrightnessSetting}
        options={{ title: 'Pencahayaan Gadget' }}
      />
      <Stack.Screen
        name="PhonePositionIntro"
        component={PhonePositionIntro}
        options={{ title: 'Posisi Handphone' }}
      />
      <Stack.Screen
        name="PhonePositionScreen"
        component={PhonePositionScreen}
        options={{ title: 'Posisi Handphone' }}
      />
      <Stack.Screen
        name="ScreenTimeIntro"
        component={ScreenTimeIntro}
        options={{ title: 'Screen Time' }}
      />
      <Stack.Screen name="ScreenTime" component={ScreenTime} options={{ title: 'Screen Time' }} />
    </Stack.Navigator>
  );
};

export default MainStack;
