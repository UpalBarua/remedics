const validateName = name => {
  const validationRegex = /^[a-z ,.'-]+$/i;

  if (name === '') {
    return 'Name is required';
  }

  if (!validationRegex.test(name)) {
    return 'Not a valid name';
  }
};

export default validateName;
