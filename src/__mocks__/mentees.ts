import { type Mentee } from '../types.ts';

export const mentees: Mentee[] = [
  {
    mentee_id: 1,
    created_at: '2023-06-30T08:00:00Z',
    updated_at: '2023-06-30T12:30:00Z',
    state: 'active',
    answers: [
      {
        question: 'What programming languages do you know?',
        answer: 'Python, Java',
      },
      {
        question: 'What is your favorite programming book?',
        answer: 'Clean Code by Robert C. Martin',
      },
    ],
    profile: {
      created_at: '2023-06-29T09:45:00Z',
      updated_at: '2023-06-30T14:15:00Z',
      primary_email: 'mentee@example.com',
      contact_email: 'mentee_contact@example.com',
      first_name: 'Sarah',
      last_name: 'Johnson',
      image_url: 'https://example.com/mentee_profile_image.jpg',
      linkedin_url: 'https://www.linkedin.com/in/sarahjohnson',
      type: 'DEFAULT',
      uuid: '98765432-2345-6789-2345-678923456789',
    },
    mentor: {
      mentor_id: 1,
      created_at: '2023-07-01',
      updated_at: '2023-07-10',
      state: 'approved',
      category: 'Technology',
      application: {
        designation: 'Software Engineer',
        country: 'United States',
        company_or_institution: 'Google',
        areas_of_expertise: 'Web Development',
        expectations_from_mentees: 'Commitment and eagerness to learn',
        mentoring_philosophy:
          'Empowering mentees to reach their full potential',
        commitment_to_program: true,
        previous_experience_as_mentor: true,
        reason_for_being_mentor: 'To give back to the community',
        cv_link: 'https://example.com/cv',
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
  },
  {
    mentee_id: 2,
    created_at: '2023-06-30T08:00:00Z',
    updated_at: '2023-06-30T12:30:00Z',
    state: 'active',
    answers: [
      {
        question: 'What programming languages do you know?',
        answer: 'Python, Java',
      },
      {
        question: 'What is your favorite programming book?',
        answer: 'Clean Code by Robert C. Martin',
      },
    ],
    profile: {
      created_at: '2023-06-29T09:45:00Z',
      updated_at: '2023-06-30T14:15:00Z',
      primary_email: 'mentee2@example.com',
      contact_email: 'mentee_contact2@example.com',
      first_name: 'Mentia',
      last_name: 'De Forgetsmith',
      image_url: 'https://example.com/mentee_profile_image.jpg',
      linkedin_url: 'https://www.linkedin.com/in/sarahjohnson',
      type: 'DEFAULT',
      uuid: '98765432-2345-6789-2345-678923456789',
    },
    mentor: {
      mentor_id: 1,
      created_at: '2023-07-01',
      updated_at: '2023-07-10',
      state: 'approved',
      category: 'Technology',
      application: {
        designation: 'Software Engineer',
        country: 'United States',
        company_or_institution: 'Google',
        areas_of_expertise: 'Web Development',
        expectations_from_mentees: 'Commitment and eagerness to learn',
        mentoring_philosophy:
          'Empowering mentees to reach their full potential',
        commitment_to_program: true,
        previous_experience_as_mentor: true,
        reason_for_being_mentor: 'To give back to the community',
        cv_link: 'https://example.com/cv',
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
  },
];
