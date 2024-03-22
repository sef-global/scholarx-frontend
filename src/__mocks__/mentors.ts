import type { Mentor } from '../types';

export const mentors: Mentor[] = [
  {
    mentor_id: 1,
    created_at: '2023-07-01',
    updated_at: '2023-07-10',
    state: 'approved',
    category: 'Technology',
    application: {
      position: 'Software Engineer',
      country: 'United States',
      institution: 'Google',
      expertise: 'Web Development',
      menteeExpectations: 'Commitment and eagerness to learn',
      mentoringPhilosophy: 'Empowering mentees to reach their full potential',
      canCommit: true,
      isPastMentor: true,
      reasonToMentor: 'To give back to the community',
      cv: 'https://example.com/cv',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      bio: '',
      noOfMentees: 0,
      category: '',
    },
    availability: true,
    profile: {
      created_at: new Date('2021-07-05T00:00:00.000Z'),
      updated_at: new Date('2021-07-06T00:00:00.000Z'),
      primary_email: 'mentor1@example.com',
      contact_email: 'mentor1@example.com',
      first_name: 'John',
      last_name: 'Doe',
      image_url: 'https://xsgames.co/randomusers/avatar.php?g=male',
      linkedin_url: 'https://linkedin.com/in/mentor1',
      type: 'DEFAULT',
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
      position: 'Chief Marketing Officer',
      country: 'Canada',
      institution: 'Facebook',
      expertise: 'Marketing',
      menteeExpectations: 'Proactive attitude and willingness to learn',
      mentoringPhilosophy: 'Sharing practical insights for professional growth',
      canCommit: true,
      isPastMentor: false,
      reasonToMentor: 'Passion for supporting aspiring entrepreneurs',
      cv: 'https://example.com/cv',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      bio: '',
      noOfMentees: 0,
      category: '',
    },
    availability: true,
    profile: {
      created_at: new Date('2021-07-05T00:00:00.000Z'),
      updated_at: new Date('2021-07-06T00:00:00.000Z'),
      primary_email: 'mentor2@example.com',
      contact_email: 'mentor2@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      image_url: 'https://xsgames.co/randomusers/avatar.php?g=female',
      linkedin_url: 'https://linkedin.com/in/mentor2',
      type: 'DEFAULT',
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
      position: 'UI/UX Designer',
      country: 'United Kingdom',
      expertise: 'UI/UX Design',
      institution: 'Facebook',
      menteeExpectations: 'Attention to detail and creativity',
      mentoringPhilosophy: 'Creating user-centric designs',
      canCommit: true,
      isPastMentor: true,
      reasonToMentor: 'To inspire and educate aspiring designers',
      cv: 'https://example.com/cv',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      bio: '',
      noOfMentees: 0,
      category: '',
    },
    availability: true,
    profile: {
      created_at: new Date('2021-07-05T00:00:00.000Z'),
      updated_at: new Date('2021-07-06T00:00:00.000Z'),
      primary_email: 'mentor3@example.com',
      contact_email: 'mentor3@example.com',
      first_name: 'Emily',
      last_name: 'Johnson',
      image_url: '',
      linkedin_url: 'https://linkedin.com/in/mentor3',
      type: 'DEFAULT',
      uuid: 'ghi789',
    },
  },
];
