import { atom } from "recoil";

const userAtom = atom({
  key: "user",
  // get initial state from local storage to enable user to stay logged in
  default:
    localStorage.getItem("user") === null
      ? null
      : JSON.parse(localStorage.getItem("user") ?? ""),
});

export { userAtom };
