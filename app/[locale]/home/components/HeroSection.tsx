"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BrainCircuit, Building2, ChevronDown, Globe, Lightbulb, Smartphone, Users } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { LinkButton } from "@/components/shared/LinkButton";
import { COMMUNITY_URLS, MEDIA } from "@/lib/constants";
import { fadeInUp, floatLoop, floatLoopOffset, heroStagger, heroTextReveal, slideInFromEnd, withDelay } from "@/lib/animations";

const CAPABILITIES = [
  { key: "web", icon: Globe },
  { key: "mobile", icon: Smartphone },
  { key: "erp", icon: Building2 },
  { key: "ai", icon: BrainCircuit },
] as const;

export function HeroSection() {
  const t = useTranslations("home.hero");
  const isRtl = useLocale() === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle parallax: media drifts down and content fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-primary-deep pb-24 pt-[calc(var(--header-height)+3rem)]"
    >
      {/* Background media: poster image always, video on md+ (skipped for reduced motion) */}
      <motion.div
        className="absolute inset-x-0 -bottom-[12%] -top-[12%] -z-10"
        style={prefersReducedMotion ? undefined : { y: mediaY }}
        aria-hidden="true"
      >
        <Image src={MEDIA.heroPoster} alt="" fill priority sizes="100vw" className="object-cover" />
        <video
          className="absolute inset-0 hidden size-full object-cover md:block motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MEDIA.heroPoster}
        >
          <source src={MEDIA.heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-primary-deep/70" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep via-primary-deep/20 to-primary-deep/50"
        aria-hidden="true"
      />
      <div className="absolute -top-40 start-[-10%] -z-10 size-[34rem] rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-48 end-[-8%] -z-10 size-[30rem] rounded-full bg-secondary/25 blur-3xl" aria-hidden="true" />

      <Container>
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-12"
          style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          {/* Copy */}
          <motion.div className="lg:col-span-7" variants={heroStagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
            >
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2.5 rounded-full bg-secondary" />
              </span>
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              variants={heroTextReveal}
              className="mt-6 text-balance text-4xl font-bold leading-[1.2] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.15]"
            >
              {t("title")}
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-6 max-w-prose text-lg leading-loose text-white/80">
              {t("subtitle")}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/solutions"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="size-5 rtl:-scale-x-100" />}
              >
                {t("primaryCta")}
              </LinkButton>
              <LinkButton
                href={COMMUNITY_URLS.register}
                external
                variant="glass"
                size="lg"
                icon={<Users className="size-5" />}
                iconPosition="start"
              >
                {t("secondaryCta")}
              </LinkButton>
            </motion.div>

            {/* Capability chips (mobile / tablet; desktop shows them in the floating card) */}
            <motion.ul variants={fadeInUp} className="mt-10 flex flex-wrap gap-2 lg:hidden">
              {CAPABILITIES.map(({ key, icon: Icon }) => (
                <li
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-white/90 backdrop-blur-md"
                >
                  <Icon className="size-4 text-secondary" aria-hidden="true" />
                  {t(`chips.${key}`)}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Floating cards (desktop). Stacked in a flex column: the ideas card overlaps only the
              list card's bottom padding, and the two float loops move apart, so no item is ever covered. */}
          <motion.div
            className="relative hidden lg:col-span-5 lg:flex lg:flex-col"
            variants={withDelay(slideInFromEnd(isRtl), 0.6)}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={floatLoop}
              animate="animate"
              className="relative z-0 w-80 self-end rounded-3xl border border-white/15 bg-primary-deep/80 p-6 text-white shadow-lift will-change-transform"
            >
              <ul className="space-y-3">
                {CAPABILITIES.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-semibold leading-snug">{t(`chips.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.a
              href={COMMUNITY_URLS.ideas}
              target="_blank"
              rel="noopener noreferrer"
              variants={floatLoopOffset}
              animate="animate"
              className="group relative z-10 -mt-4 w-80 self-start rounded-3xl bg-surface p-5 shadow-lift transition-shadow duration-300 will-change-transform hover:shadow-glow"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-secondary-dark">
                <span className="grid size-8 place-items-center rounded-lg bg-secondary/15">
                  <Lightbulb className="size-4" aria-hidden="true" />
                </span>
                {t("ideaCard.label")}
              </span>
              <span className="mt-3 block font-bold leading-snug text-primary">{t("ideaCard.title")}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-content group-hover:text-primary">
                {t("ideaCard.cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>

      <a
        href="#ecosystem"
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-1 text-xs font-semibold text-white/70 transition-colors hover:text-white"
      >
        {t("scrollHint")}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </a>
    </section>
  );
}
