"use client";

import React, { useState } from "react";
import { useCart } from "./hooks/CartHook.jsx";
import { useRouter } from "next/navigation";
import Prueba from "./Prueba";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/action.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Image from "next/image";

export default function Menu() {
  const [showCartModal, setShowCartModal] = useState(false);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => state.cartProducts);
  const itemAmount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-500 border-b border-gray-200 absolute w-full z-20 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + Home */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Cart */}
        <div className="flex md:order-2 space-x-3">
          <div className="relative">
            <button onClick={() => dispatch(openModal())} type="button">
              <div className="bg-red-500 absolute -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-500">
            <li>
              <Link href="/" className="block py-2 px-3 text-white md:p-0">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/offers"
                className="block py-2 px-3 text-white md:p-0"
              >
                Offers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {showCartModal && <Prueba closeModal={() => setShowCartModal(false)} />}
    </nav>
  );
}
