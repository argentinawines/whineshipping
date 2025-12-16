"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Menu from "@/app/Components/Menu.jsx";
import ModalShow from "@/app/Components/ModalShow.jsx";

import { getProductDetail, clearProductDetail } from "../../../redux/action.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.details);

  // Soporta ambos formatos:
  // 1) details = { product: {...} }
  // 2) details = {...producto...}
  const product = details?.product ?? details ?? null;

  useEffect(() => {
    if (!id) return;
    dispatch(clearProductDetail());
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <Menu />

      {!product ? (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full mt-20 px-4 md:px-10">
          <div className="w-full md:w-3/5 flex justify-center items-start p-4">
            {/* tu imagen acá */}
          </div>

          <div className="w-full md:w-2/5 p-4 md:p-6 md:pl-10">
            <p className="capitalize text-gray-500 text-sm dark:text-white">
              {product?.category || ""}
            </p>

            <h1 className="text-3xl font-bold text-center my-6">
              {product?.name || ""}
            </h1>

            <p className="text-gray-500 dark:text-blue-300 font-semibold text-xl mb-6">
              {typeof product?.price === "number"
                ? `${new Intl.NumberFormat("se-SE").format(product.price)} usd`
                : ""}
            </p>

            <p className="mb-10 text-gray-500 text-sm text-left dark:text-white mx-1">
              {product?.description || ""}
            </p>

            {/* tu botón Add to cart acá */}
          </div>
        </div>
      )}

      <ModalShow />
    </>
  );
}
