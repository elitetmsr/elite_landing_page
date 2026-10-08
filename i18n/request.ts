import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from "@/i18n/routing";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    locale,
    timeZone: timeZone,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});