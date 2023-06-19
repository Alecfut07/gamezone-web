const EditionsService = {
  getEditions: async (accessToken) => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/editions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getEditionById: async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/editions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewEdition: async (state, accessToken) => {
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
        `${process.env.REACT_APP_BASE_URL}/admin/editions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateEdition: async (id, state, accessToken) => {
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
        `${process.env.REACT_APP_BASE_URL}/admin/editions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEdition: async (id, accessToken) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/editions/${id}`,
      options
    );
    if (response.ok) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export default EditionsService;
