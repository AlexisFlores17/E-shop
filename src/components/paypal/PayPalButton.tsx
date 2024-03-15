"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { SetTransactionId, paypalCheckPayment } from "@/actions";
import { on } from "events";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({orderId, amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();


  const roundedAmount = (Math.round(amount * 100))/100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 mt-2 bg-gray-300 rounded" />
      </div>
    );
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN', // Add the missing currency_code property
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: "CAPTURE"
    });

    const {ok} = await SetTransactionId(orderId,transactionId);
  

    
    if (!ok) {
      throw new Error("no se pudo actualizar la orden")
    }

    return transactionId;
  };


  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    console.log("onApprove");
    const details = await actions.order?.capture();

    if(!details) return;

    await  paypalCheckPayment(details.id ?? '');  
    
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
};
