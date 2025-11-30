import React from "react";
import { NavLink, TNavbar } from "./types/types";
import Link from "next/link";

type Props = {
  data: TNavbar;
};
export default function Navbar({ data }: Props) {
  const navLinks = data?.navLinks?.navLink;
  return (
    <div>
      {navLinks?.map((link: NavLink) => {
        return (
          <Link key={link.id} href={link.path}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
