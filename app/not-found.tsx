import "./globals.css";
import { routing } from "@/i18n/routing";

/**
 * Last-resort 404 for requests that never reach a locale layout (e.g. an invalid locale segment).
 * There is no root layout, so this page renders its own <html>/<body>.
 * Bilingual on purpose: the visitor's locale is unknown at this level.
 */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <body className="grid min-h-screen place-items-center bg-surface px-6 text-center font-sans text-body antialiased">
        <main>
          <p className="text-8xl font-black text-primary">404</p>
          <h1 className="mt-4 text-2xl font-bold text-primary">الصفحة غير موجودة</h1>
          <p className="mt-1 text-content" dir="ltr">
            Page not found
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/ar/home"
              className="rounded-xl bg-primary px-5 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
            >
              العودة للرئيسية
            </a>
            <a
              href="/en/home"
              dir="ltr"
              className="rounded-xl border-[1.5px] border-primary px-5 py-3 font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
