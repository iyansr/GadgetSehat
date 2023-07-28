import { Image, ScrollView, Switch, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import { cn, convertMsToTime } from '@gs/lib/utils';
import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import LevelsBadge from '@gs/components/ui/LevelsBadge';
import ClockIntro from '@gs/assets/svg/ClockIntro';
import ArrowDownIcon from '@gs/assets/svg/ArrowDownIcon';
import useQueryAppUsage from '@gs/modules/shared/hooks/useQueryAppUsage';
import { format, getUnixTime, parse, startOfDay } from 'date-fns';
import { ScreenTimeInterval } from '@gs/lib/native/screentime/screentime';
import useQueryTotalScreenTime from '@gs/modules/shared/hooks/useQueryTotalScreenTime';
import CalendarModal from '../components/CalendarModal';

const screentimeReport = [
  {
    title: 'Skor',
    value: '50',
  },
  {
    title: 'Rata-rata',
    value: '65',
  },
  {
    title: 'Progress',
    value: <ArrowDownIcon />,
  },
];

const HealthReportScreen = () => {
  const startToday = Math.floor(getUnixTime(startOfDay(new Date())) * 1000);

  const [value, setValue] = React.useState(false);
  const [value1, setValue1] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currDate, setCurrDate] = useState(new Date());

  const { data: appUsageReport } = useQueryAppUsage({
    start: 0,
    end: startToday,
    interval: ScreenTimeInterval.INTERVAL_DAILY,
  });

  const { data: totalScreenTime } = useQueryTotalScreenTime();

  return (
    <Fragment>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <View className="p-4 flex-row">
          {['Daily', 'Weekly', 'Monthly'].map((item, index) => (
            <TouchableOpacity
              key={item}
              className={cn('bg-primaryLight px-4 py-2 rounded-full', {
                'bg-white': index !== 0,
              })}>
              <Text
                className={cn('text-primary font-medium', {
                  'text-neutral-400': index !== 0,
                })}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row px-4 justify-between items-center mt-6">
          <Text>Tanggal</Text>
          <TouchableOpacity
            className="flex items-center flex-row"
            onPress={() => setShowModal(true)}>
            <Text>{format(currDate, 'dd/MM/yyyy')}</Text>
            <View className="-rotate-90 ml-3">
              <ChevronLeft color="#1C74BB" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-6">
          <View className="bg-primaryLight p-5 rounded-lg">
            <Text className="text-center font-bold text-base">Level Kecanduan Kamu</Text>

            <View className="flex-row justify-center mt-7">
              <LevelsBadge level="good" size="large" text="Sehat" />
            </View>
          </View>
        </View>
        <View className="px-4 mt-4">
          <View className="border border-primary rounded-xl py-4">
            <View className="items-center">
              <Text className="text-center font-bold text-base">Total Screen Time</Text>

              <View className="flex-row justify-center mt-10">
                <View className="absolute bg-normal z-10 left-2 -top-5 h-12 w-12 items-center justify-center rounded-full">
                  <ClockIntro width={32} height={32} />
                </View>
                <View className="relative px-10 pl-16 bg-[#E4F3FF] py-3 rounded-lg">
                  <Text className="font-semibold text-xl">
                    {convertMsToTime(totalScreenTime ?? 0)}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row px-4 justify-between items-center mt-6">
              <Text className="font-semibold text-xs">Grafik Penggunaan</Text>
              <Text className="font-semibold text-xs text-red-500">Peak usage: 08am - 12pm</Text>
            </View>

            {/* <View className="items-center border-t-primaryLight border-t w-full mt-5 pt-4">
            <DummyChartHealth />
          </View> */}

            <View className="flex-row items-center space-x-2 px-4 mt-4">
              {screentimeReport.map((item, index) => (
                <View
                  key={index}
                  className="flex-1 bg-primaryLight p-2 rounded-lg items-center justify-center aspect-[3/2]">
                  {typeof item.value === 'string' ? (
                    <Text className="text-2xl">{item.value}</Text>
                  ) : (
                    item.value
                  )}

                  <Text className="font-semibold text-primary">{item.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="border border-primary rounded-xl py-4">
            <View className="items-center">
              <Text className="text-center font-bold text-base">Penggunaan Aplikasi</Text>
            </View>

            <View className="flex-row items-center justify-between px-4 mt-4 flex-wrap">
              {appUsageReport?.appUsageList?.map((item, index) => (
                <View key={index} className="w-1/4 p-1">
                  <View className=" bg-primaryLight p-2 rounded-lg items-center justify-center  aspect-[5/6]">
                    <Image
                      source={{ uri: 'data:image/png;base64,' + item?.iconBase64 }}
                      className="h-10 w-10"
                    />
                    <Text className="font-semibold text-[10px]  text-primary mt-2">
                      {convertMsToTime(item?.usageTime ?? 0)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="border border-primary rounded-xl p-4">
            <View className="flex-row items-center">
              <View className="flex-1">
                <View className="flex-row">
                  <View className="bg-normal px-8 py-1 rounded-md">
                    <Text className="text-white text-xs">Normal</Text>
                  </View>
                </View>
                <Text className="text-base font-bold mt-2">Pencahayaan Gadget kamu: </Text>
              </View>

              <View>
                <Text className="text-primary text-xs font-serif">Skor:</Text>
                <Text className="text-2xl">80</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="border border-primary rounded-xl p-4">
            <Text className="text-base font-bold">Fitur Gadgetsehat </Text>

            <View className="flex items-center flex-row mt-2">
              <Text className="text-xs flex-1">Screen Time</Text>
              <Switch value={true} />
            </View>
            <View className="flex items-center flex-row mt-2">
              <Text className="text-xs flex-1">Peringatan Batas Waktu</Text>
              <Switch value={value} onValueChange={setValue} />
            </View>
            <View className="flex items-center flex-row mt-2">
              <Text className="text-xs flex-1">Floating Timer</Text>
              <Switch value={value1} onValueChange={setValue1} />
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
      <CalendarModal
        isVisible={showModal}
        onConfirm={dates => {
          const d = Object.keys(dates)[0];
          const dateParse = parse(d, 'yyyy-MM-dd', new Date());
          setCurrDate(dateParse);
          setShowModal(false);
        }}
        onClose={() => setShowModal(false)}
      />
    </Fragment>
  );
};

export default HealthReportScreen;
