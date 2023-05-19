import axios from "axios";

const PaymentService = {
  addCustomer: async (email, name, creditCard) => {
    const body = {
      email,
      name,
      creditCard,
    };
    try {
      const { data } = await axios.post("/stripe/customer/add", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addPayment: async (
    customerId,
    receiptEmail,
    description,
    currency,
    amount
  ) => {
    const body = {
      customerId,
      receiptEmail,
      description,
      currency,
      amount,
    };
    try {
      const { data } = await axios.post("/stripe/payment/add", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default PaymentService;
