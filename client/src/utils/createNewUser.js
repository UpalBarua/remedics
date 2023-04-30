import axios from '../api/axios';

const createNewUser = async (newUserData) => {
  if (!newUserData) {
    throw new Error('No newUserData provided to the createNewUser() function.');
  }

  try {
    const { data } = await axios.post('/user', newUserData);
    return data;
  } catch (error) {
    throw new Error(`Failed to create new user: ${error.message}`);
  }
};

export default createNewUser;
