
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ShopLayout({children}:Props) {    

  const session = await auth();

  if(session) {
    redirect("/")
  } 

  return (

    <main className="flex justify-center">
      <div className=" w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}
