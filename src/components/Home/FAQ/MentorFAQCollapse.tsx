import React from 'react'
import { Collapse } from 'antd';
import styles from './FAQCollapse.css'
import {mentorFAQs} from "./FAQs";

const { Panel } = Collapse;

function MentorFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            <Panel key={1} header={mentorFAQs[0].question}>
                <p className={styles.faqAnswer}>{mentorFAQs[0].answer}</p>
            </Panel>
            <Panel key={2} header="How do I apply to be a mentor?">
                <p className={styles.faqAnswer}>
                    Applications for the mentors of the ScholarX program 2023 will open on
                    13th of March 2023 and will close 11th of April 2023. Since the application period is over,
                    you may submit your CV, a headshot, and expression of interest to
                    <a href="mailto: sustainableedufoundation@gmail.com"> sustainableedufoundation@gmail.com</a>
                </p>
            </Panel>
            <Panel key={3} header={mentorFAQs[1].question}>
                <p className={styles.faqAnswer}>{mentorFAQs[1].answer}</p>
            </Panel>
            <Panel key={4} header={mentorFAQs[2].question}>
                <p className={styles.faqAnswer}>{mentorFAQs[2].answer}</p>
            </Panel>
            <Panel key={5} header={mentorFAQs[3].question}>
                <p className={styles.faqAnswer}>{mentorFAQs[3].answer}</p>
            </Panel>
            <Panel key={6} header={mentorFAQs[4].question}>
                <p className={styles.faqAnswer}>{mentorFAQs[4].answer}</p>
            </Panel>
        </Collapse>
    )
}

export default MentorFAQCollapse;