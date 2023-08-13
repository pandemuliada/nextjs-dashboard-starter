import { headers } from "next/headers";
import Link from "next/link";

const menus = [
  {
    name: "Booking",
    path: "/",
  },
  {
    name: "Studio",
    path: "/studios",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Setting",
    path: "/setting",
  },
  {
    name: "Logout",
    path: "/logout",
  },
];

const SidebarMenu = () => {
  return (
    <div className="px-10 py-10 border-r w-[250px] absolute h-full max-h-screen overflow-y-auto">
      <ul>
        {menus.map((menu) => (
          <li key={menu.path} className="mb-3 last:mb-0">
            <Link href={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
