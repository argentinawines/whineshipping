import Image from "next/image";
import banner from "../../assets/portada.svg";

export default function Landing() {
  return (
    <div id="main">
      <section id="one" className="relative w-full">
        {/* Logo local */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={56}
          priority
          className="absolute top-2 left-2 z-20 bg-black/50 p-1 h-9 sm:h-10 md:h-14 w-auto"
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
