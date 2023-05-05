import axios from "axios";

const ProductsService = {
  getProducts: async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/products`
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
  searchProducts: async (name) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/search?q=${name}`
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
    releaseDate,
    description,
    product_variants
  ) => {
    const body = {
      image_url: image_url,
      name: name,
      release_date: releaseDate.toISOString(),
      description: description,
      product_variants: product_variants,
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/products`,
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
    releaseDate,
    description,
    product_variants
  ) => {
    const body = {
      image_url: image_url,
      name: name,
      release_date: releaseDate,
      description: description,
      product_variants: product_variants,
    };
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/products/${id}`,
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
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/products/${id}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export { ProductsService };
