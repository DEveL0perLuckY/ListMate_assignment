import {MYAXIOS} from './Helper';

const verifyToken = async token => {
  try {
    console.log('token is here and ' + token);
    const response = await MYAXIOS.get('/api/isTokenValid', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("respone of the token is "+response.data)
    return response.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

export default verifyToken;
