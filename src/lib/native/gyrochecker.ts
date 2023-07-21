import { NativeModules } from 'react-native';

const { GyroCheckerModule } = NativeModules;

export interface GyroscopeModuleInterface {
  hasGyroscope: () => Promise<boolean>;
}

export default GyroCheckerModule as GyroscopeModuleInterface;
