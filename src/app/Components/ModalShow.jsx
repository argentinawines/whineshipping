// components/Modal.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  closeModal,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/action";
import { Link } from "react-router-dom";
import { useRouter } from "next/navigation";

const ModalShow = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isOpen);
  const cart = useSelector((state) => state.cartProducts);
 

  const router = useRouter();
  if (!isOpen) return null;

  const handleIncrease = (item) => {
    
      dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
   
  };

  const handlePayment = () => {
    router.push("/payment");
  };

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
const totalFormatted = total.toFixed(2);
 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto sm:max-w-md md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-800">El carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center gap-4 p-4 bg-gray-700 rounded-lg border"
              >
                {/* Imagen */}
                <img
                  src={item?.dbimages?.[0]?.url || "/placeholder.jpg"}
                  alt={item?.name || "Imagen"}
                  className="w-20 h-auto object-cover rounded"
                />

                {/* Contenido en línea */}
                <div className="flex-1 flex flex-wrap items-center justify-between gap-4 text-white text-sm">
                  {/* Nombre */}
                  <p className="font-medium uppercase text-primary min-w-[100px] max-w-[160px] truncate">
                    {item.name}
                  </p>

                  {/* Precio unitario */}
                  <p>${item.price}</p>

                  {/* Cantidad y botones */}
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                    {/* Subtotal */}
                    
                  </div>
                  <p className="font-medium text-primary">
                      ${parseFloat(item.quantity * item.price).toFixed(2)}
                    </p>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <p className="mt-6 text-right font-semibold text-lg text-gray-800">
          Total: ${totalFormatted}
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {cart.length > 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
              onClick={handlePayment}
            >
              Check Out
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
            onClick={() => dispatch(closeModal())}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalShow;
