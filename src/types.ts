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

export interface MentorApplication {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  country: string;
  position: string;
  expertise: string;
  bio: string;
  isPastMentor: boolean;
  reasonToMentor?: string;
  motivation?: string;
  cv: string;
  menteeExpectations: string;
  mentoringPhilosophy: string;
  noOfMentees: number;
  canCommit: boolean;
  mentoredYear?: number;
  category: string;
  institution: string;
  linkedin?: string;
  website?: string;
}

export interface Profile {
  created_at: Date;
  updated_at: Date;
  primary_email: string;
  contact_email: string;
  first_name: string;
  last_name: string;
  image_url?: string;
  linkedin_url: string;
  type: 'DEFAULT' | 'ADMIN';
  uuid: string;
}

export interface MentorCardType {
  mentorId: string;
  category: Category;
  profile: {
    contact_email: string;
    first_name: string;
    last_name: string;
    image_url?: string | undefined;
    linkedin_url: string;
  };
}
