/* eslint-disable react-native/no-inline-styles */
import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import Text from '@gs/components/basic/Text';
import TouchableOpacity from '@gs/components/basic/TouchableOpacity';

const Articles = () => {
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
        {[1, 2, 3, 4, 5].map(item => (
          <TouchableOpacity
            key={item}
            className="mr-3 bg-white rounded-xl overflow-hidden w-[220px]"
            style={{ elevation: 4 }}>
            <Image
              source={{ uri: 'https://picsum.photos/400' }}
              className="w-[220px] h-[120px] object-cover"
            />
            <View className="p-2">
              <Text className="text-[10px] text-neutral-500">12/08/2020</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-xs font-medium text leading-4">
                Berikan Gadget kepada anak? Jangan lupa pengawasannya
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
