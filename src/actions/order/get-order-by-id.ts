"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No se ha iniciado sesión",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            size: true,
            quantity: true,

            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no es una orden válida`;

    if (session.user.role === "user") {
      if (session.user.id !== order.userId)
        throw "No tienes permisos para ver esta orden";
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener la orden",
    };
  }
};
