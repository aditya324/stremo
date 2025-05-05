import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);

  return res.data;
};



export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");

  console.log(res.data.user);

  return res.data;
};

export const completeOnBoarding = async (onBoardingData) => {
  const res = await axiosInstance.post("/auth/onboarding", onBoardingData);
  return res.data;
};


export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);

  return res.data;
};