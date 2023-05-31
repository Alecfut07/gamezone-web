import axios from "axios";

const CategoriesService = {
  getCategories: async (accessToken) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.get("/admin/categories", axiosConfig);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCategoryById: async (id) => {
    try {
      const { data } = await axios.get(`/categories/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getFilterCategories: async (showParents) => {
    try {
      const { data } = await axios.get(
        `/categories?show_parents=${showParents}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createNewCategory: async (name, parentCategoryId, accessToken) => {
    const body = {
      name,
      parent_category_id: parentCategoryId,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post("/admin/categories", body, axiosConfig);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCategory: async (id, name, parentCategoryId, accessToken) => {
    const body = {
      name,
      parent_category_id: parentCategoryId,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/admin/categories/${id}`,
        body,
        axiosConfig
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteCategory: async (id, accessToken) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      await axios.delete(`/admin/categories/${id}`, axiosConfig);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default CategoriesService;
