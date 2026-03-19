import { getToken } from "./auth";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  console.error("ERROR: NEXT_PUBLIC_API_BASE_URL is not defined!");
  console.warn("Make sure to set NEXT_PUBLIC_API_BASE_URL in your .env.local file (development) or Vercel project settings (production)");
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

console.log("API_BASE configured as:", API_BASE);

export const apiRequest = async (url, options = {}) => {

  const token = getToken()
  const res = await fetch(`${API_BASE}${url}`, {
   headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    ...options,
  });


  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
