import axios from "axios";

const ProductsService = {
  getProducts: async () => {
    try {
      const response = await axios.get("/admin/products");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  searchProducts: async (name, category) => {
    try {
      const { data } = await axios.get(
        `/products/search?q=${name}&category=${category}`
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
        "/admin/products/upload",
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
      const { data } = await axios.post("/admin/products", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProduct: async (
    id,
    imageUrl,
    imageKey,
    name,
    releaseDate,
    description,
    productVariants
  ) => {
    const body = {
      image_url: imageUrl,
      image_key: imageKey,
      name,
      release_date: releaseDate.toISOString(),
      description,
      product_variants: productVariants,
    };
    try {
      const { data } = await axios.put(`/admin/products/${id}`, body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    try {
      await axios.delete(`/admin/products/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ProductsService;
