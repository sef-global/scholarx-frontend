import { mentors } from './../../__mocks__/mentors';
import type { Meta, StoryObj } from '@storybook/react';

import { MentorList } from './MentorList.component';

const meta: Meta<typeof MentorList> = {
  title: 'Mentor List',
  component: MentorList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ListWithData: Story = {
  args: {
    mentors: [...mentors, ...mentors],
  },
};
export const EmptyList: Story = {};
