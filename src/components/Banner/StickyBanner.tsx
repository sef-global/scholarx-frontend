import { PropsWithChildren, useState } from 'react';

const StickyBanner = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      tabIndex={-1}
      className={`${
        isVisible ? '' : 'hidden'
      } fixed lg:top-15 start-0 flex justify-between w-full p-2 border-b border-yellow-200 bg-yellow-50`}
    >
      <div className="flex items-center mx-auto">{children}</div>
      <div className="flex items-center">
        <button
          onClick={handleDismiss}
          type="button"
          className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-yellow-400 hover:bg-yellow-200 hover:text-yellow-900 rounded-lg text-sm p-1.5"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StickyBanner;
