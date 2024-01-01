import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const d = new Date();
  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          Copyright &copy;Dagmaros {d.getFullYear()}
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
