import { Image, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import BrightnessIcon from '@gs/assets/svg/BrightnessIcon';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import * as Brightness from 'expo-brightness';

const ScreenBrightnessIntro = () => {
  const navigation = useNavigation();
  const [permissionResponse, requestPermission] = Brightness.usePermissions();

  const handlePress = async () => {
    if (permissionResponse?.status === 'granted') {
      navigation.navigate('ScreenBrightnessSetting');
    } else {
      const response = await requestPermission();

      if (response?.status === 'granted') {
        navigation.navigate('ScreenBrightnessSetting');
      }
    }
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('@gs/assets/images/brightness_intro.png')}
        className="w-1/2 mt-4"
        resizeMode="contain"
      />
      <View className="px-12">
        <Text className="font-medium text-center text-base leading-4">
          Tahukah kamu? Cahaya layar gadget yang terlalu terang tidak baik untukmu dan kesehatanmu.
        </Text>
        <Text className="text-xs text-center my-6">Cek kecerahan layar Gadget kamu sekarang!</Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="bg-primary px-4 py-2 rounded-xl flex-row items-center"
            onPress={handlePress}>
            <BrightnessIcon color="#FFF" width={28} height={28} />
            <Text className="text-lg text-white font-semibold ml-4">Mulai Cek!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScreenBrightnessIntro;
