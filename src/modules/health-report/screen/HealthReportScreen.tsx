import { Image, ScrollView, Switch, View } from 'react-native';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import { cn, convertMsToTime, normalizeUnixTime } from '@gs/lib/utils';
import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import LevelsBadge from '@gs/components/ui/LevelsBadge';
import ClockIntro from '@gs/assets/svg/ClockIntro';
import ArrowDownIcon from '@gs/assets/svg/ArrowDownIcon';
import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  fromUnixTime,
  getUnixTime,
  isBefore,
  parse,
  startOfDay,
  startOfMonth,
  sub,
} from 'date-fns';
import useQueryTotalScreenTime from '@gs/modules/shared/hooks/useQueryTotalScreenTime';
import CalendarModal from '../components/CalendarModal';
import HealthReportChart from '../components/HealthReportChart';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import useQueryScreenTimeChart from '@gs/modules/shared/hooks/useQueryScreenTimeChart';
import RangeCalendarModal, { RangeCalendarModalConfirm } from '../components/RangeCalendarModal';
import { FORMAT_DISPLAY, FORMAT_PARSE } from '@gs/modules/shared/constant';
import MonthPickerModal from '../components/MonthPickerModal';

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

export type Mode = 'daily' | 'weekly' | 'monthly';

const today = new Date();
const sevenDaysAgo = sub(new Date(), { days: 7 });

const HealthReportScreen = () => {
  const navigation = useNavigation();

  const [value, setValue] = React.useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalRange, setShowModalRange] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [mode, setMode] = useState<Mode>('daily');

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [currDate, setCurrDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    format(sevenDaysAgo, FORMAT_PARSE),
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(
    format(today, FORMAT_PARSE),
  );

  const isTodayDate = useMemo(() => {
    return format(currDate, FORMAT_DISPLAY) === format(new Date(), FORMAT_DISPLAY);
  }, [currDate]);

  const hourlyList = useMemo(() => {
    return [...new Array(24)].map((_, index) => {
      const date = isTodayDate ? new Date() : startOfDay(currDate);

      const start = Math.floor(getUnixTime(sub(currDate, { hours: index + 1 })) * 1000);
      const end = Math.floor(getUnixTime(sub(date, { hours: index })) * 1000);

      return {
        start,
        end,
      };
    });
  }, [currDate, isTodayDate]);

  const weeklyList = useMemo(() => {
    const startD = parse(selectedStartDate ?? '', FORMAT_PARSE, new Date());
    const endD = parse(selectedEndDate ?? '', FORMAT_PARSE, new Date());

    return eachDayOfInterval({ start: startD, end: endD }).map(date => {
      const start = Math.floor(getUnixTime(startOfDay(date)) * 1000);
      const end = Math.floor(getUnixTime(endOfDay(date)) * 1000);

      return {
        start,
        end,
      };
    });
  }, [selectedEndDate, selectedStartDate]);

  const monthlyList = useMemo(() => {
    const startD = startOfMonth(selectedMonth);
    const endD = endOfMonth(selectedMonth);

    return eachDayOfInterval({ start: startD, end: endD }).map(date => {
      const start = Math.floor(getUnixTime(startOfDay(date)) * 1000);
      const end = Math.floor(getUnixTime(endOfDay(date)) * 1000);

      return {
        start,
        end,
      };
    });
  }, [selectedMonth]);

  const dateList = useMemo(() => {
    switch (mode) {
      case 'daily':
        return hourlyList;
      case 'weekly':
        return weeklyList;
      case 'monthly':
        return monthlyList;

      default:
        return hourlyList;
    }
  }, [hourlyList, weeklyList, mode, monthlyList]);

  const screenTimeParams = useMemo(() => {
    return {
      start: Math.floor(getUnixTime(startOfDay(currDate)) * 1000),
      end: Math.floor(getUnixTime(endOfDay(currDate)) * 1000),
    };
  }, [currDate]);

  const { data: totalScreenTime } = useQueryTotalScreenTime(
    screenTimeParams.end,
    screenTimeParams.start,
  );
  const { data: usageList, isLoading } = useQueryScreenTimeChart({
    dateList,
  });

  const handleRangeConfirm = useCallback<RangeCalendarModalConfirm>(data => {
    const startDate = parse(data.startDate, FORMAT_PARSE, new Date());
    const endDate = parse(data.endDate, FORMAT_PARSE, new Date());

    if (isBefore(startDate, endDate)) {
      setSelectedStartDate(data.startDate);
      setSelectedEndDate(data.endDate);
    } else {
      setSelectedStartDate(data.endDate);
      setSelectedEndDate(data.startDate);
    }

    setShowModalRange(false);
  }, []);

  const peakUsage = useMemo(() => {
    return usageList?.reduce((prev, curr) => {
      if (curr.timeSpent > prev.timeSpent) {
        return curr;
      } else {
        return prev;
      }
    });
  }, [usageList]);

  const handleShowModal = () => {
    switch (mode) {
      case 'daily':
        setShowModal(true);
        break;

      case 'weekly':
        setShowModalRange(true);
        break;
      case 'monthly':
        setShowPickerModal(true);
        break;

      default:
        break;
    }
  };

  const displayDate = useMemo(() => {
    switch (mode) {
      case 'daily':
        return format(currDate, FORMAT_DISPLAY);

      case 'weekly':
        const parseStart = parse(selectedStartDate ?? '', FORMAT_PARSE, new Date());
        const parseEnd = parse(selectedEndDate ?? '', FORMAT_PARSE, new Date());
        return `${format(parseStart, FORMAT_DISPLAY)} - ${format(parseEnd, FORMAT_DISPLAY)}`;
      case 'monthly':
        return format(selectedMonth, 'MMMM yyyy');

      default:
        return format(currDate, FORMAT_DISPLAY);
    }
  }, [currDate, mode, selectedEndDate, selectedStartDate, selectedMonth]);

  return (
    <Fragment>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <View className="p-4 flex-row">
          {['Daily', 'Weekly', 'Monthly'].map(item => (
            <TouchableOpacity
              onPress={() => setMode(item.toLowerCase() as Mode)}
              key={item}
              className={cn('bg-primaryLight px-4 py-2 rounded-full', {
                'bg-white': mode !== item.toLowerCase(),
              })}>
              <Text
                className={cn('text-primary font-medium', {
                  'text-neutral-400': mode !== item.toLowerCase(),
                })}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row px-4 justify-between items-center mt-6">
          <Text>Tanggal</Text>
          <TouchableOpacity className="flex items-center flex-row" onPress={handleShowModal}>
            <Text>{displayDate}</Text>
            <View className="-rotate-90 ml-3">
              <ChevronLeft color="#1C74BB" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-6">
          <View className="bg-primaryLight p-5 rounded-lg items-center">
            <Text className="text-center font-bold text-base">Level Kecanduan Kamu</Text>

            <View className="mt-6">
              <LevelsBadge level="good" size="large" text="Sehat" />
            </View>
            {!isTodayDate && (
              <TouchableOpacity
                className="mt-4"
                hitSlop={8}
                onPress={() => navigation.navigate('HealthHistory')}>
                <Text className="text-xs font-bold text-primary">Lihat detail riwayat</Text>
              </TouchableOpacity>
            )}
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
                    {convertMsToTime(totalScreenTime?.timeSpent ?? 0)}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row px-4 justify-between items-center mt-6">
              <Text className="font-semibold text-xs">Grafik Penggunaan</Text>
              {mode === 'daily' && (
                <Text className="font-semibold text-xs text-red-500">
                  Peak usage:{' '}
                  {format(fromUnixTime(normalizeUnixTime(peakUsage?.start ?? Date.now())), 'HH:mm')}{' '}
                  -{format(fromUnixTime(normalizeUnixTime(peakUsage?.end ?? Date.now())), 'HH:mm')}
                </Text>
              )}
            </View>

            <HealthReportChart chartData={usageList} isLoading={isLoading} mode={mode} />

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

            <View className="flex-row items-center px-4 mt-4 flex-wrap">
              {totalScreenTime?.packageList?.slice(0, 8)?.map((item, index) => (
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
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
      <CalendarModal
        isVisible={showModal}
        onConfirm={dates => {
          const d = Object.keys(dates)[0];
          const dateParse = parse(d, FORMAT_PARSE, new Date());
          setCurrDate(dateParse);
          setShowModal(false);
        }}
        onClose={() => setShowModal(false)}
      />
      <RangeCalendarModal
        isVisible={showModalRange}
        onClose={() => setShowModalRange(false)}
        onConfirm={handleRangeConfirm}
      />
      <MonthPickerModal
        isVisible={showPickerModal}
        onClose={() => setShowPickerModal(false)}
        onConfirm={d => {
          setSelectedMonth(d);
          setShowPickerModal(false);
        }}
      />
    </Fragment>
  );
};

export default HealthReportScreen;
