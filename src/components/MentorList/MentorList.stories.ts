import type { Meta, StoryObj } from "@storybook/react";
import { MentorList } from "./MentorList";

const data = [
  {
    name: 'John Doe',
    designation:"SE at Google Inc",
    avatar:"https://xsgames.co/randomusers/avatar.php?g=pixel&key=0"
  },
  {
    name: 'Jane Doe',
    designation:"SE at Google Inc",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
  },
  {
    name: 'Luke Skywalker',
    designation:"SE at Google Inc",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
  },
  {
    name: 'Obiwan Kenobi',
    designation:"SE at Google Inc",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
  },
];

const meta = {
  title: 'Mentor List',
  component: MentorList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
} satisfies Meta<typeof MentorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListWithData: Story = {
  args: {
    data: data
  }
};
export const EmptyList: Story = {};
