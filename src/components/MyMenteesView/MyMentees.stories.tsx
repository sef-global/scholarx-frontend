import type { Meta, StoryObj } from '@storybook/react';
import MyMentees from './MyMentees.component';

const meta: Meta<typeof MyMentees> = {
  component: MyMentees,
  title: 'MyMentees',
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
