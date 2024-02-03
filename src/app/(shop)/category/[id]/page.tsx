import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params:{
    id: Category
  }
}

const seedProducts = initialData.products;



export default function CategoryPage({params}:Props) {
  
  const {id} = params;
  const products = seedProducts.filter( producto => producto.gender === id);
  

  const labels: Record<Category, string>= {
    "men":"para Hombres",
    "women":"para Mujeres",
    "kid":"para Niños",
    "unisex": "para todos"
  }
  // if(id === "kids"){
  //   notFound();
  // }

  return (
    <>
      <Title className="mb-2" title={`Articulos ${labels[id]}`} subtitle="Temporal" />
      <ProductGrid products={products} />
    </>
  );
}