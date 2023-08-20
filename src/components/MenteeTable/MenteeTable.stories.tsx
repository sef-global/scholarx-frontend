import type { Meta, StoryObj } from '@storybook/react';
import MenteeTable from './MenteeTable.component.tsx';

const meta: Meta<typeof MenteeTable> = {
  title: 'Mentee Table',
  component: MenteeTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
