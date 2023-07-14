import { Image, StatusBar, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import MainButton from '@gs/components/ui/MainButton';

const LoginScreen = () => {
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
      <MainButton text="Login dengan Google" />
    </View>
  );
};

export default LoginScreen;
