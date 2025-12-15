"use client";
import React, { useEffect, useState } from "react";
import AllProduct from "../Components/AllProduct/AllProduct";
import { useSelector } from "react-redux";
import Admin from "../admin/page.jsx";
import Image from "next/image";
import loading from "../../assets/vino.gif"; // Asegúrate de que esta ruta sea válida

function product() {
  const admin = useSelector((state) => state.admin);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 1000); // Puedes ajustar el tiempo

    return () => clearTimeout(timeout);
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-neutral-900">
        <Image
          src={loading}
          alt="loader"
          width={300}
          height={300}
          className="w-[60%] max-w-xs h-auto"
        />
      </div>
    );
  }

  return <div>{admin.email ? <AllProduct /> : <Admin />}</div>;
}

export default product;
