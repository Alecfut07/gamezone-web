const ConditionsService = {
  getConditions: async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/conditions`
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
        `${process.env.REACT_APP_BASE_URL}/conditions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewCondition: async (state) => {
    const body = {
      state: state,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/conditions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCondition: async (id, state) => {
    const body = {
      state: state,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/conditions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteCondition: async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/conditions/${id}`,
      options
    );
    if (response.ok) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export { ConditionsService };
