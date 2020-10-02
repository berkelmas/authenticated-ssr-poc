import axios from "axios";

export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ username, role: "admin" });
    }, 1000);
  });
};

export const mockRegister = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ username, role: "admin" });
    }, 1000);
  });
};
