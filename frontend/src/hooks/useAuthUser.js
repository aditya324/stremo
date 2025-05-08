import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAuthUser } from "../../lib/api.js";

const useAuthUser = () => {
    const authUser = useQuery({
      queryKey: ["authUser"],
      queryFn: getAuthUser,
      retry: false,
    });
  
    return {
      isLoading: authUser.isLoading,
      data: authUser.data?.user,  // Access `user` inside `data`
      error: authUser.error,
    };
  };

export default useAuthUser;
