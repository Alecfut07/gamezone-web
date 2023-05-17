import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Stack } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

import visaLogo from "../../imgs/PaymentMethods/visa_logo.png";
import mastercardLogo from "../../imgs/PaymentMethods/mastercard_logo.png";
import americanexpressLogo from "../../imgs/PaymentMethods/americanexpress_logo.png";

import "./PaymentMethodPage.css";
// import { getMonth, getYear } from "date-fns";
// import range from "lodash/range";

function PaymentMethodPage() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [securityCode, setSecurityCode] = useState("");

  const onCardNumberChange = (e) => {
    const inputCardNumber = e.target.value
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);

    const cardNumberParts = [];
    for (let i = 0; i < inputCardNumber.length; i += 4) {
      cardNumberParts.push(inputCardNumber.substr(i, 4));
    }
    setCardNumber(
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

  useEffect(() => {
    (() => {
      try {
        const defaultPaymentMethods = [
          {
            id: 0,
            selected: true,
            disabled: true,
            pay_method: "Choose payment method",
          },
          {
            id: 1,
            selected: false,
            disabled: false,
            pay_method: "Visa",
          },
          {
            id: 2,
            selected: false,
            disabled: false,
            pay_method: "MasterCard",
          },
          {
            id: 3,
            selected: false,
            disabled: false,
            pay_method: "American Express",
          },
        ];
        setPaymentMethods(defaultPaymentMethods);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      <div>
        <h3>Payment method</h3>
      </div>
      <Stack direction="horizontal" gap={3}>
        <div className="payment-method-form">
          <Form>
            <Row className="mb-3">
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
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="cardNumberValidation">
                <Form.Label>Card number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={cardNumber}
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
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="securityCodeValidation">
                <Form.Label>Security code</Form.Label>
                <Form.Control
                  type="password"
                  data-mask="000"
                  placeholder="000"
                  maxlength="3"
                  pattern="[0-9][0-9][0-9]"
                  value={securityCode}
                  onChange={onSecurityCodeChange}
                />
              </Form.Group>
            </Row>
          </Form>
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
