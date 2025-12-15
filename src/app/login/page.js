"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

      const messageListener = (event) => {
        console.log("Mensaje recibido desde:", event.origin);
        
        if (event.origin !== "https://backwine.onrender.com") return;

      const data = event.data;

      if (data.error) {
        router.push(`/pages/error?error=${data.error}`);
        return;
      }

        if (data.usuario) {
        
          
          localStorage.setItem('service', JSON.stringify(data.usuario));
          localStorage.setItem('loginTime', new Date().toISOString());
          router.push('/payment');
        }
      };

    window.addEventListener("message", messageListener);

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, [router]);

  const login = () => {
    const popup = window.open(
      "https://backwine.onrender.com/api/auth/callback/google",
      "_blank",
      "width=500,height=600"
    );

    if (!popup) {
      alert("Por favor habilita las ventanas emergentes.");
    }
  };

  if (!isClient) return null;

  return (

//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//   <div className="bg-white mx-4 p-8 rounded-lg shadow-2xl w-full md:w-1/2 lg:w-1/3 transform transition-all scale-100">
//     <h1 className="text-3xl font-bold mb-8 text-center">Sign in to proceed with your purchase.</h1>
//     <form>
//       <div className="mb-6">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 w-full rounded focus:outline-none focus:shadow-outline"
//           type="button"
//           onClick={login}
//         >
//           GOOGLE
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
<div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
  <div className="bg-white mx-4 p-8 rounded-lg shadow-2xl w-full md:w-1/2 lg:w-1/3">
    <h1 className="text-3xl font-bold mb-8 text-center">Sign in to proceed with your purchase.</h1>
    <form>
      <div className="mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 w-full rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={login}
        >
          GOOGLE
        </button>
      </div>
    </form>
  </div>
</div>
  );
}

export default Page;
