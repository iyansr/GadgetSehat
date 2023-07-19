/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import DummyChart from '@gs/assets/svg/DummyChart';
import DoubleArrowIcon from '@gs/assets/svg/DoubleArrowIcon';
import LevelsBadge from '@gs/components/ui/LevelsBadge';
import Articles from '../Components/Articles';
import DashboardHeader from '../Components/DashboardHeader';
import useNavigation from '@gs/lib/react-navigation/useNavigation';

type Menu = {
  title: string;
  icon: any;
  action: () => void;
};

const Item = ({ item }: { item: Menu }) => {
  return (
    <TouchableOpacity
      className="bg-[#E4F3FF] aspect-square rounded-lg p-2 py-4"
      onPress={item.action}>
      <View className="flex-1 text-center justify-center">
        <Image
          source={item.icon}
          className="w-1/2 mx-auto"
          style={{
            objectFit: 'contain',
          }}
        />
      </View>
      <Text className="text-xs text-center mt-2">{item.title}</Text>
    </TouchableOpacity>
  );
};

const DashboardScreen = () => {
  const navigation = useNavigation();

  const menu: Menu[] = [
    {
      title: 'Pencayahaan Gadget',
      icon: require('@gs/assets/images/dash_brightness.png'),
      action: () => navigation.navigate('ScreenBrightnessIntro'),
    },
    {
      title: 'Posisi Handphone',
      icon: require('@gs/assets/images/dash_phone.png'),
      action: () => navigation.navigate('PhonePositionIntro'),
    },
    {
      title: 'Report Sehat Kamu',
      icon: require('@gs/assets/images/dash_report.png'),
      action: () => {},
    },
  ];

  return (
    <ScrollView>
      <DashboardHeader />

      <View className="px-4 mt-5">
        <View className="border border-primary rounded-2xl pb-4">
          <View className="flex-row p-3">
            <View className="flex-1">
              <Text className="font-medium text-primary">Screen time kamu hari ini!</Text>
              <Text className="text-[9px] my-1">{new Date().toLocaleDateString()}</Text>
              <Text className="text-xl font-medium">4h 30m</Text>
            </View>
            <View className="flex-1 items-end">
              <TouchableOpacity className="bg-primary rounded-full pl-3 pr-1 py-[2px] flex-row items-center">
                <Text className="text-[10px] text-white">Atur Screen Time</Text>
                <DoubleArrowIcon />
              </TouchableOpacity>
              <Text className="text-[9px] mb-2 mt-1">Tingkat Kecanduan</Text>
              <LevelsBadge text="Sehat" level="good" />
            </View>
          </View>

          <View className="items-center border-t border-primary">
            <DummyChart />
          </View>
        </View>
      </View>

      <View className="flex-row px-4 space-x-3 mt-4">
        {menu.map((item, index) => (
          <View key={String(index)} className="flex-1">
            <Item item={item} />
          </View>
        ))}
      </View>

      <View className="mt-5">
        <Articles />
      </View>

      <Image
        source={require('@gs/assets/images/ggs_icon.png')}
        resizeMode="cover"
        className="ml-4 mb-6"
      />
    </ScrollView>
  );
};

export default DashboardScreen;
