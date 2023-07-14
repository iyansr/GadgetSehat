import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { styled } from 'nativewind';
import React from 'react';

const _Text = ({ style, ...props }: TextProps) => {
  return <RNText ellipsizeMode="tail" {...props} style={[style, styles.font]} />;
};

const Text = styled(_Text, 'text-neutral-900');

const styles = StyleSheet.create({
  font: {
    includeFontPadding: false,
  },
});

export default Text;
