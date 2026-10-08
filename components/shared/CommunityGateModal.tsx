"use client";

import { useTranslations } from "next-intl";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { LogIn, Sparkles, UserPlus, X } from "lucide-react";
import { COMMUNITY_URLS } from "@/lib/constants";
import { Button } from "./Button";
import { LinkButton } from "./LinkButton";

export interface CommunityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Already-translated reason shown under the title. */
  message?: string;
}

/** Shown when a visitor tries a members-only action (like, comment, save). */
export function CommunityGateModal({ isOpen, onClose, message }: CommunityGateModalProps) {
  const t = useTranslations("gate");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[80]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-primary-deep/55 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface p-7 shadow-lift transition duration-300 ease-out data-[closed]:translate-y-4 data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-secondary to-secondary-dark" aria-hidden="true" />

          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="absolute end-4 top-4 grid size-9 place-items-center rounded-full text-content transition-colors hover:bg-surface-muted hover:text-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-secondary/15 text-secondary-dark">
            <Sparkles className="size-6" aria-hidden="true" />
          </div>

          <DialogTitle className="text-xl font-bold text-primary">{t("title")}</DialogTitle>
          <p className="mt-2 leading-loose text-content">{message ?? t("defaultMessage")}</p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <LinkButton
              href={COMMUNITY_URLS.register}
              external
              variant="secondary"
              fullWidth
              icon={<UserPlus className="size-4" />}
              iconPosition="start"
            >
              {t("join")}
            </LinkButton>
            <LinkButton
              href={COMMUNITY_URLS.login}
              external
              variant="outline"
              fullWidth
              icon={<LogIn className="size-4 rtl:-scale-x-100" />}
              iconPosition="start"
            >
              {t("login")}
            </LinkButton>
          </div>

          <Button variant="ghost" fullWidth onClick={onClose} className="mt-2">
            {t("continueAsVisitor")}
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
