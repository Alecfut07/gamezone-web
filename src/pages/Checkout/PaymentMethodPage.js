import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

import { AuthContext, PurchaseContext, CartContext } from "../../context";
import CartsService from "../../services/CartsService";
import PaymentService from "../../services/PaymentService";
import UsersService from "../../services/UsersService";

import "./PaymentMethodPage.css";
import OrdersService from "../../services/OrdersService";

function PaymentMethodPage() {
  const accessToken = localStorage.getItem("access_token");

  const [validatedFormFlag, setValidatedFormFlag] = useState(false);
  const [hasErrors, setHasError] = useState(false);

  const [customer, setCustomer] = useState({
    email: "",
    name: "",
    credit_card: {},
  });

  const [address, setAddress] = useState({
    line_1: "",
    line_2: null,
    zip_code: "",
    state: "",
    city: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    receipt_email: "",
    description: "Videogames",
    currency: "USD",
  });

  // const [orderDetails, setOrderDetails] = useState({
  //   price: 0,
  //   subtotal: 0,
  //   quantity: 0,
  //   product_id: 0,
  // });
  // const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  // const [paymentMethods, setPaymentMethods] = useState([]);
  // const [cardNumber, setCardNumber] = useState("");
  const [cardNumberFormat, setCardNumberFormat] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [securityCode, setSecurityCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [tax, setTax] = useState(0);

  // const [loggedInUser, setLoggedInUser] = useState();
  const { isLoggedIn, setLoggedIn, setLoggedInUser } = useContext(AuthContext);
  const { setPurchaseCompleted } = useContext(PurchaseContext);
  const { setCartTotal, subtotal } = useContext(CartContext);
  // const [grandTotal, setGrandTotal] = useState();

  // const [email, setEmail] = useState(isLoggedIn ? loggedInUser.email : "");
  const [email, setEmail] = useState("");
  // console.log(email);
  // console.log(loggedInUser);

  const navigateToSuccessfulPurchase = useNavigate();

  const onEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    customer.email = inputEmail;
    setCustomer(customer);
    payment.receipt_email = inputEmail;
    setPayment(payment);
  };

  const onCardNumberChange = (e) => {
    const inputCardNumber = e.target.value
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);

    const cardNumberParts = [];
    for (let i = 0; i < inputCardNumber.length; i += 4) {
      cardNumberParts.push(inputCardNumber.substr(i, 4));
    }
    // setCardNumber(cardNumberParts.join(""));
    const formatedCardNumber =
      cardNumberParts.length > 1 ? cardNumberParts.join("-") : inputCardNumber;
    setCardNumberFormat(formatedCardNumber);

    customer.credit_card.card_number = formatedCardNumber;
    setCustomer(customer);
  };

  const onDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const onExpirationDateChange = (date) => {
    setExpirationDate(date);
    customer.credit_card.expiration_year = date
      .getFullYear()
      .toString()
      .slice(-2);
    setCustomer(customer);
    customer.credit_card.expiration_month = (date.getMonth() + 1).toString();
    setCustomer(customer);
  };

  const onSecurityCodeChange = (e) => {
    const inputSecurityCode = e.target.value.replace(
      /[A-Za-z*|":<>[\]{}`\\()';!#%^ˆ~˜_+?,./=\-\s@&$]/gi,
      ""
    );
    setSecurityCode(inputSecurityCode);
    customer.credit_card.cvc = inputSecurityCode;
    setCustomer(customer);
  };

  const onFullNameChange = (e) => {
    const inputFullName = e.target.value;
    setFullName(inputFullName);
    customer.name = inputFullName;
    setCustomer(customer);
    customer.credit_card.name = inputFullName;
    setCustomer(customer);
  };

  const onLine1Change = (e) => {
    const inputLine1 = e.target.value;
    setLine1(inputLine1);
    address.line_1 = inputLine1;
    setAddress(address);
  };

  const onLine2Change = (e) => {
    const inputLine2 = e.target.value;
    setLine2(inputLine2);
    address.line_2 = inputLine2;
    setAddress(address);
  };

  const onZipCodeChange = (e) => {
    const inputZipCode = e.target.value.replace(
      /[A-Za-z*|":<>[\]{}`\\()';!#%^~_+?,./=\-\s@&$]/gi,
      ""
    );
    setZipCode(inputZipCode);
    address.zip_code = inputZipCode;
    setAddress(address);
  };

  const onStateChange = (e) => {
    const stateInput = e.target.value;
    setState(stateInput);
    address.state = stateInput;
    setAddress(address);
  };

  const onCityChange = (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);
    address.city = inputCity;
    setAddress(address);
  };

  const onCountryChange = (e) => {
    const inputCountry = e.target.value;
    setCountry(inputCountry);
    address.country = inputCountry;
    setAddress(address);
  };

  const onBlurForm = async () => {
    try {
      const result = await PaymentService.calculateTax(
        line1,
        line2,
        zipCode,
        state,
        city,
        country
      );
      setTax(result.tax_amount);
    } catch (error) {
      console.log(error);
    }
  };

  // const calculateGrandTotal = (_subtotal, _tax) => {
  //   const value = `${_subtotal + _tax}`;
  //   const formatLongValue = value.split(".").join("");
  //   setGrandTotal(parseInt(formatLongValue, 10));
  //   return grandTotal;
  // };

  const submitOrder = async () => {
    try {
      await OrdersService.submitOrder(
        customer,
        address,
        payment,
        orderDetails,
        accessToken
      );
      setHasError(false);
      await CartsService.removeAllItemsInCart();
      setCartTotal(0);
      setPurchaseCompleted(true);
      navigateToSuccessfulPurchase("/success");
    } catch (error) {
      setHasError(true);
    }
  };

  // const addCustomerAndPayment = async () => {
  //   try {
  //     await PaymentService.addCustomer(loggedInUser.email, fullName, {
  //       name: fullName,
  //       cardNumber,
  //       expirationYear: expirationDate.getFullYear().toString(),
  //       expirationMonth: (expirationDate.getMonth() + 1).toString(),
  //       cvc: securityCode,
  //     })
  //       .then((responseCustomer) => responseCustomer)
  //       .then(async (customer) => {
  //         await PaymentService.addPayment(
  //           customer.customerId,
  //           loggedInUser.email,
  //           "VideoGames",
  //           "USD",
  //           calculateGrandTotal(subtotal, tax)
  //         );
  //       })
  //       .then((responsePayment) => responsePayment);
  //     setHasError(false);
  //     await CartsService.removeAllItemsInCart();
  //     setCartTotal(0);
  //     setPurchaseCompleted(true);
  //     navigateToSuccessfulPurchase("/success");
  //   } catch (error) {
  //     setHasError(true);
  //   }
  // };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      submitOrder();
      // addCustomerAndPayment();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidatedFormFlag(true);
  };

  const getProfile = async () => {
    // const accessToken = localStorage.getItem("access_token");
    try {
      if (accessToken !== null) {
        const user = await UsersService.getProfile(accessToken);
        setLoggedInUser(user);
        setLoggedIn(true);
        setEmail(user.email);
        customer.email = user.email;
        setCustomer(customer);
        payment.receipt_email = user.email;
        setPayment(payment);
      }
    } catch (error) {
      setLoggedIn(false);
      setEmail("");
    }
  };

  const getCart = async () => {
    try {
      const results = await CartsService.getCart();
      // setCart(results.products);
      const order = results.products.map((item) => ({
        price: item.price,
        subtotal: item.price * item.quantity,
        quantity: item.quantity,
        product_id: item.productId,
      }));
      setOrderDetails(order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getProfile();
    getCart();
  }, [isLoggedIn]);

  return (
    <Container className="mt-3">
      <Row>
        <h3>Payment method</h3>
      </Row>
      <Row>
        <Col lg={9}>
          <div className="payment-method-form">
            <h3>Card Information</h3>
            <Form
              noValidate
              validated={validatedFormFlag}
              onSubmit={handleSubmit}
            >
              <Row>
                <Form.Group className="mb-4" controlId="emailValidation">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={onEmailChange}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="cardNumberValidation">
                  <Form.Label>Card number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={cardNumberFormat}
                    onChange={onCardNumberChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="expirationDateValidation"
                >
                  <Form.Label>Expiration date</Form.Label>
                  <ReactDatePicker
                    selected={expirationDate}
                    onChange={(date) => onExpirationDateChange(date)}
                    onChangeRaw={onDateChangeRaw}
                    dateFormat="MM/yy"
                    showMonthYearPicker
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="securityCodeValidation">
                  <Form.Label>Security code</Form.Label>
                  <Form.Control
                    type="password"
                    data-mask="000"
                    placeholder="000"
                    maxLength="3"
                    pattern="[0-9][0-9][0-9]"
                    value={securityCode}
                    onChange={onSecurityCodeChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mt-2"
                  as={Col}
                  md="4"
                  controlId="firstNameValidation"
                >
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={onFullNameChange}
                    required
                  />
                </Form.Group>
              </Row>
              <div onBlur={() => onBlurForm()}>
                <Row className="mt-4">
                  <h3>Address Information</h3>
                </Row>
                <Row>
                  <Form.Group as={Col} md="4" controlId="line1Validation">
                    <Form.Label>Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      value={line1}
                      onChange={onLine1Change}
                      placeholder="Line 1"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="line2Validation">
                    <Form.Label>Line 2 (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      value={line2}
                      onChange={onLine2Change}
                      placeholder="Line 2"
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md="2" controlId="zipCodeValidation">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      data-mask="00000"
                      maxLength="5"
                      pattern="[0-9][0-9][0-9][0-9][0-9]"
                      value={zipCode}
                      onChange={onZipCodeChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="stateValidation">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={state}
                      onChange={onStateChange}
                      placeholder="State"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="cityValidation">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={onCityChange}
                      placeholder="City"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="countryValidation">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={country}
                      onChange={onCountryChange}
                      placeholder="Country"
                    />
                  </Form.Group>
                </Row>
              </div>

              <Button className="mt-2" variant="success" type="submit">
                Pay
              </Button>
            </Form>
            {validatedFormFlag && hasErrors && (
              <Alert className="mt-4" variant="danger">
                Something went wrong!
              </Alert>
            )}
          </div>
        </Col>
        <Col lg={3}>
          <div className="about-payment-methods mt-3">
            <Stack direction="horizontal" gap={3}>
              <p>Subtotal</p>
              <p className="ms-auto">${subtotal.toFixed(2)}</p>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p>Tax</p>
              <p className="ms-auto">${tax.toFixed(2)}</p>
            </Stack>
            <div className="border border-primary border-bottom" />
            <Stack direction="horizontal" gap={3} className="mt-2">
              <h5>Total</h5>
              <p className="mt-2 ms-auto">
                <b>${(subtotal + tax).toFixed(2)}</b>
              </p>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentMethodPage;
