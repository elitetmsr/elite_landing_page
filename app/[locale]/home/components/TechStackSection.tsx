import { useTranslations } from "next-intl";
import { TECH_STACK } from "@/lib/constants";

/** Infinite CSS marquee of technologies. Pauses on hover; static for reduced motion. */
export function TechStackSection() {
  const t = useTranslations("home.tech");

  return (
    <section aria-label={t("label")} className="border-b border-edge bg-surface py-10">
      <p className="mb-6 text-center text-sm font-semibold text-content">{t("label")}</p>
      <div
        dir="ltr"
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1 ? true : undefined}>
              {TECH_STACK.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-alt px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:border-secondary/50 hover:bg-secondary/10"
                >
                  <span className="size-1.5 rounded-full bg-secondary" aria-hidden="true" />
                  {tech}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
