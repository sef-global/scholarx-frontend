import React from 'react';

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

const FAQCollapse: React.FC<FAQProps> = ({ faqs }) => (
  <div className="flex flex-col gap-4 w-1/2">
    {faqs.map((faq, index) => (
      <details
        className="group [&_summary::-webkit-details-marker]:hidden border rounded-lg"
        key={index}
      >
        <summary className="flex cursor-pointer items-center gap-1.5 rounded-lg p-3">
          <svg
            className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <h2 className="font-medium">{faq.question}</h2>
        </summary>

        <p className="mb-4 px-4 leading-relaxed text-gray-700">
          {faq.answer.paragraph.map((paragraphItem, paragraphIndex) => (
            <div key={paragraphIndex} className="text-sm">
              {paragraphItem}
            </div>
          ))}
          {faq.answer.list.length > 0 && (
            <ul className="text-sm">
              {faq.answer.list.map((listItem, listIndex) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          )}
        </p>
      </details>
    ))}
  </div>
);
export default FAQCollapse;
