"use client";
// import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import "../../globals.css";
import cartClose from "../../../assets/close-cart.svg";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct } from "../../../redux/action.js"; // Asegúrate de que la ruta sea correcta


function Cart(props) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  // const customerId = sessionStorage.getItem("customerId");

  useEffect(() => {
    // if (customerId) {
      dispatch(addCartProduct());
    // }
  }, [ dispatch]);

  const buyProducts = () => {
    props.buyProducts();
  };
 

  return (
   <>
  {cartProducts.length > 0 ? (
    <>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Quantity</th>
              <th className="px-4 py-2 text-left border-b">Total Price</th>
              <th className="px-4 py-2 text-left border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.productId} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.price * product.quantity}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => props.removeProduct(product.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="address-container">
        <input
          type="text"
          className="address-input"
          placeholder="Address"
          value={props.address}
          onChange={(e) => props.updateAddress(e.target.value)}
        />
        <button className="buy-button" onClick={buyProducts}>
          Buy
        </button>
      </div> */}
      </>
    ) : null}
  </> 
  );
}

export default Cart;








<>
    
    <div
   
      className="popupcart"
      //   ref={popupRef}
    >
      <div className="popup-head">
        <p>My Cart</p>
        <p>
          {/* {itemCount}  */}
          Items
        </p>
        <button  onClick={() => close()} >
          X
        </button>
       
      </div>
      <div className="popup-top">
        {/* {cartItems.map((item, index) => (
          <CartProduct
            key={index}
            item={item}
            index={index}
            onUpdateQuantity={onUpdateQuantity}
            onDelete={onDelete}
          />
        ))} */}
      </div>
      <div className="popup-bottom">
        <div className="subtotal">
          <p>Subtotal</p>
          <p>
            {/* ${subtotal.toFixed(2)} */}
            USD
          </p>
        </div>

        <button
          onClick={() =>
            itemCount > 0
              ? navigate("/checkout")
              : toast.warning("Your cart is empty!", { duration: 1000 })
          }
          className="buy"
        >
          Proceed to Buy
        </button>
      </div>
    </div>

  </>