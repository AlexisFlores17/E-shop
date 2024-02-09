import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { Category } from '../interfaces/product.interface';

async function main() {
  //Borrar registros previos
  // await Promise.all([
  await  prisma.productImage.deleteMany();
  await  prisma.product.deleteMany();
  await  prisma.category.deleteMany();
  // ]);

  const { categories, products } = initialData;

  //Categorías

  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);
  

  //Productos

  products.forEach( async(product) => {
    const {type,images,...rest} = product;

    const dbProduct = await prisma.product.create({
      data:{
        ...rest,
        categoryId: categoriesMap[type]
      }
    })
    //Images
    
    const imageData = images.map( image =>({
      url:image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data:imageData
    })

  })

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();