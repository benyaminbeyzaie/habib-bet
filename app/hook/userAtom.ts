"use client";
import User from "@/lib/types/user";
import { atom } from "recoil";
const cachedUser = localStorage.getItem("user");
const userAtom = atom<User | null>({
  key: "user",
  // get initial state from local storage to enable user to stay logged in
  default: cachedUser && cachedUser !== "" ? JSON.parse(cachedUser) : null,
});

export { userAtom };
