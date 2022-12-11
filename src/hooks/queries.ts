import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useTeams = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ["teams", id, enabled],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/teams/${id}`, token);
      return res.data;
    },
    enabled: enabled,
    placeholderData: [],
  });

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/events`, token);
      return res.data;
    },
  });
export const useEvent = (type: string, id: number, enabled: boolean = true) =>
  useQuery({
    queryKey: ["event", type, id],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/event/${type}/${id}`, token);
      return res.data;
    },
    enabled: enabled,
  });
export const useBierpong = () =>
  useQuery({
    queryKey: ["bierpong"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/bierpong`, token);
      return res.data;
    },
  });
