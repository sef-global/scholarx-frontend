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

export const Step1: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstNameInput = canvas.getByLabelText('First Name');
    const lastNameInput = canvas.getByLabelText('Last Name');
    const linkedinUrlInput = canvas.getByLabelText('Linkedin Url');
    const researchGateUrlInput = canvas.getByLabelText('ResearchGate Url');
    const googleScholarUrlInput = canvas.getByLabelText('GoogleScholar Url');
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
  },
};

export const Step2: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const categorySelect = canvas.getByLabelText('Category');
    const countryInput = canvas.getByLabelText('What is your country?');
    const expertiseInput = canvas.getByLabelText('What is your expertise?');
    const previousButton = canvas.getByText('Previous');
    const nextButton = canvas.getByText('Next');

    fireEvent.change(categorySelect, { target: { value: '1' } });
    fireEvent.change(countryInput, { target: { value: 'United States' } });
    fireEvent.change(expertiseInput, {
      target: { value: 'Software Engineering' },
    });

    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Linkedin Url')).toBeVisible();
    });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText('What is your mentoring strategy?')
      ).toBeVisible();
    });
  },
};

export const Step3: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mentoringStrategyTextarea = canvas.getByLabelText(
      'What is your mentoring strategy?'
    );
    const submitButton = canvas.getByText('Submit');
    const previousButton = canvas.getByText('Previous');

    fireEvent.change(mentoringStrategyTextarea, {
      target: { value: 'I believe in personalized guidance.' },
    });

    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByLabelText('What is your expertise?')).toBeVisible();
    });

    fireEvent.click(submitButton);
  },
};
