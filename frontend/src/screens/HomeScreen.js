import React from "react";
import products from "../data/products";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
const HomeScreen = () => {
  return (
    <>
      <h1 className="mt-4">Latest Products</h1>
      <Row className="">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
