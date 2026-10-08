"use client";

import { useTranslations } from "next-intl";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "./Badge";

export interface IdeaCardProps {
  author: string;
  category: string;
  title: string;
  summary: string;
  techStack: string[];
  /** Called with a translated reason when a visitor tries a members-only action. */
  onRequireAuth: (reason: string) => void;
}

export function IdeaCard({ author, category, title, summary, techStack, onRequireAuth }: IdeaCardProps) {
  const t = useTranslations("ideaCard");

  const actions = [
    { key: "like", icon: ThumbsUp, label: t("like"), reason: t("gate.like") },
    { key: "comment", icon: MessageSquare, label: t("comment"), reason: t("gate.comment") },
    { key: "save", icon: Bookmark, label: t("save"), reason: t("gate.save") },
  ] as const;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-edge bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 motion-reduce:transform-none">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary"
            aria-hidden="true"
          >
            {author.charAt(0)}
          </span>
          <span className="truncate text-sm font-semibold text-content">{author}</span>
        </div>
        <Badge variant="secondary" size="sm">
          {category}
        </Badge>
      </div>

      <h3 className="text-lg font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-secondary-dark">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 leading-loose text-content">{summary}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" dir="ltr" aria-label={t("techStack")}>
        {techStack.map((tech) => (
          <li key={tech}>
            <Badge variant="neutral" size="sm">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-edge pt-4">
        <button
          type="button"
          onClick={() => onRequireAuth(t("gate.details"))}
          className="rounded-md text-sm font-bold text-secondary-dark underline-offset-4 hover:underline"
        >
          {t("viewDetails")}
        </button>

        <div className="flex items-center gap-1">
          {actions.map(({ key, icon: Icon, label, reason }) => (
            <button
              key={key}
              type="button"
              onClick={() => onRequireAuth(reason)}
              aria-label={label}
              title={label}
              className="grid size-9 place-items-center rounded-lg text-content transition-colors hover:bg-secondary/10 hover:text-secondary-dark"
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
