import React from 'react'
import { Collapse } from 'antd';
import styles from './FAQCollapse.css'
import {mentorFAQs} from "./FAQs";

const { Panel } = Collapse;

function MentorFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            {mentorFAQs.map((item, index) => (
                <Panel key={index} header={item.question}>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                </Panel>
            ))}
        </Collapse>
    )
}

export default MentorFAQCollapse;