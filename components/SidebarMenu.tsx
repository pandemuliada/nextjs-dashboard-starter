"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronForward, IoChevronBack, IoLogOut } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const menus = [
  {
    name: "Booking",
    icon: "B",
    path: "/",
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
        "px-5 py-10 border-r w-[250px] sticky top-0 h-screen flex flex-col justify-between",
        collapsed && "w-[80px]",
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-semibold">
            {collapsed ? "D." : "Dashco."}
          </Link>
        </div>
        <ul className="text-primary">
          {menus.map((menu) => (
            <li key={menu.path} className="mb-3 last:mb-0 relative">
              <Link href={menu.path}>{collapsed ? menu.icon : menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <div
          className={twMerge("flex justify-end", collapsed && "justify-center")}
        >
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
          className="border border-primary flex items-center justify-center p-2"
          type="button"
        >
          {collapsed ? <IoLogOut /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
