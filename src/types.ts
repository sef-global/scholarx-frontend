import { type z } from 'zod';
import {
  type MentorApplicationSchema,
  type MenteeApplicationSchema,
  MenteeCheckInSchema,
} from './schemas';
import {
  type StatusUpdatedBy,
  type ApplicationStatus,
  type ProfileTypes,
} from './enums';

export interface Category {
  category: string;
  uuid: string;
  created_at?: string;
  updated_at?: string;
}

export interface Mentor {
  uuid: string;
  created_at: string;
  updated_at: string;
  state: ApplicationStatus;
  category: Category;
  application: MentorApplication;
  availability: boolean;
  profile: Profile;
  mentees?: Mentee[];
}

export type MenteeApplication = z.infer<typeof MenteeApplicationSchema>;

export type MentorApplication = z.infer<typeof MentorApplicationSchema>;

export interface Mentee {
  state: string;
  application: MenteeApplication;
  profile: Profile;
  mentor: Mentor;
  uuid: string;
  created_at: Date;
  updated_at: Date;
  certificate_id: string;
  status_updated_by?: StatusUpdatedBy;
  status_updated_date?: Date;
  journal: string;
}

export interface Profile {
  created_at: Date;
  mentor: Mentor[];
  mentee?: Mentee[];
  updated_at: Date;
  primary_email: string;
  contact_email: string;
  first_name: string;
  last_name: string;
  image_url?: string;
  type: ProfileTypes;
  uuid: string;
}

export interface Email {
  recipients: string;
  subject: string;
  status: string;
  opened: boolean;
  sentTime: string;
  profile: Profile;
}

export interface EmailData {
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
}

export interface SendEmailsResponse {
  status: string;
  message: string;
}

export type SendEmailsFunction = (
  emailData: EmailData
) => Promise<SendEmailsResponse>;

export interface MutationData {
  message: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetResponse {
  status: string;
  message: string;
}

export interface PasswordUpdateData {
  token: string;
  newPassword: string;
}

export type MenteeCheckInForm = z.infer<typeof MenteeCheckInSchema>;

export interface MonthlyCheckIn {
  uuid: string;
  title: string;
  checkInDate: string;
  mediaContentLinks: string[];
  isCheckedByMentor: boolean;
  mentorCheckedDate: string;
  mentorFeedback: string;
  generalUpdatesAndFeedback: string;
  progressTowardsGoals?: string;
  mentee: Mentee;
}

export interface MonthlyCheckingProps {
  isMentorView: boolean;
  menteeId: string;
}

export interface MentorFeedbackForm {
  checkInId: string;
  menteeId: string;
  mentorFeedback: string;
  isCheckedByMentor: boolean;
}

export interface NotificationProps {
  iconColor?: string;
  badgeColor?: string;
  textColor?: string;
  count?: number;
  className?: string;
}
