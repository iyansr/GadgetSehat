import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import React, { useState } from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import { Picker } from 'react-native-wheel-pick';

type Props = {
  onConfirm?: (seconds: number) => void;
  onClose?: () => void;
  isVisible: boolean;
};

const hours = Array.from({ length: 25 }, (_, i) => i);
const hoursPickerData = hours.map(hour => ({
  value: hour,
  label: hour.toString().padStart(2, '0'),
}));

const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
const minutesPickerData = minutes.map(minute => ({
  value: minute,
  label: minute.toString().padStart(2, '0'),
}));

const TimeModal = ({ onConfirm, isVisible, onClose }: Props) => {
  const [time, setTime] = useState({ hour: 0, minute: 1 });

  const handleConfirm = () => {
    const seconds = time.hour * 3600 + time.minute * 60;
    onConfirm?.(seconds);
  };

  const pickerStyle = { backgroundColor: '#fff', marginTop: 20 };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      customBackdrop={<View className="flex-1 bg-black/90" />}>
      <View className=" bg-white rounded-3xl p-6">
        <Text className="text-center text-primary font-semibold text-2xl">Batas Waktu</Text>
        <View className="flex-row mt-4">
          <View className="flex-1">
            <Text className="text-center text-base text-primary font-medium">Jam</Text>
            <Picker
              style={pickerStyle}
              selectedValue={time.hour}
              pickerData={hoursPickerData}
              textColor="#1C74BB"
              onValueChange={(value: number) => {
                setTime(prev => ({ ...prev, hour: value }));
              }}
            />
          </View>
          <View className="flex-1">
            <Text className="text-center text-base text-primary font-medium">Menit</Text>
            <Picker
              style={pickerStyle}
              selectedValue={time.minute}
              pickerData={minutesPickerData}
              textColor="#1C74BB"
              onValueChange={(value: number) => {
                setTime(prev => ({ ...prev, minute: value }));
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          className="px-4 py-2 bg-primary rounded-full mt-6"
          onPress={handleConfirm}>
          <Text className="text-center text-white font-medium text-lg">Pilih</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default TimeModal;
