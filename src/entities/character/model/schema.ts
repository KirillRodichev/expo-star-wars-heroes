import { z } from 'zod';

export const characterEditSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  
  birth_year: z.string()
    .min(1, 'Birth year is required')
    .regex(/^\d+(\.\d+)?(BBY|ABY|unknown)$/i, 'Birth year must be in format like "19BBY", "4ABY", or "unknown"')
    .trim(),
  
  height: z.string()
    .min(1, 'Height is required')
    .regex(/^(\d+|unknown)$/, 'Height must be a number or "unknown"')
    .refine(val => val === 'unknown' || (parseInt(val) > 0 && parseInt(val) < 500), 
      'Height must be between 1-500 cm or "unknown"')
    .trim(),
  
  mass: z.string()
    .min(1, 'Mass is required')
    .regex(/^(\d+(\.\d+)?|unknown)$/, 'Mass must be a number or "unknown"')
    .refine(val => val === 'unknown' || (parseFloat(val) > 0 && parseFloat(val) < 1000), 
      'Mass must be between 0-1000 kg or "unknown"')
    .trim(),
  
  hair_color: z.string()
    .min(1, 'Hair color is required')
    .max(50, 'Hair color must be less than 50 characters')
    .trim(),
  
  skin_color: z.string()
    .min(1, 'Skin color is required')
    .max(50, 'Skin color must be less than 50 characters')
    .trim(),
  
  eye_color: z.string()
    .min(1, 'Eye color is required')
    .max(50, 'Eye color must be less than 50 characters')
    .trim(),
  
  gender: z.string()
    .min(1, 'Gender is required')
    .max(20, 'Gender must be less than 20 characters')
    .trim(),
  
  homeworld: z.string(),
  films: z.array(z.string()),
  species: z.array(z.string()),
  starships: z.array(z.string()),
  vehicles: z.array(z.string()),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
});

export const characterFormSchema = characterEditSchema.pick({
  name: true,
  birth_year: true,
  height: true,
  mass: true,
  hair_color: true,
  skin_color: true,
  eye_color: true,
  gender: true,
});

export type CharacterFormData = z.infer<typeof characterFormSchema>;
export type ValidatedCharacter = z.infer<typeof characterEditSchema>;
