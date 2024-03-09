"use server";

import { auth } from "@/auth.config";
import type{ Address, Size } from "@/interfaces";
import { count } from "console";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds:ProductToOrder[], address:Address) => {

    //verificar usuario en sesión
    
    const session = await auth();
    const userId = session?.user.id;

    if( !userId) {
        return{
            ok:false,
            message:"No hay usuario en sesión"
        }
    }

    //Verificar los productos

    const products = await prisma?.product.findMany({
        where:{
            id:{
                in: productIds.map( product => product.productId)
            }
        }
    });

    //Calcular los montos
    const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0);

    //Calcular el total

    const {subTotal, tax, total} = productIds.reduce( (totals,item) => {

        const productQuantity = item.quantity;

        const product = products?.find( product=> product.id === item.productId);

        if(!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    },{subTotal:0, tax:0, total:0})

    //Crear la transacción

    const prismaTx = await prisma?.$transaction( async(tx) =>{
        //1. actualizar el stock de productos

        //2. crear la orden - Encabezado - Detalle

        //3. Crear la dirección de la orden

        return{
            ok:true,
            message:"Orden creada"
        }
    });

};
