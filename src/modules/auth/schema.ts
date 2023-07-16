import { z } from 'zod';

export type Gender = 'male' | 'female';

export const updateUserSchema = z.object({
  fullName: z.string({ required_error: 'Nama Lengkap harus diisi' }),
  gender: z.enum(['male', 'female'], { required_error: 'Jenis Kelamin harus diisi' }),
  birthDate: z.date({ required_error: 'Tanggal Lahir harus diisi' }),
  waNumber: z
    .string({ required_error: 'Nomor WA Harus diisi' })
    .refine(val => /^\+62\d{8,14}$/.test(val), { message: 'Nomor WA tidak valid' }),
  province: z.string({ required_error: 'Provinsi harus diisi' }),
  city: z.string({ required_error: 'Kota / Kabupaten harus diisi' }),
});

export type UserSchema = z.infer<typeof updateUserSchema>;
