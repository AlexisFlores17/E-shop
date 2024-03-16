"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const SideBar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const [loaded, setLoaded] = useState(true)

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  const isAdmin = (session?.user.role ==="admin")

  useEffect(() => {

  }, []);

  return (
    <div>
      {/*Background black */}

      {isSideMenuOpen && (
        <div className=" fixed top-0  left-0 w-screen h-dvh z-[9000] bg-black opacity-30" />
      )}
      {/*Blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className=" fade-in fixed top-0  left-0 w-screen h-dvh z-[9000] backdrop-blur-sm "
        />
      )}

      {/*Sidemenu */}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-dvh bg-white z-[9999] shadow-2xl  transition-all duration-300 ",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />
        {/*Input search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 "
          />
        </div>

        {/*Menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href="/orders"
              onClick={() => closeSideMenu()}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <button
              onClick={() => logout()}
              className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        

        { isAdmin && (
          <>
            <div className="w-fill h-px bg-gray-200 my-10" />
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
