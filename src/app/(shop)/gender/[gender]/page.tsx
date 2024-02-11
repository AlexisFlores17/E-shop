
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces/product.interface";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";



interface Props {
  params:{
    gender: string,
    
  },
  searchParams:{
    page?: string
  }
}


export default async function CategoryPage({params, searchParams}:Props) {
  
  const {gender} = params;
  const page = searchParams.page? parseInt(searchParams.page) :1;
  const {products, totalPages} = await getPaginatedProductsWithImages({ page:page, gender: gender as Gender});
  
  const labels: Record<string, string>= {
    "men":"para Hombres",
    "women":"para Mujeres",
    "kid":"para Niños",
    "unisex": "para todos"
  }

  if( products.length ===0) {
    redirect(`/gender/${gender}`)
  }
  // if(id === "kids"){
  //   notFound();
  // }

  return (
    <>
      <Title className="mb-2" title={`Artículos ${labels[gender]}`} subtitle="Temporal" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}