'use client'
import Sidebar from './Sidebar'
import React, {  useEffect, useState } from 'react'
import FormImages from '../FormImages'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteUpdateProduct } from '@/redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditProduct({product}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const productId = useSelector((state) => state.details)
  const productUpdated= useSelector((state) => state.updateProduct)
  const [deleteImageDB, setDeleteImageDB] = useState([]);
  const initialState = {
    name: "",
    brand: "",
    varietal: "",
    store: "",
    imagesDB: [{ url: "" }],
    year: "",
    price: "",
    stock: 0,
    description: ""
  }
  const [formData, setFormData] = useState(initialState)
  useEffect(() => {
   
    if(product){
      setFormData(product); 
      
      if (product?.dbimages?.length > 0) {
        setImageFile(product.dbimages[0]);
      }
      
      if(!product){
        router.push('/product')
      }
      

    }
  }, [product]);
  useEffect(() => {
    
    if(productUpdated?.product!== null){
      toast.success("Producto actualizado correctamente");
      dispatch(deleteUpdateProduct())
      setTimeout(() => {
        router.push('/product')
      }, 3000);
    }
    else if(productUpdated?.error !== null){
     toast.error('Algo falló')
     dispatch(deleteUpdateProduct())
    }
  }, [productUpdated]);
  
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try{
      dispatch(updateProduct(product.id, formData));
    }
    catch(error){
      console.log('error', error);
    }
    
  }


  return (
    <>
    <Sidebar/>
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Edit your Wine
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
              value={formData.name? formData.name.toLowerCase(): initialState.name}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          {/* <div>
            <label className="text-white dark:text-gray-200" htmlFor="brand">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              value={formData.brand? formData.brand.toLowerCase(): initialState.brand}
              onChange={(e) => handleChange(e)}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
              value={formData.varietal? formData.varietal.toLowerCase(): initialState.varietal}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
              value={formData.store? formData.store: initialState.store}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div> */}

          {/* <div>
            <label className="text-white dark:text-gray-200" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={
                Array.isArray(formData.imagesDB) && formData.imagesDB[0]?.url
                  ? formData.imagesDB[0].url
                  : (initialState.imagesDB?.[0]?.url || "")
              }
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div> */}
          <div>
            <FormImages 
            images={images}
            imageFile={imageFile}
            setImages={setImages}
            setImageFile={setImageFile}
            setDeleteImageDB={setDeleteImageDB}
            deleteImageDB={deleteImageDB}
            />
          </div>
{/* 
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              value={formData.year? formData.year: initialState.year}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
              value={formData.price? formData.price: initialState.price}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
              value={formData.stock? formData.stock: initialState.stock}
              onChange={(e) => handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div> */}
          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Description
            </label>
            <textarea
              id="textarea"
              type="textarea"
              value={formData.description? formData.description: initialState.description}
              onChange={(e) => handleChange(e)}
              name="description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-white">Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
          >
            Edit
           
          </button>
         
        </div>
      </form>
    </section>
    <ToastContainer position="top-right" autoClose={3000}/>
   
  </>
  )
}

export default EditProduct