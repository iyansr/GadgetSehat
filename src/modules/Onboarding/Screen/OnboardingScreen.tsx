import {
  FlatList,
  Image,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { Fragment, useCallback } from 'react';
import Text from '@gs/components/basic/Text';
import PaginationDots from '@gs/components/ui/PaginationDot';
import { uspData, type USPData } from '../data';
import MainButton from '@gs/components/ui/MainButton';
import PermissionModal from '../components/PermissionModal';
import useNavigation from '@gs/lib/react-navigation/useNavigation';

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();

  const hideModal = () => {
    if (isModalVisible) {
      setModalVisible(false);
    }
  };

  const showModal = useCallback(() => {
    if (!isModalVisible) {
      setModalVisible(true);
    }
  }, [isModalVisible]);

  const [activePage, setActivePage] = React.useState(0);
  const ref = React.useRef<FlatList>(null);

  const handleScrollToNext = useCallback(
    (isCompleteRequest = false) => {
      const lastItemIndex = uspData.length - 1;
      const nextItemIndex = activePage + 1;

      if (activePage === 2 && !isCompleteRequest) {
        showModal();
        return;
      }

      if (nextItemIndex <= lastItemIndex) {
        ref?.current?.scrollToIndex({ animated: true, index: nextItemIndex });
      } else {
        navigation.replace('LoginScreen');
      }
    },
    [activePage, showModal, navigation],
  );

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
    <Fragment>
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

          <View className="py-2">
            <MainButton text="Selanjutnya" onPress={() => handleScrollToNext()} />
          </View>
        </View>
      </View>
      <PermissionModal
        isModalVisible={isModalVisible}
        onPressNext={isCompleteRequest => {
          if (isCompleteRequest) {
            hideModal();
            handleScrollToNext(isCompleteRequest);
          }
        }}
      />
    </Fragment>
  );
};

export default OnboardingScreen;
