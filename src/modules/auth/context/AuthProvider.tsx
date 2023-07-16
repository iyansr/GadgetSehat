import React, { PropsWithChildren, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthProviderProps = PropsWithChildren<{}>;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  async function googleLogin(idToken: string) {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  async function onAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
    setUser(newUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ initializing, user, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
