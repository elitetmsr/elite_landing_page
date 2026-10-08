import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { LinkButton } from "@/components/shared/LinkButton";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export interface EcosystemCardProps {
  tone: "primary" | "secondary";
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
  ctaLabel: string;
  href: string;
  external?: boolean;
}

export function EcosystemCard({
  tone,
  icon: Icon,
  image,
  imageAlt,
  tag,
  title,
  description,
  points,
  ctaLabel,
  href,
  external = false,
}: EcosystemCardProps) {
  const isPrimary = tone === "primary";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-edge bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-secondary/40 hover:shadow-2xl hover:shadow-primary/10 motion-reduce:transform-none">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Reveal preset="imageReveal" className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transform-none"
          />
        </Reveal>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" aria-hidden="true" />
        <Badge variant="glass" className="absolute start-5 top-5">
          {tag}
        </Badge>
        <span
          className={cn(
            "absolute bottom-5 start-5 grid size-14 place-items-center rounded-2xl text-white shadow-lift",
            isPrimary ? "bg-primary" : "bg-gradient-to-br from-secondary to-secondary-dark"
          )}
          aria-hidden="true"
        >
          <Icon className="size-7" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="mt-3 leading-loose text-content">{description}</p>

        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 font-medium text-body">
              <CheckCircle2
                className={cn("mt-0.5 size-5 shrink-0", isPrimary ? "text-accent" : "text-secondary")}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <LinkButton
            href={href}
            external={external}
            variant={isPrimary ? "outline" : "secondary"}
            icon={<ArrowRight className="size-4 rtl:-scale-x-100" />}
          >
            {ctaLabel}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
