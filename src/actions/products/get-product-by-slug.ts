"use server"

export const getProductBySlug = async(slug:string)=>{

        try {
            
            const product = await prisma?.product.findFirst({
                include:{
                    ProductImage: true
                },
                where:{
                    slug: slug
                }
            })
            console.log("product", product);
            if(!product) return null;

            return {
                ...product,
                images: product.ProductImage.map( image => image.url)
            };
        } catch (error) {
            console.log(error)
            throw new Error("Error al obtener producto por slug")
        }

}