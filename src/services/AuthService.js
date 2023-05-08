import axios from "axios";

const AuthService = {
  signIn: async (email, password) => {
    const body = {
      email,
      password,
    };
    try {
      const { headers } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/sign_in`,
        body
      );
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
      const { headers } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/sign_up`,
        body
      );
      return headers.getAuthorization().split(" ").pop();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default AuthService;
