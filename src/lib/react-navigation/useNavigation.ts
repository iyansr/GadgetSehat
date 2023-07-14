import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types';

const useNavigation = () => {
  return useNativeNavigation<NativeStackNavigationProp<StackParamList>>();
};

export default useNavigation;
