import { cn } from '@gs/lib/utils';
import React from 'react';
import { Pressable, View } from 'react-native';

export type PaginationProps = {
  activePage: number | number[];
  totalPage: number;
};

type DotProps = {
  active?: boolean;
};

const Dot = ({ active = false }: DotProps) => {
  return (
    <Pressable>
      <View className={cn('w-2 h-2 rounded-full', active ? 'bg-primary' : 'bg-neutral-300')} />
    </Pressable>
  );
};

const PaginationDots = React.memo(
  ({ activePage, totalPage, ...rest }: PaginationProps & DotProps) => {
    return (
      <View className="flex-row items-center space-x-2">
        {Array(totalPage)
          .fill(0)
          .map((_, idx) => (
            <View key={String(idx)}>
              <Dot
                {...rest}
                active={
                  typeof activePage === 'number' ? idx === activePage : activePage.includes(idx)
                }
              />
            </View>
          ))}
      </View>
    );
  },
);

export default PaginationDots;
