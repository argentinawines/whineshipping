"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Menu from "@/app/Components/Menu.jsx";
import ModalShow from "@/app/Components/ModalShow.jsx";

import {
  getProductDetail,
  clearProductDetail,
  addToCart,
  openModal,
} from "../../../redux/action.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.details);

  // backend suele devolver: { message, product }
  const product = details?.product ?? null;

  useEffect(() => {
    if (!id) return;
    dispatch(clearProductDetail()); // details = null
    dispatch(getProductDetail(id)); // luego llega {message, product} o algo
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    dispatch(openModal());
  };

  // 1) Cargando (todavía no volvió la respuesta)
  if (details === null) {
    return (
      <>
        <Menu />
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
        <ModalShow />
      </>
    );
  }

  // 2) Respondió pero NO hay producto → no encontrado/incompleto
  if (!product || !product?.name) {
    return (
      <>
        <Menu />
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <p className="text-gray-700 font-semibold">Product not available</p>
          <p className="text-gray-500 text-sm">
            This product may be missing in the database or returned without
            details.
          </p>
        </div>
        <ModalShow />
      </>
    );
  }

  // 3) Producto OK (con fallbacks)
  const imgUrl = product?.dbimages?.[0]?.url || "";
  const priceText =
    typeof product?.price === "number"
      ? `${new Intl.NumberFormat("se-SE").format(product.price)} usd`
      : "";

  return (
    <>
      <Menu />

      <div className="flex flex-col md:flex-row w-full mt-20 px-4 md:px-10">
        <div className="w-full md:w-3/5 flex justify-center items-start p-4">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={product?.name || "Product"}
              className="rounded-lg mx-auto max-w-full h-auto max-h-120 object-contain"
            />
          ) : (
            <div className="w-full max-w-[420px] h-[420px] rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 p-4 md:p-6 md:pl-10">
          <p className="capitalize text-gray-500 text-sm dark:text-white">
            {product?.category || ""}
          </p>

          <h1 className="text-3xl font-bold text-center my-6">
            {product?.name || ""}
          </h1>

          <p className="text-gray-500 dark:text-blue-300 font-semibold text-xl mb-6">
            {priceText}
          </p>

          <p className="mb-10 text-gray-500 text-sm text-left dark:text-white mx-1">
            {product?.description || "No description."}
          </p>

          <button
            onClick={handleAddToCart}
            className="flex justify-center items-center bg-black hover:bg-blue-700 dark:bg-black text-white my-6 py-4 px-10 dark:hover:bg-black w-full"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <ModalShow />
    </>
  );
}
