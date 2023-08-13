import React from 'react';

import { Row, Col } from 'antd';

import { type Mentor } from '../../types';
import MentorCard from '../MentorCard/MentorCard.component';

interface ListProps {
  mentors?: Mentor[];
}

export const MentorList: React.FC<ListProps> = ({ mentors }: ListProps) => (
  <Row gutter={[16, 16]}>
    {mentors?.map((mentor) => (
      <Col key={mentor.mentor_id} xs={24} sm={12} md={8} lg={6}>
        <MentorCard mentor={mentor} />
      </Col>
    ))}
  </Row>
);
