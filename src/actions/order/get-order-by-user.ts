"use server"

import { auth } from "@/auth.config"

export const getOrderByUSer = async () => {

    const session = await auth()

    if(!session?.user) {
        return{
            ok:false,
            message: "Debe de estar autenticado para realizar esta acción"
        }
    }

    try {
        
        const orders = await prisma?.order.findMany({
            where:{
                userId: session.user.id
            },
            include:{
                OrderAddress:{
                    select:{
                        firstName:true,
                        lastName:true,
                    }
                }
            }
        })

        if(!orders) {
            return{
                ok:false,
                message: "No se encontraron ordenes"
            }
        }

        return{
            ok:true,
            orders: orders
        }
    } catch (error) {
        return{
            ok:false,
            message: "Ocurrió un error al obtener las ordenes"
        }
    }
}