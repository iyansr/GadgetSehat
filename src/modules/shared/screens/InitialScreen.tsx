import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import useAuth from '@gs/modules/auth/hooks/useAuth';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import { CommonActions } from '@react-navigation/native';
import useQueryGetFirestoreUser from '@gs/modules/auth/hooks/useQueryGetFirestoreUser';

const InitialScreen = () => {
  const { initializing, user } = useAuth();
  const {
    data: fireStoreData,
    isLoading: isLoadingUser,
    error: fireStoreError,
  } = useQueryGetFirestoreUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (!initializing || !isLoadingUser) {
      if (!user) {
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'OnboardingScreen' }] }),
        );
        return;
      }

      if (fireStoreError) {
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'EditProfileScreen' }] }),
        );
        return;
      }

      if (fireStoreData) {
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'DashboardScreen' }] }),
        );
        return;
      }
    }
  }, [initializing, user, navigation, fireStoreData, fireStoreError, isLoadingUser]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#1C74BB" size={64} />
    </View>
  );
};

export default InitialScreen;
