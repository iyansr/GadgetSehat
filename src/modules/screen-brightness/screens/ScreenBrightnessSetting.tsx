import { View, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import BrightnessIcon from '@gs/assets/svg/BrightnessIcon';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Slider from '@react-native-community/slider';
import LevelsBadge from '@gs/components/ui/LevelsBadge';
import useBrightness from '../hooks/useBrightness';

const ScreenBrightnessSetting = () => {
  const { brightness, getBrightness, setBrightnessAsync, setSystemBrightness } = useBrightness();

  const level = useMemo(() => {
    return Math.floor(brightness * 100);
  }, [brightness]);

  const getLevel = () => {
    if (level >= 0 && level <= 40) {
      return 'normal';
    } else if (level >= 40 && level <= 50) {
      return 'good';
    } else if (level >= 40 && level <= 100) {
      return 'danger';
    }
    return 'normal';
  };

  const label = {
    good: 'Sehat',
    danger: 'Berbahaya',
    normal: 'Normal',
  };

  const color = {
    good: '#189741',
    danger: '#CD202D',
    normal: '#02ABEF',
  };

  return (
    <ScrollView>
      <View className="bg-primary py-5 items-center px-8 pb-20">
        <AnimatedCircularProgress
          size={150}
          width={25}
          fill={level}
          tintColor={color[getLevel()]}
          backgroundColor="#E4F3FF"
          arcSweepAngle={360}
          rotation={360}>
          {fill => (
            <View className="bg-white flex-1 w-full items-center justify-center">
              <Text className="font-semibold text-5xl">{Math.floor(fill)}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <View className="flex-row justify-center mt-6">
          <TouchableOpacity
            className="bg-white px-4 py-2 rounded-xl flex-row items-center"
            onPress={getBrightness}>
            <BrightnessIcon color="#1C74BB" width={28} height={28} />
            <Text className="text-lg text-primary font-semibold ml-4">Cek Ulang</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-6 pt-8 bg-white -mt-10 rounded-t-3xl space-y-4">
        <Text className="font-semibold text-center">Pencahayaan Gadget Kamu</Text>

        <View className="flex-row justify-center">
          <LevelsBadge level={getLevel()} text={label[getLevel()]} size="large" />
        </View>

        <View className="border border-primary rounded-2xl p-6">
          <Text className="font-semibold text-center">Rekomendasi pengaturan GadgetSehat</Text>
          <View className="flex items-center flex-row my-4">
            <View>
              <BrightnessIcon width={18} height={18} />
            </View>
            <View className="flex-1 items-center">
              <Slider
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: '100%', height: 50 }}
                minimumValue={0}
                maximumValue={1}
                step={0.001}
                value={brightness}
                minimumTrackTintColor="#1C74BB"
                maximumTrackTintColor="#1C74BB"
                thumbTintColor="#1C74BB"
                onSlidingComplete={setBrightnessAsync}
              />
            </View>
            <View>
              <BrightnessIcon />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setSystemBrightness(brightness)}
            className="bg-[#ECF7F9] px-4 py-2 rounded-full flex-row justify-center mt-2 border border-primary">
            <Text className="text-center text-primary font-semibold">Atur Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ScreenBrightnessSetting;
