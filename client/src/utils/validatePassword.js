const validatePassword = password => {
  if (password === '') {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
};

export default validatePassword;
