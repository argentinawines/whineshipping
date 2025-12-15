"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Link from "next/link";
import {
  getAllProduct,
  loadCartFromStorage,
  addToCart,
  setFilters,
  getProductOffers,
} from "../../redux/action.js";
import Landing from "../Components/Landing";
import Menu from "../Components/Menu";
import FilteringWine from "../Components/FilteringWine";
import SearchBar from "../Components/SearchBar";
import DeleteFilter from "../Components/DeleteFilter";
import Pagination from "../Components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import loading from "../../assets/vino.gif"; // Asegúrate de que esta ruta sea válida
import Image from "next/image.js";
import SearchAutomatic from "../Components/SearchAutomatic.jsx";

function HomePage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const filters = useSelector((state) => state.filters);

  const [loader, setLoader] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 16;

  const allProducts = filteredProducts.length > 0 ? filteredProducts : products;
  const productosPaginados = allProducts.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const productosConStock = productosPaginados.filter((p) => p.stock >= 1);
  const productosTotalesConStock = allProducts.filter((p) => p.stock >= 1);
  const productActive = productosPaginados.filter((p) => p.isActive === true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 1000); // Puedes ajustar el tiempo

    dispatch(getAllProduct());
    dispatch(loadCartFromStorage());
    dispatch(getProductOffers());
    return () => clearTimeout(timeout);
  }, [dispatch]);

  const sortAlphaOptions = [
    { value: "asc", label: "Name: A → Z" },
    { value: "desc", label: "Name: Z → A" },
  ];

  const sortPriceOptions = [
    { value: "ratiAsc", label: "Price: Low → High" },
    { value: "ratiDesc", label: "Price: High → Low" },
  ];

  const handleSort = (selectedOption) => {
    if (!selectedOption) return;
    dispatch(setFilters({ ...filters, sortOrder: selectedOption.value }));
    setPaginaActual(1);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Agregar al carrito
    toast.success("The wine was added to the cart!"); // Notificación
  };

  return (
    <>
  <Landing />
  <Menu />

  <div className="max-w-screen-2xl mx-auto px-4 py-6 flex flex-col  gap-6 lg:flex-row mt-[70px]">
    {/* Contenedor de productos */}
    <div className="flex flex-col w-full ">
      {/* Controles superiores */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        {/* Grupo izquierdo: Search + filtros */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <SearchAutomatic />
          {filteredProducts.length > 0 && <DeleteFilter />}
        </div>

        {/* Grupo central: Select */}
        <div className="flex items-center gap-4 justify-center w-full lg:w-auto">
          <div className="w-full sm:w-40">
            <label className="text-sm text-gray-600 mb-1 block">
              Sort by Price
            </label>
            <Select
              options={sortPriceOptions}
              onChange={handleSort}
              placeholder="Price"
              value={sortPriceOptions.find(
                (o) => o.value === filters.sortOrder
              )}
              className="text-sm"
            />
          </div>
        </div>

        {/* Grupo derecho: Paginación */}
        <div className="w-full lg:w-auto flex justify-end">
          <Pagination
            paginado={setPaginaActual}
            paginaActual={paginaActual}
            videoPorPagina={productosPorPagina}
            allProducts={allProducts.length}
          />
        </div>
      </div>

      {/* Loader */}
      {loader ? (
        <div className="flex justify-center items-center h-screen bg-white mt-[-200px] sm:mt-[-100px]">
          <Image
            src={loading}
            alt="loader"
            width={200}
            height={200}
            className="w-[60%] max-w-xs h-auto"
          />
        </div>
      ) : (
       <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full overflow-hidden" >
          {productActive.length > 0 ? (
            productActive.map((product) => (
              <li
                key={product.id}
                className="flex flex-col items-center bg-[#ceb19d] p-4 rounded shadow-sm"
              >
                <LazyLoadImage
                  effect="blur"
                  src={product.dbimages[0]?.url}
                  alt={product.description}
                  width={300}
                  height={350}
                  className="object-contain max-h-[300px] w-full"
                />

                <span className="mt-2 text-center">{product.name}</span>
                <span className="text-center text-lg font-semibold">
                  ${product.price}
                </span>
                <div className="mt-2 flex flex-col sm:flex-row gap-2 w-full justify-center">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-blue-800 text-center py-1 px-3 rounded border border-white cursor-pointer"
                  >
                    More detail...
                  </Link>
                  <button
                    className="bg-black text-white py-1 px-3 rounded cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))
          ) : (
            <span className="text-center w-full block mt-5">
              No products in that price range.
            </span>
          )}
        </ul>
      )}

      {/* Paginación inferior */}
      <div className="flex justify-center mt-8">
        <Pagination
          paginado={setPaginaActual}
          paginaActual={paginaActual}
          videoPorPagina={productosPorPagina}
          allProducts={allProducts.length}
        />
      </div>
    </div>

    <ToastContainer position="top-right" autoClose={3000} />
  </div>
</>

  );
}

export default HomePage;
