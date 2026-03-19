export const saveToken = (token) => {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/`;
};




export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
};






export const getUserFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.userId,
      role: payload.role,
      username: payload.username,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};


// previously i do not have this utility function to get user info from token, but i added it to make it easier to access user info in components without having to decode the token every time. It decodes the JWT token and extracts userId, role and username from the payload. This is just a helper function for convenience.brfore it i am, doing same in 3 files now i have common one and i can just import it and use it.