import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Typography, Avatar, Card } from 'antd';

import styles from './MentorCard.module.css';
import { type Mentor } from '../../types';

const { Title, Text } = Typography;

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => (
  <Card className={styles.cardContainer}>
    {mentor.profile.image_url !== null ? (
      <Avatar
        src={mentor.profile.image_url}
        size={100}
        className={styles.avatarContainer}
      />
    ) : (
      <Avatar
        icon={<UserOutlined />}
        size={100}
        className={styles.avatarContainer}
      />
    )}
    <div className={styles.avatarContainer}>
      <Title level={5} className={styles.title}>
        {mentor.profile.first_name} {mentor.profile.last_name}
      </Title>
      <Text>{mentor.application.designation}</Text>
      <br />
      <Text type="secondary">{mentor.application.company_or_institution}</Text>
    </div>
  </Card>
);

export default MentorCard;
