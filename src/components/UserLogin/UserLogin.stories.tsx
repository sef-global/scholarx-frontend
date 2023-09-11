import { type Meta, type StoryObj } from '@storybook/react';
import UserLogin from './UserLogin.component';

const meta: Meta<typeof UserLogin> = {
  title: 'Components/UserLogin',
  component: UserLogin,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {};
