import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';

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
    isLoading: false,
    profile,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstName = canvas.getByLabelText('First Name');
    const lastName = canvas.getByLabelText('Last Name');
    const primaryEmail = canvas.getByLabelText('Primary Email');
    const contactEmail = canvas.getByLabelText('Contact Email');
    const linkedInUrl = canvas.getByLabelText('LinkedIn URL');
    const fullName = canvas.getByText(
      `${profile.first_name} ${profile.last_name}`
    );

    const profilePicture = await canvas.findByRole('img', {
      name: `ProfilePicture_${profile.first_name}${profile.last_name}`,
    });
    const uploadIcon = canvas.queryByRole('button', { name: 'plus Upload' });

    expect(firstName).toHaveValue(profile.first_name);
    expect(lastName).toHaveValue(profile.last_name);
    expect(primaryEmail).toHaveValue(profile.primary_email);
    expect(contactEmail).toHaveValue(profile.contact_email);
    expect(linkedInUrl).toHaveValue(profile.linkedin_url);
    expect(fullName).toBeVisible();

    await waitFor(
      () => {
        expect(profilePicture).toBeVisible();
      },
      { timeout: 100 }
    );
    expect(uploadIcon).not.toBeInTheDocument();
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
    const linkedInUrl = canvas.getByLabelText('LinkedIn URL');
    const fullName = canvas.getByText(
      `${profile.first_name} ${profile.last_name}`
    );
    const uploadIcon = canvas.getByRole('button', { name: 'plus Upload' });

    expect(firstName).toHaveValue(profile.first_name);
    expect(lastName).toHaveValue(profile.last_name);
    expect(primaryEmail).toHaveValue(profile.primary_email);
    expect(contactEmail).toHaveValue(profile.contact_email);
    expect(linkedInUrl).toHaveValue(profile.linkedin_url);
    expect(fullName).toBeVisible();
    expect(uploadIcon).toBeVisible();
  },
};

export const loadingState: Story = {
  args: {
    isLoading: true,
    profile: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByLabelText('First Name')).toBeNull();
    expect(canvas.queryByLabelText('Last Name')).toBeNull();
    expect(canvas.queryByLabelText('Primary Email')).toBeNull();
    expect(canvas.queryByLabelText('Contact Email')).toBeNull();
    expect(canvas.queryByLabelText('LinkedIn URL')).toBeNull();
    expect(canvas.queryByText('Save')).toBeNull();
  },
};
