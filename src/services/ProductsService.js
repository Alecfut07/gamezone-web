const ProductsService = {
  getProducts: async () => {
    try {
      const response = await fetch("https://localhost:7269/products");
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductById: async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `https://localhost:7269/products/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewProduct: async (
    name,
    price,
    releaseDate,
    description,
    conditionId,
    editionId
  ) => {
    const body = {
      name: name,
      price: price,
      releaseDate: releaseDate.toISOString(),
      description: description,
      condition_id: conditionId,
      edition_id: editionId,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch("https://localhost:7269/products", options);
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProduct: async (
    id,
    name,
    price,
    releaseDate,
    description,
    conditionId,
    editionId
  ) => {
    const body = {
      name: name,
      price: price,
      releaseDate: releaseDate,
      description: description,
      condition_id: conditionId,
      edition_id: editionId,
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
        `https://localhost:7269/products/${id}`,
        options
      );
      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://localhost:7269/products/${id}`,
      options
    );
    if (response.ok) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export { ProductsService };