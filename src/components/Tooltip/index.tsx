import React, { useEffect, useRef, useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  isVisible: boolean;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  isVisible: showTooltipCondition,
  content: tooltipContent,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (showTooltipCondition) {
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && showTooltipCondition && (
        <>
          <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap -top-12 left-[-90%] transform -translate-x-1/2 transition-opacity duration-300 opacity-100 max-w-xs overflow-hidden text-ellipsis">
            {tooltipContent}
          </div>
          <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900 -top-3 left-1/2 transform -translate-x-1/2"></div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
