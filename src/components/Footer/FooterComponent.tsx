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
  <Row justify={'end'} style={{ padding: '4px' }}>
    <Col xs={24} md={24} lg={24} xl={10}>
      <Space direction="vertical">
        <Text className={styles.footerMainTitle}>Let`s Rethink Education!</Text>
        <Text className={styles.footerSecondaryTitle}>
          Get in touch with using any of these platforms.
        </Text>
        <Space direction="horizontal">
          <a
            href="https://twitter.com/goasksef"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#1DA1F2' }}
              icon={<TwitterOutlined className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://www.facebook.com/sustainableeducationfoundation/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#3B5999' }}
              icon={<FacebookFilled className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/sefglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#0077B5' }}
              icon={<LinkedinFilled className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://www.instagram.com/sefglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#E4405F' }}
              icon={<InstagramFilled className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://github.com/sef-global"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#222222' }}
              icon={<GithubOutlined className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UClw7QbeW_FOJz_fDMvjXsJw"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#CD201F' }}
              icon={<YoutubeFilled className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-1h5zt3go4-wnRDDpecbWiTdpDv1VUoVg"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              type="primary"
              style={{ backgroundColor: '#3AAF85' }}
              icon={<SlackOutlined className={styles.antIcon} />}
            />
          </a>
          <a
            href="https://sef.discourse.group/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={styles.antButton}
              style={{ backgroundColor: '#5E72E4' }}
              icon={
                <img
                  src="/discourse-icon.png"
                  alt="discourse-icon"
                  width={15}
                />
              }
            />
          </a>
        </Space>
      </Space>
    </Col>
    <Col xs={24} md={24} lg={24} xl={{ span: 10, offset: 2 }}>
      <Space direction="horizontal" style={{ paddingTop: '15px' }}>
        <a href="https://sefglobal.org/">
          <Text className={styles.antTypography}>Home</Text>
        </a>
        <a href="https://sefglobal.org/index.html#projects">
          <Text className={styles.antTypography}>Projects</Text>
        </a>
        <a href="https://sefglobal.org/team.html">
          <Text className={styles.antTypography}>Team</Text>
        </a>
        <a href="https://sefglobal.medium.com/">
          <Text className={styles.antTypography}>Blog</Text>
        </a>
        <a href="https://sefglobal.org/join-us.html">
          <Text className={styles.antTypography}>Join Us</Text>
        </a>
        <a
          href="https://handbook.sefglobal.org/"
          target="_blank"
          rel="noreferrer"
        >
          <Text className={styles.antTypography}>Handbook</Text>
        </a>
      </Space>
    </Col>
    <Col span={24} style={{ textAlign: 'center', marginTop: '8%' }}>
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
