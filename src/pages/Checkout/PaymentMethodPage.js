import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Form,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

import { AuthContext, PurchaseContext, CartContext } from "../../context";
import CartsService from "../../services/CartsService";
import PaymentService from "../../services/PaymentService";
import UsersService from "../../services/UsersService";

import "./PaymentMethodPage.css";

function PaymentMethodPage() {
  const [validatedFormFlag, setValidatedFormFlag] = useState(false);
  const [hasErrors, setHasError] = useState(false);

  // const [paymentMethods, setPaymentMethods] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
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

  const [loggedInUser, setLoggedInUser] = useState();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const { setPurchaseCompleted } = useContext(PurchaseContext);
  const { setCartTotal, subtotal } = useContext(CartContext);

  const [grandTotal, setGrandTotal] = useState();

  const navigateToSuccessfulPurchase = useNavigate();

  const onCardNumberChange = (e) => {
    const inputCardNumber = e.target.value
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);

    const cardNumberParts = [];
    for (let i = 0; i < inputCardNumber.length; i += 4) {
      cardNumberParts.push(inputCardNumber.substr(i, 4));
    }
    setCardNumber(cardNumberParts.join(""));

    setCardNumberFormat(
      cardNumberParts.length > 1 ? cardNumberParts.join("-") : inputCardNumber
    );
  };

  const onSecurityCodeChange = (e) => {
    const inputSecurityCode = e.target.value.replace(
      /[A-Za-z*|":<>[\]{}`\\()';!#%^~_+?,./=\-\s@&$]/gi,
      ""
    );
    setSecurityCode(inputSecurityCode);
  };

  const onFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const onLine1Change = (e) => {
    setLine1(e.target.value);
  };

  const onLine2Change = (e) => {
    setLine2(e.target.value);
  };

  const onZipCodeChange = (e) => {
    const inputZipCode = e.target.value.replace(
      /[A-Za-z*|":<>[\]{}`\\()';!#%^~_+?,./=\-\s@&$]/gi,
      ""
    );
    setZipCode(inputZipCode);
  };

  const onStateChange = (e) => {
    const stateInput = e.target.value;
    setState(stateInput);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onCountryChange = (e) => {
    setCountry(e.target.value);
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

  const calculateGrandTotal = (_subtotal, _tax) => {
    const value = `${_subtotal + _tax}`;
    const formatLongValue = value.split(".").join("");
    setGrandTotal(parseInt(formatLongValue, 10));
    return grandTotal;
  };

  const addCustomerAndPayment = async () => {
    try {
      await PaymentService.addCustomer(loggedInUser.email, fullName, {
        name: fullName,
        cardNumber,
        expirationYear: expirationDate.getFullYear().toString(),
        expirationMonth: (expirationDate.getMonth() + 1).toString(),
        cvc: securityCode,
      })
        .then((responseCustomer) => responseCustomer)
        .then(async (customer) => {
          await PaymentService.addPayment(
            customer.customerId,
            loggedInUser.email,
            "VideoGames",
            "USD",
            calculateGrandTotal(subtotal, tax)
          );
        })
        .then((responsePayment) => responsePayment);
      setHasError(false);
      await CartsService.removeAllItemsInCart();
      setCartTotal(0);
      setPurchaseCompleted(true);
      navigateToSuccessfulPurchase("/success");
    } catch (error) {
      setHasError(true);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      addCustomerAndPayment();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidatedFormFlag(true);
  };

  const getProfile = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      if (accessToken !== null) {
        const user = await UsersService.getProfile(accessToken);
        setLoggedInUser(user);
        setLoggedIn(true);
      }
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isLoggedIn]);

  // useEffect(() => {
  //   (() => {
  //     try {
  //       const defaultPaymentMethods = [
  //         {
  //           id: 0,
  //           selected: true,
  //           disabled: true,
  //           pay_method: "Choose payment method",
  //         },
  //         {
  //           id: 1,
  //           selected: false,
  //           disabled: false,
  //           pay_method: "Visa",
  //         },
  //         {
  //           id: 2,
  //           selected: false,
  //           disabled: false,
  //           pay_method: "MasterCard",
  //         },
  //         {
  //           id: 3,
  //           selected: false,
  //           disabled: false,
  //           pay_method: "American Express",
  //         },
  //       ];
  //       setPaymentMethods(defaultPaymentMethods);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <Container>
      <div>
        <h3>Payment method</h3>
      </div>
      <Stack direction="horizontal" gap={3}>
        <div className="payment-method-form">
          <h3>Card Information</h3>
          <Form
            noValidate
            validated={validatedFormFlag}
            onSubmit={handleSubmit}
          >
            {/* <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="paymentMethodValidation">
                <Form.Label>Please select a payment method</Form.Label>
                <Form.Select required>
                  {paymentMethods.map((payMethod) => (
                    <option
                      id={payMethod.id}
                      key={payMethod.id}
                      selected={payMethod.selected}
                      disabled={payMethod.disabled}
                    >
                      {payMethod.pay_method}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row> */}
            <Row>
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
              <Form.Group as={Col} md="4" controlId="expirationDateValidation">
                <Form.Label>Expiration date</Form.Label>
                <ReactDatePicker
                  selected={expirationDate}
                  onChange={(date) => setExpirationDate(date)}
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
        <div className="about-payment-methods">
          <Row>
            <Stack direction="horizontal" gap={3}>
              <p>Subtotal</p>
              <p className="ms-auto">${subtotal.toFixed(2)}</p>
            </Stack>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={3}>
              <p>Tax</p>
              <p className="ms-auto">${tax.toFixed(2)}</p>
            </Stack>
          </Row>
          <Row>
            <div className="border border-primary border-bottom" />
          </Row>
          <Row className="mt-2">
            <Stack direction="horizontal" gap={3}>
              <h5>Total</h5>
              <p className="mt-2 ms-auto">
                <b>${(subtotal + tax).toFixed(2)}</b>
              </p>
            </Stack>
          </Row>
        </div>
      </Stack>
    </Container>
  );
}

export default PaymentMethodPage;
