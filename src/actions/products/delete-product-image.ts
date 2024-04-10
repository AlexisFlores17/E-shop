"use server"

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string ) => {

    if(!imageUrl.startsWith("http")) {
        return {
            ok: false,
            errors: "Image not found"
        }
    }

    const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

    try {
        await cloudinary.uploader.destroy(imageName);

        const deletedImage = await prisma!.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product:{
                    select: {
                        slug: true
                    }
                }
            }
        });

        //Revalidar paths
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);
    
        return {
            ok: true,
            image: deletedImage
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error al eliminar la imagen"
        }
    }




}
