import React, { useState } from "react";
import {
  Form,
  Container,
  Button,
  FormGroup,
  FormLabel,
  Col,
  FormCheck,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cart";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-center">Payment Method</h1>
      <Form className="ml-auto" onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as={"legend"}>Select Method</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              label="Paypal or credit card"
              id="Paypal"
              name="PaymentMethod"
              value={"Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            ></FormCheck>
            {/* <FormCheck
            type="radio"
            label="Stripe"
            id="Stripe"
            name="PaymentMethod"
            value={"Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
          ></FormCheck> */}
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentScreen;
