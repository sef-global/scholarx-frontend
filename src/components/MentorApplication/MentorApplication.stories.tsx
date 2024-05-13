import MentorApplication from './MentorApplication.component';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { mentors } from '../../__mocks__/mentors';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MentorApplication> = {
  component: MentorApplication,
  title: 'Mentor Application',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    mentor: mentors[0],
    onStateChange: (newState: string) => {
      console.log('Changing state to', newState);
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // check the displayed mentor details
    const mentorDisplayName = canvas.getByText(
      mentors[0].application.firstName + ' ' + mentors[0].application.lastName
    );
    const mentorPositionWithInstitution = canvas.getByText(
      mentors[0].application.position +
        ', ' +
        mentors[0].application.institution
    );
    const category = canvas.getByText(mentors[0].category.category);
    const country = canvas.getByText(mentors[0].application.country);
    const expertise = canvas.getByText(mentors[0].application.expertise);
    const menteeExpectations = canvas.getByText(
      mentors[0].application.menteeExpectations
    );
    const mentoringPhilosophy = canvas.getByText(
      mentors[0].application.mentoringPhilosophy
    );
    const bio = canvas.getByText(mentors[0].application.bio);

    expect(mentorDisplayName).toBeInTheDocument();
    expect(mentorPositionWithInstitution).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(expertise).toBeInTheDocument();
    expect(menteeExpectations).toBeInTheDocument();
    expect(mentoringPhilosophy).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
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
