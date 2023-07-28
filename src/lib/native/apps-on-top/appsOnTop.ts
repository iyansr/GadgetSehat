import { NativeModules } from 'react-native';

const { AppsOnTop } = NativeModules;

export const checkAppsOnTopPermissionAccess = async () =>
  AppsOnTop?.checkAppsOnTopPermissionAccess();
export const openAppsOnTopSettings = () => AppsOnTop?.openAppsOnTopSettings();
