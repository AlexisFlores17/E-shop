"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { subTotal, total, tax, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore( state => state.cart);

  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    setLoaded(true);
    return () => {};
  }, []);
  
  const OnPlaceOrder = async() => {
    setIsPlacingOrder(true);

    const productToOrder = cart.map( product =>({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    })) 

    const resp = await placeOrder(productToOrder, address);
    
    console.log({resp});
    
    // await sleep(2);
    
    setIsPlacingOrder(false);
  }
  

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      <h2 className="text-2xl mb-2 ">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className=" mt-5 text-2xl">Total</span>
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(total)}
        </span>{" "}
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              políticas de privacidad
            </a>
          </span>
        </p>

        {/* <p className="text-red-500 mb-2">Error de Creación</p> */}

        <button
          onClick={OnPlaceOrder}
          className={
            clsx({
              "btn-primary":!isPlacingOrder,
              "btn-disabled":isPlacingOrder
            })
          }
          disabled={isPlacingOrder}
          // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
