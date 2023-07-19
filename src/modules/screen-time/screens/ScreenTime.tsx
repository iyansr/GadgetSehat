import { View, ScrollView, Switch } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import DummyChart from '@gs/assets/svg/DummyChart';
import ClockIntro from '@gs/assets/svg/ClockIntro';

const ScreenTime = () => {
  const [value, setValue] = React.useState(false);
  const [value1, setValue1] = React.useState(false);

  return (
    <ScrollView>
      <View className="bg-primary py-5 items-center px-8 pb-20">
        <View className="flex-row justify-center mt-6">
          <View className="absolute bg-normal z-10 left-2 -top-5 h-12 w-12 items-center justify-center rounded-full">
            <ClockIntro width={32} height={32} />
          </View>
          <View className="relative px-10 pl-16 bg-[#E4F3FF] py-3 rounded-lg">
            <Text className="font-semibold text-xl">4h 30m</Text>
          </View>
        </View>

        <Text className="mt-4 font-semibold text-base text-white">Screen time kamu sekarang</Text>
      </View>
      <View className="px-6 pt-8 bg-white -mt-10 rounded-t-3xl space-y-4">
        <View className="border border-primary rounded-2xl pb-4">
          <View className="flex-row p-3">
            <View className="flex-1">
              <Text className="font-medium text-primary">Rata-rata screen time 7 hari</Text>
              <Text className="text-xl font-medium">4h 30m</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-[9px] my-1">
                {new Date().toLocaleDateString()} - {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View className="items-center border-t border-primary">
            <DummyChart />
          </View>
        </View>
        <View className="p-4 border border-primary rounded-2xl">
          <View>
            <Text className="text-lg leading-6  font-medium">Aktifkan fitur Screen Time</Text>
            <View className="flex items-center flex-row mt-2">
              <Text className="text-xs flex-1">
                Nyalakan fitur screen time untuk mengetahui berapa lama kamu membuka gadget dalam
                sehari
              </Text>
              <Switch value={value} onValueChange={setValue} />
            </View>
          </View>
          <View className="mt-2">
            <Text className="text-lg leading-6  font-medium">Aktifkan Peringatan Batas Waktu</Text>
            <View className="flex items-center flex-row mt-2">
              <Text className="text-xs flex-1">
                Nyalakan fitur peringatan batas waktu untuk mengingatkan kamu agar tidak memakai
                gadget secara berlebihan!
              </Text>
              <Switch value={value1} onValueChange={setValue1} />
            </View>
          </View>
        </View>
        <View className="h-36" />
      </View>
    </ScrollView>
  );
};

export default ScreenTime;
