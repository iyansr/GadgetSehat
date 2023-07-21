import { NativeModules } from 'react-native';

const { GyroCheckerModule } = NativeModules;

export type GyroscopeModuleType = {
  hasGyroscope: () => Promise<boolean>;
};

export default GyroCheckerModule as GyroscopeModuleType;
