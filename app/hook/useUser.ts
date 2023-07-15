import { login, me, register } from "@/lib/api";
import User from "@/lib/types/user";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "./userAtom";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useRecoilState<User | null>(userAtom);

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
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
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
    refetch,
    loading,
    error,
    user,
    logout,
  };

  return data;
};

export default useUser;
