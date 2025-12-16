import axios from "axios";
import { countries } from "../app/Components/countries.js";

export const GET_PRODUCT = "GET_PRODUCT";
export const POST_PRODUCT = "POST_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const GET_CART = "GET_CART";
export const CLEAR_CART = "CLEAR_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_PRICE = "ORDER_PRICE";
export const SEARCH_WINE = "SEARCH_WINE";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const LOAD_CART = "LOAD_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const LOGIN = "LOGIN";
export const PRODUCT_DETAIL = "PRODUCT_DETAIL";
export const SET_FILTERED_PRODUCTS = "SET_FILTERED_PRODUCTS";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const SET_FILTERS = "SET_FILTERS";
export const FILTER_OFFERTS = "FILTER_OFFERTS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const GET_ORDER = "GET_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const CREATE_CART = "CREATE_CART";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_UPDATE_PRODUCT = "DELETE_UPDATE_PRODUCT";
export const FILTER_ORDER = "FILTER_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const DELETE_CANCEL_ORDER = "DELETE_CANCEL_ORDER";
export const DELETE_EDIT_ORDER = "DELETE_EDIT_ORDER";
export const FILTER_ID = "FILTER_ID";
export const GET_COUNTRY = "GET_COUNTRY";

// const baseurl = "http://localhost:3001";
const baseurl = "https://backwine.onrender.com";
export function orderRating(payload) {
  return {
    type: ORDER_PRICE,
    payload,
  };
}
export function filterOrder(payload) {
  return {
    type: FILTER_ORDER,
    payload,
  };
}
export function filterId(payload) {
  return {
    type: FILTER_ID,
    payload,
  };
}
export const getOrder = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseurl}/order`);

      dispatch({
        type: GET_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};

export const createOrder = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseurl}/order`, payload);
     

      dispatch({
        type: CREATE_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};
export const cancelOrder = (id, payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${baseurl}/order/${id}`, payload);
      dispatch({
        type: CANCEL_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};

export const editOrder = (id, payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${baseurl}/order/${id}`, payload);
      dispatch({
        type: EDIT_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};
export function sortByName(payload) {
  return {
    type: ORDER_NAME,
    payload,
  };
}

// export const addToCart = (product) => ({
//   type: "ADD_TO_CART",
//   payload: product,
// });

export const removeFromCart = (id) => ({
  type: "REMOVE_FROM_CART",
  payload: id,
});

export const getProductOffers = () => {
  return {
    type: FILTER_OFFERTS,
  };
};

export const clearCart = () => ({
  type: "CLEAR_CART",
});

// export const decreaseQuantity = (id) => ({
//   type: "DECREASE_QUANTITY",
//   payload: id,
// });

export const getCart = (customerId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseurl}/cart`, customerId);
      dispatch({
        type: GET_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};

export const getCountry = () => {
  return async (dispatch) => {
    try {
      const response = countries;

      dispatch({
        type: GET_COUNTRY,
        payload: response,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};
export const getProductDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseurl}/product/${id}`);


      dispatch({
        type: PRODUCT_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseurl}/administrator`, payload);
      
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error en login:", error);
      // Podés despachar un error si querés manejarlo en Redux
    }
  };
};

// export async function login(payload) {
//   try {
//     console.log(payload, "payload");
//     let json = await axios.get( "http://localhost:3001/admin", payload);
//     console.log(json.data, "json");
//     return async function (dispatch) {
//       // let json = await axios.get( "http://localhost:3001/admin", payload);
//       // let json = await axios.get(`${baseurl}/admin`, payload);

//       return dispatch({
//         type: LOGIN,
//         payload: json.data,
//       });
//     };
//   } catch (error) {
//     console.error("Error occurred:", error);
//   }

// }

// export function getCart() {
//   return async function (dispatch) {
//     var json = await axios.get(`${baseurl}/carts`);
//     return dispatch({
//       type: "GET_CART",
//       payload: json.data,
//     });
//   };
// }

export function getAllProduct() {
  return async function (dispatch) {
    var json = await axios.get(`${baseurl}/product`);
    return dispatch({
      type: "GET_PRODUCT",
      payload: json.data,
    });
  };
}

export const postProduct = (payload) => {
  return async function (dispatch) {
    let json = await axios.post(`${baseurl}/product`, payload);
    return dispatch({
      type: "POST_PRODUCT",
      payload: json.data,
    });
  };
};

export function updateProduct(id, payload) {


  return async function (dispatch) {
    try {
      let json = await axios.put(`${baseurl}/product/${id}`, payload);
     

      return dispatch({
        type: UPDATE_PRODUCT,
        payload: json.data,
      });
    } catch (error) {
      console.error("Error occurred:", error);

      const errorMsg = error.response?.data?.message || error.message;

      dispatch({
        type: UPDATE_PRODUCT,
        payload: { error: errorMsg }, // Podés enviar como objeto para diferenciarlo de un update exitoso
      });
    }
  };
}

export function deleteUpdateProduct() {
  return function (dispatch) {
    return dispatch({
      type: DELETE_UPDATE_PRODUCT,
      payload: [],
    });
  };
}

export function deleteCancelOrder() {
  return function (dispatch) {
    return dispatch({
      type: DELETE_CANCEL_ORDER,
      payload: [],
    });
  };
}

export function deleteEditOrder() {
  return function (dispatch) {
    return dispatch({
      type: DELETE_EDIT_ORDER,
      payload: [],
    });
  };
}

export function deleteProduct(id, body) {
  return async function (dispatch) {
    try {
      let res = await axios.delete(`${baseurl}/product/${id}`, body);
      return res;
    } catch (e) {
      return console.log(e, "error");
    }
  };
}

export function editProduct(id, body) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`${baseurl}/product/${id}`, body);
      return res;
    } catch (e) {
      return dispatch(console.log(e, "error"));
    }
  };
}

export function searchWine(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${baseurl}/product?name=${name}`);

      return dispatch({
        type: SEARCH_WINE,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_WINE,
        payload: [],
      });
    }
  };
}

export const openModal = () => {
  return function (dispatch) {
    return dispatch({ type: OPEN_MODAL });
  };
};

export const closeModal = () => ({ type: CLOSE_MODAL });

export const createCart = (customerId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseurl}/cart`, customerId);

      dispatch({
        type: "CREATE_CART",
        payload: response.data,
      });
      // dispatch({type: "CLEAR_CART"})
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
};
export const addToCart = (product) => (dispatch, getState) => {
  // dispatch({
  //   type: "ADD_TO_CART",
  //   payload: product,
  // });

  // const { cartProducts } = getState();
  // localStorage.setItem("cartItems", JSON.stringify(cartProducts));

  const { cartProducts } = getState();

  const productInCart = cartProducts.find((item) => item.id === product.id);

  if (productInCart) {
    // if (productInCart.quantity < product.stock) {

    dispatch({
      type: "INCREASE_QUANTITY",
      payload: product.id,
    });
    // } else {
    //   alert("No hay más stock disponible de este producto.");
    // }
  } else {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 }, // Agregamos cantidad 1 al principio
    });
    // localStorage.setItem(
    //   "cartProducts",
    //   JSON.stringify(getState().cart?.cartProducts)
    // );
  }
};

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch({
//     type: "REMOVE_FROM_CART",
//     payload: id,
//   });

//   const { cartProducts } = getState();
//   localStorage.setItem("cartItems", JSON.stringify(cartProducts));
// };

// export const clearCart = () => (dispatch) => {
//   dispatch({ type: "CLEAR_CART" });
//   localStorage.removeItem("cartItems");
// };

export const decreaseQuantity = (id) => (dispatch, getState) => {
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: id,
  });

  const { cartProducts } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartProducts));
};

// export const loadCartFromStorage = () => {
  return (dispatch) => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("cartProducts");

    // Verificar si 'stored' tiene un valor válido y no es 'undefined' o una cadena vacía
    if (stored && stored !== "undefined" && stored !== "") {
      try {
        const parsedCart = JSON.parse(stored);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: LOAD_CART, payload: parsedCart });
        } else {
          localStorage.removeItem("cartProducts");
        }
      } catch (error) {
        console.error("Error al parsear el carrito desde localStorage:", error);
        localStorage.removeItem("cartProducts");
      }
    }
  };
};

export const loadAdminFromStorage = () => {
  return (dispatch) => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("admin");

    if (stored && stored !== "undefined" && stored !== "") {
      try {
        const parsedAdmin = JSON.parse(stored);
        dispatch({ type: LOGIN, payload: parsedAdmin });
      } catch (error) {
        console.error("Error al parsear admin desde localStorage:", error);
        localStorage.removeItem("admin");
      }
    }
  };
};

export const setFilteredProducts = (products) => {
  return {
    type: "SET_FILTERED_PRODUCTS",
    payload: products,
  };
};

export const setFilters = (filters) => ({
  type: "SET_FILTERS",
  payload: filters,
});

export const clearFilters = () => ({
  type: "CLEAR_FILTERS",
});
export const clearFilteredProducts = () => {
  return {
    type: "CLEAR_FILTERED_PRODUCTS",
  };
};
