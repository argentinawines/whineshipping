"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import {
  addToCart,
  closeModal,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/action";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../Components/Menu";
import Login from "../login/page.js";
import { paises } from "../Components/paises";
import ButtonPaypal from "../Components/ButtonPaypal";
import {
  createCart,
  createOrder,
  clearCart,
  getOrder,
  getCountry,
} from "../../redux/action.js";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Hooks de estado
  const [mounted, setMounted] = useState(false);
  const [formCart, setFormCart] = useState([]);
  const [paypalVisible, setPaypalVisible] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [obsevation, setObsevation] = useState("");
  const [pendingOrder, setPendingOrder] = useState(null);
  const [isConsulta, setIsConsulta] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  //const [totalBotellas, setTotalBotellas] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    totalPrice: 0,
    userId: null,
  });

  const formRef = useRef(null);

  // Selectores
  const cart = useSelector((state) => state.cartProducts);
  const order = useSelector((state) => state.orders);
  const orderCreated = useSelector((state) => state.createOrder);
  const countries = useSelector((state) => state.getCountry);

  const handleConfirEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  // Montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Autenticación y validación de sesión
  useEffect(() => {
    if (!mounted) return;

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      // const user = localStorage.getItem("service");
      const loginTime = localStorage.getItem("loginTime");

      // if (!user || !loginTime) {
      //   router.push("/login");
      //   return;
      // }

      const loginDate = new Date(loginTime);
      const now = new Date();
      const diffInHours = (now - loginDate) / (1000 * 60 * 60);

      if (diffInHours > 2) {
        // localStorage.removeItem("service");
        localStorage.removeItem("loginTime");
        // localStorage.removeItem("cartProducts");
        // router.push("/login");
      } else {
        const parsedUser = JSON.parse(user);
        setFormData((prev) => ({
          ...prev,
          // email: parsedUser.email,
          // userId: parsedUser.id,
        }));
        // setHasUser(true);

        setFormData((prev) => ({
          ...prev,
          // email: parsedUser.email,
          // userId: parsedUser.id,
        }));
      }
    }
  }, [mounted]);

    useEffect(() => {
    const img = document.createElement('img');
    img.src = 'https://www.google.com/pagead/1p-conversion/993701045/?label=6skCCNO04OABELXZ6tkD&guid=ON&script=0';
    img.style.display = 'none';
    document.body.appendChild(img);
  }, []);

  // Obtener ordenes
  useEffect(() => {
    dispatch(getOrder());
    dispatch(getCountry());
  }, [dispatch]);

  // Calcular última orden
  const lastOrder =
    Array.isArray(order) && order.length > 0
      ? Math.max(...order.map((o) => o.id))
      : 0;

  const [send, setSend] = useState(0);
  const invoice = lastOrder + 1;
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  // console.log('send', send);
  // console.log('typeof send', typeof send);
  const totalWithShipping = parseFloat(total.toFixed(2)); // ✅ ahora es un número con 2 decimales
  const totalPrice = parseFloat((totalWithShipping + send).toFixed(2)); // ✅ total final con envío
  // console.log('totalPrice', totalPrice);

  const handleIncrease = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalPrice,
    }));
  }, [totalPrice]);

  useEffect(() => {
    if (!orderCreated?.orderCreated?.id) return;

    const createdId = orderCreated.orderCreated.id;

    // Si fue una consulta (por país no válido o exceso de botellas)
    if (isConsulta) {
      const dataWithId = {
        ...pendingOrder,
        id: createdId,
        invoice: pendingOrder?.id || invoice,
        obsevation:
          obsevation || "Consulta por país no contemplado o exceso de botellas",
      };

      // sendEmail(dataWithId);
      toast.success(
        "Your request has been submitted. We will contact you shortly.",
        { autoClose: 5000 }
      );
      return; // 🧠 No continuar creando carrito ni limpiando
    }

    // Evitar loop si ya se creó el carrito
    if (formCart.length > 0) return;

    const updatedCart = cart.map(({ id, ...rest }) => ({
      ...rest,
      productId: id,
      orderId: createdId,
      // userId: formData.userId,
    }));

    setFormCart(updatedCart);
    dispatch(createCart(updatedCart));
    // dispatch(clearCart());

    if (formRef.current) {
      sendEmail({
        ...formData,
        invoice: createdId,
        obsevation: "orden pagada por PayPal",
      });
    }

    toast.success("Payment processed satisfactorily", { autoClose: 5000 });
    setTimeout(() => router.push("/"), 5000);
  }, [orderCreated?.orderCreated?.id]);

  useEffect(() => {
    if (formData.country && cart.length > 0) {
      setPaypalVisible(false);
      const selectedCountry = paises.find(
        (c) => c.nombre.toLowerCase() === formData.country.trim().toLowerCase()
      );
      if (!selectedCountry) return setSend(0);

      // Filtra ítems en oferta
      const offers = cart.filter((item) => item.offer === true);

      // Cada ítem con oferta cuenta como 6 unidades
      const botellasOfer = offers.reduce(
        (total, item) => total + item.quantity * 6,
        0
      );
    

      // Filtra ítems NO en oferta para sumar sus cantidades reales
      const comunes = cart.filter((item) => item.offer !== true);
      const botellasComunes = comunes.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Total de botellas contando lógicas especiales
      const totalBotellas = botellasOfer + botellasComunes;

      // Busca la tarifa adecuada según el país y total de botellas
      const tarifas = selectedCountry.tarifa
        .map((t) => ({
          cantidad: parseInt(t.cantidad_botellas),
          valor: t.valor_usd,
        }))
        .filter((t) => t.cantidad >= totalBotellas)
        .sort((a, b) => a.cantidad - b.cantidad);

      // Establece el costo de envío
      setSend(tarifas.length > 0 ? tarifas[0].valor : 0);
    }
  }, [formData.country, cart]);

  const handleValidateAndShowPaypal = () => {
    const selectedCountry = paises.find(
      (c) => c.nombre.toLowerCase() === formData.country.trim().toLowerCase()
    );
    const offers = cart.filter((item) => item.offer === true);
    const comunes = cart.filter((item) => item.offer !== true);
    const botellasOfer = offers.reduce(
      (total, item) => total + item.quantity * 6,
      0
    );
    const botellasComunes = comunes.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalBotellas = botellasOfer + botellasComunes;

    if (!selectedCountry) {
      setObsevation("País no disponible.");
      setModalMessage("For deliveries to your country, please let us know.");
      setPendingOrder({
        ...formData,
        id: invoice,
        observacion: "País no disponible.",
      });
      setShowModal(true);
      return;
    }

    const maximo = parseInt(selectedCountry.maximo, 10);
    if (totalBotellas > maximo) {
      setObsevation(
        ` La cantidad (${totalBotellas}) supera el máximo para ${selectedCountry.nombre} (${maximo}).`
      );
      setModalMessage(
        ` The quantity (${totalBotellas}) exceeds the limit for ${selectedCountry.nombre} (${maximo}). For more quantities, please let us know.`
      );
      setPendingOrder({
        ...formData,
        id: invoice,
        observacion: `Supera máximo permitido (${maximo}). `,
      });
      setShowModal(true);
      return;
    }

    setPaypalVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newOrder = { ...formData, id: invoice };
    dispatch(createOrder(newOrder));
  };

  const sendEmail = (data) => {
    const templateParams = {
      ...data,
    };

    emailjs
      .send(
        "service_iwn7ers",
        "template_dggh70c",
        templateParams,
        "aDUyTzKFxobcIl12v"
      )
      .then((response) => {
        console.log(
          "Correo enviado con éxito:",
          response.status,
          response.text
        );
      })
      .catch((err) => {
        console.error("Error al enviar correo:", err);
      });
  };

  if (!mounted) return null;

  const handleModalConfirm = () => {
    if (pendingOrder) {
      setIsConsulta(true); // 🧠 importante
      // dispatch(createOrder(pendingOrder));
      const phone = "5492613035259"; // Número con código de país y sin + (por ejemplo, Argentina)
      const message =
        "Hello, I'm trying to make a purchase on your website, but I received a message indicating that I need to contact you. Could you please assist me?"; // Mensaje que querés enviar
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)} `;

      window.open(url, "_blank");

      toast.success(
        "Your request has been submitted. We will contact you shortly.",
        { autoClose: 5000 }
      );
    }
    setShowModal(false);

    router.push("/");
  };

  return (
    <div>
      <Menu />

      {/* {hasUser ? () */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 ">
        <div className="px-4 pt-8 mt-[50px]">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.map((e) => {
              return (
                <div
                  className="flex items-center gap-4 bg-white rounded-lg p-5 border shadow-sm"
                  key={e.id}
                >
                  {/* Contenedor de imagen y botones */}
                  <div className="flex flex-col items-center">
                    {/* Imagen */}
                    <img
                      src={e?.dbimages?.[0]?.url || "/placeholder.jpg"}
                      alt={e.name || "Imagen"}
                      className="w-24 h-24 object-cover rounded-md border"
                    />

                    {/* Botones debajo de la imagen */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={() => dispatch(decreaseQuantity(e.id))}
                      >
                        -
                      </button>

                      <span>{e.quantity}</span>

                      <button
                        className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={() => handleIncrease(e)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Contenido horizontal */}
                  <div className="flex-1 flex items-center justify-between flex-wrap gap-6 text-base text-gray-800">
                    {/* Nombre */}
                    <div className="min-w-[120px]">
                      <p className="text-gray-700 font-semibold">Name</p>
                      <span className="font-medium">{e.name}</span>
                    </div>

                    {/* Cantidad */}
                    <div className="min-w-[80px] text-center">
                      <p className="text-gray-700 font-semibold">Amount</p>
                      <span>{e.quantity}</span>
                    </div>

                    {/* Precio */}
                    <div className="min-w-[80px] text-center">
                      <p className="text-gray-700 font-semibold">Price</p>
                      <span>${e.price}</span>
                    </div>

                    {/* Subtotal */}
                    <div className="min-w-[100px] text-center">
                      <p className="text-gray-700 font-semibold">Subtotal</p>
                      <p className="font-bold">
                        ${(e.price * e.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 mt-[90px]">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your details and provide your payment.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Your Name (required)
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your Name "
              />

              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email (required)
            </label>
            <input
              type="text"
              name="email"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email (required)"
              onChange={handleChange}
              required
              value={formData.email}
            />
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Confirm Email (required)
            </label>
            <input
              type="text"
              name="email2"
              className={`w-full rounded-md border px-2 py-3 text-sm shadow-sm outline-none focus:z-10 ${
                confirmEmail && confirmEmail !== formData.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="Confirm Email (required)"
              onChange={handleConfirEmailChange}
              required
              value={confirmEmail}
            />
            {confirmEmail && confirmEmail !== formData.email && (
              <p className="text-red-500 text-sm mt-1">
                Los correos no coinciden.
              </p>
            )}
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Your phone (required)
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                name="phone"
                required
                onChange={handleChange}
                value={formData.phone}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your Phone"
              />

              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Delivery Address (required)
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                required
                value={formData.address}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your mailing adress"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Country (required)
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={formData.country}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Please select your country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {formData.country !== "United States" &&
                formData.country !== "" ? (
                  <h1 style={{ color: "red" }}>
                    {" "}
                    duties at destination are not included
                  </h1>
                ) : null}
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="city"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="City (required)"
                onChange={handleChange}
                required
                value={formData.city}
              />

              <input
                type="text"
                name="postalCode"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP (required)"
                required
                onChange={handleChange}
                value={formData.postalCode}
              />
            </div>
            <input
              type="text"
              id="invoice"
              name="invoice"
              onChange={handleChange}
              value={invoice}
              style={{ display: "none" }}
            />
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  ${totalWithShipping}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">${send}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p
                className="text-2xl font-semibold text-gray-900"
                name="totalPrice"
                id="totalPrice"
              >
                ${totalPrice}
              </p>
            </div>
          </div>
          {!formData.name ||
          !formData.phone ||
          !formData.address ||
          !formData.country ||
          !formData.email ||
          !confirmEmail ||
        confirmEmail !== formData.email ||
          !formData.city ||
          !formData.postalCode ? null : !paypalVisible ? (
            <button
              onClick={handleValidateAndShowPaypal}
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded"
            >
              Continue to Payment
            </button>
          ) : (
            <ButtonPaypal
              totalValue={totalPrice}
              invoice={invoice}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 z-50 max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">Important Information</h2>
              <p className="mb-4 text-sm text-gray-700">{modalMessage}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Contact me
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={7000} />
      </div>
      {/* ) : (
        <Login />
      )} */}
    </div>
  );
}

export default Page;
