import React from "react";
import { NavLogo, navItems } from "../const";
import Link from "next/link";

function Navbar() {
  return (
    <div className="bg-background text-text py-2 border-b border-border flex justify-between">
      <Link href="/">
        <h2 className="text-2xl font-semibold text-text">{NavLogo}</h2>
      </Link>
      <div className="flex items-center gap-2">
        {navItems.map(({ title, urlPath }, index) => (
          <Link href={urlPath} key={index}>
            <div className="hover:bg-background-accent py-2 px-5 rounded-xl cursor-pointer">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
