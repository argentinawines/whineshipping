"use client";
import React, { useEffect, useState } from "react";
import {
  editOrder,
  getOrder,
  filterOrder,
  cancelOrder,
  deleteCancelOrder,
  deleteEditOrder,
  filterId,
} from "../../redux/action.js";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Components/Product/Sidebar.jsx";
import Admin from "../admin/page.jsx";
import PageNumber from "../Components/PageNumber.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import loading from "../../assets/vino.gif";
import Image from "next/image.js";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const orderes = useSelector((state) => state.orders);
  const orderCancel = useSelector((state) => state.cancelOrder);
  const orderEdit = useSelector((state) => state.editOrder);

  const [openOrder, setOpenOrder] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [orderPage, setOrderPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loader, setLoader] = useState(true); // loader inicia en true

  const iDelUltimo = paginaActual * orderPage;
  const iDelPrimero = iDelUltimo - orderPage;
  const orderActual = orderes.slice(iDelPrimero, iDelUltimo);

  useEffect(() => {
    // Activa el loader antes de cargar datos
    setLoader(true);
    dispatch(getOrder());
    dispatch(filterOrder());
    dispatch(filterId());

    const timeout = setTimeout(() => {
      setLoader(false); // Desactiva el loader luego de 4s
    }, 1000);

    return () => clearTimeout(timeout); // Limpia el timeout si se desmonta
  }, []);

  useEffect(() => {
    if (orderCancel.length > 0) {
      toast.success("The order has been canceled successfully");
      dispatch(deleteCancelOrder());
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [orderCancel]);

  useEffect(() => {
    if (orderEdit.length > 0) {
      toast.success("The order has been edited successfully");
      dispatch(deleteEditOrder());
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [orderEdit]);

  const paginado = (numeroPagina) => setPaginaActual(numeroPagina);

  const toggleOrder = (orderId) =>
    setOpenOrder((prev) => (prev === orderId ? null : orderId));

  const handleChange = (e) => setSelectedStatus(e.target.value);

  const getStatusStyle = (status) => {
    switch (status) {
      case "done":
        return "bg-blue-100 text-blue-800";
      case "inProcess":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId, { status: "canceled" }));
  };

  const handleStatusOrder = (orderId, body) => {
    if (!selectedStatus) {
      toast.error("Please select a valid status");
      return;
    }
    dispatch(editOrder(orderId, { status: body }));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(filterOrder(e.target.value));
  };

  const handleId = (e) => {
    e.preventDefault();
    dispatch(filterId(e.target.value));
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-screen bg-white dark:bg-neutral-900">
          <Image
            src={loading}
            alt="loader"
            width={300}
            height={300}
            className="w-[60%] max-w-xs h-auto"
          />
        </div>
      ) : admin.email ? (
        <>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="pl-0 sm:pl-64">
            <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8"></div>

            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Orders
              </h2>

              <select
                onChange={(e) => handleOrder(e)}
                defaultValue="all"
                className="py-3 px-4 pe-9 w-48 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <option value="all" disabled hidden>
                  Filter Order by Status
                </option>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="inProcess">In Process</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>

              <select
                onChange={(e) => handleId(e)}
                defaultValue=""
                className="py-3 px-4 pe-9 w-48 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <option value="" disabled hidden>
                  Filter Order by Number
                </option>
                <option value="all">All Orders</option>

                {orderes &&
                  orderes.map((g) => (
                    <option key={g.id} value={g.id}>
                      Order #{g.id}
                    </option>
                  ))}
              </select>

              <div className="flex-shrink-0">
                <PageNumber
                  paginado={paginado}
                  paginaActual={paginaActual}
                  orderPage={orderPage}
                  orderes={orderes.length}
                />
              </div>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              {orderActual.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleOrder(order.id)}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-gray-900 font-medium">
                        Order #{order?.id}
                      </p>
                      <div
                        className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">
                      {openOrder === order.id ? "Hide details" : "View details"}
                    </button>
                  </div>

                  {/* Expandable content with transition */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openOrder === order.id
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    } border-t border-gray-100`}
                  >
                    <div className="p-4 space-y-6">
                      {/* Summary */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Placed on {order?.updatedAt}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-semibold">
                            Total: ${order?.totalPrice}
                          </p>
                          <p className="text-sm text-gray-900 font-semibold">
                            Items: {order?.carts?.length}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                          Items Purchased
                        </h3>
                        <div className="space-y-4">
                          {order?.carts?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              {/* Imagen opcional */}
                              {/* <img
                             src={item?.product?.image}
                             alt={item?.product?.name}
                             className="w-16 h-16 object-cover rounded-md border border-gray-200"
                           /> */}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {item?.product?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Quantity: {item?.quantity}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  ${item?.product.price * item?.quantity}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Extra: $
                                  {order?.totalPrice - item?.product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & User Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm text-gray-700">
                            {order?.address}
                          </p>
                          <p className="text-sm text-gray-700">
                            {order?.postalCode}
                          </p>
                          <p className="text-sm text-gray-700">
                            {order.city}, {order.state}
                          </p>
                          <p className="text-sm text-gray-700">
                            {order?.country}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">User</p>
                          <p className="text-sm text-gray-700">{order?.name}</p>
                          <p className="text-sm text-gray-700">
                            Phone: {order?.phone}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        {order.status !== "canceled" ? (
                          <div className="flex justify-end gap-4 border-t pt-4">
                            <button
                              onClick={() => {
                                setSelectedOrderId(order.id);
                                setShowModal(true);
                              }}
                              data-modal-target="popup-modal"
                              data-modal-toggle="popup-modal"
                              className="block text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              type="button"
                            >
                              Cancel Order
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrderId(order.id);
                                setShowModal2(true);
                              }}
                              data-modal-target="popup-modal"
                              data-modal-toggle="popup-modal"
                              type="button"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                              Edit Status
                            </button>
                          </div>
                        ) : null}

                        {showModal && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/30 backdrop-blur-sm"
                            role="dialog"
                            aria-modal="true"
                            tabIndex={-1}
                          >
                            <div className="relative p-4 w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Botón de cerrar */}
                                <button
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close</span>
                                </button>

                                {/* Contenido del modal */}
                                <div className="p-4 md:p-5 text-center">
                                  <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to cancel this order?
                                  </h3>

                                  {/* Botón Confirmar */}
                                  <button
                                    onClick={() => {
                                      // lógica de confirmación
                                      setShowModal(false);
                                    }}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                  >
                                    No, Close
                                  </button>

                                  {/* Botón Cancelar */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleCancelOrder(selectedOrderId); // solo usa el ID seleccionado
                                      setShowModal(false);
                                    }}
                                    className="py-2.5 px-5 ms-3 text-sm font-medium bg-blue-600 text-white rounded-lg border border-blue-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-white dark:hover:bg-blue-700"
                                  >
                                    Yes, Cancel Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showModal2 && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/30 backdrop-blur-sm"
                            role="dialog"
                            aria-modal="true"
                            tabIndex={-1}
                          >
                            <div className="relative p-4 w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Botón de cerrar */}
                                <button
                                  type="button"
                                  onClick={() => setShowModal2(false)}
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close</span>
                                </button>

                                {/* Contenido del modal */}
                                <div className="p-4 md:p-5 text-center">
                                  <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to change this order
                                    status?
                                  </h3>

                                  {/* Select con razones */}
                                  <div className="mb-4">
                                    <label
                                      htmlFor="reason"
                                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                      Change status to:
                                    </label>
                                    <select
                                      id="reason"
                                      value={selectedStatus}
                                      onChange={handleChange}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    >
                                      <option value="" disabled hidden>
                                        Select a status
                                      </option>
                                      <option value="pending">Pending</option>
                                      <option value="inProcess">
                                        In Process
                                      </option>
                                      <option value="done">Done</option>
                                    </select>
                                  </div>

                                  {/* Botón Confirmar */}
                                  <button
                                    onClick={() => setShowModal2(false)}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                  >
                                    No, Close
                                  </button>

                                  {/* Botón Cancelar */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleStatusOrder(
                                        selectedOrderId,
                                        selectedStatus
                                      );
                                      setShowModal(false);
                                    }}
                                    className="py-2.5 px-5 ms-3 text-sm font-medium bg-blue-600 text-white rounded-lg border border-blue-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-white dark:hover:bg-blue-700"
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* </div> */}

            <ToastContainer position="top-right" autoClose={2000} />
          </div>
        </>
      ) : (
        <Admin />
      )}
    </>
  );
}

export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   editOrder,
//   getOrder,
//   filterOrder,
//   cancelOrder,
//   deleteCancelOrder,
//   deleteEditOrder,
//   filterId,
// } from "../../redux/action.js";
// import { useDispatch, useSelector } from "react-redux";
// import Sidebar from "../Components/Product/Sidebar.jsx";
// import Admin from "../admin/page.jsx";
// import PageNumber from "../Components/PageNumber.jsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import loading from "../../assets/vino.gif";
// import Image from "next/image.js";

// function page() {
//   const admin = useSelector((state) => state.admin);
//   const router = useRouter();
//   const [openOrder, setOpenOrder] = useState(null);
//   const orderes = useSelector((state) => state.orders);
//   const dispatch = useDispatch();
//   const orderCancel = useSelector((state) => state.cancelOrder);
//   const orderEdit = useSelector((state) => state.editOrder);
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [orderPage, setOrderPage] = useState(12);
//   const iDelUltimo = paginaActual * orderPage;
//   const iDelPrimero = iDelUltimo - orderPage;
//   const orderActual = orderes.slice(iDelPrimero, iDelUltimo);
//   const [showModal, setShowModal] = useState(false);
//   const [showModal2, setShowModal2] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [loader, setLoader] = useState(false);
//   const paginado = (numeroPagina) => {
//     setPaginaActual(numeroPagina);
//   };

//   useEffect(() => {
//     dispatch(getOrder());
//     dispatch(filterOrder());
//     dispatch(filterId());
//     setLoader(true);
//     setTimeout(() => {
//       setLoader(false);
//     },4000);
//   }, []);

//   useEffect(() => {
//     if (orderCancel.length > 0) {
//       toast.success("The order has been canceled successfully");
//       dispatch(deleteCancelOrder());
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }, [orderCancel]);

//   useEffect(() => {
//     if (orderEdit.length > 0) {
//       toast.success("The order has been edited successfully");
//       dispatch(deleteEditOrder());
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }, [orderEdit]);

//   const handleCancelOrder = (orderId) => {
//     let change = {
//       status: "canceled",
//     };
//     dispatch(cancelOrder(orderId, change));
//   };
//   const handleStatusOrder = (orderId, body) => {
//     let change = {
//       status: body,
//     };
//     if (!selectedStatus) {
//       toast.error("Please select a valid status");
//       return;
//     }

//     dispatch(editOrder(orderId, change));
//   };

//   const toggleOrder = (orderId) => {
//     setOpenOrder((prev) => (prev === orderId ? null : orderId));
//   };
//   const handleChange = (e) => {
//     const { value } = e.target;
//     setSelectedStatus(value);
//   };
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "done":
//         return "bg-blue-100 text-blue-800"; // Azul claro con letras azules
//       case "inProcess":
//         return "bg-yellow-100 text-yellow-800"; // Amarillo claro con letras amarillas
//       case "pending":
//         return "bg-gray-100 text-gray-800"; // Gris claro con letras grises
//       default:
//         return "bg-gray-100 text-gray-800"; // Default color
//       case "canceled":
//         return "bg-red-100 text-red-800"; // Rojo claro con letras rojas
//     }
//   };

//   function handleOrder(e) {
//     e.preventDefault();
//     dispatch(filterOrder(e.target.value));
//   }

//   function handleId(e) {
//     e.preventDefault();
//     dispatch(filterId(e.target.value));
//   }

//   return (
//     <>
//       {loader ? (
//       <div className="flex justify-center items-center h-screen">
//         <Image
//           src={loading}
//           alt="loader"
//           width={300}
//           height={300}
//           className="w-2/3 max-w-sm h-auto"
//         />
//       </div>
//     ) : admin.email ? (
//         <>
//           {admin.email ? (
//             <>
//               {/* Sidebar */}
//               <Sidebar />

//               {/* Contenido principal con espacio para sidebar */}

//               <div className="pl-0 sm:pl-64">
//                 <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8"></div>

//                 <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-4">
//                   <h2 className="text-2xl font-semibold text-gray-900">
//                     Your Orders
//                   </h2>

//                   <select
//                     onChange={(e) => handleOrder(e)}
//                     defaultValue="all"
//                     className="py-3 px-4 pe-9 w-48 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//                   >
//                     <option value="all" disabled hidden>
//                       Filter Order by Status
//                     </option>
//                     <option value="all">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="inProcess">In Process</option>
//                     <option value="done">Done</option>
//                     <option value="canceled">Canceled</option>
//                   </select>

//                   <select
//                     onChange={(e) => handleId(e)}
//                     defaultValue=""
//                     className="py-3 px-4 pe-9 w-48 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//                   >
//                     <option value="" disabled hidden>
//                       Filter Order by Number
//                     </option>
//                     <option value="all">All Orders</option>

//                     {orderes &&
//                       orderes.map((g) => (
//                         <option key={g.id} value={g.id}>
//                           Order #{g.id}
//                         </option>
//                       ))}
//                   </select>

//                   <div className="flex-shrink-0">
//                     <PageNumber
//                       paginado={paginado}
//                       paginaActual={paginaActual}
//                       orderPage={orderPage}
//                       orderes={orderes.length}
//                     />
//                   </div>
//                 </div>

//                 {/* Grid de tarjetas */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
//                   {orderActual.map((order) => (
//                     <div
//                       key={order.id}
//                       className="bg-white border border-gray-200 rounded-lg shadow-sm"
//                     >
//                       {/* Header */}
//                       <div
//                         onClick={() => toggleOrder(order.id)}
//                         className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
//                       >
//                         <div>
//                           <p className="text-gray-900 font-medium">
//                             Order #{order?.id}
//                           </p>
//                           <div
//                             className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusStyle(
//                               order.status
//                             )}`}
//                           >
//                             {order.status.charAt(0).toUpperCase() +
//                               order.status.slice(1)}
//                           </div>
//                         </div>
//                         <button className="text-sm text-blue-600 hover:underline">
//                           {openOrder === order.id
//                             ? "Hide details"
//                             : "View details"}
//                         </button>
//                       </div>

//                       {/* Expandable content with transition */}
//                       <div
//                         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                           openOrder === order.id
//                             ? "max-h-[1000px] opacity-100"
//                             : "max-h-0 opacity-0"
//                         } border-t border-gray-100`}
//                       >
//                         <div className="p-4 space-y-6">
//                           {/* Summary */}
//                           <div className="flex justify-between items-center mb-4">
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 Placed on {order?.updatedAt}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-900 font-semibold">
//                                 Total: ${order?.totalPrice}
//                               </p>
//                               <p className="text-sm text-gray-900 font-semibold">
//                                 Items: {order?.carts?.length}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Items */}
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-900 mb-2">
//                               Items Purchased
//                             </h3>
//                             <div className="space-y-4">
//                               {order?.carts?.map((item, idx) => (
//                                 <div
//                                   key={idx}
//                                   className="flex items-center gap-4"
//                                 >
//                                   {/* Imagen opcional */}
//                                   {/* <img
//                              src={item?.product?.image}
//                              alt={item?.product?.name}
//                              className="w-16 h-16 object-cover rounded-md border border-gray-200"
//                            /> */}
//                                   <div className="flex-1">
//                                     <p className="text-sm font-medium text-gray-900">
//                                       {item?.product?.name}
//                                     </p>
//                                     <p className="text-sm text-gray-500">
//                                       Quantity: {item?.quantity}
//                                     </p>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm font-semibold text-gray-900">
//                                       ${item?.product.price * item?.quantity}
//                                     </p>
//                                     <p className="text-xs text-gray-500">
//                                       Extra: $
//                                       {order?.totalPrice - item?.product.price}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Shipping & User Info */}
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
//                             <div>
//                               <p className="font-medium text-gray-900 mb-1">
//                                 Shipping Address
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {order?.address}
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {order?.postalCode}
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {order.city}, {order.state}
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {order?.country}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900 mb-1">
//                                 User
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {order?.name}
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 Phone: {order?.phone}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Actions */}
//                           <div>
//                             {order.status !== "canceled" ? (
//                               <div className="flex justify-end gap-4 border-t pt-4">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedOrderId(order.id);
//                                     setShowModal(true);
//                                   }}
//                                   data-modal-target="popup-modal"
//                                   data-modal-toggle="popup-modal"
//                                   className="block text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                                   type="button"
//                                 >
//                                   Cancel Order
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedOrderId(order.id);
//                                     setShowModal2(true);
//                                   }}
//                                   data-modal-target="popup-modal"
//                                   data-modal-toggle="popup-modal"
//                                   type="button"
//                                   className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
//                                 >
//                                   Edit Status
//                                 </button>
//                               </div>
//                             ) : null}

//                             {showModal && (
//                               <div
//                                 className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/30 backdrop-blur-sm"
//                                 role="dialog"
//                                 aria-modal="true"
//                                 tabIndex={-1}
//                               >
//                                 <div className="relative p-4 w-full max-w-md max-h-full">
//                                   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                                     {/* Botón de cerrar */}
//                                     <button
//                                       type="button"
//                                       onClick={() => setShowModal(false)}
//                                       className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                     >
//                                       <svg
//                                         className="w-3 h-3"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 14 14"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                         />
//                                       </svg>
//                                       <span className="sr-only">Close</span>
//                                     </button>

//                                     {/* Contenido del modal */}
//                                     <div className="p-4 md:p-5 text-center">
//                                       <svg
//                                         className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 20 20"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                                         />
//                                       </svg>
//                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//                                         Are you sure you want to cancel this
//                                         order?
//                                       </h3>

//                                       {/* Botón Confirmar */}
//                                       <button
//                                         onClick={() => {
//                                           // lógica de confirmación
//                                           setShowModal(false);
//                                         }}
//                                         type="button"
//                                         className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
//                                       >
//                                         No, Close
//                                       </button>

//                                       {/* Botón Cancelar */}
//                                       <button
//                                         type="button"
//                                         onClick={() => {
//                                           handleCancelOrder(selectedOrderId); // solo usa el ID seleccionado
//                                           setShowModal(false);
//                                         }}
//                                         className="py-2.5 px-5 ms-3 text-sm font-medium bg-blue-600 text-white rounded-lg border border-blue-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-white dark:hover:bg-blue-700"
//                                       >
//                                         Yes, Cancel Order
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             {showModal2 && (
//                               <div
//                                 className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/30 backdrop-blur-sm"
//                                 role="dialog"
//                                 aria-modal="true"
//                                 tabIndex={-1}
//                               >
//                                 <div className="relative p-4 w-full max-w-md max-h-full">
//                                   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                                     {/* Botón de cerrar */}
//                                     <button
//                                       type="button"
//                                       onClick={() => setShowModal2(false)}
//                                       className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                     >
//                                       <svg
//                                         className="w-3 h-3"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 14 14"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                         />
//                                       </svg>
//                                       <span className="sr-only">Close</span>
//                                     </button>

//                                     {/* Contenido del modal */}
//                                     <div className="p-4 md:p-5 text-center">
//                                       <svg
//                                         className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 20 20"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                                         />
//                                       </svg>
//                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//                                         Are you sure you want to change this
//                                         order status?
//                                       </h3>

//                                       {/* Select con razones */}
//                                       <div className="mb-4">
//                                         <label
//                                           htmlFor="reason"
//                                           className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
//                                         >
//                                           Change status to:
//                                         </label>
//                                         <select
//                                           id="reason"
//                                           value={selectedStatus}
//                                           onChange={handleChange}
//                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                                         >
//                                           <option value="" disabled hidden>
//                                             Select a status
//                                           </option>
//                                           <option value="pending">
//                                             Pending
//                                           </option>
//                                           <option value="inProcess">
//                                             In Process
//                                           </option>
//                                           <option value="done">Done</option>
//                                         </select>
//                                       </div>

//                                       {/* Botón Confirmar */}
//                                       <button
//                                         onClick={() => setShowModal2(false)}
//                                         type="button"
//                                         className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
//                                       >
//                                         No, Close
//                                       </button>

//                                       {/* Botón Cancelar */}
//                                       <button
//                                         type="button"
//                                         onClick={() => {
//                                           handleStatusOrder(
//                                             selectedOrderId,
//                                             selectedStatus
//                                           );
//                                           setShowModal(false);
//                                         }}
//                                         className="py-2.5 px-5 ms-3 text-sm font-medium bg-blue-600 text-white rounded-lg border border-blue-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-white dark:hover:bg-blue-700"
//                                       >
//                                         Confirm
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {/* </div> */}
//               </div>
//               <ToastContainer position="top-right" autoClose={2000} />
//             </>
//           ) : (
//             <Admin />
//           )}
//         </>
//       )
//     </>
//   );
// }

// export default page;
