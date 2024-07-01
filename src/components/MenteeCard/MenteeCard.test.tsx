import { render, screen } from '@testing-library/react';
import MenteeCard from './index';
import { mentees } from '../../__mocks__/mentees';
import { BrowserRouter } from 'react-router-dom';

describe('MenteeCard', () => {
  test('should render the correct details', () => {
    const mentee = mentees[0];
    render(
      <BrowserRouter>
        <MenteeCard mentee={mentee} />
      </BrowserRouter>
    );
    const name = `${mentee.application.firstName} ${mentee.application.lastName}`;
    expect(screen.getByText(name)).toBeInTheDocument();
    if (mentee.application.isUndergrad) {
      expect(
        screen.getByText(mentee.application.university as string)
      ).toBeInTheDocument();
    } else {
      expect(
        screen.getByText(mentee.application.company as string)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mentee.application.position as string)
      ).toBeInTheDocument();
    }
  });
});
