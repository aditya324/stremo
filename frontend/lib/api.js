import toast from "react-hot-toast";
import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);

  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");

    return res.data;
  } catch (error) {
    console.log("error,", error);
    return null;
  }
};

export const completeOnBoarding = async (onBoardingData) => {
  const res = await axiosInstance.post("/auth/onboarding", onBoardingData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);

  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");

  return res.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  console.log(userId, "recepiant id");
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return response.data;
}

export async function getStreamToken() {

  console.log("getting stream token");
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}