import React from "react";
import { Avatar, List} from "antd";

import './mentorList.css';

type Mentor = {
  name: string;
  designation: string;
  avatar: string;
}
interface ListProps {
  data?: Mentor[];
}

export const MentorList = ({ data }: ListProps) => (
  <div>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.name}
            description={item.designation}
          />
        </List.Item>
      )}
    />
  </div>
);
