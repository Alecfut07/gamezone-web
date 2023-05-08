import axios from "axios";

const UsersService = {
  getProfile: async (accessToken) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
  updateProfile: async (accessToken, firstName, lastName, phone, birthdate) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const body = {
      first_name: firstName,
      last_name: lastName,
      phone,
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

export default UsersService;
