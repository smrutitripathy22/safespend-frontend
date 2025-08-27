
import axios from "axios";

const axiosInstanceNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const userRegistration = async (body, fSuccess, fError) => {
  try {
    let res = await axiosInstanceNoAuth.post("auth/register", body);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const userLogin = async (body, fSuccess, fError) => {
  try {
    let res = await axiosInstanceNoAuth.post("/auth/login", body);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
