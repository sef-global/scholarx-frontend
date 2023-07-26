import React from 'react'
import { Collapse } from 'antd';
import styles from './FAQCollapse.css'
import {menteeFAQs} from "./FAQs";

const { Panel } = Collapse;

function MenteeFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            {menteeFAQs.map((item, index) => (
                <Panel key={index} header={item.question}>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                </Panel>
            ))}
        </Collapse>
    )
}

export default MenteeFAQCollapse;