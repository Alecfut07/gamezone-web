import axios from "axios";

const OrdersService = {
  submitOrder: async (
    customer,
    address,
    payment,
    orderDetails,
    accessToken
  ) => {
    const body = {
      customer,
      address,
      payment,
      order_details: orderDetails,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post("/api/orders", body, axiosConfig);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default OrdersService;
