import React, { useState } from 'react';
import {
  Avatar,
  Col,
  Row,
  Table,
  type TablePaginationConfig,
  Typography,
  Input,
  Radio,
  type RadioChangeEvent,
  Button,
} from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { type Mentee, type Profile } from '../../types.ts';
import { LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MenteeTableProps {
  mentees: Mentee[];
}

const MenteeTableComponent: React.FC<MenteeTableProps> = ({
  mentees,
}: MenteeTableProps) => {
  const [paginationConfigs, setPaginationConfigs] =
    useState<TablePaginationConfig>({
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      total: mentees.length,
    });
  const [selectedFilterType, setSelectedFilterType] = useState<
    'All' | 'Approved' | 'Rejected'
  >('All');

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
            <Text strong>{`${profile.first_name} ${profile.last_name}`}</Text>
            <br />
            <Text type="secondary">{profile.contact_email}</Text>
          </Col>
          <Col>
            <Button
              type="text"
              onClick={() => {
                void navigator.clipboard.writeText(profile.contact_email);
              }}
            >
              <LinkOutlined />
            </Button>
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

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPaginationConfigs(pagination);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio.Group
        options={[
          { label: `All (${mentees.length})`, value: 'All' },
          { label: 'Approved (0)', value: 'Approved' },
          { label: 'Rejected (0)', value: 'Rejected' },
        ]}
        value={selectedFilterType}
        optionType="button"
        onChange={({ target }: RadioChangeEvent) => {
          setSelectedFilterType(target.value);
        }}
      />
      <Input.Search
        placeholder="Type the keyword here to search"
        onSearch={(value: string) => {
          console.log(value);
        }}
        style={{ width: 500 }}
        enterButton
        allowClear
      />
      <Table
        columns={columns}
        dataSource={mentees}
        pagination={paginationConfigs}
        rowSelection={{ type: 'checkbox' }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default MenteeTableComponent;
