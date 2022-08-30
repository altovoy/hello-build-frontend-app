import axios from "axios";

const baseUri = process.env.REACT_APP_MAIN_API_URI;

const authUri = `${baseUri}/auth`;

export const login = async ({ userName, password }) =>
  axios.post(`${authUri}/login`, {
    user: {
      userName,
      password,
    },
  });

export const signup = ({ userName, password }) =>
  axios.post(`${authUri}/signup`, {
    user: {
      userName,
      password,
    },
  });

export const logout = async () => {
  return true;
};
