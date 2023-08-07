import { View, ScrollView } from 'react-native';
import React, { Fragment } from 'react';
import Text from '@gs/components/basic/Text';
import ClockIntro from '@gs/assets/svg/ClockIntro';
import ScreenTimeChart from '../components/ScreenTimeChart';
import Toggle from '@gs/components/basic/Toggle';
import useQueryTotalScreenTime from '@gs/modules/shared/hooks/useQueryTotalScreenTime';
import { convertMsToTime } from '@gs/lib/utils';
import { getUnixTime, sub } from 'date-fns';
import TimeModal from '../components/TimeModal';

import useSetNotification from '../hooks/useSetNotification';

const ScreenTime = () => {
  const { setShowModal, showModal, cancelPushNotif, schedulePushNotification, reminderData } =
    useSetNotification();

  const sevenDaysAgo = sub(new Date(), { days: 7 });
  const today = new Date();
  const { data: totalScreenTime } = useQueryTotalScreenTime();
  const { data: totalScreenTime7Days } = useQueryTotalScreenTime(
    Math.floor(getUnixTime(today) * 1000),
    Math.floor(getUnixTime(sevenDaysAgo) * 1000),
  );

  return (
    <Fragment>
      <ScrollView>
        <View className="bg-primary py-5 items-center px-8 pb-20">
          <View className="flex-row justify-center mt-6">
            <View className="absolute bg-normal z-10 left-2 -top-5 h-12 w-12 items-center justify-center rounded-full">
              <ClockIntro width={32} height={32} />
            </View>
            <View className="relative px-10 pl-16 bg-[#E4F3FF] py-3 rounded-lg">
              <Text className="font-semibold text-xl">
                {convertMsToTime(totalScreenTime?.timeSpent || 0)}
              </Text>
            </View>
          </View>

          <Text className="mt-4 font-semibold text-base text-white">Screen time kamu sekarang</Text>
        </View>
        <View className="px-6 pt-8 bg-white -mt-10 rounded-t-3xl space-y-4">
          <View className="border border-primary rounded-2xl pb-4">
            <View className="flex-row p-3">
              <View className="flex-1">
                <Text className="font-medium text-primary">Rata-rata screen time 7 hari</Text>
                <Text className="text-xl font-medium">
                  {convertMsToTime(totalScreenTime7Days?.timeSpent || 0)}
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="text-[9px] my-1">
                  {sevenDaysAgo.toLocaleDateString()} - {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View className="items-center border-t border-primary">
              <ScreenTimeChart />
            </View>
          </View>
          <View className="p-4 border border-primary rounded-2xl">
            <View>
              <Text className="text-lg leading-6  font-medium">Aktifkan fitur Screen Time</Text>
              <View className="flex items-center flex-row mt-2">
                <View className="flex-1 mr-2">
                  <Text className="text-xs">
                    Nyalakan fitur screen time untuk mengetahui berapa lama kamu membuka gadget
                    dalam sehari
                  </Text>
                </View>

                <Toggle switchOn={true} onPress={() => {}} />
              </View>
            </View>
            <View className="mt-2">
              <Text className="text-lg leading-6 font-medium">Aktifkan Peringatan Batas Waktu</Text>
              <View className="flex items-center flex-row mt-2">
                <View className="flex-1 mr-2 flex-row items-center">
                  {reminderData?.hasReminder ? (
                    <View className="flex-row items-center">
                      <Text className="text-xs ">Batas Waktu Dipilih</Text>

                      <View className="bg-primaryLight px-4 py-2 rounded-md ml-3">
                        <Text className="text-primary">
                          {convertMsToTime((reminderData?.seconds ?? 0) * 1000)}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Text className="text-xs ">
                      Nyalakan fitur peringatan batas waktu untuk mengingatkan kamu agar tidak
                      memakai gadget secara berlebihan!
                    </Text>
                  )}
                </View>
                <Toggle
                  switchOn={reminderData?.hasReminder || false}
                  onPress={() => {
                    if (reminderData?.hasReminder) {
                      cancelPushNotif();
                    } else {
                      setShowModal(true);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View className="h-36" />
        </View>
      </ScrollView>

      <TimeModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={schedulePushNotification}
      />
    </Fragment>
  );
};

export default ScreenTime;
