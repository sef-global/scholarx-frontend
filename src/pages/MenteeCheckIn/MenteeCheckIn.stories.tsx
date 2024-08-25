import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { waitFor, within, userEvent } from '@storybook/testing-library';

import MenteeCheckIn from './MenteeCheckIn.component';

const meta: Meta<typeof MenteeCheckIn> = {
  component: MenteeCheckIn,
  title: 'Mentee CheckIn Form',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const generalUpdate = canvas.getByLabelText('General Updates and Feedback');
    const progressUpdate = canvas.getByLabelText('Progress Towards Goals');
    const mediaLink = canvas.getByLabelText('Media Content Link');
    const submitButton = canvas.getByRole('button', { name: 'Check-In' });

    expect(generalUpdate).toBeVisible();
    expect(progressUpdate).toBeVisible();
    expect(mediaLink).toBeVisible();
    expect(submitButton).toBeVisible();
  },
};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const generalUpdate = canvas.getByLabelText('General Updates and Feedback');
    const progressUpdate = canvas.getByLabelText('Progress Towards Goals');
    const mediaLink = canvas.getByLabelText('Media Content Link');
    const submitButton = canvas.getByRole('button', { name: 'Check-In' });

    userEvent.type(generalUpdate, 'Communication is regular and productive.');
    userEvent.type(
      progressUpdate,
      'Made significant progress on project goals.'
    );
    userEvent.type(mediaLink, 'https://example.com/media-content');

    expect(generalUpdate).toHaveValue(
      'Communication is regular and productive.'
    );
    expect(progressUpdate).toHaveValue(
      'Made significant progress on project goals.'
    );
    expect(mediaLink).toHaveValue('https://example.com/media-content');

    userEvent.click(submitButton);
  },
};

export const ClearMediaLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mediaLink = canvas.getByLabelText('Media Content Link');
    const clearButton = canvas.getByRole('button', { name: 'Clear' });

    userEvent.type(mediaLink, 'https://example.com/media-content');
    expect(mediaLink).toHaveValue('https://example.com/media-content');

    userEvent.click(clearButton);
    expect(mediaLink).toHaveValue('');
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitButton = canvas.getByRole('button', { name: 'Check-In' });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(canvas.getByText('Please provide general updates')).toBeVisible();
      expect(canvas.getByText('Please summarize your progress')).toBeVisible();
      expect(canvas.getByText('Please provide a media link')).toBeVisible();
    });
  },
};
