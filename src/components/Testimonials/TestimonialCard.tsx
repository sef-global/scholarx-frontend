import React from 'react';

const TestimonialCard: React.FC = () => (
  <div className="border border-gray-200 p-4 rounded-md shadow-md w-52">
    <img
      className="w-full h-40 object-cover rounded-md mb-4"
      src="/testimonial-image.png"
      alt="testimonial-image"
    />
    <div className="space-y-2">
      <p className="text-lg font-bold">Adipiscing aliquam scelerisque</p>
      <p className="text-sm">
        Sit tempor in egestas eget risus fames massa. Morbi vitae ante tortor
        lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
      </p>
    </div>
  </div>
);

export default TestimonialCard;
