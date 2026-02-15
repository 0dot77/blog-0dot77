"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/lab", label: "Lab" },
  { href: "/blog", label: "Blog" },
  { href: "/sprint", label: "Sprint" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-[1440px] mx-auto h-16 flex items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-lg font-bold text-text hover:text-accent transition-colors"
        >
          0dot77
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-[family-name:var(--font-mono)] text-sm transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-accent font-bold"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
