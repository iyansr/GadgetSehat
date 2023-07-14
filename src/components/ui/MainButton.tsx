import React from 'react';
import TouchableItem from '../basic/TouchableItem';
import Text from '../basic/Text';
import { cn } from '@gs/lib/utils';
import { PressableProps } from 'react-native';

type Props = {
  text: string;
} & PressableProps;

const MainButton = ({ text, ...props }: Props) => {
  return (
    <TouchableItem
      {...props}
      className="bg-primary py-2 items-center rounded-full"
      containerStyle={cn('overflow-hidden rounded-full')}>
      <Text className="text-neutral-50 font-semibold text-lg">{text}</Text>
    </TouchableItem>
  );
};

export default MainButton;
