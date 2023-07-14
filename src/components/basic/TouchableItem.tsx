import React from 'react';
import { styled } from 'nativewind';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { ClassValue } from 'clsx';

type Props = {
  containerStyle?: ClassValue[] | StyleProp<ViewStyle>;
} & PressableProps;

function Wrapper({ containerStyle, children, ...props }: Props) {
  return (
    <View style={containerStyle as StyleProp<ViewStyle>}>
      <Pressable
        {...props}
        android_ripple={{
          color: '#00000005',
        }}>
        {children}
      </Pressable>
    </View>
  );
}

//@ts-ignore
const TouchableItem = styled(Wrapper, {
  props: {
    containerStyle: true,
  },
});

export default TouchableItem;
