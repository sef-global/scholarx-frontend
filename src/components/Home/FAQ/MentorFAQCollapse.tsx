import React from 'react'
import { Collapse, Typography } from 'antd';
import styles from './FAQCollapse.css'
import mentorFAQs from "./MentorFAQs.json";

const { Panel } = Collapse;
const {Paragraph} = Typography;

function MentorFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            {mentorFAQs.map((mentorFAQ, index) => (
                <Panel key={index} header={mentorFAQ.question}>
                    {mentorFAQ.answer.paragraph.map((paragraphItem, paragraphIndex) => (
                      <Paragraph key={paragraphIndex} className={styles.antTypography}>{paragraphItem}</Paragraph>
                    ))}
                    {mentorFAQ.answer.list.length > 0 && (
                        <ul className={styles.faqAnswer}>
                            {mentorFAQ.answer.list.map((listItem, listIndex) => (
                                <li key={listIndex}>{listItem}</li>
                            ))}
                        </ul>
                    )}
                </Panel>
            ))}
        </Collapse>
    )
}
export default MentorFAQCollapse;
