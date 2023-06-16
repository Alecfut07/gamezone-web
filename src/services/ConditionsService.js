const ConditionsService = {
  getConditions: async (accessToken) => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/admin/conditions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getConditionById: async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/conditions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewCondition: async (state, accessToken) => {
    const body = {
      state,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/admin/conditions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCondition: async (id, state, accessToken) => {
    const body = {
      state,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/admin/conditions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteCondition: async (id, accessToken) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/admin/conditions/${id}`,
      options
    );
    if (response.ok) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export default ConditionsService;
