import { Image, ScrollView, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import Text from '@gs/components/basic/Text';

import { Accelerometer } from 'expo-sensors';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const PhonePositionScreen = () => {
  const rotationX = useSharedValue(0);
  const [rollValue, setRollValue] = React.useState(0);

  useEffect(() => {
    Accelerometer.addListener(acclData => {
      if (acclData) {
        let { x, y, z } = acclData;

        // Calculate roll (tilt along Y-axis)
        let roll = Math.atan2(y, Math.sqrt(x * x + z * z));

        let rollDegrees = (roll * 180) / Math.PI;
        setRollValue(rollDegrees);
        rotationX.value = rollDegrees;
      }
    });

    Accelerometer.setUpdateInterval(100);

    // // Don't forget to remove the listener when the component is unmounted
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, [rotationX]);

  const viewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationX.value}deg` }],
    };
  });

  const getScore = useMemo(() => {
    if (rollValue >= 88 && rollValue <= 92) {
      return 100;
    }
    return 40;
  }, [rollValue]);

  return (
    <ScrollView className="px-4">
      <Text className="text-lg text-center my-6 font-bold">Posisi Handphone kamu</Text>

      <View className="items-center justify-center relative py-6">
        <Image
          source={require('@gs/assets/images/phone_position_angle.png')}
          className="w-full mt-4 opacity-50 rotate-90"
          resizeMode="contain"
        />

        <Animated.Image
          source={require('@gs/assets/images/phone_position_angle.png')}
          className="w-full mt-4 inset-0 z-10 absolute top-6"
          style={viewStyle}
          resizeMode="contain"
        />
      </View>

      <Text className="text-lg text-center my-6 font-bold">Skor posisi:</Text>
      <View className="flex-row justify-center">
        <View className="bg-[#E4F3FF] px-14 py-1 rounded-md">
          <Text className="text-lg text-center font-bold">{getScore}</Text>
        </View>
      </View>
      <Text className="text-xs text-center my-6 mx-12">
        Atur posisi gadget kamu sekarang untuk posisi yang lebih sehat
      </Text>

      <View className="h-36" />
    </ScrollView>
  );
};

export default PhonePositionScreen;
