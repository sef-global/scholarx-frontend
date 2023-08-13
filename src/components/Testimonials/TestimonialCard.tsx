import React from 'react';

import { Card, Space, Typography } from 'antd';

import styles from './TestimonialCard.module.css';

const { Text } = Typography;

const TestimonialCard: React.FC = () => (
  <Card className={styles.testimonialCardContainer}>
    <img
      className={styles.testimonialCardImage}
      src="/testimonial-image.png"
      alt="testimonial-image"
    />
    <Space direction={'vertical'}>
      <Text className={styles.testimonialCardTitle}>
        Adipiscing aliquam scelerisque
      </Text>
      <Text className={styles.testimonialCardContent}>
        Sit tempor in egestas eget risus fames massa. Morbi vitae ante tortor
        lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
      </Text>
    </Space>
  </Card>
);
export default TestimonialCard;
