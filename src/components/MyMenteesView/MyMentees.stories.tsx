import type { Meta, StoryObj } from "@storybook/react";
import MyMentees from './MyMentees.component';

const meta: Meta<typeof MyMentees> = {
    component: MyMentees,
    title: 'MyMentees',
    // You can provide some sample data for testing purposes
    args: {
        menteeApplications: [
            {
                id: 1,
                name: 'John Doe',
                university: 'Example University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Computer Science',
                year: '2nd Year',
                linkedin: 'https://www.linkedin.com/johndoe',
                resumeUrl: 'https://example.com/johndoe_resume.pdf',
                website: 'https://johndoe.com',
                intention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                reasonForChoice: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                Lorem1: 'for John Doe',
                Lorem2: 'for John Doe'
            },
            {
                id: 2,
                name: 'Jane Smith',
                university: 'Another University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Electrical Engineering',
                year: '3rd Year',
                linkedin: 'https://www.linkedin.com/janesmith',
                resumeUrl: 'https://example.com/janesmith_resume.pdf',
                website: 'https://janesmith.com',
                intention: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
                reasonForChoice: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.',
                Lorem1: 'for Jane Smith',
                Lorem2: 'for Jane Smith'
            },
            {
                id: 3,
                name: 'Kelly Shaun',
                university: 'Far University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Mechanical Engineering',
                year: '4th Year',
                linkedin: 'https://www.linkedin.com/kellyshaun',
                resumeUrl: 'https://example.com/kellyshaun_resume.pdf',
                website: 'https://kellyshaun.com',
                intention: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
                reasonForChoice: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
                Lorem1: 'for Kelly Shaun',
                Lorem2: 'for Kelly Shaun'
            },
            {
                id: 4,
                name: 'Roger Taylor',
                university: 'Far Away University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Civil Engineering',
                year: '3rd Year',
                linkedin: 'https://www.linkedin.com/rogertaylor',
                resumeUrl: 'https://example.com/rogertaylor_resume.pdf',
                website: 'https://rogertaylor.com',
                intention: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
                reasonForChoice: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
                Lorem1: 'for Roger Taylor',
                Lorem2: 'for Roger Taylor'
            },
            {
                id: 5,
                name: 'Brian May',
                university: 'Far Far Away University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Chemical Engineering',
                year: '4th Year',
                linkedin: 'https://www.linkedin.com/brianmay',
                resumeUrl: 'https://example.com/brianmay_resume.pdf',
                website: 'https://brianmay.com',
                intention: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
                reasonForChoice: 'Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
                Lorem1: 'for Brian May',
                Lorem2: 'for Brian May'
            },
            {
                id: 6,
                name: 'Freddie Mercury',
                university: 'Private University',
                profilePicture: 'https://example.com/profile.jpg',
                course: 'Aerospace Engineering',
                year: '3rd Year',
                linkedin: 'https://www.linkedin.com/freddiemercury',
                resumeUrl: 'https://example.com/freddiemercury_resume.pdf',
                website: 'https://freddiemercury.com',
                intention: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                reasonForChoice: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                Lorem1: 'for Freddie Mercury',
                Lorem2: 'for Freddie Mercury'
            },
            // Add more sample applicants as needed
        ]
    }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {}
}
