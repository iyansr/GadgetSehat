/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import DoubleArrowIcon from '@gs/assets/svg/DoubleArrowIcon';
import LevelsBadge from '@gs/components/ui/LevelsBadge';
import Articles from '../Components/Articles';
import DashboardHeader from '../Components/DashboardHeader';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import { LineChart } from 'react-native-chart-kit';
import { format, fromUnixTime, getUnixTime, sub } from 'date-fns';
import { cn, convertMsToHour, convertMsToTime } from '@gs/lib/utils';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import DangerIcon from '@gs/assets/svg/DangerIcon';
import useQueryTotalScreenTime from '@gs/modules/shared/hooks/useQueryTotalScreenTime';
import useQueryScreenTimeChart from '@gs/modules/shared/hooks/useQueryScreenTimeChart';

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
  const { data: totalScreenTime, isLoading: loadingScreenTime } = useQueryTotalScreenTime();
  const { data: chartData, isLoading: loadingChart } = useQueryScreenTimeChart({
    dateList: [...new Array(7)].map((_, index) => {
      const start = Math.floor(getUnixTime(sub(new Date(), { days: index + 1 })) * 1000);
      const end = Math.floor(getUnixTime(sub(new Date(), { days: index })) * 1000);

      return {
        start,
        end,
      };
    }),
  });

  const isLoading = loadingScreenTime || loadingChart;

  const data: LineChartData = {
    labels: chartData
      ?.map(c => format(fromUnixTime(Math.floor(c.end / 1000)), 'dd/MM'))
      ?.reverse() as string[],
    datasets: [
      {
        data: chartData?.map(c => c.timeSpent)?.reverse() as number[], //hourlyUsage?.map(h => h.ms) as number[],
        color: (opacity = 1) => `rgba(28, 116, 187, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

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
      action: () => navigation.navigate('HealthReportScreen'),
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
              <Text className="text-xl font-medium">
                {convertMsToTime(totalScreenTime?.timeSpent || 0)}
              </Text>
            </View>
            <View className="flex-1 items-end">
              <TouchableOpacity
                className="bg-primary rounded-full pl-3 pr-1 py-[2px] flex-row items-center"
                onPress={() => navigation.navigate('ScreenTimeIntro')}>
                <Text className="text-[10px] text-white">Atur Screen Time</Text>
                <DoubleArrowIcon />
              </TouchableOpacity>
              <Text className="text-[9px] mb-2 mt-1">Tingkat Kecanduan</Text>
              <LevelsBadge text="Sehat" level="good" />
            </View>
          </View>

          <View className="border-t border-primary pt-4" style={{ height: 180 }}>
            {!isLoading && (
              <LineChart
                formatYLabel={value => {
                  const hour = convertMsToHour(Number(value));
                  if (hour === 0) {
                    return convertMsToTime(Number(value));
                  }
                  return hour + ' h';
                }}
                data={data}
                width={Dimensions.get('window').width - 64} // from react-native
                height={170}
                yAxisInterval={1} // optional, defaults to 1
                renderDotContent={({ x, y, index }) => {
                  const currentData = data.datasets[0].data[index];
                  const hour = convertMsToHour(Number(currentData));
                  let display = '';
                  if (hour === 0) {
                    display = convertMsToTime(Number(currentData));
                  }
                  display = hour + ' h';
                  const isDanger = hour >= 9;
                  return (
                    <View
                      key={index}
                      className={cn('items-center absolute w-8', {
                        ' ': !isDanger,
                      })}
                      style={{
                        top: y - 14, // <--- relevant to height / width (
                        left: x - 7, // <--- width / 2
                      }}>
                      <View className="bg-transparent">
                        {isDanger ? (
                          <DangerIcon />
                        ) : (
                          <Text className="font-semibold text-primary" style={{ fontSize: 10 }}>
                            {display}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                }}
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(28, 116, 187, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 32,
                  },
                  propsForDots: {
                    r: '6',
                  },
                  propsForHorizontalLabels: {
                    fontSize: 8,
                  },
                  propsForVerticalLabels: {
                    fontSize: 8,
                  },
                }}
                bezier
              />
            )}
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
