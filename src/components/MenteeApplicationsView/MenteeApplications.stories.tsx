import type { Meta, StoryObj } from '@storybook/react';
import MenteeApplications from './MenteeApplications.component.tsx';

const meta: Meta<typeof MenteeApplications> = {
  component: MenteeApplications,
  title: 'MenteeApplications',
  // You can provide some sample data for testing purposes
  args: {
    mentees: [
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
    ],
    myMentees: [
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test University',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        name: 'John Doe',
        university: 'Test College',
        profilePicture: 'https://via.placeholder.com/150',
      },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
