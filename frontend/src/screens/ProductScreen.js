import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../actions/productDetail";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;

  const submitHandler = () => {
    navigate(`/cart/${params.id}?qty=${quantity}`);
  };

  useEffect(() => {
    dispatch(productDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Link to="/" className="btn btn-light my-2">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} variant={"danger"} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>{product?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product?.countInStock >= 1 ? "In stock" : "Out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {product?.countInStock > 0 && (
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <FormControl
                        as={"select"}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => {
                          return (
                            <option keys={x + 1} value={x + 1}>
                              {x + 1}{" "}
                            </option>
                          );
                        })}
                      </FormControl>
                    </Col>
                  </Row>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  disabled={product?.countInStock === 0}
                  className="btn-block col-12"
                  onClick={submitHandler}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
