import { MYAXIOS } from "./Helper";
const Login = async (credentials) => {
  try {
    const response = await MYAXIOS.post("/api/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default Login;
