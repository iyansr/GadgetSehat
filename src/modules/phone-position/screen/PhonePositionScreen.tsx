import { Animated, Image, ScrollView, Switch, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Text from '@gs/components/basic/Text';
import { SensorTypes, gyroscope, setUpdateIntervalForType } from 'react-native-sensors';

const PhonePositionScreen = () => {
  const [value, setValue] = React.useState(false);

  const rotate = useRef(
    new Animated.Value(0, {
      useNativeDriver: true,
    }),
  ).current;

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 50);
    let lastX = [0];
    let Listener = gyroscope.subscribe(({ x }) => {
      lastX.push(Math.round(x / 0.0025));
      rotate.setValue(lastX.reduce((a, b) => a + b) / lastX.length);
    });
    return () => {
      try {
        Listener.unsubscribe();
      } catch (err) {
        console.log('Gyroscope Animation unsubscribe Error: ', err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView className="px-4">
      <Text className="text-lg text-center my-6 font-bold">Posisi Handphone kamu</Text>

      <View className="items-center justify-center relative py-6">
        <Image
          source={require('@gs/assets/images/phone_position_phone.png')}
          className="w-1/2 mt-4 opacity-50"
          resizeMode="contain"
        />

        <Animated.Image
          source={require('@gs/assets/images/phone_position_phone.png')}
          className="w-1/2 mt-4 inset-0 z-10 absolute top-6"
          style={{
            transform: [
              {
                rotate: rotate.interpolate({
                  inputRange: [-180, 180],
                  outputRange: ['-180deg', '180deg'],
                }),
              },
            ],
          }}
          resizeMode="contain"
        />
      </View>

      <Text className="text-lg text-center my-6 font-bold">Skor posisi:</Text>
      <View className="flex-row justify-center">
        <View className="bg-[#E4F3FF] px-14 py-1 rounded-md">
          <Text className="text-lg text-center font-bold">40</Text>
        </View>
      </View>
      <Text className="text-xs text-center my-6 mx-12">
        Posisi gadget kamu terlalu miring ke atas, turunkan posisi gadget kamu sekarang untuk posisi
        yang lebih sehat
      </Text>

      <View className="p-4 border border-primary rounded-2xl">
        <Text className="text-lg leading-6  font-medium">
          Pengaturan Pengingat Posisi Handphone
        </Text>
        <View className="flex items-center flex-row mt-2">
          <Text className="text-xs flex-1">Selalu nyalakan pengingat posisi handphone?</Text>
          <Switch value={value} onValueChange={setValue} />
        </View>
      </View>
      <View className="h-36" />
    </ScrollView>
  );
};

export default PhonePositionScreen;
