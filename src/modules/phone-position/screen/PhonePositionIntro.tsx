import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import ArrowCenter from '@gs/assets/svg/ArrowCenter';

import GyroCheckerModule from '@gs/lib/native/gyrochecker/gyrochecker';
import { cn } from '@gs/lib/utils';
import useNavigation from '@gs/lib/react-navigation/useNavigation';

const PhonePositionIntro = () => {
  const navigation = useNavigation();
  const [hasGyro, setHasGyro] = React.useState(false);

  const checkHasGyro = async () => {
    const _hasGyro = await GyroCheckerModule.hasGyroscope();
    setHasGyro(_hasGyro);
  };

  useEffect(() => {
    checkHasGyro();
  }, []);

  const handleNavigation = async () => {
    if (!hasGyro) {
      return;
    }
    navigation.navigate('PhonePositionScreen');
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('@gs/assets/images/phone_position.png')}
        className="w-1/2 mt-4"
        resizeMode="contain"
      />
      <View className="px-12">
        <Text className="font-medium text-center text-base leading-4">
          Tahukah kamu? Walaupun nyaman, tapi menggunakan gadget sambil tiduran bisa berakibat tidak
          baik untuk kesehatanmu.
        </Text>
        <Text className="text-xs text-center my-6">Cek Posisi Gadget kamu sekarang!</Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            disabled={!hasGyro}
            className={cn('bg-primary px-4 py-2 rounded-xl flex-row items-center', {
              'opacity-70': !hasGyro,
            })}
            onPress={handleNavigation}>
            <ArrowCenter color="#FFF" width={28} height={28} />
            <Text className="text-lg text-white font-semibold ml-4">Mulai Cek!</Text>
          </TouchableOpacity>
        </View>
        {!hasGyro && (
          <Text className="text-xs text-center my-6">
            Handphone anda tidak memiliki fitur ini, dikarenakan tidak memiliki fitur gyroscope
          </Text>
        )}
      </View>
    </View>
  );
};

export default PhonePositionIntro;
