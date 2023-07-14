import { Image, KeyboardAvoidingView, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import Text from '@gs/components/basic/Text';
import InputForm from '@gs/components/ui/InputForm';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import MainButton from '@gs/components/ui/MainButton';
import EditProfileSuccessModal from '../Components/EditProfileSuccessModal';
import useNavigation from '@gs/lib/react-navigation/useNavigation';

type Gender = 'male' | 'female';

const schema = z.object({
  fullName: z.string(),
  gender: z.enum(['male', 'female']),
  birthDate: z.date(),
  waNumber: z.string().regex(/^\+62\d{3,14}$/),
  province: z.string(),
  city: z.string(),
});

type LoginShema = z.infer<typeof schema>;

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
  const navigation = useNavigation();

  const { control } = useForm<LoginShema>({
    resolver: zodResolver(schema),
  });

  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate('DashboardScreen');
  };

  return (
    <Fragment>
      <KeyboardAvoidingView className="flex-1">
        <View className="flex-1">
          <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps="always">
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
                  render={({ field }) => {
                    return (
                      <InputForm
                        label="Nama Lengkap"
                        placeholder="Nama"
                        onChangeText={text => field.onChange(String(text))}
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>
              <View>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => {
                    return (
                      <InputForm
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
                  render={({ field }) => {
                    return (
                      <InputForm
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
                  name="province"
                  render={({ field }) => {
                    return (
                      <InputForm
                        label="Provinsi"
                        placeholder="Pilih Provinsi"
                        onChangeText={text => field.onChange(String(text))}
                        value={field.value}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => {
                    return (
                      <InputForm
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
          </KeyboardAwareScrollView>

          <View className="p-4 px-6">
            <MainButton text="Lengkapi Profil" onPress={() => setModalVisible(true)} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <EditProfileSuccessModal isVisible={isModalVisible} onContinue={handleContinue} />
    </Fragment>
  );
};

export default EditProfileScreen;
