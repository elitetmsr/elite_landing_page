"use client";

import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { COMPANY_INFO } from "@/lib/constants";
import { Logo } from "../Logo";

export interface FooterBrandColumnProps {
  tagline: string;
  address: string;
}

export function FooterBrandColumn({ tagline, address }: FooterBrandColumnProps) {
  return (
    <div className="lg:col-span-4 space-y-4">
      <Logo tone="dark" />
      <p className="text-sm leading-relaxed text-content-dark/90 max-w-sm">
        {tagline}
      </p>

      <div className="space-y-2.5 text-xs text-content-dark pt-2">
        <div className="flex items-center gap-2.5 group flex-wrap">
          <FiPhone className="size-4 text-secondary shrink-0 transition-transform duration-200 group-hover:scale-110" />
          {COMPANY_INFO.phones.map((phone, idx) => (
            <span key={phone} className="inline-flex items-center gap-2.5">
              {idx > 0 && <span className="text-edge/40">·</span>}
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                dir="ltr"
                className="font-semibold text-body-dark hover:text-secondary transition-colors"
              >
                {phone}
              </a>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2.5 group">
          <FiMail className="size-4 text-secondary shrink-0 transition-transform duration-200 group-hover:scale-110" />
          <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-body-dark hover:text-secondary transition-colors">
            {COMPANY_INFO.email}
          </a>
        </div>
        <div className="flex items-start gap-2.5 group">
          <FiMapPin className="size-4 text-secondary shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-content-dark">{address}</span>
        </div>
      </div>
    </div>
  );
}
