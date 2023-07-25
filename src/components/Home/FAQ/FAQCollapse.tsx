import React from 'react'
import { Collapse } from 'antd';
import styles from './FAQCollapse.css'

const { Panel } = Collapse;

function FAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            <Panel header="What are the eligibility requirements?" key="1">
                <span className={styles.faqAnswer}>Answer 1</span>
            </Panel>
            <Panel header="What are the eligibility requirements?" key="2">
                <span className={styles.faqAnswer}>Answer 1</span>
            </Panel>
            <Panel header="What are the eligibility requirements?" key="2">
                <span className={styles.faqAnswer}>Answer 1</span>
            </Panel>
        </Collapse>
    )
}

export default FAQCollapse;