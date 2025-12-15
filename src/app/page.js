"use client";
import Main from "../app/home/page.jsx";
import ModalShow from "./Components/ModalShow.jsx";
import { useDispatch, useSelector } from "react-redux";
import react, { useEffect } from "react";

import { loadCartFromStorage } from "../redux/action.js";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verificamos que el código solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cartProducts");
      if (storedCart) {
        dispatch(loadCartFromStorage());
      }
    }
  }, [dispatch]);
  return (
    <>
      <Main />

      <ModalShow />
    </>
  );
}
