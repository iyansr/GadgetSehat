import { Image, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import ClockIntro from '@gs/assets/svg/ClockIntro';

const ScreenTimeIntro = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center">
      <Image
        source={require('@gs/assets/images/screentime_intro.png')}
        className="w-1/2 mt-4"
        resizeMode="contain"
      />
      <View className="px-12">
        <Text className="font-medium text-center text-base leading-4">
          Tahukah kamu? Membatasi penggunaannya gadget dalam keeharian bisa berdampak positif untuk
          kesehatan
        </Text>
        <Text className="text-xs text-center my-6">Atur screen time kamu sekarang!</Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="bg-primary px-4 py-2 rounded-xl flex-row items-center"
            onPress={() => navigation.navigate('ScreenTime')}>
            <ClockIntro color="#FFF" width={28} height={28} />
            <Text className="text-lg text-white font-semibold ml-4">Mulai Cek!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScreenTimeIntro;
