import axios from 'axios';

const encryptText = async (plainText, key) => {
    console.log(plainText, key);
    try {
      const response = await axios.post(`http://localhost:9000/encrypt`, { plainText, key });
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error encrypting text:', error);
    }
  };

const decryptText = async (cipherText, key) => {
    try {
      const response = await axios.post(`http://localhost:8080/decrypt`, { cipherText, key });
      return response.data
    } catch (error) {
      console.error('Error decrypting text:', error);
    }
  }

const guard = { encryptText, decryptText }

export {guard}