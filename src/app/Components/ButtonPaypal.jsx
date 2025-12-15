// components/ButtonPaypal.jsx o .tsx
"use client";
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from "next/navigation";

const ButtonPaypal = (props) => {
  const router = useRouter();

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: props.totalValue,
              },
              invoice_id: props.invoice,
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();

        if (order.status === 'COMPLETED') {
          // Llama tu función
          props.handleSubmit();

          // Redirige a la página de éxito
          router.push('/payment-success');
        }
      }}
      onError={(err) => {
        console.error('Error en el pago:', err);
        // Aquí podrías redirigir a una página de error si lo deseas
      }}
    />
  );
};

export default ButtonPaypal;




// import React from 'react';
// import { PayPalButtons } from '@paypal/react-paypal-js';


// const ButtonPaypal = (props) => {







// console.log('Props en ButtonPaypal:', props);
//   return (
//     <PayPalButtons
//       createOrder={(data, actions) => {
//         return actions.order.create({
//           // Aquí debes definir los detalles del pedido, por ejemplo:
//           purchase_units: [{
//             amount: {
//               value: props.totalValue,
//             },
//             invoice_id: props.invoice,
//           }],
//         });
//       }}
//       onApprove={async (data, actions) => {
//         const order = await actions.order?.capture();
      
        
        
//         if (order.status === 'COMPLETED') {
//             props.handleSubmit()
//         }
//         // props.onApprove(order); 

//       }}
//       onError={(err) => {
//         console.error('Error en el pago:', err);
//         // props.onError(err);Llama a la función onError pasada como prop
//       }}
//     />
//   );
// };

// export default ButtonPaypal;