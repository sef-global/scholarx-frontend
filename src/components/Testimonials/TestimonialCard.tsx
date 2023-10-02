import React from 'react';

const TestimonialCard: React.FC = () => (
  <div className="flex flex-col border w-60 rounded-lg p-3">
    <img src="/testimonial-image.png" alt="testimonial-image" />
    <div className="mt-3">
      <p className="text-sm font-bold text-center">
        Adipiscing aliquam scelerisque
      </p>
      <p className="text-xs font-light text-justify">
        Sit tempor in egestas eget risus fames massa. Morbi vitae ante tortor
        lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
      </p>
    </div>
  </div>
);
export default TestimonialCard;
