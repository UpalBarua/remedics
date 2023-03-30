import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useFormValidation = validateFn => {
  const [inputValue, setInputValue] = useState('');
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value.trim());
  };

  const handleInputTouched = () => {
    setIsInputTouched(true);
  };

  useEffect(() => {
    if (isInputTouched) {
      setInputError(validateFn(inputValue));
    }
  }, [inputValue, isInputTouched]);

  return {
    inputValue,
    inputError,
    handleInputChange,
    handleInputTouched,
  };
};

export default useFormValidation;
