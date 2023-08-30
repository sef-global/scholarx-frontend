import React from 'react';
import { List } from 'antd';
import styles from './AdminNavigation.module.css';

const adminNavigationData = [
  'Manage Mentors',
  'Manage Mentor Applications',
  'Mentee Applications',
  'Ongoing Mentorship Programs',
  'Platform Settings',
  'Manage Users',
  'Emails',
];

const AdminNavigation: React.FC = () => {
  return (
    <div className={styles.antAdminNavigation}>
      <div className={styles.antAdminNavigationSidebar}>
        <List
          className={styles.antAdminNavigationContent}
          size="small"
          dataSource={adminNavigationData}
          renderItem={(item) => (
            <List.Item className={styles.antAdminNavigationItem}>
              {item}
            </List.Item>
          )}
        />
      </div>
      <div className={styles.verticalLine}></div>
    </div>
  );
};

export default AdminNavigation;
