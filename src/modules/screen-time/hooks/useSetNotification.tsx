import * as Notification from 'expo-notifications';
import { useState } from 'react';
import useQueryHasReminder from './useQueryHasReminder';
import useMutateReminder from './useMutateReminder';
import { Alert } from 'react-native';

const useSetNotification = () => {
  const { data: reminderData } = useQueryHasReminder();
  const { mutateAsync } = useMutateReminder();
  const [showModal, setShowModal] = useState(false);

  async function schedulePushNotification(seconds: number) {
    try {
      await Notification.cancelAllScheduledNotificationsAsync();

      await Notification.scheduleNotificationAsync({
        identifier: 'morning-1',
        content: {
          title: 'Batas waktu telah habis',
          subtitle: 'Peringatan batas waktu',
          body: 'Silahkan kurangi penggunaan gadget kamu',
          sound: true,
        },
        trigger: {
          seconds,
        },
      });

      await mutateAsync({ seconds, hasReminder: true });
      Alert.alert('Berhasil', 'Notifikasi berhasil diatur');
      setShowModal(false);
    } catch (error) {
      console.log({ error });
    }
  }

  async function cancelPushNotif() {
    try {
      await Notification.cancelAllScheduledNotificationsAsync();

      await mutateAsync({ seconds: 0, hasReminder: false });
      Alert.alert('Berhasil', 'Notifikasi berhasil dihapus');
      setShowModal(false);
    } catch (error) {
      console.log({ error });
    }
  }

  return { setShowModal, showModal, cancelPushNotif, schedulePushNotification, reminderData };
};

export default useSetNotification;
