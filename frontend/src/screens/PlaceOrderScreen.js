import React, { useEffect } from "react";
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getPrices } from "../actions/cart";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemsPrice = cart.cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = (0.15 * itemsPrice).toFixed(2);
    const totalPrice = (
      parseFloat(itemsPrice) +
      parseFloat(shippingPrice) +
      parseFloat(taxPrice)
    ).toFixed(2);

    dispatch(getPrices({ itemsPrice, shippingPrice, taxPrice, totalPrice }));
  }, [cart.cartItems, dispatch]);

  const placeOrderHandler = () => {};

  return (
    <Row>
      <Col md={8}>
        <CheckoutSteps step1 step2 step3 step4 />
        <ListGroup variant="flush">
          <ListGroupItem>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.country}
            </p>
          </ListGroupItem>
          <ListGroupItem>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </ListGroupItem>
          <ListGroupItem>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {" "}
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <h2>Order summary</h2>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Items</Col>
              <Col>${cart.itemsPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Shipping</Col>
              <Col>${cart.shippingPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Tax</Col>
              <Col>${cart.taxPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Total</Col>
              <Col>${cart.totalPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              style={{ width: "100%" }}
              onClick={placeOrderHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
