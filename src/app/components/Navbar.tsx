"use client";

import { useState } from "react";
import { NavLogo, navItems } from "../const";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-background text-text border-b border-border flex justify-between items-center py-2">
      <Link href="/">
        <h2 className="text-2xl font-semibold text-text flex-none w-[200px]">
          {NavLogo}
        </h2>
      </Link>

      <div className="lg:hidden flex">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Image
            src="/icon/hamburgerIcon.svg"
            height={40}
            width={40}
            alt="hamburger menu icon"
          />
        </button>
      </div>

      {/* For mobile screens */}
      {isOpen && (
        <div className="absolute right-5 top-12 rounded-xl bg-background-accent">
          {navItems.map(({ title, urlPath }, index) => (
            <Link
              href={urlPath}
              key={index}
              className="cursor-pointer focus:bg-text-accent"
            >
              <div className="hover:bg-background-accent py-2 px-5 rounded-xl  flex-none">
                {title}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* For desktop screens */}
      <div className="hidden lg:flex items-center gap-2 ">
        {navItems.map(({ title, urlPath }, index) => (
          <Link href={urlPath} key={index}>
            <div className="hover:bg-background-accent py-2 px-5 rounded-xl cursor-pointer flex-none">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
