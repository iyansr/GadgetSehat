/* eslint-disable react-native/no-inline-styles */
import { Dimensions, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import { cn, convertMsToHour, convertMsToTime } from '@gs/lib/utils';
import { LineChart } from 'react-native-chart-kit';
import DangerIcon from '@gs/assets/svg/DangerIcon';
import { format, fromUnixTime } from 'date-fns';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { TimeSpent } from '@gs/lib/native/screentime/screentime';
import { Mode } from '../screen/HealthReportScreen';

type ChartData = {
  start: number;
  end: number;
};

type Props = {
  chartData?: Array<ChartData & TimeSpent>;
  isLoading?: boolean;
  mode: Mode;
};

const HealthReportChart = ({ chartData, mode, isLoading = true }: Props) => {
  const getFormat = (currentMode: Mode) => {
    switch (currentMode) {
      case 'daily':
        return 'HH:mm';
      case 'weekly':
        return 'dd/MM';
      default:
        return 'HH:mm';
    }
  };

  const data: LineChartData = {
    labels: chartData
      ?.map(c =>
        chartData.length > 7 ? '' : format(fromUnixTime(Math.floor(c.end / 1000)), getFormat(mode)),
      )
      ?.reverse() as string[],
    datasets: [
      {
        data: chartData?.map(c => c.timeSpent)?.reverse() as number[],
        color: (opacity = 1) => `rgba(28, 116, 187, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View
      className="items-center border-t-primaryLight border-t w-full mt-5 pt-4"
      style={{ height: 180 }}>
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
          width={Dimensions.get('window').width - 40} // from react-native
          height={170}
          yAxisInterval={1} // optional, defaults to 1
          renderDotContent={({ x, y, index }) => {
            if (chartData && chartData?.length <= 7) {
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
            }

            return null;
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
              r: chartData && chartData?.length <= 7 ? '6' : '0',
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
  );
};

export default HealthReportChart;
