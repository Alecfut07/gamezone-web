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
  uploadImage: async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/products/upload`,
        formData,
        axiosConfig
      );
      return data.image_key;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewProduct: async (
    imageKey,
    name,
    releaseDate,
    description,
    productVariants
  ) => {
    const body = {
      image_key: imageKey,
      name,
      release_date: releaseDate.toISOString(),
      description,
      product_variants: productVariants,
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
    imageUrl,
    name,
    releaseDate,
    description,
    productVariants
  ) => {
    const body = {
      image_url: imageUrl,
      name,
      release_date: releaseDate,
      description,
      product_variants: productVariants,
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

export default ProductsService;
