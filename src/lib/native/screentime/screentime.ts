import { NativeModules } from 'react-native';

const { ScreenTimeModule } = NativeModules;

type AppUsage = {
  appName: string;
  packageName: string;
  usageTime: number;
  iconBase64: string;
};

export type ScreenTimeData = {
  totalScreenTime: number;
  appUsageList: AppUsage[];
};

export type ScreenTimeModuleType = {
  getScreenTime: () => Promise<ScreenTimeData>;
  checkPermissionAccess: () => Promise<boolean>;
  openUsageSettings: () => void;
};

export default ScreenTimeModule as ScreenTimeModuleType;
