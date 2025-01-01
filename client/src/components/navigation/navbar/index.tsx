import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link
                href="/users"
                className={`hover:underline underline-offset-4 transition-all duration-150 ${
                  pathname === "/users" ? "underline" : ""
                }`}
              >
                <p>Users</p>
              </Link>
            </li>
            <li>
              <Link
                href="/createUser"
                className={`hover:underline underline-offset-4 transition-all duration-150 ${
                  pathname === "/createUser" ? "underline" : ""
                }`}
              >
                <p>Create New User</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
