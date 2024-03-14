"use server";

export const SetTransactionId = async (orderId: string,transactionId: string ) => {
  try {
    const order = await prisma?.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    });

    if(!order) {
        return {
            ok:false,
            message:"No se pudo actualizar el id"
        }
    }

    return {
      ok: true
    };
    
  } catch (error) {
    console.log(error);
    return {
        ok: false,
        message:"Error al actualizar el id"
    }
  }
};
