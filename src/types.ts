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
  areasOfExpertise: string,
  expectationsFromMentees: string,
  mentoringPhilosophy: string,
  commitmentToProgram: boolean,
  previousExperienceAsMentor: boolean,
  reasonForBeingMentor: string,
  cvLink: string,
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
