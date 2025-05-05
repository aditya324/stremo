import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Notifications from "./pages/Notifications.jsx";
import CallPage from "./pages/CallPage.jsx";
import Chat from "./pages/Chat.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "../lib/api.js";
import useAuthUSer from "./hooks/useAuthUSer.js";

const App = () => {
  const { isLoading, data: authUser, error } = useAuthUSer();

  console.log(authUser, "user");

  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />;
  }

  console.log(error);

  return (
    <div className="h-screen text-white" data-theme="night">
      <Routes>
        hi
        <Route
          path="/"
          element={
            isAuthenticated && isOnBoarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={
            isAuthenticated ? <Notifications /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnBoarded ? (
                <OnBoardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
