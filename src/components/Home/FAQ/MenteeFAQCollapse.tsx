import React from 'react'
import { Collapse, Typography } from 'antd';
import styles from './FAQCollapse.css'
import {menteeFAQs} from "./FAQs";

const { Panel } = Collapse;
const {Text} = Typography;

function MenteeFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            <Panel key={1} header="What are the eligibility requirements?">
                <Text className={styles.antTypography}>
                    Our priority is given to applicants of Sri Lankan origin. However, if we have an excess of mentors,
                    will look at expanding the offering to foreign students as well.
                </Text>
                <ul className={styles.faqAnswer}>
                    <li>You must be at least 18 years of age when you register</li>
                    <li>You must currently be a full time or part-time student undertaking an undergraduate or postgraduate course</li>
                    <li>You have not already been accepted as a mentee in ScholarX more than once</li>
                </ul>
            </Panel>
            <Panel key={2} header= "What are the selection criteria?">
                <Text className={styles.antTypography}>
                    The application form consists of a series of questions regarding your field of study, extracurricular experience
                    and interest in the program, designed to allow for the best possible match between mentors and mentees. The application
                    process is competitive so we encourage students to be as thorough as possible in answering the short answer section of the
                    application form.
                </Text>
                <Text className={styles.antTypography}>
                    We require all applicants to demonstrate a high standard of English proficiency and a genuine curiosity to learn and innovate.
                    In their responses, applicants must also show ambition to achieve their career goals and articulately express how the mentoring
                    program will assist with achieving their overall academic and/or professional objectives.
                </Text>
                <Text className={styles.antTypography}>
                    Once selections and assignments are made, mentees will be contacted with further information on how to proceed.
                </Text>
            </Panel>
            {menteeFAQs.map((item, index) => (
                <Panel key={index} header={item.question}>
                    <Text className={styles.antTypography}>{item.answer}</Text>
                </Panel>
            ))}
        </Collapse>
    )
}
export default MenteeFAQCollapse;