import React, { useState, useEffect, useMemo } from "react";
import { Button, Container, Row, Stack, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsHouseDoorFill, BsFillTrash3Fill } from "react-icons/bs";
import StepperButton from "../../components/StepperButton";
import CartsService from "../../services/CartsService";

import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  // const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const results = await CartsService.getCart();
        setCartItems(results.products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const homeIconStyle = useMemo(() => ({
    color: "#da362c",
    margin: "50px",
    width: "-29.125rem",
    height: "-0.625rem",
  }));

  const trashIconStyle = useMemo(() => ({
    color: "#da362c",
    size: "23px",
  }));

  const handleRemoveItemInCart = async () => {
    try {
      await CartsService.removeItemInCart();
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="delivery-summary">
        <div className="delivery-options">
          <div className="delivery-summary-home">
            <Stack direction="horizontal" gap={3}>
              <IconContext.Provider value={homeIconStyle}>
                <BsHouseDoorFill />
              </IconContext.Provider>
              <strong>Ship To Home: </strong>
              <span>1 Item</span>
            </Stack>
          </div>
        </div>
      </Row>
      <Row>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <StepperButton amount={item.quantity} />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <IconContext.Provider value={trashIconStyle}>
                    <BsFillTrash3Fill />
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>1</td>
              <td>The Legend of Zelda: Tears of the Kingdom</td>
              <td>$70.00</td>
              <td>
                <StepperButton />
              </td>
              <td>$70.00</td>
              <td>
                <IconContext.Provider value={trashIconStyle}>
                  <BsFillTrash3Fill />
                </IconContext.Provider>
              </td>
            </tr> */}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <Button>Continue shopping</Button>
          <Button
            className="ms-auto"
            variant="danger"
            onClick={() => handleRemoveItemInCart()}
          >
            Clear cart
          </Button>
        </Stack>
      </Row>
      <Row>
        <Stack className="mt-4" direction="horizontal" gap={3}>
          <div className="delivery-summary-total ms-auto">
            <p>Subotal: $70.00</p>
            <p>Tax: ??</p>
            <div className="border border-primary border-bottom" />
            <p className="mt-2">Order total: $70.00</p>
          </div>
        </Stack>
      </Row>
    </Container>
  );
}

export default CartPage;
