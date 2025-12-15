import {
  GET_PRODUCT,
  POST_PRODUCT,
  ADD_TO_CART,
  GET_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ORDER_NAME,
  ORDER_PRICE,
  SEARCH_WINE,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOAD_CART,
  LOGIN,
  PRODUCT_DETAIL,
  SET_FILTERED_PRODUCTS,
  CLEAR_FILTERED_PRODUCTS,
  CLEAR_FILTERS,
  SET_FILTERS,
  FILTER_OFFERTS,
  GET_ORDER,
  CREATE_ORDER,
  CANCEL_ORDER,
  CREATE_CART,
  UPDATE_PRODUCT,
  EDIT_ORDER,
  DELETE_UPDATE_PRODUCT,
  FILTER_ORDER,
  DELETE_CANCEL_ORDER,
  DELETE_EDIT_ORDER,
  FILTER_ID,
  GET_COUNTRY,
} from "./action.js";

// Recuperar admin desde localStorage
// let adminStorage = {};
// if (typeof window !== "undefined") {
//   const storedAdmin = localStorage.getItem("admin");
//   if (storedAdmin && storedAdmin !== "undefined") {
//     try {
//       adminStorage = JSON.parse(storedAdmin);
//     } catch (e) {
//       console.error("Error parsing admin from localStorage:", e);
//     }
//   }
// }

let adminStorage = {};
if (typeof window !== "undefined") {
  const storedAdmin = localStorage.getItem("admin");
  if (storedAdmin && storedAdmin !== "undefined") {
    try {
      const parsed = JSON.parse(storedAdmin);
      if (parsed !== null && typeof parsed === "object") {
        adminStorage = parsed;
      } else {
        localStorage.removeItem("admin");
      }
    } catch (e) {
      console.error("Error parsing admin from localStorage:", e);

      localStorage.removeItem("admin");
    }
  }
}

// Recuperar carrito desde localStorage

let cartFromStorage = [];

if (typeof window !== "undefined") {
  const storedCart = localStorage.getItem("cartProducts");

  if (storedCart && storedCart !== "undefined") {
    try {
      const parsed = JSON.parse(storedCart);

      if (Array.isArray(parsed)) {
        cartFromStorage = parsed;
      } else {
        localStorage.removeItem("cartProducts");
      }
    } catch (e) {
      console.error("Error parsing cartProducts from localStorage:", e);
      localStorage.removeItem("cartProducts");
    }
  }
}

// Estado inicial
const initialState = {
  products: [],
  allProduct: [],
  filteredProducts: [],
  filters: {
    searchTerm: "",
    priceRange: [0, 2000],
    varietal: "",
    year: "",
    store: "",
    brand: "",
    sortOrder: "all",
  },
  cartProducts: cartFromStorage,
  isOpen: false,
  details: [],
  admin: adminStorage,
  offers: [],
  getCountry: [],
  orders: [],
  allOrders: [],
  createOrder: [],
  cancelOrder: [],
  createCart: [],
  editOrder: [],
  updateProduct: {
    product: null,
    error: null,
  },
};

// Reducer
function reducer(state = initialState, action) {
  const allProduct = state.allProduct;
  const allOrders = state.allOrders;

  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
        allProduct: action.payload,
      };

    case GET_COUNTRY:
   

      const countryNames = action.payload.map((country) => country.name);

      return {
        ...state,
        getCountry: countryNames,
        loading: false,
      };

    case FILTER_ORDER:
      return {
        ...state,
        orders:
          action.payload === "all"
            ? allOrders
            : allOrders.filter((o) => o.status?.includes(action.payload)),
      };

    case FILTER_ID:
      return {
        ...state,
        orders:
          action.payload === "all"
            ? allOrders
            : allOrders.filter((o) => o.id === Number(action.payload)),
      };

    case CREATE_CART:
      return {
        ...state,
        createCart: action.payload,
      };

    case GET_CART:
    case LOAD_CART:
      return {
        ...state,
        cartProducts: action.payload,
      };

    case PRODUCT_DETAIL:
      return {
        ...state,
        details: action.payload,
      };

    case LOGIN:
      if (typeof window !== "undefined") {
        localStorage.setItem("admin", JSON.stringify(action.payload));
      }
      return {
        ...state,
        admin: action.payload,
      };

    case FILTER_OFFERTS:
      return {
        ...state,
        offers: state.products.filter((p) => p.offer === true),
      };

    case GET_ORDER:
      return {
        ...state,
        orders: action.payload,
        allOrders: action.payload,
      };

    case CREATE_ORDER:
      return {
        ...state,
        createOrder: action.payload,
      };

    case CANCEL_ORDER:
      return {
        ...state,
        cancelOrder: [action.payload],
      };

    case EDIT_ORDER:
      return {
        ...state,
        editOrder: [action.payload],
      };

    case DELETE_CANCEL_ORDER:
      return {
        ...state,
        cancelOrder: [],
      };

    case DELETE_EDIT_ORDER:
      return {
        ...state,
        editOrder: [],
      };

    case POST_PRODUCT:
      return state;

    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: {
          product: action.payload.product || null,
          error: action.payload.error || null,
        },
      };

    case DELETE_UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: {
          product: null,
          error: null,
        },
      };

    // CART ACTIONS
    //     case ADD_TO_CART: {
    //       const item = action.payload;
    //       const existItem = state.cartProducts.find((x) => x.id === item.id);
    // let newCart;
    //       if(existItem) {
    //          newCart = state.cartProducts.map((x) =>
    //           x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
    //         );
    //       } else {
    //         newCart = [...state.cartProducts, { ...item, quantity: 1 }];
    //       }
    //       // const newCart = existItem
    //       //   ? state.cartProducts.map((x) =>
    //       //       x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
    //       //     )
    //       //   : [...state.cartProducts, { ...item, quantity: 1 }];

    //       if (typeof window !== "undefined") {
    //         localStorage.setItem("cartProducts", JSON.stringify(newCart));
    //       }

    //       return {
    //         ...state,
    //         cartProducts: newCart,
    //       };
    //     }

    case REMOVE_FROM_CART: {
      const newCart = state.cartProducts.filter((p) => p.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartProducts", JSON.stringify(newCart));
      }
      return {
        ...state,
        cartProducts: newCart,
      };
    }

    case ADD_TO_CART: {
      const item = action.payload;
      const existItem = state.cartProducts.find((p) => p.id === item.id);

      let newCart;
      if (existItem) {
        newCart = state.cartProducts.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        newCart = [...state.cartProducts, { ...item, quantity: 1 }];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartProducts", JSON.stringify(newCart));
      }

      return {
        ...state,
        cartProducts: newCart,
      };
    }

    case INCREASE_QUANTITY: {
      const newCart = state.cartProducts.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cartProducts", JSON.stringify(newCart));
      }
      return {
        ...state,
        cartProducts: newCart,
      };
    }

    case DECREASE_QUANTITY: {
      const newCart = state.cartProducts
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartProducts", JSON.stringify(newCart));
      }
      return {
        ...state,
        cartProducts: newCart,
      };
    }

    case CLEAR_CART:
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartProducts");
      }
      return {
        ...state,
        cartProducts: [],
      };

    // ORDERING AND FILTERING
    case ORDER_NAME:
      const sortedByName =
        action.payload === "asc"
          ? [...state.products].sort((a, b) => a.name.localeCompare(b.name))
          : action.payload === "desc"
          ? [...state.products].sort((a, b) => b.name.localeCompare(a.name))
          : allProduct;
      return {
        ...state,
        products: sortedByName,
      };

    //   case ORDER_NAME:
    // if (action.payload === "all") {
    //   return {
    //     ...state,
    //     products: allProduct,
    //   };
    // }
    // const filteredBrand = allProduct.filter((v) =>
    //   v.brand?.includes(action.payload)
    // );
    // return {
    //   ...state,
    //   products: filteredBrand,
    // };

    case ORDER_PRICE:
      const sortedByPrice =
        action.payload === "ratiAsc"
          ? [...state.products].sort((a, b) => a.rating - b.rating)
          : action.payload === "ratiDesc"
          ? [...state.products].sort((a, b) => b.rating - a.rating)
          : allProduct;
      return {
        ...state,
        products: sortedByPrice,
      };

    case SEARCH_WINE:
      return {
        ...state,
        products: action.payload,
      };

    case OPEN_MODAL:
      return { ...state, isOpen: true };

    case CLOSE_MODAL:
      return { ...state, isOpen: false };

    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case CLEAR_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: [],
      };

    case SET_FILTERS:
      const filters = action.payload;
      const filtered = state.products.filter((p) => {
        return (
          p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          p.price >= filters.priceRange[0] &&
          p.price <= filters.priceRange[1] &&
          (!filters.varietal || p.varietal === filters.varietal) &&
          (!filters.year || p.year === filters.year) &&
          (!filters.store || p.store === filters.store) &&
          (!filters.brand || p.brand === filters.brand)
        );
      });

      const sorted = applySort(filtered, filters.sortOrder);
      return {
        ...state,
        filters,
        filteredProducts: sorted,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          searchTerm: "",
          priceRange: [0, 2000],
          varietal: "",
          year: "",
          store: "",
          brand: "",
          sortOrder: "all",
        },
        filteredProducts: state.products,
      };

    default:
      return state;
  }
}
// Función auxiliar para ordenar
function applySort(products, order) {
  switch (order) {
    case "asc":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "desc":
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    case "ratiAsc":
      return [...products].sort((a, b) => a.price - b.price);
    case "ratiDesc":
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}
export default reducer;
