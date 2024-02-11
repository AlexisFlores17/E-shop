"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;

  if (isNaN(Number(take))) take = 12;

  if (page < 1) page = 1;

  try {
    //Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },

      //Por genero

      where:{
        gender:gender
      }

    });


    //Obtener total de paginas

    const totalCount = await prisma.product.count({where:{gender:gender}})
    const totalPages = Math.ceil(totalCount / take)

    //Obtener el total de paginas

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
