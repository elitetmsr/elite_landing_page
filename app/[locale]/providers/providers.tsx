"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Provider store={store}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </NextIntlClientProvider>
    </Provider>
  );
}
