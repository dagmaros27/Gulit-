import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../actions/productDetail";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(productDetail(params.id));
    console.log("dispatched");
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
                <Button
                  type="button"
                  disabled={product?.countInStock === 0}
                  className="btn-block col-12"
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
