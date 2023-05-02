import axios from "axios";

const ProductsService = {
  getProducts: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`
      );
      return data;
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
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products`,
        body
      );
      return data;
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
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        body
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/products/${id}`
    );
    if (data === null) {
      return null;
    }
    throw Error("Something went wrong");
  },
};

export { ProductsService };
