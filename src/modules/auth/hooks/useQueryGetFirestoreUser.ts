import { useQuery } from '@tanstack/react-query';
import { UserSchema } from '../schema';
import firestore from '@react-native-firebase/firestore';

const useQueryGetFirestoreUser = (uid?: string) => {
  return useQuery<unknown, unknown, UserSchema | undefined>({
    queryKey: ['firestoruser', uid],
    queryFn: async () => {
      const snapshot = await firestore().collection('users').doc(uid).get();
      const data = snapshot.data();
      return data as UserSchema;
    },
    enabled: !!uid,
  });
};

export default useQueryGetFirestoreUser;
