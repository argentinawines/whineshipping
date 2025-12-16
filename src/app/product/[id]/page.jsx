"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../../redux/action.js";
import { useEffect, useState } from "react";

import ModalShow from "@/app/Components/ModalShow.jsx";
import Menu from "@/app/Components/Menu.jsx";

function page() {
  const params = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const id = params.id;

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
console.log("details", details);

  return (
    <>
  <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black shadow-md">
    <Menu />
  </div>

  <ModalShow />

  <div className="pt-16 md:flex px-4 sm:px-6">
    <div className="w-full md:w-3/5 mb-8 mt-[70px] ">
      <img
        src={details?.product?.dbimages[0]?.url}
        alt={details.name}
        className="rounded-lg mx-auto max-w-full h-auto max-h-120 object-contain"
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 my-2 sm:my-4 text-center">
        {/* thumbnails */}
      </div>
    </div>
    <div className="w-full md:w-2/5 p-4 md:p-6 md:pl-10">
      <span className="text-gray-500 text-sm dark:text-white py-0">
        <p className="capitalize dark:text-white">{details.product?.category}</p>
      </span>
      <h1 className="text-3xl font-bold text-center my-6">{details?.product?.name}</h1>
      <p className="text-gray-500 dark:text-blue-300 font-semibold text-md mt-2 text-xl mb-6">
        {new Intl.NumberFormat("se-SE").format(details?.product?.price)} usd
      </p>
      <p className="mb-10 text-gray-500 text-sm text-left dark:text-white mx-1">
        {details?.product?.description}
      </p>
      <button
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
</>
  );
}

export default page;
