import React, { useEffect, useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../actions/user";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector((state) => state.user);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { loading, userInfo, error } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/" + redirect);
    }
  }, [navigate, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <Container className="col-6 mt-3">
      <h1 className="text-center">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="john@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Log In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Doesn't have an account?{" "}
          <Link to={redirect ? `/register?redirect${redirect}` : "/register"}>
            Sign Up
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
