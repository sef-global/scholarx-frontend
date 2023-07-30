import React from 'react'
import { Collapse, Typography } from 'antd';
import styles from './FAQCollapse.css'

const { Panel } = Collapse;
const {Paragraph} = Typography;

const FAQCollapse: React.FC = ({ faqs }) => (
  <Collapse className={styles.faqCollapseContainer}>
    {faqs.map((faq, index) => (
      <Panel key={index} header={faq.question}>
        {faq.answer.paragraph.map((paragraphItem, paragraphIndex) => (
          <Paragraph key={paragraphIndex} className={styles.antTypography}>{paragraphItem}</Paragraph>
        ))}
        {faq.answer.list.length > 0 && (
          <ul className={styles.faqAnswer}>
            {faq.answer.list.map((listItem, listIndex) => (
              <li key={listIndex}>{listItem}</li>
            ))}
          </ul>
        )}
      </Panel>
    ))}
  </Collapse>
);
export default FAQCollapse
