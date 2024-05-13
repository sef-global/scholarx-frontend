import MentorProfile from './MentorProfile.component';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof MentorProfile> = {
  component: MentorProfile,
  title: 'Mentor Profile page',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mentorProfileView = canvas.getByText('Mentor Profile page');

    expect(mentorProfileView).toBeInTheDocument();
  },
};
