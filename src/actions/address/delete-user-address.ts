"use server";

import prisma from "@/lib/prisma";

export const DeleteUserAddress = async (userId:string) =>{
    try {
        const deleted = await prisma.userAddress.deleteMany({
            where:{
                userId: userId
            }
        });

        return {
            ok: true
        };

    } catch (error) {
        console.log(error);
        message: "No se pudo eliminar la dirección del usuario."
    }
}