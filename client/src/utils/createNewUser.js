import axios from 'axios';

const createNewUser = async (newUserData) => {
  try {
    const res = await axios.post('http://localhost:3000/user/', newUserData);

    return res.data;
  } catch (error) {
    throw new Error(`Failed to create new user: ${error.message}`);
  }
};

export default createNewUser;
