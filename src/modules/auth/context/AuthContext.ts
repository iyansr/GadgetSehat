import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext } from 'react';

export type AuthContextProps = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  googleLogin: (idToken: string) => Promise<FirebaseAuthTypes.UserCredential>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  initializing: true,
  googleLogin: () => Promise.reject(new Error('AuthContext not initialized')),
});

export default AuthContext;
