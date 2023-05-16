import axios from "axios";

const CartsService = {
  getCart: async () => {
    try {
      const { data } = await axios.get("/carts");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addItemToCart: async (productId, quantity) => {
    const body = {
      product_id: productId,
      quantity,
    };
    try {
      const { data } = await axios.post("/carts/add", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateQuantity: async (quantity) => {
    const body = {
      quantity,
    };
    try {
      const { data } = await axios.put("/carts/update", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  removeItemInCart: async () => {
    try {
      await axios.delete("/carts/remove");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default CartsService;
