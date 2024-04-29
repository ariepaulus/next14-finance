import { DateRange } from '@/enums/enums';
import { z } from 'zod';

export const settingsValidation = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'Full name must be at least 2 characters long',
    })
    .optional(),
  defaultView: z.nativeEnum(DateRange),
});
