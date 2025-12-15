"use client";

import { Provider } from "react-redux";
import store  from "../../redux/store.js";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

export default function ReduxProvider({ children }) {
  return (
        <PayPalScriptProvider
           options={{
             "client-id": "ARoNQ7Mdyi-_cvjaUsCx2zy0PLoBaxpox3RJ6GsiUkv1hF78cv4LBLEkoTuXBBXdGa2tF1qRkFnIaouc",
             currency: "USD",
             intent: "capture",
           }}
           >
    <Provider store={store}>
      {children}
    </Provider>
    </PayPalScriptProvider>
  );
}