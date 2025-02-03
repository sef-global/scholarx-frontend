import { PropsWithChildren, useState } from 'react';

const StickyBanner = ({ children }: PropsWithChildren) => {
  const [isVisible] = useState(true);

  return (
    <div
      tabIndex={-1}
      className={`${
        isVisible ? '' : 'hidden'
      } fixed lg:top-15 start-0 flex justify-between w-full p-2 bg-yellow-50`}
    >
      <div className="flex items-center mx-auto">{children}</div>
    </div>
  );
};

export default StickyBanner;
