import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { LinkContainer } from "react-router-bootstrap";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-2 p-3 product-card" style={{ cursor: "pointer" }}>
      <LinkContainer to={`/products/${product._id}`}>
        <div>
          <Card.Img src={product.image} variant="top" style={{}} />

          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <Card.Text as="h3">{`$${product.price}`}</Card.Text>
          </Card.Body>
        </div>
      </LinkContainer>
    </Card>
  );
};

export default ProductCard;
