import MentorProfileView from './MentorProfileView.component';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof MentorProfileView> = {
  component: MentorProfileView,
  title: 'Mentor Profile View',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mentorProfileView = canvas.getByText('Mentor Profile View');

    expect(mentorProfileView).toBeInTheDocument();
  },
};
