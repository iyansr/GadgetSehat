import { TouchableOpacity as TouchableOpacityBase, TouchableOpacityProps } from 'react-native';
import React from 'react';

const TouchableOpacity = (props: TouchableOpacityProps) => {
  return <TouchableOpacityBase {...props} activeOpacity={0.8} />;
};

export default TouchableOpacity;
