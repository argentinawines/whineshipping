"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  deleteProduct,
  updateProduct,
} from "../../../redux/action.js";
import Sidebar from "../Product/Sidebar.jsx";
import { useRouter } from "next/navigation.js";

function AllProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // ← nuevo: para mostrar loading

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  function handleDelete(id) {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getAllProduct()); // ← actualiza la lista después de borrar
    });
  }

  async function handlePause(id) {
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate) {
      const updatedProduct = {
        ...productToUpdate,
        isActive: !productToUpdate.isActive,
      };

      setIsUpdating(true); // ← indica que está cargando
      await dispatch(updateProduct(id, updatedProduct));
      await dispatch(getAllProduct()); // ← actualiza lista
      setIsUpdating(false);
      setShowModal(false);
    }
  }

  const selectedProduct = products.find((p) => p.id === selectedOrderId);

  return (
    <>
      <Sidebar />
      <div className="p-5 h-screen bg-gray-100 sm:ml-64">
        <h1 className="text-xl mb-2">Your orders</h1>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[1000px] overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="w-full table-auto text-left text-sm text-gray-700 bg-white">
              <thead className="bg-teal-400 border-b border-blue-700 text-white">
                <tr>
                  <th className="p-3 text-white text-base">Name</th>
                  <th className="p-3 text-white text-base">Description</th>
                  <th className="p-3 text-white text-base">Price</th>
                  <th className="p-3 text-white text-base">Pause</th>
                  <th className="p-3 text-white text-base">Edit</th>
                  <th className="p-3 text-white text-base">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products?.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.description}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedOrderId(product.id);
                          setShowModal(true);
                        }}
                        type="button"
                        className={`px-4 py-2 text-white rounded-md text-sm font-medium ${
                          product.isActive
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {product.isActive ? "Pause" : "Activate"}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() =>
                          router.push(`/editProduct/${product.id}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm"
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
                  {selectedProduct.isActive
                    ? "Are you sure you want to pause the product?"
                    : "Are you sure you want to activate the product?"}
                </h3>

                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  No, Close
                </button>

                <button
                  type="button"
                  onClick={() => handlePause(selectedOrderId)}
                  disabled={isUpdating}
                  className={`py-2.5 px-5 text-sm font-medium rounded-lg border text-white ${
                    isUpdating
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-800"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Yes, I'm sure"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProduct;
