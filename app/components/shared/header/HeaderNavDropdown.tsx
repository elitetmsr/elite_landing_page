"use client";

import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface HeaderNavDropdownItem {
  title: string;
  href: string;
}

export interface HeaderNavDropdownProps {
  label: string;
  items: HeaderNavDropdownItem[];
}

export function HeaderNavDropdown({ label, items }: HeaderNavDropdownProps) {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    const basePath = href.split("#")[0].split("?")[0];
    if (!basePath || basePath === "/") return false;
    return pathname === basePath || pathname.startsWith(basePath + "/");
  };

  const isDropdownActive = items.some((item) => isItemActive(item.href));

  return (
    <HeadlessMenu as="div" className="relative">
      <MenuButton
        className={cn(
          "group inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 cursor-pointer select-none relative",
          isDropdownActive
            ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
            : "text-body hover:text-secondary"
        )}
      >
        <span>{label}</span>
        <FiChevronDown
          className={cn(
            "size-4 transition-transform duration-300 group-data-[open]:rotate-180",
            isDropdownActive ? "text-secondary" : "text-content/60"
          )}
        />
      </MenuButton>

      <MenuItems
        modal={false}
        transition
        className="absolute top-full start-0 ltr:left-0 rtl:right-0 mt-2 z-[110] w-60 rounded-3xl bg-surface p-3 shadow-2xl border border-edge/60 transition-all duration-200 ease-out outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="space-y-1">
          {items.map((item) => {
            const active = isItemActive(item.href);
            return (
              <MenuItem key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200 text-start ltr:text-left rtl:text-right outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 ltr:hover:translate-x-1 rtl:hover:-translate-x-1 data-[focus]:bg-surface-alt data-[focus]:text-secondary",
                    active
                      ? "bg-secondary/10 text-secondary font-bold"
                      : "text-body hover:bg-surface-alt hover:text-secondary"
                  )}
                >
                  {item.title}
                </Link>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </HeadlessMenu>
  );
}
