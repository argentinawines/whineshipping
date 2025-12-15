import React from "react";
import banner from "../../assets/portada.svg";
import Image from "next/image";


function Landing() {
  return (
   <div id="main" >
  <section id="one" className="relative w-full">
    {/* Logotipo */}
    <img
      src="http://vinos.sistemas4b.com/wp-content/uploads/2020/04/fhdhd-03.webp"
      alt="Flowbite Logo"
      className="
      
        absolute 
        top-2 left-2 
        h-9 sm:h-10 md:h-14
        z-20 
        bg-black bg-opacity-50 
        p-1
      "
    />

    {/* Imagen Banner */}
    <div className="w-full">
      <Image 
        src={banner} 
        alt="Banner" 
        className="w-full object-cover max-h-[80vh] h-auto block" 
      />
    </div>
  </section>
</div>
  );
}

export default Landing;
