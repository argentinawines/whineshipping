"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/action";

function SearchAutomatic() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // Nuevo estado para controlar visualización de sugerencias
  const [showSuggestions, setShowSuggestions] = useState(true);
  const currentFilters = useSelector((state) => state.filters);

  // Efecto que se encarga del debounce + filtrado en Redux
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 3) {
        // Despachar el filtro (searchTerm) en Redux
        dispatch(
          setFilters({
            ...currentFilters,
            searchTerm: searchTerm,
          })
        );

        // Si está permitido mostrar sugerencias, hacemos la petición
        if (showSuggestions) {
          axios
            .get(`https://backwine.onrender.com/search?name=${searchTerm}`)
            .then((res) => setSuggestions(res.data))
            .catch((err) => console.log(err));
        }
      } else {
        // Menos de 3 caracteres: limpiamos sugerencias y despachamos filtro vacío
        setSuggestions([]);
        dispatch(
          setFilters({
            ...currentFilters,
            searchTerm: "",
          })
        );
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, currentFilters, showSuggestions]);

  // Cuando el usuario elige una sugerencia con clic
  const handleSelectSuggestion = (product) => {
    dispatch(
      setFilters({
        ...currentFilters,
        searchTerm: product.name,
      })
    );
    setSearchTerm("");
    setSuggestions([]);
  };

  // Detectamos la tecla Enter en el input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Al presionar Enter, suprimimos para siempre (hasta que escriba de nuevo)
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Al cambiar el contenido del input, habilitamos de nuevo las sugerencias
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      />
      {/* Solo renderizamos el <ul> si showSuggestions = true y hay sugerencias */}
      {/* {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full z-10 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectSuggestion(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default SearchAutomatic;
// 