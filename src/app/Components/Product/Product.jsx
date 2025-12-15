"use client";
import React, { useState } from "react";
import { postProduct } from "../../../redux/action.js";
// import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar.jsx";
import FormImages from "../FormImages.jsx";

function Product() {
  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    year: "",
    image: [],
    price: "",
    store: "",
    brand: "",
    varietal: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState({});
  function handleSubmit(e) {
    if (!input.name|| !input.stock) {
      return toast.warn("Complete all fields", { duration: 1000 });
    } else {
      const mainImage = [];
      if (imageFile[0]) {
       
        mainImage.push(imageFile[0]);
      }
      const productCreate = {
        name: input.name,
        description: input.description,
        year: input.year,
        price: input.price,
        image: images,
        store: input.store,
        stock: input.stock,
        brand: input.brand,
        varietal: input.varietal,
      };
      if (mainImage.length > 0) {
        productCreate.image.push(...mainImage);
      }
      dispatch(postProduct(productCreate));
        toast.success("The Wine was Create");
      // toast.warning("Wine Create", { duration: 1000 });
      // setInput({
      //   name: "",
      //   description: "",
      //   year: "",
      //   image: "",
      //   price: "",
      //   store: "",
      //   brand: "",
      //   varietal: "",
      //   stock: "",
      // });

    //   navigate("/home");
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (

   
    <>
  <Sidebar />
  <section className="ml-0 sm:ml-64 max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white">
      Create your Wine
    </h1>
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white dark:text-gray-200" htmlFor="name">
            Wine
          </label>
          <input
            name="name"
            type="text"
            value={input.name.toLowerCase()}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        {/* <div>
          <label className="text-white dark:text-gray-200" htmlFor="brand">
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            value={input.brand.toLowerCase()}
            onChange={handleChange}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div> */}

        {/* <div>
          <label className="text-white dark:text-gray-200" htmlFor="varietal">
            Varietal
          </label>
          <input
            id="varietal"
            name="varietal"
            type="text"
            value={input.varietal.toLowerCase()}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div> */}

        {/* <div>
          <label className="text-white dark:text-gray-200" htmlFor="store">
            Store
          </label>
          <input
            id="store"
            type="text"
            name="store"
            value={input.store.toLowerCase()}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div> */}

        <div>
          <FormImages 
           imageFile={imageFile}
           setImageFile={setImageFile}
           images={images}
           setImages={setImages}
           
          />
          {/* <label className="text-white dark:text-gray-200" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={input.image}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          /> */}
        </div>

        {/* <div>
          <label className="text-white dark:text-gray-200" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="number"
            name="year"
            value={input.year}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div> */}

        <div>
          <label className="text-white dark:text-gray-200" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={input.price}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        {/* <div>
          <label className="text-white dark:text-gray-200" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={input.stock}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div> */}

        <div className="sm:col-span-2">
          <label className="text-white dark:text-gray-200" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={handleChange}
            className="block w-full h-24 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end mt-6">
      { !input.name || !input.price || !input.description ? null : (
       <button
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
        >
          Save
        </button>)}
      </div>
    </form
    >
  </section>
  <ToastContainer position="top-right" autoClose={3000}/>
</>

  );
}

export default Product;
