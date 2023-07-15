"use client";
import User from "@/lib/types/user";
import { atom } from "recoil";

const userAtom = atom<User | null>({
  key: "user",
  // get initial state from local storage to enable user to stay logged in
  default: null,
});

export { userAtom };
