import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginValues } from "../types/index";
const apiUrl = process.env.REACT_APP_API_URL;
const token = {
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("token") || process.env.REACT_APP_API_SECRET
    }`,
  },
};

export const useLogin = () =>
  useMutation({
    mutationFn: async ({ username, password }: LoginValues) => {
      const res = await axios.post(
        `${apiUrl}/login`,
        { username: username.value, password: password.value },
        token
      );
      return res.data;
    },
  });
