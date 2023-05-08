import axios from "axios";

const UsersService = {
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
      phone: phone,
      birthdate: birthdate.toISOString(),
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

export { UsersService };
