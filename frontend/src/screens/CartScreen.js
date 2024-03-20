import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cart";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.user);

  const id = params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    if (user.userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, quantity }));
    }
  }, [dispatch, id, quantity]);

  return (
    <Row className="my-4">
      <Col md={9}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/"> Go back</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as={"select"}
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              id: item.product,
                              quantity: e.target.value,
                            })
                          )
                        }
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </FormControl>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + Number(item.quantity),
                  0
                )}
                )
              </h3>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                style={{ width: "100%" }}
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
