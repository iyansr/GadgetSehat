export type USPData = {
  image: any;
  title: string;
  description: string;
};

export const uspData: USPData[] = [
  {
    image: require('@gs/assets/images/onboard_1.png'),
    title: 'Pakai gadgetmu \nsecara sehat',
    description:
      "Dengan GadgetSehat kamu bisa belajar menggunakan gadget kamu secara sehat dan terukur. Tidak ada lagi kata 'kecanduan gadget' buat kamu",
  },
  {
    image: require('@gs/assets/images/onboard_2.png'),
    title: 'Floating Timer',
    description:
      "Fitur floating timer memungkinkan kamu untuk selalu bisa mengukur berapa lama penggunaan Gadget yang sedang kamu lakukan. Jadi bisa tidak ada lagi kata 'Kebablasan'",
  },
  {
    image: require('@gs/assets/images/onboard_3.png'),
    title: 'Notifikasi',
    description:
      "Notifikasi dari GadgetSehat mengingatkan kamu untuk tidak lupa waktu dan kasih tuntunan dan informasi yang berguna untuk progress sehatmu. Jadi bisa tidak ada lagi kata 'Ketinggalan'",
  },
  {
    image: require('@gs/assets/images/onboard_4.png'),
    title: 'Peringatan batas waktu',
    description:
      'Segala sesuatu yang berlebihan tentu tidak baik. GadgetSehat akan memberikan peringatan pada waktu kamu sudah melebihi waktu yang ditentukan untuk menggunakan gadget.',
  },
  {
    image: require('@gs/assets/images/onboard_5.png'),
    title: 'Perubahan kecil \nberdampak besar',
    description:
      'Mulai ubah kebiasaan gadget kamu jadi lebih sehat sekarang! Sepertinya kecil, tapi kebiasaan baru kamu akan berdampak besar di kemudian harinya.',
  },
];
