import ChevronLeft from '@gs/assets/svg/ChevronLeft';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import React, { useState } from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import '@gs/lib/calendarLocale';
import { DatePicker } from 'react-native-wheel-pick';

type Props = {
  onConfirm?: (date: Date) => void;
  onClose?: () => void;
  isVisible: boolean;
};

const MonthPickerModal = ({ onConfirm, isVisible, onClose }: Props) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const handleChangeDate = (date: Date) => {
    setSelectedMonth(date);
  };

  const handleConfirm = () => {
    onConfirm?.(selectedMonth);
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
            <Text className="text-center text-primary font-semibold text-2xl">Pilih Bulan</Text>
          </View>
        </View>
        <DatePicker
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: '#fff', marginTop: 20 }}
          textColor="#1C74BB"
          order="M-Y"
          onDateChange={handleChangeDate}
        />
        <TouchableOpacity
          className="px-4 py-2 bg-primary rounded-full mt-6"
          onPress={handleConfirm}>
          <Text className="text-center text-white font-medium text-lg">Pilih</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default MonthPickerModal;
