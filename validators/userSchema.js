import { z} from 'zod';

export const userSighUpSchema = z.object({
  email:z.string().email(),
  username:z.string().min(3),
  password:z.string(),
});

export const userSingInSchema = z.object({
  email:z.string().email(),
  password:z.string()
})