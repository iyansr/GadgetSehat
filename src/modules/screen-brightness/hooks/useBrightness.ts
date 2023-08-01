import * as Brightness from 'expo-brightness';
import { useEffect, useState } from 'react';

function useBrightness() {
  const [brightness, setBrightness] = useState(0);
  const getBrightness = async () => {
    const _brightness = await Brightness.getBrightnessAsync();
    setBrightness(_brightness);
  };

  const setBrightnessAsync = async (value: number) => {
    await Brightness.setBrightnessAsync(value);
    setBrightness(value);
  };

  const setSystemBrightness = async (value: number) => {
    await Brightness.setSystemBrightnessAsync(value);
    setBrightness(value);
  };

  useEffect(() => {
    getBrightness();
  }, []);

  return { brightness, getBrightness, setBrightnessAsync, setSystemBrightness };
}

export default useBrightness;
