import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import EditProfileForm from './EditProfileForm.component';
import { profile } from '../../__mocks__/profile';

const meta: Meta<typeof EditProfileForm> = {
  component: EditProfileForm,
  title: 'Edit Profile Form',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const formWithData: Story = {
  args: {
    profile,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstName = canvas.getByLabelText('First Name');
    const lastName = canvas.getByLabelText('Last Name');
    const primaryEmail = canvas.getByLabelText('Primary Email');
    const contactEmail = canvas.getByLabelText('Contact Email');
    const fullName = canvas.getByText(
      `${profile.first_name} ${profile.last_name}`
    );

    expect(firstName).toHaveValue(profile.first_name);
    expect(lastName).toHaveValue(profile.last_name);
    expect(primaryEmail).toHaveValue(profile.primary_email);
    expect(contactEmail).toHaveValue(profile.contact_email);
    expect(fullName).toBeVisible();
  },
};

export const formWithoutProfilePicture: Story = {
  args: {
    profile: {
      ...profile,
      image_url: undefined,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstName = canvas.getByLabelText('First Name');
    const lastName = canvas.getByLabelText('Last Name');
    const primaryEmail = canvas.getByLabelText('Primary Email');
    const contactEmail = canvas.getByLabelText('Contact Email');
    const fullName = canvas.getByText(
      `${profile.first_name} ${profile.last_name}`
    );
    const uploadIcon = canvas.getByRole('button', { name: 'plus Upload' });

    expect(firstName).toHaveValue(profile.first_name);
    expect(lastName).toHaveValue(profile.last_name);
    expect(primaryEmail).toHaveValue(profile.primary_email);
    expect(contactEmail).toHaveValue(profile.contact_email);
    expect(fullName).toBeVisible();
    expect(uploadIcon).toBeVisible();
  },
};
