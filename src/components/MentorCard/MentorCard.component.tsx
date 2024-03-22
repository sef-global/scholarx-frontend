import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { type Mentor } from '../../types.ts';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => (
  <div className="border border-gray-200 p-4 rounded-md shadow-md w-52">
    {mentor.profile.image_url !== null ? (
      <img
        src={mentor.profile.image_url}
        alt="Mentor Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
    ) : (
      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
        <UserOutlined className="text-gray-400 text-2xl" />
      </div>
    )}
    <div className="text-center">
      <h5 className="text-lg font-bold">
        {mentor.profile.first_name} {mentor.profile.last_name}
      </h5>
      <p className="text-sm">{mentor.application.position}</p>
      <p className="text-xs text-gray-500">{mentor.application.institution}</p>
    </div>
  </div>
);

export default MentorCard;
