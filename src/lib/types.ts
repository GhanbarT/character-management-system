import { z } from 'zod';

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),

  gender: z.enum(['Male', 'Female']).refine((val) => !!val, {
    message: 'Gender selection is required',
  }),

  birthDate: z.string().min(1, 'Birth date is required'),
  deathDate: z.string().optional(),

  fieldOfActivity: z
    .enum(['Poet', 'Writer', 'Astronomer', 'Philosopher', 'Mystic', 'Historian'])
    .refine((val) => !!val, {
      message: 'Field of activity selection is required',
    }),

  status: z.enum(['Active', 'Inactive']).default('Active'),
  biography: z.string().optional(),
  works: z.array(z.string()).default([]),
  likes: z.number().default(0),
  avatar: z.string().optional(),
  textResources: z.array(z.string()).default([]),
  audioResources: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Character = z.infer<typeof CharacterSchema>;

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
});

export type CreateCharacterInput = z.infer<typeof CreateCharacterSchema>;
