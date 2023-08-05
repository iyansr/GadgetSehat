import { NativeModules } from 'react-native';

const { ScreenTimeModule } = NativeModules;

type AppUsage = {
  appName: string;
  packageName: string;
  usageTime: number;
  iconBase64: string;
};

export enum ScreenTimeInterval {
  INTERVAL_BEST = 4,
  INTERVAL_DAILY = 0,
  INTERVAL_MONTHLY = 2,
  INTERVAL_WEEKLY = 1,
  INTERVAL_YEARLY = 3,
}

export type HourlyUsage = {
  screenTime: number;
  hourlyMark: number;
};

export type ScreenTimeData = {
  totalScreenTime: number;
  appUsageList: AppUsage[];
  hourlyUsage: HourlyUsage[];
};

export type ScreenTimeModuleType = {
  getScreenTime: (
    interval: ScreenTimeInterval,
    startUnix?: number,
    endUnix?: number,
  ) => Promise<ScreenTimeData>;
  getTotalScreenTime: (startUnix?: number, endUnix?: number) => Promise<number>;
  checkPermissionAccess: () => Promise<boolean>;
  openUsageSettings: () => void;
};

export const getScreenTime: ScreenTimeModuleType['getScreenTime'] = async (
  interval = ScreenTimeInterval.INTERVAL_BEST,
  startUnix = 0,
  endUnix = 0,
) => ScreenTimeModule?.getScreenTime(interval, startUnix, endUnix);

export const getTotalScreenTime: ScreenTimeModuleType['getTotalScreenTime'] = async (
  startUnix = 0,
  endUnix = 0,
) => {
  return ScreenTimeModule?.getTotalScreenTime(startUnix, endUnix);
};

export type TimeSpent = {
  timeSpent: number;
  packageList: {
    packageName: string;
    usageTime: number;
    iconBase64: string | null;
  }[];
};

export const getTimeSpent = async (startUnix = 0, endUnix = 0): Promise<TimeSpent> => {
  return ScreenTimeModule?.getTimeSpent(startUnix, endUnix);
};

export default ScreenTimeModule as ScreenTimeModuleType;
