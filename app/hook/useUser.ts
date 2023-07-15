import { login, me, register } from "@/lib/api";
import User from "@/lib/types/user";
import { useEffect, useState } from "react";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    savedUser ? JSON.parse(savedUser) : null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginUser = async (loginRequest: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const user = await login(loginRequest);
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (registerRequest: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const user = await register(registerRequest);
      console.log("register res: " + user);
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const profile = async () => {
    try {
      setLoading(true);
      const user = await me();
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    document.cookie = "";
    setUser(null);
    setLoading(false);
    setError(null);
  };

  const data = {
    loginUser,
    registerUser,
    profile,
    loading,
    error,
    user,
    logout,
  };

  return data;
};

export default useUser;
