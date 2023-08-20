import React from 'react';
import { Avatar, Col, Row, Table, Typography } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { type Mentee, type Profile } from '../../types.ts';
import { mentees } from '../../__mocks__/mentees.ts';
import { LinkOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MenteeTableComponent: React.FC = () => {
  const columns: ColumnsType<Mentee> = [
    {
      title: 'Name',
      dataIndex: 'profile',
      render: (profile: Profile) => (
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar size="large" src={profile.image_url} />
          </Col>
          <Col>
            <Title level={5}>
              {`${profile.first_name} ${profile.last_name}`}
            </Title>
            <Text type="secondary">{profile.contact_email}</Text>
          </Col>
          <Col>
            <Title level={3} type="secondary">
              <LinkOutlined size={64} />
            </Title>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'state',
      render: (state: string) => (
        <Text>{state.charAt(0).toUpperCase() + state.substring(1)}</Text>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={mentees} />
    </div>
  );
};

export default MenteeTableComponent;
