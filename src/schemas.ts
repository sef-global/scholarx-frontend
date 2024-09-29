import { z } from 'zod';

export const MenteeApplicationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, { message: 'Contact number cannot be empty' }),
  company: z.string().min(1, { message: 'Company cannot be empty' }).optional(),
  profilePic: z
    .string()
    .min(1, { message: 'The profile picture cannot be empty' }),
  position: z
    .string()
    .min(1, { message: 'Position cannot be empty' })
    .optional(),
  cv: z.string().min(1, { message: 'CV cannot be empty' }),
  isUndergrad: z.boolean(),
  graduatedYear: z
    .number({ invalid_type_error: 'Graduated year is required' })
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
    .number({ invalid_type_error: 'Year of study is required' })
    .gte(1, { message: 'Year must be greater than 0' })
    .lte(4, { message: 'Year must be less than or equal 4' })
    .optional(),
  course: z.string().min(1, { message: 'Course cannot be empty' }).optional(),
  mentorId: z.string().min(1, { message: 'Mentor cannot be empty' }),
  submission: z
    .string()
    .url({ message: 'Please submit a valid video submission' }),
  consentGiven: z.boolean().optional(),
});

export const MentorApplicationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, { message: 'Contact number cannot be empty' }),
  country: z.string().min(1, { message: 'Country cannot be empty' }),
  position: z.string().min(1, { message: 'Position cannot be empty' }),
  expertise: z.string().min(1, { message: 'Expertise cannot be empty' }),
  bio: z
    .string()
    .min(1, { message: 'Bio cannot be empty' })
    .max(2000, { message: 'Bio cannot exceed 2000 characters' }),
  isPastMentor: z.boolean(),
  reasonToMentor: z
    .string()
    .min(1, { message: 'Reason to become a mentor cannot be empty' }),
  motivation: z.string().min(1, { message: 'This cannot be empty' }).optional(),
  profilePic: z
    .string()
    .min(1, { message: 'The profile picture cannot be empty' }),
  cv: z.string().min(1, { message: 'CV cannot be empty' }),
  menteeExpectations: z
    .string()
    .min(1, { message: 'Mentee expectations cannot be empty' }),
  mentoringPhilosophy: z
    .string()
    .min(1, { message: 'Mentoring philosophy cannot be empty' }),
  noOfMentees: z.number().min(0, {
    message: 'Number of mentees must be greater than or equal to 0',
  }),
  mentoredYear: z
    .number({ invalid_type_error: 'Mentored year is required' })
    .or(z.number().min(0))
    .optional(),
  category: z.string().min(1, { message: 'Category cannot be empty' }),
  institution: z.string().min(1, { message: 'Institution cannot be empty' }),
  linkedin: z
    .string()
    .url({ message: 'Invalid LinkedIn URL' })
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url({ message: 'Invalid website URL' })
    .optional()
    .or(z.literal('')),
  canCommit: z.boolean().optional(),
});

export const MenteeCheckInSchema = z.object({
  generalUpdate: z.string().min(1, 'Please provide general updates'),
  progressUpdate: z.string().min(1, 'Please summarize your progress'),
  mediaLink: z
    .string()
    .url('Please provide a valid URL')
    .min(1, 'Please provide a media link'),
});

export const mentorTermsAgreementModalSchema = z.object({
  agreed: z.boolean().refine((val) => val, {
    message: 'You must agree to the ScholarX Mentor Guide 2024',
  }),
  canCommit: z.boolean().refine((val) => val, {
    message: 'You must mention if you can commit',
  }),
});

export const menteeTermsAgreementModalSchema = z.object({
  agreed: z.boolean().refine((val) => val, {
    message: 'You must agree to the ScholarX Mentee Guide 2024',
  }),
  consentGiven: z.boolean().refine((val) => val, {
    message: 'You must give consent to proceed',
  }),
});
