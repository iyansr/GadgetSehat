import { View } from 'react-native';
import React from 'react';
import Text from '../basic/Text';
import GoodBadge from '@gs/assets/svg/GoodBadge';
import { cn } from '@gs/lib/utils';
import DangerBadge from '@gs/assets/svg/DangerBadge';
import WarningBadge from '@gs/assets/svg/WarningBadge';
import NormalBadge from '@gs/assets/svg/NormalBadge';
import AttentionBadge from '@gs/assets/svg/AttentionBadge';

type LevelsBadgeProps = {
  level?: 'good' | 'danger' | 'warning' | 'normal' | 'attention';
  text?: string;
};

const LevelsBadge = ({ level = 'good', text = '' }: LevelsBadgeProps) => {
  const color: Record<string, string> = {
    good: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-[#F4921C]',
    normal: 'bg-normal',
    attention: 'bg-primary',
  };

  const badgeObj = {
    good: GoodBadge,
    danger: DangerBadge,
    warning: WarningBadge,
    normal: NormalBadge,
    attention: AttentionBadge,
  };

  const Badge = badgeObj[level];

  return (
    <View className={cn('flex-row items-center rounded-md py-1', color[level])}>
      <View className="pl-4">
        <Text className="text-[10px] font-medium text-white">{text}</Text>
      </View>
      <View className="relative w-7">
        <View className="absolute -top-4 right-1">
          <Badge />
        </View>
      </View>
    </View>
  );
};

export default LevelsBadge;
