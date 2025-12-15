import React from "react";
import Cart from "./Cart/Cart";
import { useState, useEffect } from "react";

function VisibleCart() {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <div>
      {cartVisible && (
        <Cart
          cartItems={cartItems}
          setCartVisible={setCartVisible}
          onUpdateQuantity={onUpdateQuantity}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default VisibleCart;
