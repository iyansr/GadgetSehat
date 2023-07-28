import { View } from 'react-native';
import React from 'react';
import Text from '../basic/Text';
import GoodBadge from '@gs/assets/svg/GoodBadge';
import { cn } from '@gs/lib/utils';
import DangerBadge from '@gs/assets/svg/DangerBadge';
import WarningBadge from '@gs/assets/svg/WarningBadge';
import NormalBadge from '@gs/assets/svg/NormalBadge';
import AttentionBadge from '@gs/assets/svg/AttentionBadge';

export type LevelsBadgeProps = {
  level?: 'good' | 'danger' | 'warning' | 'normal' | 'attention';
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showIcon?: boolean;
};

const LevelsBadge = ({
  level = 'good',
  text = '',
  size = 'small',
  showIcon = true,
}: LevelsBadgeProps) => {
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
    <View
      className={cn('flex-row items-center rounded-lg', color[level], {
        'py-1 px-2': size === 'small',
        'py-2 px-4': size === 'medium',
        'py-2 px-6': size === 'large',
      })}>
      <View
        className={cn('pl-4', {
          'pr-4 py-[3px]': !showIcon,
        })}>
        <Text
          className={cn('font-medium text-white', {
            'text-[10px]': size === 'small',
            'text-[12px]': size === 'medium',
            'text-[14px]': size === 'large',
          })}>
          {text}
        </Text>
      </View>
      {showIcon && (
        <View className="relative w-7">
          <View
            className={cn('absolute', {
              '-top-4 right-1': size === 'small',
              '-top-5 right-1': size === 'medium',
              '-top-6 -right-4': size === 'large',
            })}>
            <Badge width={size === 'large' ? 32 : 22} height={size === 'large' ? 32 : 22} />
          </View>
        </View>
      )}
    </View>
  );
};

export default LevelsBadge;
