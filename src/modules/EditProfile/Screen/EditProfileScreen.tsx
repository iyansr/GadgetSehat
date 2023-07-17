import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import Text from '@gs/components/basic/Text';
import InputForm from '@gs/components/ui/InputForm';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import MainButton from '@gs/components/ui/MainButton';
import EditProfileSuccessModal from '../Components/EditProfileSuccessModal';
import useNavigation from '@gs/lib/react-navigation/useNavigation';
import { Gender, UserSchema, updateUserSchema } from '@gs/modules/auth/schema';
import useAuth from '@gs/modules/auth/hooks/useAuth';
import useMutateUpdateUser from '@gs/modules/auth/hooks/useMutateUpdateUser';
import { CommonActions } from '@react-navigation/native';
import useQueryGetFirestoreUser from '@gs/modules/auth/hooks/useQueryGetFirestoreUser';
import useQueryProvinces from '@gs/modules/shared/hooks/useQueryProvinces';
import useQueryCities from '@gs/modules/shared/hooks/useQueryCities';

const genderOption = [
  {
    label: 'Pria',
    value: 'male',
  },
  {
    label: 'Wanita',
    value: 'female',
  },
];

const EditProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, initializing } = useAuth();
  const navigation = useNavigation();
  const { mutateAsync: updateUser, isLoading } = useMutateUpdateUser();
  const {
    data: fireStoreData,
    isLoading: isLoadingUser,
    error: fireStoreError,
  } = useQueryGetFirestoreUser();
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const { data: provinces } = useQueryProvinces();
  const { data: cities } = useQueryCities(selectedProvinceId);

  console.log(selectedProvinceId);

  const { control, handleSubmit, setValue } = useForm<UserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      waNumber: '+62',
    },
  });

  useEffect(() => {
    if (!!user && !fireStoreError) {
      setValue('fullName', fireStoreData?.fullName ?? user?.displayName ?? '');
    }
  }, [fireStoreData, user, setValue, fireStoreError]);

  const onSubmit = async (data: UserSchema) => {
    try {
      await updateUser({ userId: user?.uid as string, data });
      setModalVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Terjadi Kesalahan', error?.message);
      }
    }
  };

  const handleContinue = () => {
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DashboardScreen' }] }));
  };

  if (isLoadingUser || initializing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#1C74BB" size={64} />
      </View>
    );
  }

  return (
    <Fragment>
      <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={20}>
        <View className="flex-1">
          <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="handled">
            <View className="bg-primary py-5 items-center px-8 pb-20">
              <Text className="text-2xl text-center font-semibold text-white">Selamat Datang</Text>
              <Image
                source={require('@gs/assets/images/edit_profile.png')}
                className="w-2/6"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ objectFit: 'contain' }}
              />
              <Text className="text-white text-center">
                Tak kenal maka tak sayang...Isi data dirimu dulu ya untuk memulai perjalanan sehat
                kamu
              </Text>
            </View>

            <View className="px-6 pt-8 bg-white -mt-10 rounded-t-3xl space-y-4">
              <View>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        error={fieldState.error?.message}
                        label="Nama Lengkap"
                        placeholder="Nama"
                        onChangeText={text => field.onChange(String(text))}
                        value={field.value}
                        defaultValue={field.value}
                      />
                    );
                  }}
                />
              </View>
              <View>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        error={fieldState.error?.message}
                        label="Jenis Kelamin"
                        type="option"
                        placeholder="Jenis Kelamin"
                        options={genderOption}
                        onChangeText={text => field.onChange(text as Gender)}
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        error={fieldState.error?.message}
                        label="Tanggal Lahir"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        options={genderOption}
                        onChangeText={date => field.onChange(date as Date)}
                        //@ts-ignore
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="waNumber"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        error={fieldState.error?.message}
                        label="Nomor WA"
                        placeholder="+62..."
                        onChangeText={text => field.onChange(String(text))}
                        value={field.value}
                        defaultValue={field.value}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="province"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        type="option"
                        options={provinces?.map(province => ({
                          label: province.name,
                          value: province.name,
                        }))}
                        error={fieldState.error?.message}
                        label="Provinsi"
                        placeholder="Pilih Provinsi"
                        onChangeText={text => {
                          field.onChange(String(text));
                          setValue('city', '');
                        }}
                        onChangeOption={option => {
                          setSelectedProvinceId(
                            provinces?.find(province => province.name === option.label)?.id ?? '',
                          );
                        }}
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="city"
                  render={({ field, fieldState }) => {
                    return (
                      <InputForm
                        type="option"
                        options={cities?.map(city => ({
                          label: city.name,
                          value: city.name,
                        }))}
                        error={fieldState.error?.message}
                        label="Kota / Kabupaten"
                        placeholder="Pilih Kota / Kabupaten"
                        onChangeText={text => field.onChange(String(text))}
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>
            </View>
            <View className="p-4 px-6">
              <MainButton
                text={isLoading ? 'Mohon tunggu...' : 'Lengkapi Profil'}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
      <EditProfileSuccessModal isVisible={isModalVisible} onContinue={handleContinue} />
    </Fragment>
  );
};

export default EditProfileScreen;
