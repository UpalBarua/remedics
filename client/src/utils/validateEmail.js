const validateEmail = (email) => {
  const validationRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === '') {
    return 'Email is required';
  }

  if (!validationRegex.test(email)) {
    return 'Not a valid email';
  }
};

export default validateEmail;
