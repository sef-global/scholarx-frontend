import MenteeApplication from './MenteeApplication.component';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { mentees } from '../../__mocks__/mentees';
import { expect } from '@storybook/jest';
import { type Mentee } from '../../types';

const meta: Meta<typeof MenteeApplication> = {
  component: MenteeApplication,
  title: 'Mentee Application',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    mentee: mentees[0] as Mentee,
    onStateChange: (newState: string) => {
      console.log('Changing state to', newState);
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // check the displayed mentee details
    const menteeDisplayName = canvas.getByText(
      mentees[0].application.firstName + ' ' + mentees[0].application.lastName
    );

    const appliedMentorName = canvas.getByText(
      mentees[0].mentor.profile.first_name +
        ' ' +
        mentees[0].mentor.profile.last_name
    );
    const submissionLink = canvas.getByText('Click here to view');

    expect(menteeDisplayName).toBeInTheDocument();
    expect(appliedMentorName).toBeInTheDocument();
    expect(submissionLink).toHaveAttribute(
      'href',
      mentees[0].application.submission
    );
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skeleton = canvas.getByText('Skeleton');
    expect(skeleton).toBeInTheDocument();
  },
};
