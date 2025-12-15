// /Components/DeleteFilter.jsx
"use client";
import { useDispatch } from "react-redux";
import { clearFilteredProducts } from "../../redux/action.js";

export default function DeleteFilter() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(clearFilteredProducts())}
      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
    >
      Delete Filter
    </button>
  );
}
