import React from 'react';

const Spinner: React.FC = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-500 border-t-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);
export default Spinner;
