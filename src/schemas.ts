import { z } from 'zod';

export const MenteeApplicationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, { message: 'Contact number cannot be empty' }),
  company: z.string().min(1, { message: 'Company cannot be empty' }).optional(),
  position: z
    .string()
    .min(1, { message: 'Position cannot be empty' })
    .optional(),
  cv: z.string().min(1, { message: 'CV cannot be empty' }),
  isUndergrad: z.boolean(),
  consentGiven: z.boolean().refine((val) => val, {
    message: 'You must give your consent to proceed.',
  }),
  graduatedYear: z
    .number()
    .refine(
      (data) => {
        return data === undefined || (!isNaN(data) && data >= 1980);
      },
      {
        message: 'Graduated year must be a year',
      }
    )
    .optional(),
  university: z
    .string()
    .min(1, { message: 'University cannot be empty' })
    .optional(),
  yearOfStudy: z
    .number()
    .min(1, { message: 'Year of study cannot be empty' })
    .gte(1)
    .lte(4)
    .optional(),
  course: z.string().min(1, { message: 'Course cannot be empty' }).optional(),
  mentorId: z.string().min(1, { message: 'Mentor cannot be empty' }),
  submission: z
    .string()
    .url({ message: 'Please submit a valid video submission' }),
});
