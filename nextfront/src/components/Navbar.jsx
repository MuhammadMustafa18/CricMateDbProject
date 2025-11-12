"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // 👈 lets you check the current route

  const links = [
    { href: "/", label: "Home" },
    { href: "/matches", label: "Matches" },
    { href: "/teams", label: "Teams" },
    { href: "/players", label: "Players" },
  ];

  return (
    <div className="bg-neutral-800 w-full shadow-md p-5 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link href="/" className="text-3xl font-bold text-white">
        Cricmate
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xl font-bold ${
              pathname === link.href
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
