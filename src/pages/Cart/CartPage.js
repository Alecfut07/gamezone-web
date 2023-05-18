import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Stack, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsHouseDoorFill, BsFillTrash3Fill } from "react-icons/bs";
import StepperButton from "../../components/StepperButton";
import CartsService from "../../services/CartsService";

import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState([]);

  const navigateToCheckout = useNavigate();

  const calculateSubtotal = (items) =>
    items.reduce(
      (accumalator, item) => accumalator + item.price * item.quantity,
      0
    );

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

  const decreaseProductQuantity = async (productId, quantity) => {
    try {
      if (quantity > 1) {
        await CartsService.updateQuantity(productId, quantity - 1);
        const results = await CartsService.getCart();
        setCartItems(results.products);
      } else {
        await CartsService.updateQuantity(productId, quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseProductQuantity = async (productId, quantity) => {
    try {
      await CartsService.updateQuantity(productId, quantity + 1);
      const results = await CartsService.getCart();
      setCartItems(results.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllItemsInCart = async () => {
    try {
      await CartsService.removeAllItemsInCart();
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItemInCart = async (productId) => {
    try {
      await CartsService.removeItemInCart(productId);
      setCartItems(cartItems.filter((i) => i.productId !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToCheckout = () => {
    navigateToCheckout("/checkout");
  };

  useEffect(() => {
    (async () => {
      try {
        const results = await CartsService.getCart();
        setCartItems(results.products);
        const st = calculateSubtotal(results.products);
        setSubtotal(st);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
              <span>{cartItems.length} Item</span>
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
              <tr key={item.productId}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <StepperButton
                    amount={item.quantity}
                    setDecrease={() =>
                      decreaseProductQuantity(item.productId, item.quantity)
                    }
                    setIncrease={() =>
                      increaseProductQuantity(item.productId, item.quantity)
                    }
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <IconContext.Provider value={trashIconStyle}>
                    <BsFillTrash3Fill
                      onClick={() => handleRemoveItemInCart(item.productId)}
                    />
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <Button onClick={() => handleNavigateToCheckout()}>
            Proceed to checkout
          </Button>
          <Button
            className="ms-auto"
            variant="danger"
            onClick={() => handleRemoveAllItemsInCart()}
          >
            Clear cart
          </Button>
        </Stack>
      </Row>
      <Row>
        <Stack className="mt-4" direction="horizontal" gap={3}>
          <div className="delivery-summary-total ms-auto">
            <p>Subotal: ${subtotal}</p>
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
