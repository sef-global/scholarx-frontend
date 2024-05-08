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
    const emailInput = canvas.getByLabelText('Email');
    const contactNoInput = canvas.getByLabelText('Contact No (Whatsapp)');
    const countryInput = canvas.getByLabelText('Country');
    const nextButton = canvas.getByText('Next');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(contactNoInput, { target: { value: '+1234567890' } });
    fireEvent.change(countryInput, { target: { value: 'United States' } });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeVisible();
    });

    const categorySelect = canvas.getByLabelText('Category');
    const positionInput = canvas.getByLabelText('Current Position');
    const institutionInput = canvas.getByLabelText('Institution');
    const expertiseInput = canvas.getByLabelText('Areas of Expertise');
    const cvInput = canvas.getByLabelText('CV');
    const bioInput = canvas.getByLabelText('Brief Bio (max. 200 characters)');
    const linkedinInput = canvas.getByLabelText('Linkedin');
    const websiteInput = canvas.getByLabelText('Website');
    const previousButton = canvas.getByText('Previous');

    fireEvent.change(categorySelect, { target: { value: '1' } });
    fireEvent.change(positionInput, { target: { value: 'Founder & CEO' } });
    fireEvent.change(institutionInput, {
      target: { value: 'Institute of Technology' },
    });
    fireEvent.change(expertiseInput, {
      target: { value: 'Software Engineering' },
    });
    fireEvent.change(cvInput, { target: { value: 'CV content' } });
    fireEvent.change(bioInput, {
      target: {
        value:
          'I am a seasoned software engineer with over 15 years of experience in the industry. I founded XYZ Engineering Solutions, a company specializing in innovative software solutions.',
      },
    });
    fireEvent.change(linkedinInput, {
      target: { value: 'https://linkedin.com/in/johndoe' },
    });
    fireEvent.change(websiteInput, {
      target: { value: 'https://xyzengineeringsolutions.com' },
    });

    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Country')).toBeVisible();
    });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText(
          'What was your motivation for joining the program? Has it changed, if yes, how?'
        )
      ).toBeVisible();
    });

    const motivationTextarea = canvas.getByLabelText(
      'What was your motivation for joining the program? Has it changed, if yes, how?'
    );

    fireEvent.change(motivationTextarea, {
      target: {
        value:
          'Seeing mentees succeed and make meaningful contributions to the field inspires me.',
      },
    });

    const previousButtonStep3 = canvas.getByText('Previous');
    fireEvent.click(previousButtonStep3);

    await waitFor(() => {
      expect(screen.getByLabelText('Institution')).toBeVisible();
    });

    fireEvent.click(nextButton);
    const submitButton = canvas.getByText('Submit');
    fireEvent.click(submitButton);
  },
};
