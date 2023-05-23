import axios from "axios";

const CategoriesService = {
  getCategories: async () => {
    try {
      const { data } = await axios.get("/admin/categories");
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
  createNewCategory: async (name, parentCategoryId) => {
    const body = {
      name,
      parent_category_id: parentCategoryId,
    };
    try {
      const { data } = await axios.post("/admin/categories", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCategory: async (id, name, parentCategoryId) => {
    const body = {
      name,
      parent_category_id: parentCategoryId,
    };
    try {
      const { data } = await axios.put(`/admin/categories/${id}`, body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteCategory: async (id) => {
    try {
      await axios.delete(`/admin/categories/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default CategoriesService;
