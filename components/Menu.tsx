"use client";

import { Inbox } from "@trycourier/react-inbox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronForward, IoChevronBack, IoLogOut } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const menus = [
  {
    name: "Overview",
    icon: "O",
    path: "/",
  },
  {
    name: "Booking",
    icon: "B",
    path: "/bookings",
  },
  {
    name: "Studio",
    path: "/studios",
    icon: "S",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "P",
  },
  {
    name: "Setting",
    path: "/setting",
    icon: "S",
  },
];

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={twMerge(
        "border-t md:border-t-0 z-50 border-r w-full md:max-w-[550px] border-l py-6 px-6 md:h-screen flex md:flex-col justify-between flex-grow-0 fixed bottom-0 md:sticky md:top-0 bg-white bg-opacity-20 backdrop-blur-lg overflow-x-auto no-scrollbar",
        collapsed && "md:w-[80px]",
      )}
    >
      <div>
        <Inbox />
        <div className="items-center justify-between mb-8 hidden md:flex">
          <Link href="/" className="text-2xl font-semibold">
            {collapsed ? "D." : "Dashco."}
          </Link>
        </div>

        <ul className="text-primary flex md:flex-col max-w-full">
          {menus.map((menu) => (
            <li
              key={menu.path}
              className="md:mb-3 mr-6 md:mr-0 last:mb-0 last:mr-0"
            >
              <Link href={menu.path}>{collapsed ? menu.icon : menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col relative">
        <div className={twMerge("hidden md:flex justify-end")}>
          <button
            type="button"
            className="text-2xl mb-3"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? <IoChevronForward /> : <IoChevronBack />}
          </button>
        </div>
        <button
          className="hidden border border-primary md:flex items-center justify-center p-2"
          type="button"
        >
          {collapsed ? <IoLogOut /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
