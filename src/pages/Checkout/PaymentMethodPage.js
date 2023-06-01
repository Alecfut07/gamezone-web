import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
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

import visaLogo from "../../imgs/PaymentMethods/visa_logo.png";
import mastercardLogo from "../../imgs/PaymentMethods/mastercard_logo.png";
import americanexpressLogo from "../../imgs/PaymentMethods/americanexpress_logo.png";

import { AuthContext } from "../../context/AuthProvider";
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

  const [loggedInUser, setLoggedInUser] = useState();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const navigateToSuccessfulPurchase = useNavigate();

  // const options = {
  //   clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
  // };

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
            1000
          );
        })
        .then((responsePayment) => responsePayment);
      setHasError(false);
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
          <h5>About of payment methods</h5>
          <p>We accept the following secure payment methods:</p>
          <div id="img-wrapper" className="row">
            <div className="col-sm-4">
              <img alt="visa_logo.png" src={visaLogo} width="70px" />
            </div>
            <div className="col-sm-4">
              <img
                alt="mastercard_logo.png"
                src={mastercardLogo}
                width="70px"
              />
            </div>
            <div className="col-sm-4">
              <img
                alt="americanexpress_logo.png"
                src={americanexpressLogo}
                width="70px"
              />
            </div>
          </div>
        </div>
      </Stack>
    </Container>
  );
}

export default PaymentMethodPage;
