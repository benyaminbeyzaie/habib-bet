const BASE_URL = "/api";

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: "POST" | "GET";
  body?: any;
  json?: boolean;
}) => {
  const res = await fetch(BASE_URL + url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // handle your errors
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();
    console.log("data", data);
    return data;
  }
};

export const register = (user: { username: string; password: string }) => {
  console.log(user);
  return fetcher({ url: "/user/signup", method: "POST", body: user });
};

export const login = (user: { username: string; password: string }) => {
  console.log("user", user);
  return fetcher({ url: "/user/login", method: "POST", body: user });
};

export const me = () => {
  return fetcher({ url: "/user/me", method: "GET" });
};

export const ongoing = () => {
  return fetcher({ url: "/contest/ongoing", method: "GET" });
};
