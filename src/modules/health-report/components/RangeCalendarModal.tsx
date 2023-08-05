import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import { eachDayOfInterval, format, parse, sub } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import ReactNativeModal from 'react-native-modal';

import '@gs/lib/calendarLocale';
import { FORMAT_PARSE } from '@gs/modules/shared/constant';

type MarkedDates = Record<string, MarkingProps>;

type Props = {
  onConfirm?: ({ startDate, endDate }: { startDate: string; endDate: string }) => void;
  onClose?: () => void;
  isVisible: boolean;
};

const startDateMarking: MarkingProps = {
  selected: true,
  startingDay: true,
  customStyles: {
    container: {
      backgroundColor: '#1C74BB',
    },
  },
};

const dateBetweenMarking: MarkingProps = {
  selected: true,
  customStyles: {
    container: {
      backgroundColor: '#E4F3FF',
    },
    text: {
      color: '#404040',
    },
  },
};

const endDateMarking: MarkingProps = {
  selected: true,
  endingDay: true,
  customStyles: {
    container: {
      backgroundColor: '#1C74BB',
    },
  },
};

const currentDate = new Date();
const sevenDaysAgo = sub(new Date(), { days: 7 });

const CalendarModal = ({ onConfirm, isVisible, onClose }: Props) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    format(currentDate, FORMAT_PARSE),
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(
    format(sevenDaysAgo, FORMAT_PARSE),
  );
  const [markedDates, setMarkedDates] = useState<MarkedDates | undefined>();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const dateRange = eachDayOfInterval({ start: sevenDaysAgo, end: currentDate });

    let selectedDates: MarkedDates = {};
    dateRange.forEach((date, index) => {
      const dateString = format(date, FORMAT_PARSE);
      selectedDates[dateString] = {
        ...dateBetweenMarking,
        ...(index === 0 ? startDateMarking : {}),
        ...(index === dateRange.length - 1 ? endDateMarking : {}),
      };
    });
    setMarkedDates(selectedDates);
  }, []);

  const onDayPress = useCallback(
    (day: DateData) => {
      if (!selectedStartDate || selectedEndDate) {
        // If no start date is selected or both start and end dates are selected, set the start date
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        setMarkedDates({
          [day.dateString]: startDateMarking,
        });
      } else {
        // If start date is already selected, set the end date
        setSelectedEndDate(day.dateString);

        // Get all the dates in the range between selectedStartDate and selectedEndDate
        const startDate = parse(selectedStartDate, FORMAT_PARSE, new Date());
        const endDate = parse(day.dateString, FORMAT_PARSE, new Date());
        const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

        // Convert the date objects to dateString format and store them in an object with proper marking
        let selectedDates: MarkedDates = {};
        dateRange.forEach((date, index) => {
          const dateString = format(date, FORMAT_PARSE);
          selectedDates[dateString] = {
            ...dateBetweenMarking,
            ...(index === 0 ? startDateMarking : {}),
            ...(index === dateRange.length - 1 ? endDateMarking : {}),
          };
        });

        setMarkedDates(selectedDates);
      }
    },
    [selectedEndDate, selectedStartDate],
  );

  const handleConfirm = () => {
    onConfirm?.({
      startDate: selectedStartDate as string,
      endDate: selectedEndDate as string,
    });
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      customBackdrop={<View className="flex-1 bg-black/90" />}>
      <View className="bg-white rounded-3xl py-6">
        <View className="flex items-center flex-row px-6">
          <TouchableOpacity onPress={onClose}>
            <ChevronLeft color="#1C74BB" />
          </TouchableOpacity>
          <View className="flex-1 mr-8">
            <Text className="text-center text-primary font-semibold text-2xl">Pilih Tanggal</Text>
          </View>
        </View>
        <CalendarList
          style={{ height: height - 210 }}
          markedDates={markedDates}
          onDayPress={onDayPress}
          calendarWidth={width - 32}
          markingType="custom"
        />
        <TouchableOpacity
          className="px-4 py-2 bg-primary rounded-full mt-6 mx-6"
          onPress={handleConfirm}>
          <Text className="text-center text-white font-medium text-lg">Pilih</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default CalendarModal;
