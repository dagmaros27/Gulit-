import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getuserDetails, updateUser } from "../actions/user";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const location = useLocation();
  const userDetail = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.user);
  //const redirect = location.search ? location.search.split("=")[1] : "/";

  const { loading, userDetails, error } = userDetail;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userDetails.name) {
        dispatch(getuserDetails());
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [dispatch, navigate, userDetails, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateUser({ _id: userDetails._id, name, email, password }));
      dispatch(getuserDetails);
    } else {
      setMessage("passwords does not match");
    }
  };
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {/* {success && <Message variant={"success"}>{success}</Message>} */}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="danger">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
