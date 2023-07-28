import ArrowDownIcon from '@gs/assets/svg/ArrowDownIcon';
import ArrowUpIcon from '@gs/assets/svg/ArrowUpIcon';
import Text from '@gs/components/basic/Text';
import LevelsBadge, { LevelsBadgeProps } from '@gs/components/ui/LevelsBadge';
import { add, format } from 'date-fns';
import React from 'react';
import { FlatList, View } from 'react-native';

const levels = ['good', 'danger', 'warning', 'normal', 'attention'];
const icons = [ArrowDownIcon, ArrowUpIcon];
const data = [...new Array(7)].map((_, index) => {
  const date = format(add(new Date(), { days: index + 1 }), 'dd/MM/yyyy');

  return {
    date,
    hour: '3hr',
    level: levels[Math.floor(Math.random() * levels.length)],
    Icon: icons[Math.floor(Math.random() * icons.length)],
  };
});

const HealthHistory = () => {
  const label: Record<string, string> = {
    good: 'Baik',
    danger: 'Kecanduan',
    warning: 'Awas',
    normal: 'Normal',
    attention: 'Perhatian',
  };

  return (
    <View className="flex-1 px-4 pt-4">
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const Icon = item.Icon;
          return (
            <View className="flex-row items-center justify-between px-4 py-2 border mb-2 rounded-lg border-neutral-400">
              <View className="flex-[5] flex-row justify-between">
                <Text className="text-xs">{item.date}</Text>
                <View className="flex-row items-center">
                  <Text className="text-xs mr-2">{item.hour}</Text>
                  <Icon width={14} height={14} />
                </View>
              </View>
              <View className="flex-row flex-[3] justify-end">
                <LevelsBadge
                  level={item.level as LevelsBadgeProps['level']}
                  showIcon={false}
                  text={label[item.level]}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HealthHistory;
