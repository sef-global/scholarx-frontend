import { Mentor } from '../types';

export const mentors: Mentor[] = [
  {
    mentor_id: 1,
    created_at: '2023-07-01',
    updated_at: '2023-07-10',
    state: 'approved',
    category: 'Technology',
    application: {
      designation: 'Software Engineer',
      country: 'United States',
      areasOfExpertise: 'Web Development',
      expectationsFromMentees: 'Commitment and eagerness to learn',
      mentoringPhilosophy: 'Empowering mentees to reach their full potential',
      commitmentToProgram: true,
      previousExperienceAsMentor: true,
      reasonForBeingMentor: 'To give back to the community',
      cvLink: 'https://example.com/cv',
    },
    availability: true,
    profile: {
      created_at: '2023-06-15',
      updated_at: '2023-07-05',
      primary_email: 'mentor1@example.com',
      contact_email: 'mentor1@example.com',
      first_name: 'John',
      last_name: 'Doe',
      image_url: 'https://xsgames.co/randomusers/avatar.php?g=male',
      linkedin_url: 'https://linkedin.com/in/mentor1',
      type: 'Technical',
      uuid: 'abc123',
    },
  },
  {
    mentor_id: 2,
    created_at: '2023-07-02',
    updated_at: '2023-07-12',
    state: 'approved',
    category: 'Business',
    application: {
      designation: 'Chief Marketing Officer',
      country: 'Canada',
      areasOfExpertise: 'Marketing',
      expectationsFromMentees: 'Proactive attitude and willingness to learn',
      mentoringPhilosophy: 'Sharing practical insights for professional growth',
      commitmentToProgram: true,
      previousExperienceAsMentor: false,
      reasonForBeingMentor: 'Passion for supporting aspiring entrepreneurs',
      cvLink: 'https://example.com/cv',
    },
    availability: true,
    profile: {
      created_at: '2023-06-20',
      updated_at: '2023-07-08',
      primary_email: 'mentor2@example.com',
      contact_email: 'mentor2@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      image_url: 'https://xsgames.co/randomusers/avatar.php?g=female',
      linkedin_url: 'https://linkedin.com/in/mentor2',
      type: 'Business',
      uuid: 'def456',
    },
  },
  {
    mentor_id: 3,
    created_at: '2023-07-03',
    updated_at: '2023-07-12',
    state: 'approved',
    category: 'Design',
    application: {
      designation: 'UI/UX Designer',
      country: 'United Kingdom',
      areasOfExpertise: 'UI/UX Design',
      expectationsFromMentees: 'Attention to detail and creativity',
      mentoringPhilosophy: 'Creating user-centric designs',
      commitmentToProgram: true,
      previousExperienceAsMentor: true,
      reasonForBeingMentor: 'To inspire and educate aspiring designers',
      cvLink: 'https://example.com/cv',
    },
    availability: true,
    profile: {
      created_at: '2023-06-25',
      updated_at: '2023-07-07',
      primary_email: 'mentor3@example.com',
      contact_email: 'mentor3@example.com',
      first_name: 'Emily',
      last_name: 'Johnson',
      image_url: '',
      linkedin_url: 'https://linkedin.com/in/mentor3',
      type: 'Design',
      uuid: 'ghi789',
    },
  },
];
