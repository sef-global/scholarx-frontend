import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import MentorCard from './MentorCard.component';
import { mentorCards } from '../../__mocks__/mentorCards';

const meta: Meta<typeof MentorCard> = {
  component: MentorCard,
  title: 'Mentor Card',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultCard: Story = {
  args: {
    mentor: mentorCards[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mentorName = canvas.getByText(
      `${mentorCards[0].profile.first_name} ${mentorCards[0].profile.last_name}`
    );

    const mentorDesignation = canvas.getByText(mentorCards[0].profile.position);

    // const companyOrInstitution = canvas.getByText(
    //   mentorCards[0].application.institution
    // );

    expect(mentorName).toBeInTheDocument();
    expect(mentorDesignation).toBeInTheDocument();
    // expect(companyOrInstitution).toBeInTheDocument();
  },
};

export const cardWithDefaultImage: Story = {
  args: {
    mentor: mentorCards[2],
  },
};
