import type { Meta, StoryObj } from '@storybook/react';
import MenteeApplications from './MenteeApplications.component.tsx';

const meta: Meta<typeof MenteeApplications> = {
  component: MenteeApplications,
  title: 'MenteeApplications',
  args: {},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
