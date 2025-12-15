"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Prueba({ closeModal }) {
  const cart = useSelector((state) => state.cartProducts || []);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <button
            onClick={closeModal}
            className="rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-100"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-auto">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">El carrito está vacío</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {item.name || item.title || "Producto"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Cantidad: {item.quantity ?? 1}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">
                    {item.price ? `$${item.price}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prueba;

// import { useDispatch, useSelector } from "react-redux";
// import "../../css/Popup.css";
// import {
//   removeFromCart,
//   clearCart,
//   decreaseQuantity,
//   addToCart,
// } from "../../redux/action";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// function Prueba() {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cartProducts);

//   return (
//     <div className="body">
//       {" "}
//       <div className="section">
//         {" "}
//         <input
//           className="modal-btn"
//           type="checkbox"
//           id="modal-btn"
//           name="modal-btn"
//         />{" "}
//         <label htmlFor="modal-btn">
//           {" "}
//           <AddShoppingCartIcon />{" "}
//         </label>{" "}
//         <div className="modal">
//           {" "}
//           <div className="modal-wrap">
//             {" "}
//             {cart.length === 0 && <p>El carrito está vacío</p>}{" "}
//             {cart.map((e) => (
//               <div key={e.id}>
//                 {" "}
//                 <h1>{e.name}</h1> <p>{e.description}</p> <p>${e.price}</p>{" "}
//                 <p>Cantidad: {e.quantity}</p>{" "}
//                 <button onClick={() => dispatch(decreaseQuantity(e.id))}>
//                   -
//                 </button>{" "}
//                 <button onClick={() => dispatch(addToCart(e))}>+</button>{" "}
//                 <button onClick={() => dispatch(removeFromCart(e.id))}>
//                   {" "}
//                   Eliminar{" "}
//                 </button>{" "}
//               </div>
//             ))}{" "}
//             {/* {cart.length > 0 && (
//               <button onClick={() => dispatch(clearCart())}>
//                 Vaciar carrito
//               </button>
//             )}{" "} */}
//           </div>{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// }

// export default Prueba;

// import { useDispatch, useSelector } from "react-redux";
// import "../../css/Popup.css";
// // import { getCart } from "../../redux/action.js";
// import React, { useState, useEffect } from "react";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";

// function Prueba() {
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cartProducts);
//   useEffect(() => {
//     console.log(cart, "cart del carrito");
//   }, [cart]);

//   const removeFromCart = (id) => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: id });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };
//   return (
//     <div className="body">
//       <div className="section ">
//         <input
//           className="modal-btn"
//           type="checkbox"
//           id="modal-btn"
//           name="modal-btn"
//         />
//         <label for="modal-btn">
//           <AddShoppingCartIcon />
//         </label>
//         <div class="modal">
//           <div class="modal-wrap">
//             {cart.map((e) => {
//               return (
//                 <div key={e.id}>
//                   {/* <img src={e.image}  class="logo" alt=""/>	 */}
//                   <p>
//                     <h1>{e.name}</h1>

//                     <p>{e.description}</p>
//                     <p>{e.price}</p>
//                   </p>

// {/*
//                   <div
//               onClick={() => removeFromCart(e.id)}
//               className="text-xl cursor-pointer"
//             >
//               <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
//             </div> */}
//                   <button onClick={() => removeFromCart(e.id)}>
//                     Eliminar
//                   </button>
//                   {/* {cart.length > 0 && (
//                     <button onClick={clearCart}>Vaciar carrito</button>
//                   )} */}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Prueba;
