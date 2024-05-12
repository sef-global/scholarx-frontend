import { type z } from 'zod';
import {
  type MentorApplicationSchema,
  type MenteeApplicationSchema,
} from './schemas';
import { type ProfileTypes } from './enums';

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
  state: string;
  category: Category;
  application: MentorApplication;
  availability: boolean;
  profile: Profile;
}

export type MenteeApplication = z.infer<typeof MenteeApplicationSchema>;

export type MentorApplication = z.infer<typeof MentorApplicationSchema>;

export interface Mentee {
  state: string;
  application: MenteeApplication;
  profile: Profile;
  mentor: string;
  uuid: string;
  created_at: Date;
  updated_at: Date;
  certificate_id: string;
  journal: string;
}

export interface Profile {
  created_at: Date;
  mentor: Mentor[];
  updated_at: Date;
  primary_email: string;
  contact_email: string;
  first_name: string;
  last_name: string;
  image_url?: string;
  linkedin_url: string;
  type: ProfileTypes;
  uuid: string;
}
