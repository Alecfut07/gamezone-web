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
  getProfile: async (access_token) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/me`,
        axiosConfig
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProfile: async (
    access_token,
    first_name,
    last_name,
    email,
    phone,
    birthdate
  ) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const body = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      birthdate: birthdate,
    };
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/me`,
        body,
        axiosConfig
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export { AuthService };
