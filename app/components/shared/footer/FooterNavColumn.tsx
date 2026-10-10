"use client";

import { Link } from "@/i18n/navigation";

export interface FooterNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterNavColumnProps {
  title: string;
  items: readonly FooterNavItem[];
}

export function FooterNavColumn({ title, items }: FooterNavColumnProps) {
  return (
    <div className="lg:col-span-2 space-y-3">
      <h3 className="text-sm font-bold text-surface uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-2.5 text-xs text-content-dark">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-secondary hover:translate-x-1 rtl:hover:-translate-x-1 font-medium transition-all duration-200"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="inline-block hover:text-secondary hover:translate-x-1 rtl:hover:-translate-x-1 font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
