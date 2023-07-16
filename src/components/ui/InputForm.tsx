import { TextInputProps, View } from 'react-native';
import React, { Fragment, forwardRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import Text from '../basic/Text';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import TouchableItem from '../basic/TouchableItem';
import { cn } from '@gs/lib/utils';
import ReactNativeModal from 'react-native-modal';
import CheckMark from '@gs/assets/svg/CheckMark';

type DateInputType = {
  value?: Date;
  type?: 'date';
};

type NormalInputType = {
  value?: string;
  type?: 'text';
};

type OptionInputType = {
  value?: string;
  type?: 'option';
};

type Props = (NormalInputType | DateInputType | OptionInputType) & {
  label: string;
  options?: { label: string; value: string }[];
  onChangeText?: (value: string | Date) => void;
  error?: string;
} & TextInputProps;

const TextInputForm = forwardRef<TextInput, Props>(({ type = 'text', value, ...props }, ref) => {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: new Date(),
      onChange: (event, date) => {
        if (date) {
          props.onChangeText?.(date);
        }
      },
    });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const dateValue = useMemo(() => {
    if (!value) {
      return props.placeholder;
    }

    if (type === 'date') {
      if ((value as any) instanceof Date) {
        return (value as Date).toLocaleDateString();
      }
      return value;
    }
    return '';
  }, [type, value, props.placeholder]);

  const optionValue = useMemo(() => {
    if (!value) {
      return props.placeholder;
    }

    if (type === 'option') {
      return props.options?.find(option => option.value === value)?.label ?? props.placeholder;
    }
    return '';
  }, [type, value, props.options, props.placeholder]);

  return (
    <Fragment>
      <View className="space-y-2">
        <Text>{props.label}</Text>
        {type === 'option' && (
          <View>
            <TouchableItem
              onPress={() => setModalVisible(true)}
              className={cn('bg-neutral-100 rounded-full px-4 py-3', {
                'border border-red-500': !!props?.error,
              })}
              containerStyle="rounded-full overflow-hidden">
              <Text
                className={cn('text-sm', {
                  'text-neutral-400': !value,
                })}>
                {optionValue}
              </Text>
            </TouchableItem>
          </View>
        )}
        {type === 'date' && (
          <View>
            <TouchableItem
              onPress={showDatePicker}
              className={cn('bg-neutral-100 rounded-full px-4 py-3', {
                'border border-red-500': !!props?.error,
              })}
              containerStyle="rounded-full overflow-hidden">
              <Text
                className={cn('text-sm', {
                  'text-neutral-400': !value,
                })}>
                {dateValue}
              </Text>
            </TouchableItem>
          </View>
        )}
        {type === 'text' && (
          <TextInput
            textAlignVertical="center"
            cursorColor="#1C74BB"
            className={cn('bg-neutral-100 px-4 rounded-full py-2', {
              'border border-red-500': !!props?.error,
            })}
            placeholderTextColor="#a3a3a3"
            ref={ref}
            {...props}
          />
        )}
      </View>
      {!!props?.error && <Text className="text-red-500 text-xs mt-1 ml-2">{props.error}</Text>}

      {type === 'option' && (
        <ReactNativeModal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View className="shadow-lg bg-white rounded-2xl p-4 space-y-2">
            {props?.options?.map((option, index) => (
              <TouchableItem
                key={String(index)}
                className="p-2 flex-row items-center"
                onPress={() => {
                  props.onChangeText?.(option.value);
                  setModalVisible(false);
                }}>
                <View className="flex-1">
                  <Text>{option.label}</Text>
                </View>
                {option.value === value && <CheckMark height={12} width={12} />}
              </TouchableItem>
            ))}
          </View>
        </ReactNativeModal>
      )}
    </Fragment>
  );
});

export default TextInputForm;
