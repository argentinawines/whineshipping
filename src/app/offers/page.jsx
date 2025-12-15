"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductOffers,
  getAllProduct,
  addToCart,
} from "../../redux/action.js";
import loading from "../../assets/vino.gif"; // Asegúrate de que esta ruta sea válida
import Image from "next/image.js";
import Menu from "../Components/Menu";
import { ToastContainer, toast } from "react-toastify";
import ModalShow from "../Components/ModalShow.jsx";


function page() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.offers);
  const cart = useSelector((state) => state.cartProducts);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllProduct());

    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      dispatch(getProductOffers());
    }, 3000);
    // dispatch(loadCartFromStorage());
    // dispatch(getCart());
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Agregar al carrito
    toast.success("The wine was added to the cart!"); // Notificación
  };

  return (
    <>
      <Menu />

      <section className="py-10 bg-gray-100">
        {loader ? (
          <div className="flex justify-center items-center h-screen bg-white mt-[-650px] sm:mt-[-180px]">
            <Image
              src={loading}
              alt="loader"
              width={200}
              height={200}
              className="w-[60%] max-w-xs h-auto"
            />
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product) => {
              return (
                <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                  {/* <a href="#"> */}
                  <div
                    className="relative flex items-end overflow-hidden rounded-xl"
                    key={product?.id}
                  >
                    <img src={product?.dbimages[0]?.url} alt="Hotel Photo" />
                    <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>

                      <button class="text-sm">Add to cart</button>
                    </div>
                  </div>

                  <div class="mt-1 p-2">
                    <h2 class="text-slate-700">{product?.name} </h2>
                    <p class="mt-1 text-sm text-slate-400">
                      {product.category}
                    </p>
                    <div class="mt-3 flex items-end justify-between flex-wrap">
                      <p class="text-lg font-bold text-blue-500 w-full sm:w-auto">
                        ${product?.price}
                      </p>

                      <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>

                        <button
                          class="text-sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}
                </article>
              );
            })}
          </div>
        )}
      </section>
        <ToastContainer position="top-right" autoClose={3000} />
      <ModalShow/>
    </>
  );
}

export default page;
