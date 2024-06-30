import type React from 'react';
import { useState } from 'react';

interface FAQProps {
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: Answer;
}

export interface Answer {
  paragraph: string[];
  list: string[];
}

const FAQSection: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b">
          <button
            className="w-full text-left py-4 focus:outline-none"
            onClick={() => {
              handleToggle(index);
            }}
          >
            <h3 className="text-lg font-medium">{faq.question}</h3>
          </button>
          {openIndex === index && (
            <div className="p-4">
              {faq.answer.paragraph.map((paragraphItem, paragraphIndex) => (
                <p key={paragraphIndex} className="mb-2">
                  {paragraphItem}
                </p>
              ))}
              {faq.answer.list.length > 0 && (
                <ul className="list-disc pl-5">
                  {faq.answer.list.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
