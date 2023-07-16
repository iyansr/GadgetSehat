import firestore from '@react-native-firebase/firestore';
import { type UserSchema } from '../schema';
import { useMutation } from '@tanstack/react-query';

async function updateUser(userId: string, data: UserSchema) {
  return firestore().collection('users').doc(userId).set(data, { merge: true });
}

const useMutateUpdateUser = () => {
  return useMutation<unknown, unknown, { userId: string; data: UserSchema }>({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    mutationKey: ['updateUser'],
  });
};

export default useMutateUpdateUser;
