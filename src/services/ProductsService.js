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
  searchProducts: async () => {
    try {
      // const query = new URLSearchParams(useLocation().search)
      // const name = query.get("name");
      const { data } = await axios.get(
        `https://localhost:7269/products/search?q=mario`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewProduct: async (
    image_url,
    name,
    price,
    releaseDate,
    description,
    conditionId,
    editionId
  ) => {
    const body = {
      image_url: image_url,
      name: name,
      price: price,
      release_date: releaseDate.toISOString(),
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
    image_url,
    name,
    price,
    releaseDate,
    description,
    conditionId,
    editionId
  ) => {
    const body = {
      image_url: image_url,
      name: name,
      price: price,
      release_date: releaseDate,
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
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export { ProductsService };
