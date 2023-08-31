/* eslint-disable react-native/no-inline-styles */
import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';
import useQueryNews from '../hooks/useQueryNews';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const Articles = () => {
  const { data, isLoading } = useQueryNews();

  if (isLoading) {
    return null;
  }

  return (
    <View>
      <View className="flex-row justify-between px-4">
        <Text className="text-xs">Artikel terbaru</Text>
        <TouchableOpacity>
          <Text className="font-medium text-primary text-xs">Lihat Semua</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 12, paddingLeft: 16 }}>
        {data?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={async () => {
              if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open(item.link);
              }
            }}
            className="mr-3 bg-white rounded-xl overflow-hidden w-[220px]"
            style={{ elevation: 4 }}>
            <Image source={{ uri: item.imageURL }} className="w-[220px] h-[120px] object-cover" />
            <View className="p-2">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-xs font-medium text leading-4">
                {item.title}
              </Text>

              <Text className="mt-6 text-xs text-primary">Baca Selengkapnya</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Articles;
