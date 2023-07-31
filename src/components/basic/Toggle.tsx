/* eslint-disable react-native/no-inline-styles */
import React, { ComponentProps } from 'react';
import RNToggle from 'react-native-switch-toggle';

type Props = ComponentProps<typeof RNToggle>;

const Toggle = (props: Props) => {
  return (
    <RNToggle
      {...props}
      containerStyle={{
        marginTop: 16,
        width: 50,
        height: 22,
        borderRadius: 24,
        padding: 5,
        borderWidth: 1,
        borderColor: props.switchOn ? '#189741' : '#1C74BB',
      }}
      circleColorOff="#1C74BB"
      backgroundColorOn="#189741"
      backgroundColorOff="#E4F3FF"
      circleStyle={{
        width: 14,
        height: 14,
        borderRadius: 9,
      }}
    />
  );
};

export default Toggle;
