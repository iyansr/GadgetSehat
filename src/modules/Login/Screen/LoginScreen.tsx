import { Alert, Image, StatusBar, View } from 'react-native';
import React from 'react';

import Text from '@gs/components/basic/Text';
import MainButton from '@gs/components/ui/MainButton';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { cn } from '@gs/lib/utils';
import useAuth from '@gs/modules/auth/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const LoginScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const authContext = useAuth();
  const handleNavigation = () => {
    navigation.replace('InitialScreen');
  };

  const handleLoginGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      await authContext.googleLogin(idToken as string);
      await queryClient.invalidateQueries({ queryKey: ['firestoruser'] });
      handleNavigation();
    } catch (error) {
      Alert.alert('Error', `Terjadi kesalahan saat login: ${error?.message}`);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-6">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="flex-1">
        <Image source={require('@gs/assets/images/ggs_icon.png')} resizeMode="cover" />
        <Text className="font-bold text-3xl text-primary mt-9">{'Mulai Progress \nSehatmu!'}</Text>
        <View className="items-center">
          <Image
            source={require('@gs/assets/images/login_illustration.png')}
            className="w-4/5 mt-8"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              objectFit: 'contain',
            }}
          />
        </View>
      </View>
      <MainButton
        text={loading ? 'Sedang Login...' : 'Login dengan Google'}
        disabled={loading}
        onPress={handleLoginGoogle}
        className={cn({ 'opacity-70': loading })}
      />
    </View>
  );
};

export default LoginScreen;
