import { MYAXIOS } from "./Helper";
const Signup = async (credentials) => {
  try {
    const response = await MYAXIOS.post("/api/register", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default Signup;