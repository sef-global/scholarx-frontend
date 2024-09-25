import React, { useState, KeyboardEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  maxTags: number;
  register: UseFormRegister<any>;
  onValidationError?: (error: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  maxTags = 5,
  register,
  onValidationError,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [tagLimitReached, setTagLimitReached] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        if (tags.length < maxTags) {
          setTags([...tags, inputValue.trim()]);
          setInputValue('');
          if (onValidationError) onValidationError('');
        } else {
          setTagLimitReached(true);
          if (onValidationError)
            onValidationError(`You can only add up to ${maxTags} tags.`);
        }
      } else if (tags.includes(inputValue.trim())) {
        if (onValidationError)
          onValidationError('Duplicate tags are not allowed.');
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setTagLimitReached(false);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={
              ' px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mr-1 mb-1 flex items-center'
            }
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                handleRemoveTag(index);
              }}
              className="ml-1 text-red-500 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {tags.length < maxTags && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Enter a topic and press Enter"
          {...register}
        />
      )}

      {tagLimitReached && (
        <p className="text-red-500 text-xs mt-1">
          You can only add up to {maxTags} topics.
        </p>
      )}

      <input type="hidden" {...register('tags')} value={tags.join(',')} />
    </div>
  );
};

export default TagInput;
