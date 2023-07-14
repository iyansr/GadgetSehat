import { Image, View } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import Text from '@gs/components/basic/Text';
import MainButton from '@gs/components/ui/MainButton';

type Props = {
  isVisible: boolean;
  onContinue?: () => void;
};

const EditProfileSuccessModal = ({ isVisible, onContinue }: Props) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View className="shadow-lg bg-white rounded-2xl p-8 space-y-2 items-center ">
        <Text className="text-xl text-center font-semibold text-primary">Profil Lengkap!</Text>
        <Image
          source={require('@gs/assets/images/profile_ok.png')}
          className="w-1/2"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ objectFit: 'contain' }}
        />
        <Text className="text-center font-medium mb-8">
          Sekarang kamu sudah siap untuk memulai perjalanan sehatmu
        </Text>

        <View className="w-full">
          <MainButton text="Lanjutkan" onPress={onContinue} />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default EditProfileSuccessModal;
