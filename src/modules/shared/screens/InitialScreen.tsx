import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import useAuth from '@gs/modules/auth/hooks/useAuth';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import { CommonActions } from '@react-navigation/native';
import useMutateUpdateUser from '@gs/modules/auth/hooks/useMutateUpdateUser';
import useQueryUserDB from '@gs/modules/auth/hooks/useQueryUserDB';

const InitialScreen = () => {
  const { initializing, user } = useAuth();
  const { data: fireStoreData, isLoading: isLoadingUser, error: fireStoreError } = useQueryUserDB();

  const { mutate } = useMutateUpdateUser();

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
        if (!fireStoreData.email) {
          mutate({
            data: {
              email: String(user.email),
            },
            userId: user.uid,
          });
        }
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'DashboardScreen' }] }),
        );
        return;
      }
    }
  }, [initializing, user, navigation, fireStoreData, fireStoreError, isLoadingUser, mutate]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#1C74BB" size={64} />
    </View>
  );
};

export default InitialScreen;
