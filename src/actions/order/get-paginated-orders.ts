"use server"

import { auth } from "@/auth.config"

export const getPaginatedOrders = async () => {

    const session = await auth()

    if( session?.user.role !=="admin") {
        return{
            ok:false,
            message: "Debe de estar autenticado con rol de admin para realizar esta acción"
        }
    }

    try {
        
        const orders = await prisma?.order.findMany({
            orderBy:{
                createdAt:"desc"
            } ,
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