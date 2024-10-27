import { MYAXIOS } from "./Helper";
const Profile = async (token) => {
  try {
    const response = await MYAXIOS.get("/api/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default Profile;
