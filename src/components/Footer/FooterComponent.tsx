import React from 'react';

import {
  FacebookFilled,
  GithubOutlined,
  InstagramFilled,
  LinkedinFilled,
  SlackOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

import styles from './FooterComponent.css';

const { Text } = Typography;

const FooterComponent: React.FC = () => (
  <Row>
    <Col span={8}>
      <Space direction="vertical">
        <Text className={styles.footerMainTitle}>Let`s Rethink Education!</Text>
        <Text className={styles.footerSecondaryTitle}>
          Get in touch with using any of these platforms.
        </Text>
        <Space direction="horizontal" size={10}>
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#1DA1F2' }}
            icon={<TwitterOutlined className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#3B5999' }}
            icon={<FacebookFilled className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#0077B5' }}
            icon={<LinkedinFilled className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#E4405F' }}
            icon={<InstagramFilled className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#222222' }}
            icon={<GithubOutlined className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#CD201F' }}
            icon={<YoutubeFilled className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            type="primary"
            style={{ backgroundColor: '#3AAF85' }}
            icon={<SlackOutlined className={styles.antIcon} />}
          />
          <Button
            className={styles.antButton}
            style={{ backgroundColor: '#5E72E4' }}
            icon={
              <img src="/discourse-icon.png" alt="discourse-icon" width={15} />
            }
          />
        </Space>
      </Space>
    </Col>
    <Col span={8} offset={8}>
      <Space direction="horizontal" size={25}>
        <Text className={styles.antTypography}>Home</Text>
        <Text className={styles.antTypography}>Projects</Text>
        <Text className={styles.antTypography}>Team</Text>
        <Text className={styles.antTypography}>Blog</Text>
        <Text className={styles.antTypography}>Join Us</Text>
        <Text className={styles.antTypography}>Handbook</Text>
      </Space>
    </Col>
    <Col span={24} style={{ textAlign: 'center' }}>
      <Text className={styles.footerLink}>
        © 2023
        <a href="https://sefglobal.org/" className={styles.sefLink}>
          {' '}
          Sustainable Education Foundation - SEF.
        </a>
      </Text>
    </Col>
  </Row>
);
export default FooterComponent;
