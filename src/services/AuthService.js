import axios from "axios";

const AuthService = {
  signIn: async (email, password) => {
    const body = {
      email,
      password,
    };
    try {
      const { headers } = await axios.post("/api/users/sign_in", body);
      return headers.getAuthorization().split(" ").pop();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  signUp: async (email, password) => {
    const body = {
      email,
      password,
    };
    try {
      const { headers } = await axios.post("/api/users/sign_up", body);
      return headers.getAuthorization().split(" ").pop();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  signOut: async () => {
    await axios.post("/api/users/sign_out", null, {
      headers: { Authorization: localStorage.getItem("access_token") },
    });
  },
};

export default AuthService;
