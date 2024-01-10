import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/product";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productList);
  const { loading, error, products } = listProduct;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="mt-4">Latest Products</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row className="">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
