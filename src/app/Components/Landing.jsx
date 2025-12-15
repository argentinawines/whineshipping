import React from "react";
import banner from "../../assets/portada.svg";
import Image from "next/image";

function Landing() {
  return (
    <div id="main">
      <section id="one" className="relative w-full">
        {/* Logo local */}
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-2 left-2 h-9 sm:h-10 md:h-14 z-20 bg-black bg-opacity-50 p-1"
        />

        {/* Banner */}
        <div className="w-full">
          <Image
            src={banner}
            alt="Banner"
            priority
            className="w-full object-cover max-h-[80vh] h-auto block"
          />
        </div>
      </section>
    </div>
  );
}

export default Landing;
