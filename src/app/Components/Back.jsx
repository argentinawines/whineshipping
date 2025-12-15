import React, { useState } from "react";
import { useContext } from "react";
import { useCart } from "./hooks/CartHook.jsx";
import { useRouter } from 'next/navigation';
import Prueba from "./Prueba";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/action.js";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link.js";

function Back() {
  const [showCartModal, setShowCartModal] = useState(false);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
   const router = useRouter();
const cart = useSelector(state => state.cartProducts);
const itemAmount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product) => {
    router.push('/create')
  }
   
  return (
    <nav className="bg-white dark:bg-gray-900 absolute w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
         href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/773/765/non_2x/wine-glass-with-ai-generated-free-png.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center font-semibold whitespace-nowrap dark:text-white"></span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <span
            type="button"
            className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center "
          ></span>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            ></svg>
          </button>

          <div className="relative" style={{ marginLeft: "-350px" }}>
          <button onClick={() => dispatch(openModal())}>
          <div className="bg-red-500 absolute  -bottom-2 text-[12px] h-3 w-3 text-white rounded-full flex justify-center items-center">
         {itemAmount}
         </div>
         {/* <svg class="size-6 h-50 w-50" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg> */}
       
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
            {/* Mostrar Modal */}
           
          </button>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
           
          
            
            <li>
              <span className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 justify-end">
             
              
              <button
        onClick={() => handleAddToCart()}
        className="fixed top-4 right-4 bg-black text-white p-2 rounded"
      >
        
       Create
       
      </button>
      
      {showCartModal && (
         
        <Prueba closeModal={() => setShowCartModal(false)} />
       
      )}
              
                {/* <Prueba /> */}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Back;
