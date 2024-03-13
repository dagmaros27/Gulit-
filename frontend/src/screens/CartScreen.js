import React, { useEffect } from "react";
import { addToCart } from "../actions/cart";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const id = params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, quantity }));
    }
  }, [dispatch, id, quantity]);
  return <></>;
};

export default CartScreen;
