export const revalidate= 604800 //7 días en cache

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug)


  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">


        {/* Mobile slideshow */}
        <ProductMobileSlideShow className="block md:hidden" title={product.title} images={product.images} />

        {/* Desktop slideshow */}
        <ProductSlideShow className="hidden md:block" title={product.title} images={product.images} />
      </div>

      {/* Detalles */}

      <div className="cols-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/*Selector de tallas*/}
        <SizeSelector
          selectedSize={product.sizes[1]}
          availableSizes={product.sizes}
        />
        {/*Selector de Cantidad*/}
        <QuantitySelector quantity={2} />
        {/*Button*/}

        <button className="btn-primary my-5">Agregar al carrito</button>

        {/*Descripción*/}
        <h3 className="font-bold text-sm ">Descripción</h3>
        <p className="font-light text-pretty ">{product.description}</p>
      </div>
    </div>
  );
}
