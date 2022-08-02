import axiosApiIntances from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: axiosApiIntances.post("auth/register", data),
  };
};

export const change = (data) => {
  return {
    type: "CHANGE",
    payload: axiosApiIntances.post("auth/request-change", data),
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
  };
};
