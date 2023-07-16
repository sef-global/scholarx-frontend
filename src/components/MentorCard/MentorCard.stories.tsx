import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import MentorCard from './MentorCard.component';
import { mentors } from '../../__mocks__/mentors';

const meta: Meta<typeof MentorCard> = {
  component: MentorCard,
  title: 'Mentor Card',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultCard: Story = {
  args: {
    mentor: mentors[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mentorName = canvas.getByText(
      `${mentors[0].profile.first_name} ${mentors[0].profile.last_name}`
    );

    const mentorDesignation = canvas.getByText(
      mentors[0].application.designation
    );

    const companyOrInstitution = canvas.getByText(
      mentors[0].application.company_or_institution
    );

    expect(mentorName).toBeInTheDocument();
    expect(mentorDesignation).toBeInTheDocument();
    expect(companyOrInstitution).toBeInTheDocument();
  },
};

export const cardWithDefaultImage: Story = {
  args: {
    mentor: mentors[2],
  },
};
