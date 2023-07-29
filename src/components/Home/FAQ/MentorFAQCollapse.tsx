import React from 'react'
import { Collapse, Typography } from 'antd';
import styles from './FAQCollapse.css'
import {mentorFAQs} from "./FAQs";

const { Panel } = Collapse;
const {Text} = Typography;

function MentorFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            <Panel key={1} header={mentorFAQs[0].question}>
                <Text className={styles.antTypography}>{mentorFAQs[0].answer}</Text>
            </Panel>
            <Panel key={2} header="How do I apply to be a mentor?">
                <Text className={styles.antTypography}>
                    Applications for the mentors of the ScholarX program 2023 will open on
                    13th of March 2023 and will close 11th of April 2023. Since the application period is over,
                    you may submit your CV, a headshot, and expression of interest to
                    <a href="mailto: sustainableedufoundation@gmail.com"> sustainableedufoundation@gmail.com</a>
                </Text>
            </Panel>
            <Panel key={3} header={mentorFAQs[1].question}>
                <Text className={styles.antTypography}>{mentorFAQs[1].answer}</Text>
            </Panel>
            <Panel key={4} header={mentorFAQs[2].question}>
                <Text className={styles.antTypography}>{mentorFAQs[2].answer}</Text>
            </Panel>
            <Panel key={5} header={mentorFAQs[3].question}>
                <Text className={styles.antTypography}>{mentorFAQs[3].answer}</Text>
            </Panel>
            <Panel key={6} header={mentorFAQs[4].question}>
                <Text className={styles.antTypography}>{mentorFAQs[4].answer}</Text>
            </Panel>
        </Collapse>
    )
}

export default MentorFAQCollapse;