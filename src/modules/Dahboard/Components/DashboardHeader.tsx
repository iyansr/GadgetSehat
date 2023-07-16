import { Image, View } from 'react-native';
import React from 'react';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import Text from '@gs/components/basic/Text';
import BellIcon from '@gs/assets/svg/BellIcon';
import PersonIcon from '@gs/assets/svg/PersonIcon';
import useQueryGetFirestoreUser from '@gs/modules/auth/hooks/useQueryGetFirestoreUser';

const DashboardHeader = () => {
  const { data } = useQueryGetFirestoreUser();

  const image =
    data?.gender === 'female'
      ? require('@gs/assets/images/profile_f.png')
      : require('@gs/assets/images/profile_m.png');

  return (
    <View className="px-4 pt-8">
      <Image source={image} className="w-16 h-16" />
      <View className="flex flex-row items-center mt-4 space-x-3">
        <View className="flex flex-col flex-1">
          <Text className="text-2xl font-semibold text-primary">Hello, {data?.fullName}</Text>
          <Text className="text-xs">Bagaimana kabarmu hari ini?</Text>
        </View>

        <TouchableOpacity className="bg-primary rounded-full h-9 w-9 items-center justify-center">
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary rounded-full h-9 w-9 items-center justify-center">
          <PersonIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;
