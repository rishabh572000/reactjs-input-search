import { useState, useEffect } from 'react';

const useDebounce = (callback, delay) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value) callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const handleChange = (val) => {
    setValue(val);
  };

  return {
    value,
    handleChange,
    setValue,
  };
};

export default useDebounce;
