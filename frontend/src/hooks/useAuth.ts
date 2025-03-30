import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  LoginService,
  UsersService,
  type Body_login_access_token_login_access_token_post as LoginData,
  type ApiError,
} from "../client";

// Function to get token from local storage
const getToken = () => localStorage.getItem("access_token");

// Function to check if the user is logged in
export const isLoggedIn = () => Boolean(getToken());

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState<string | null>(null);

  // Fetch current user only if logged in
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUsersMeUsersMeGet,
    enabled: isLoggedIn(),
  });

  // Login function
  const login = async (data: LoginData) => {
    try {
      const response = await LoginService.loginAccessTokenLoginAccessTokenPost({
        formData: data,
      });
      localStorage.setItem("access_token", response.access_token);
    } catch (err) {
      setLoginError("Invalid email or password");
      throw err;
    }
  };

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/admin" });
    },
    onError: (err: ApiError) => {
      console.error("Login failed:", err);
    },
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    navigate({ to: "/login" });
  };

  return {
    user,
    loginMutation,
    logout,
    loginError,
    resetError: () => setLoginError(null),
  };
};

export default useAuth;
