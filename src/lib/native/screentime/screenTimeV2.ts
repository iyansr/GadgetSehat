import { NativeModules } from 'react-native';

const { ScreenTime } = NativeModules;

export type AppUsage = {
  appName: string;
  packageName: string;
  usageTime: number;
  iconBase64?: string;
};

export const getTotalScreenTime = async (startUnix = 0, endUnix = 0): Promise<number> => {
  return ScreenTime?.getTotalScreenTime(startUnix, endUnix);
};

export const getAppList = async (startUnix = 0, endUnix = 0): Promise<AppUsage[]> => {
  return ScreenTime?.getAppList(startUnix, endUnix);
};
