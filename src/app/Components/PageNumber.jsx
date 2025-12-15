import React from 'react'

function PageNumber({ orderes, orderPage, paginado, paginaActual }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orderes / orderPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex space-x-1">


    {  paginaActual > 1 ?(
        <button
        onClick={() => paginado(paginaActual - 1)}
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer"
      >
        Prev
      </button>):null
      }
      <button className="min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
        {paginaActual}
      </button>
      {paginaActual + 1 <= pageNumbers.length ?(
        <button
        onClick={() => paginado(paginaActual + 1)}
        className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events disabled:opacity-50 disabled:shadow-none ml-2"
      >
        {paginaActual + 1}
      </button>): null
      }
    { paginaActual + 2 <= pageNumbers.length ?(
     <button
        onClick={() => paginado(paginaActual + 2)}
        className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events disabled:opacity-50 disabled:shadow-none ml-2"
      >
        {paginaActual + 2}
      </button>): null
      }
      {/* <button className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
      2
  </button>
  <button className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
      3
  </button> */}

      {/* {pageNumbers?.map((number) => (
        <li
          className="rounded-md rounded-r-none rounded-l-none border border-r-0 border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          key={number}
        >
          <a onClick={() => paginado(number)}>{number}</a>
        </li>
      ))} */}
     { paginaActual < pageNumbers.length ?(
        <button
        onClick={() => paginado(paginaActual + 1)}
        className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer"
      >
        Next
      </button>): null      
      }
    </div>
  )
}

export default PageNumber