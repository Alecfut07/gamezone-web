import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Stack, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsHouseDoorFill, BsFillTrash3Fill } from "react-icons/bs";
import StepperButton from "../../components/StepperButton";
import CartsService from "../../services/CartsService";
import PaymentService from "../../services/PaymentService";
import { CartContext } from "../../context";

import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  // const [subtotal, setSubtotal] = useState([]);
  const { cartTotal, setCartTotal, subtotal, setSubtotal } =
    useContext(CartContext);
  const [estimatedTax, setEstimatedTax] = useState(0);

  const navigateToCheckout = useNavigate();

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

  const calculateSubtotal = (items) =>
    items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

  const calculateEstimatedTaxValue = async (amount) => {
    try {
      const value = `${amount}`;
      const formatLongValue = value.split(".").join("");
      const result = await PaymentService.calculateEstimatedTax(
        parseInt(formatLongValue, 10)
      );
      setEstimatedTax(result.estimated_tax_amount);
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseProductQuantity = async (productId, quantity) => {
    try {
      if (quantity > 1) {
        await CartsService.updateQuantity(productId, quantity - 1);
        const results = await CartsService.getCart();
        const totalQuantity = results.products.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        setCartTotal(totalQuantity);
        setCartItems(results.products);
        const st = calculateSubtotal(results.products);
        setSubtotal(st);
        calculateEstimatedTaxValue(st);
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
      const totalQuantity = results.products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
      );
      setCartTotal(totalQuantity);
      setCartItems(results.products);
      const st = calculateSubtotal(results.products);
      setSubtotal(st);
      calculateEstimatedTaxValue(st);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllItemsInCart = async () => {
    try {
      await CartsService.removeAllItemsInCart();
      const results = await CartsService.getCart();
      const totalQuantity = results.products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
      );
      setCartTotal(totalQuantity);
      setCartItems([]);
      setSubtotal(0);
      setEstimatedTax(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItemInCart = async (productId) => {
    try {
      await CartsService.removeItemInCart(productId);
      setCartItems(cartItems.filter((i) => i.productId !== productId));
      const st = calculateSubtotal(
        cartItems.filter((i) => i.productId !== productId)
      );
      const results = await CartsService.getCart();
      const totalQuantity = results.products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
      );
      setCartTotal(totalQuantity);
      setSubtotal(st);
      calculateEstimatedTaxValue(st);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToCheckout = async () => {
    navigateToCheckout("/checkout");
  };

  const getCart = async () => {
    try {
      const results = await CartsService.getCart();
      setCartItems(results.products);
      const st = calculateSubtotal(results.products);
      setSubtotal(st);
      calculateEstimatedTaxValue(st);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container>
      {cartTotal !== 0 ? (
        <>
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
                <Row>
                  <Stack direction="horizontal" gap={3}>
                    <p>Subotal:</p>
                    <p className="ms-auto">${subtotal.toFixed(2)}</p>
                  </Stack>
                </Row>
                <Row>
                  <Stack direction="horizontal" gap={3}>
                    <p>Estimated Tax:</p>
                    <p className="ms-auto">${estimatedTax.toFixed(2)}</p>
                  </Stack>
                </Row>
                <Row>
                  <div className="border border-primary border-bottom" />
                </Row>
                <Row>
                  <Stack direction="horizontal" gap={3}>
                    <h5>Estimated Total:</h5>
                    <p className="mt-2 ms-auto">
                      <b>${(subtotal + estimatedTax).toFixed(2)}</b>
                    </p>
                  </Stack>
                </Row>
              </div>
            </Stack>
          </Row>
        </>
      ) : (
        <>
          <div>
            <h3>
              <b>Your Shopping Cart is Empty</b>
            </h3>
          </div>
          <div />
        </>
      )}
    </Container>
  );
}

export default CartPage;
