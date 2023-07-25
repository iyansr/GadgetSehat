import { Image, Pressable, ScrollView, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import Text from '@gs/components/basic/Text';
import MainButton from '@gs/components/ui/MainButton';
import CheckMark from '@gs/assets/svg/CheckMark';
import ScreenTimeModule from '@gs/lib/native/screentime/screentime';
import useAppUsagePermission from '@gs/modules/shared/hooks/useAppUsagePermission';

const Item = ({
  onPress,
  enabled,
  text,
}: {
  onPress?: () => void;
  enabled: boolean;
  text: string;
}) => {
  return (
    <Pressable
      className="bg-cyan-50 mt-2 py-2 rounded-full px-4 border border-primary flex-row items-center justify-center"
      onPress={onPress}>
      {enabled && <CheckMark />}
      <View className="flex-1">
        <Text className="text-center text-primary font-semibold">{text}</Text>
      </View>
    </Pressable>
  );
};

type Props = {
  isModalVisible: boolean;
  onPressNext?: (isCompleteRequest: boolean) => void;
};

const PermissionModal = ({ onPressNext, isModalVisible }: Props) => {
  const { data: api } = useAppUsagePermission();

  const [requests, setRequests] = useState({
    appsOnTop: false,
    notification: false,
  });

  const handleRequest = useCallback((key: keyof typeof requests) => {
    setRequests(prev => ({ ...prev, [key]: true }));
  }, []);

  const handlePressNext = () => {
    const isCompleteRequest = Object.values(requests).every(request => request) && api;
    onPressNext?.(isCompleteRequest);
  };

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      customBackdrop={<View className="flex-1 bg-black/90" />}>
      <View className=" bg-white rounded-3xl p-6 pt-8">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-center text-primary text-2xl font-semibold">
            Perijinan Dibutuhkan
          </Text>
          <View className="items-center pb-6 pt-12">
            <Image source={require('@gs/assets/images/permission_1.png')} resizeMode="cover" />
          </View>
          <Text className="text-center font-medium">
            Gadget Sehat membutuhkan beberapa periijinan agar fitur Gadget Sehat dapat berfungsi
            maksimal Atur perijinan sebelum melanjutkan
          </Text>

          <View className="mt-6 space-y-2">
            <Item
              onPress={() => {
                if (!api) {
                  ScreenTimeModule.openUsageSettings();
                }
              }}
              text="Atur Perijinan API"
              enabled={!!api}
            />
            <Item
              onPress={() => handleRequest('appsOnTop')}
              text="Atur Apps on Top"
              enabled={requests.appsOnTop}
            />
            <Item
              onPress={() => handleRequest('notification')}
              text="Atur Perijinan Notifikasi"
              enabled={requests.notification}
            />
          </View>

          <View className="mt-4">
            <MainButton text="Lanjutkan!" onPress={handlePressNext} />
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default PermissionModal;
