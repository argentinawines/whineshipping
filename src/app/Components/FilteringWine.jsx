"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/action";

function FilteringWine(props) {
  const dispatch = useDispatch();
  const products = props.products;
  const filters = useSelector((state) => state.filters);

  const [localFilters, setLocalFilters] = useState(filters);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(setFilters(localFilters));
  }, [localFilters]);

  // useEffect(() => {
    
  // },[products]);
  useEffect(() => {
    
    
    if (products?.length > 0) {
      // Asegúrate de filtrar los precios inválidos (NaN)
      const validPrices = products
        .map(p => parseFloat(p.price))
        .filter(price => !isNaN(price)); // Filtra los valores NaN
      
      
      if (validPrices.length > 0) {
        const maxPrecio = Math.max(...validPrices);
        
        setMaxPrice(maxPrecio);
      }
    }
  }, [products]); 
    
  

  
  const handleCheckbox = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const handlePriceRange = (e) => {
    const value = Number(e.target.value);
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: [0, value],
    }));
  };

  const uniqueValues = (key) =>
    [...new Set(products?.map((p) => p[key]).filter(Boolean))].sort();


  return (
    <div className="sticky top-36 z-9">
      <h2 className="text-2xl lg:text-4xl font-light mb-6">Filter by</h2>

      {/* Varietal */}
      <div className="border-t border-gray-200 p-3 pt-5 pb-0">
        <span>Varietal:</span>
        <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
          {uniqueValues("varietal").map((item, idx) => (
            <li key={idx} className="flex items-center pt-2 pb-2 pl-4">
              <input
                id={`varietal-${idx}`}
                type="checkbox"
                className="w-4 h-4"
                checked={localFilters.varietal === item}
                onChange={() => handleCheckbox("varietal", item)}
              />
              <label htmlFor={`varietal-${idx}`} className="ml-2 text-sm">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="border-t border-gray-200 p-3 pt-5 pb-5">
        <span>Max Price: ${localFilters.priceRange[1]} </span>
        <input
          type="range"
          min="0"
          max="2000"
          value={localFilters.priceRange[1]}
          onChange={handlePriceRange}
          className="w-full mt-2"
        />
      </div>

      {/* Year */}
      <div className="border-t border-gray-200 p-3 pt-5 pb-0">
        <span>Year:</span>
        <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
          {uniqueValues("year").map((item, idx) => (
            <li key={idx} className="flex items-center pt-2 pb-2 pl-4">
              <input
                id={`year-${idx}`}
                type="checkbox"
                className="w-4 h-4"
                checked={localFilters.year === item}
                onChange={() => handleCheckbox("year", item)}
              />
              <label htmlFor={`year-${idx}`} className="ml-2 text-sm">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Store */}
      <div className="border-t border-gray-200 p-3 pt-5 pb-0">
        <span>Store:</span>
        <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
          {uniqueValues("store").map((item, idx) => (
            <li key={idx} className="flex items-center pt-2 pb-2 pl-4">
              <input
                id={`store-${idx}`}
                type="checkbox"
                className="w-4 h-4"
                checked={localFilters.store === item}
                onChange={() => handleCheckbox("store", item)}
              />
              <label htmlFor={`store-${idx}`} className="ml-2 text-sm">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand */}
      <div className="border-t border-gray-200 p-3 pt-5 pb-0">
        <span>Brand:</span>
        <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
          {uniqueValues("brand").map((item, idx) => (
            <li key={idx} className="flex items-center pt-2 pb-2 pl-4">
              <input
                id={`brand-${idx}`}
                type="checkbox"
                className="w-4 h-4"
                checked={localFilters.brand === item}
                onChange={() => handleCheckbox("brand", item)}
              />
              <label htmlFor={`brand-${idx}`} className="ml-2 text-sm">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilteringWine;
