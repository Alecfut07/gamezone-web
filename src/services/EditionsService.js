const EditionsService = {
  getEditions: async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/editions`
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
  createNewEdition: async (state) => {
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
        `${process.env.REACT_APP_BASE_URL}/editions`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateEdition: async (id, state) => {
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
        `${process.env.REACT_APP_BASE_URL}/editions/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEdition: async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/editions/${id}`,
      options
    );
    if (response.ok) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export { EditionsService };
