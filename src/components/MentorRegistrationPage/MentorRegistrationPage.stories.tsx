import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { screen, fireEvent } from '@testing-library/react';
import type { Meta, StoryObj } from '@storybook/react';

import MentorRegistrationPage from './';

const meta: Meta<typeof MentorRegistrationPage> = {
  component: MentorRegistrationPage,
  title: 'Mentor Registration Page',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstNameInput = canvas.getByLabelText('First Name');
    const lastNameInput = canvas.getByLabelText('Last Name');
    const linkedinUrlInput = canvas.getByLabelText('LinkedIn URL');
    const researchGateUrlInput = canvas.getByLabelText('ResearchGate URL');
    const googleScholarUrlInput = canvas.getByLabelText('GoogleScholar URL');
    const nextButton = canvas.getByText('Next');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(linkedinUrlInput, {
      target: { value: 'https://linkedin.com/johndoe' },
    });
    fireEvent.change(researchGateUrlInput, {
      target: { value: 'https://researchgate.com/johndoe' },
    });
    fireEvent.change(googleScholarUrlInput, {
      target: { value: 'https://scholar.google.com/johndoe' },
    });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeVisible();
    });

    const categorySelect = canvas.getByLabelText('Category');
    const countryInput = canvas.getByLabelText('What is your country?');
    const expertiseInput = canvas.getByLabelText('What is your expertise?');
    const previousButton = canvas.getByText('Previous');

    fireEvent.change(categorySelect, { target: { value: '1' } });
    fireEvent.change(countryInput, { target: { value: 'United States' } });
    fireEvent.change(expertiseInput, {
      target: { value: 'Software Engineering' },
    });

    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByLabelText('LinkedIn URL')).toBeVisible();
    });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText('What is your mentoring strategy?')
      ).toBeVisible();
    });

    const mentoringStrategyTextarea = canvas.getByLabelText(
      'What is your mentoring strategy?'
    );

    fireEvent.change(mentoringStrategyTextarea, {
      target: { value: 'I believe in personalized guidance.' },
    });

    const secondPreviousButton = canvas.getByText('Previous');
    fireEvent.click(secondPreviousButton);

    await waitFor(() => {
      expect(screen.getByLabelText('What is your expertise?')).toBeVisible();
    });

    fireEvent.click(nextButton);
    const submitButton = canvas.getByText('Submit');
    fireEvent.click(submitButton);
  },
};
