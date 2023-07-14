import {
  FlatList,
  Image,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback } from 'react';
import Text from '@gs/components/basic/Text';
import PaginationDots from '@gs/components/basic/PaginationDot';
import { uspData, type USPData } from '../data';

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const [activePage, setActivePage] = React.useState(0);

  const ref = React.useRef<FlatList>(null);

  const handleScrollToNext = useCallback(() => {
    const lastItemIndex = uspData.length - 1;
    const nextItemIndex = activePage + 1;

    if (nextItemIndex <= lastItemIndex) {
      ref?.current?.scrollToIndex({ animated: true, index: nextItemIndex });
    } else {
      ref?.current?.scrollToIndex({ animated: true, index: 0 });
    }
  }, [activePage]);

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const pageFraction = contentOffset.x / width;
      const page = Math.round(pageFraction);

      if (page !== activePage) {
        setActivePage(page);
      }
    },
    [activePage, width],
  );

  const renderItem = useCallback<ListRenderItem<USPData>>(
    ({ item }) => {
      return (
        <View className="flex-1 py-4 px-6" style={{ width }}>
          <View className="items-center pt-12 flex-[5]">
            <Image source={item.image} resizeMode="cover" />
          </View>

          <View className="flex-[3]">
            <Text className="text-left font-bold mt-12 text-primary text-3xl">{item.title}</Text>

            <Text className="text-left mt-3 font-medium">{item.description}</Text>
          </View>
        </View>
      );
    },
    [width],
  );

  return (
    <View className="flex-1">
      <FlatList<USPData>
        data={uspData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        scrollEnabled={false}
        ref={ref}
        onScroll={handleOnScroll}
        renderItem={renderItem}
      />

      <View className="pb-8 px-6">
        <View className="items-center pb-4">
          <PaginationDots activePage={activePage} totalPage={uspData.length} />
        </View>

        <Pressable
          className="bg-primary rounded-full py-2 items-center overflow-hidden"
          onPress={handleScrollToNext}>
          <Text className="text-neutral-50 font-semibold text-lg">Selanjutnya</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OnboardingScreen;
