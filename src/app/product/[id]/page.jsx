"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";

import {
  getProductDetail,
  clearProductDetail,
  addToCart,
  openModal,
} from "../../../redux/action.js";

import ModalShow from "@/app/Components/ModalShow.jsx";
import Menu from "@/app/Components/Menu.jsx";

export default function Page() {
  const params = useParams();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.details);
  const id = params?.id;

  // Soporta details = { product: {...} } o details = {...producto...}
  const product = details?.product ?? details ?? null;

  useEffect(() => {
    if (!id) return;
    dispatch(clearProductDetail());
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product)); // ✅ agrega al carrito (y suma cantidad si ya existe)
    dispatch(openModal()); // ✅ abre el modal del carrito (opcional, pero queda bien)
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black shadow-md">
        <Menu />
      </div>

      <ModalShow />

      {!product ? (
        <div className="pt-24 min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      ) : (
        <div className="pt-16 md:flex px-4 sm:px-6">
          <div className="w-full md:w-3/5 mb-8 mt-[70px]">
            <img
              src={product?.dbimages?.[0]?.url || ""}
              alt={product?.name || "Product"}
              className="rounded-lg mx-auto max-w-full h-auto max-h-120 object-contain"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 my-2 sm:my-4 text-center">
              {/* thumbnails */}
            </div>
          </div>

          <div className="w-full md:w-2/5 p-4 md:p-6 md:pl-10">
            <span className="text-gray-500 text-sm dark:text-white py-0">
              <p className="capitalize dark:text-white">
                {product?.category || ""}
              </p>
            </span>

            <h1 className="text-3xl font-bold text-center my-6">
              {product?.name || ""}
            </h1>

            <p className="text-gray-500 dark:text-blue-300 font-semibold text-md mt-2 text-xl mb-6">
              {typeof product?.price === "number"
                ? `${new Intl.NumberFormat("se-SE").format(product.price)} usd`
                : ""}
            </p>

            <p className="mb-10 text-gray-500 text-sm text-left dark:text-white mx-1">
              {product?.description || ""}
            </p>

            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center bg-black hover:bg-blue-700 dark:bg-black text-white my-6 py-4 px-10 dark:hover:bg-black w-full"
            >
              <svg
                className="w-6 h-6 text-white pr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"
                />
              </svg>
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
