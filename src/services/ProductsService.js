import axios from "axios";

const ProductsService = {
  getProducts: async (accessToken) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get("/api/admin/products", axiosConfig);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductsByPaging: async (pageNumber, pageSize) => {
    try {
      const { data, headers } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return { data, pagination: JSON.parse(headers["x-pagination"]) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductsByCollection: async () => {
    try {
      const { data } = await axios.get("/api/products/collections");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  searchProducts: async (name, category, pageNumber, pageSize) => {
    try {
      const params = { q: name, pageNumber, pageSize };

      if (category) {
        params.category = category;
      }
      const { data, headers } = await axios.get("/api/products/search", {
        params,
      });
      return { data, pagination: JSON.parse(headers["x-pagination"]) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  uploadImage: async (image, accessToken) => {
    const formData = new FormData();
    formData.append("image", image);

    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/admin/products/upload",
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
    productVariants,
    accessToken
  ) => {
    const body = {
      image_key: imageKey,
      name,
      release_date: releaseDate.toISOString(),
      description,
      product_variants: productVariants,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/admin/products",
        body,
        axiosConfig
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
    imageKey,
    name,
    releaseDate,
    description,
    productVariants,
    accessToken
  ) => {
    const body = {
      image_url: imageUrl,
      image_key: imageKey,
      name,
      release_date: releaseDate.toISOString(),
      description,
      product_variants: productVariants,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/admin/products/${id}`,
        body,
        axiosConfig
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteProduct: async (id, accessToken) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      await axios.delete(`/api/admin/products/${id}`, axiosConfig);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ProductsService;
