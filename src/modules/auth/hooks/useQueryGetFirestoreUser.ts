import { useQuery } from '@tanstack/react-query';
import { UserSchema } from '../schema';
import firestore from '@react-native-firebase/firestore';
import useAuth from './useAuth';

const useQueryGetFirestoreUser = () => {
  const { user } = useAuth();

  return useQuery<unknown, unknown, UserSchema | undefined>({
    queryKey: ['firestoruser', user],
    queryFn: async () => {
      const snapshot = await firestore()
        .collection('users')
        .doc(user?.uid as string)
        .get();
      const data = snapshot.data();
      return data as UserSchema;
    },
    enabled: !!user,
  });
};

export default useQueryGetFirestoreUser;
