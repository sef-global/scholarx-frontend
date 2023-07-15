import type { Meta, StoryObj } from '@storybook/react';

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
};

export const cardWithDefaultImage: Story = {
  args: {
    mentor: mentors[2],
  },
};
