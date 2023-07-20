export type Mentor = {
  mentor_id: number,
  created_at: string,
  updated_at: string,
  state: string,
  category: string,
  application: Application,
  availability: boolean,
  profile: Profile,
};

export type Application = {
  designation: string,
  country: string,
  company_or_institution: string,
  areas_of_expertise: string,
  expectations_from_mentees: string,
  mentoring_philosophy: string,
  commitment_to_program: boolean,
  previous_experience_as_mentor: boolean,
  reason_for_being_mentor: string,
  cv_link: string,
};

export type Profile = {
  created_at: string,
  updated_at: string,
  primary_email: string,
  contact_email: string,
  first_name: string,
  last_name: string,
  image_url?: string,
  linkedin_url: string,
  type: string,
  uuid: string,
};
