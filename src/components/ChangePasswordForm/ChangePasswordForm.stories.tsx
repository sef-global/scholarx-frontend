import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import ChangePasswordForm from './ChangePasswordForm.component';

const meta: Meta<typeof ChangePasswordForm> = {
  component: ChangePasswordForm,
  title: 'Change Password Form',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const emptyForm: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      await canvas.findByLabelText('Current Password')
    ).toBeInTheDocument();
    expect(await canvas.findByLabelText('New Password')).toBeInTheDocument();
    expect(
      await canvas.findByLabelText('Confirm New Password')
    ).toBeInTheDocument();
  },
};
