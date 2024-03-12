"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { count } from "console";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  //verificar usuario en sesión

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay usuario en sesión",
    };
  }

  //Verificar los productos

  const products = await prisma?.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });


  //Calcular los montos
  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0
  );

  //Calcular el total

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;

      const product = products?.find(
        (product) => product.id === item.productId
      );

      if (!product) throw new Error(`${item.productId} no existe`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  //Crear la transacción

    try {
      const prismaTx = await prisma?.$transaction(async (tx) => {
        //1. actualizar el stock de productos
    
        const updatedProductsPromises = products?.map( (product) => {
    
            //Acumular valores
            const productQuantity = productIds
                .filter((p) => p.productId === product.id)
                .reduce((acc, item) => item.quantity + acc , 0);
    
            if(productQuantity ===0 ) {
                throw new Error(`${product.id} no tiene cantidad`);
            }
    
            return tx.product.update({
                where:{
                    id: product.id
                },
                data:{
                    inStock:{
                        decrement: productQuantity
                    }
                }
            })
    
    
        });
    
    
        const updatedProducts = await Promise.all(updatedProductsPromises || []);
    
        //Verificar valores negativos en la existencia
        updatedProducts.forEach( product =>{
          if(product.inStock <0) {
            throw new Error(`${product.title} no tiene cantidad`);
          }
        })
    
        //2. crear la orden - Encabezado - Detalle
    
        const order = await tx.order.create({
          data: {
            userId: userId,
            itemsInOrder: itemsInOrder,
            subTotal: subTotal,
            tax: tax,
            total: total,
    
            OrderItem: {
              createMany: {
                data: productIds.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price:
                    products?.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                })),
              },
            },
          },
        });
    
        //Validar si el price es cero y lanzar un error
    
        //3. Crear la dirección de la orden
        const { country, ...restAddress } = address;
    
        const orderAddress = await tx.orderAddress.create({
          data: {
            ...restAddress,
            countryId: country,
            orderId: order.id,
          },
        });
    
        return {
          order: order,
          orderAddress: orderAddress,
          updatedProducts: updatedProducts,
        };
      });

      return {
        ok: true,
        message: "Orden creada",
        order: prismaTx?.order,
        prismaTx: prismaTx,
      }
    
    } catch (error: any) {
      return {
        ok: false,
        message: error?.message || "Error al crear la orden",
      };
    }
};
