import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import ReactNativeModal from 'react-native-modal';

type MarkedDates = Record<string, MarkingProps>;

type Props = {
  onConfirm?: (dates: MarkedDates) => void;
  onClose?: () => void;
  isVisible: boolean;
};

const CalendarModal = ({ onConfirm, isVisible, onClose }: Props) => {
  const [selectedDates, setSelectedDates] = useState<Record<string, MarkingProps>>();

  const onDayPress = (date: DateData) => {
    const currDate = date.dateString;

    setSelectedDates({ [currDate]: { selected: true } });
  };

  const handleConfirm = () => {
    onConfirm?.(selectedDates as MarkedDates);
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      customBackdrop={<View className="flex-1 bg-black/90" />}>
      <View className=" bg-white rounded-3xl p-6">
        <View className="flex items-center flex-row">
          <TouchableOpacity onPress={onClose}>
            <ChevronLeft color="#1C74BB" />
          </TouchableOpacity>
          <View className="flex-1 mr-8">
            <Text className="text-center text-primary font-semibold text-2xl">Pilih Tanggal</Text>
          </View>
        </View>
        <Calendar markingType={'multi-dot'} markedDates={selectedDates} onDayPress={onDayPress} />
        <TouchableOpacity
          className="px-4 py-2 bg-primary rounded-full mt-6"
          onPress={handleConfirm}>
          <Text className="text-center text-white font-medium text-lg">Pilih</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default CalendarModal;
