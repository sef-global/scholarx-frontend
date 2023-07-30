import React from 'react'
import { Collapse, Typography } from 'antd';
import styles from './FAQCollapse.css'
import menteeFAQs from "./MenteeFAQs.json";

const { Panel } = Collapse;
const {Paragraph} = Typography;

function MenteeFAQCollapse() {

    return(
        <Collapse className={styles.faqCollapseContainer}>
            {menteeFAQs.map((menteeFAQ, index) => (
                <Panel key={index} header={menteeFAQ.question}>
                    {menteeFAQ.answer.paragraph.map((paragraphItem, paragraphIndex) => (
                        <Paragraph key={paragraphIndex} className={styles.antTypography}>{paragraphItem}</Paragraph>
                    ))}
                    {menteeFAQ.answer.list.length > 0 && (
                        <ul className={styles.faqAnswer}>
                            {menteeFAQ.answer.list.map((listItem, listIndex) => (
                                <li key={listIndex}>{listItem}</li>
                            ))}
                        </ul>
                    )}
                </Panel>
            ))}
        </Collapse>
    )
}
export default MenteeFAQCollapse;
