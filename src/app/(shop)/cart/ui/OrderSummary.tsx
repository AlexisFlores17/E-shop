"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

  const [load, setLoad] = useState(false);  
  const { subTotal, total, tax, itemsInCart } = useCartStore(
    (state) => state.getSummaryInformation()
  );
  const router = useRouter();

  useEffect(() => {
    
    setLoad(true);

    return () => {
      
    }
  }, [])

  useEffect(() => {
  
      if ( itemsInCart === 0 && load=== true )   {
        router.replace('/empty')
      }
  
  
  },[itemsInCart, load, router])

  if(!load) return <p>Loading...</p>
  


  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart ===1 ? "1 artículo" : `${itemsInCart} artículos`}</span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>
      <span>Impuestos</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span className=" mt-5 text-2xl">Total</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>{" "}
    </div>
  );
};
