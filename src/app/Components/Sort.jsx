import React, { useState, useEffect } from "react";
import Select from "react-select";
import {sortByName} from '../../redux/action.js'

function Sort() {
    const [orderName, setOrderName] = useState() ;
    const options = [
        { value: "Featured", label: "Featured" },
        { value: "asc", label: "Alphabetical, A - Z" },
        { value: "desc", label: "Alphabetical, Z - A" },
        { value: "PriceAsc", label: "Price Ascending" },
        { value: "PriceDesc", label: "Price Descending" },
    ];

    function handleName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        // setPaginaActual(1);
        setOrderName(`${e.target.value}`);
      }

  return (
    <div className="flex gap-2.5">
            <label className="gap-2 items-center flex">
                <svg width="16" height="12" viewBox="0 0 16 12">
                    <path d="M11.87 3.8a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 1 1 0-1.5H7.1a2.5 2.5 0 0 1 4.8 0h2.85a.75.75 0 0 1 0 1.5h-2.88ZM10.5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM.5 9.05c0-.41.34-.75.75-.75H4.1a2.5 2.5 0 0 1 4.8 0h5.85a.75.75 0 0 1 0 1.5H8.87a2.5 2.5 0 0 1-4.74 0H1.25a.75.75 0 0 1-.75-.75Zm6 .95a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                </svg>
                Sort by:
            </label>
            <Select
            // onChange={(e) => handleName(e)} defaultValue="all"
               
                options={options}
                value={options.find((option) => option.value === orderName)}
                onChange={(e) => handleName(e)} defaultValue="all"
                className="sortByDropDown items-center w-36 sm:w-48"
            />
        </div>
  )
}

export default Sort