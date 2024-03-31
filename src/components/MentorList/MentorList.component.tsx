import React from 'react';
import MentorCard from '../MentorCard/MentorCard.component';
import { type Mentor } from '../../types.ts';

interface ListProps {
  mentors?: Mentor[];
}

export const MentorList: React.FC<ListProps> = ({ mentors }: ListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {mentors?.map((mentor) => (
      <div key={mentor.uuid} className="w-full">
        <MentorCard mentor={mentor} />
      </div>
    ))}
  </div>
);
