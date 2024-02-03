import { TopMenu } from "@/components";
import { SideBar } from "@/components/ui/sidebar/SideBar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" min-h-screen">
      <TopMenu />
      <SideBar />
      <div className="px-0 md:px-10">
        {children}

      </div>
    </main>
  );
}
