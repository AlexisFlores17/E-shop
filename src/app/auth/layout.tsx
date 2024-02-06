
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ShopLayout({children}:Props) {    


  
  return (

    <main className="flex justify-center">
      <div className=" w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}
