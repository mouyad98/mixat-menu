"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CallButton from "./CallButton";

type Props = {
  logoSrc: string;
  restaurantName: string;
  tagline?: string;
  phone?: string;
  location?: string;
  menuHref: string;
  isAr?: boolean;
  backgroundSrc?: string;
};

function localeHref(pathname: string, locale: "ar" | "en"): string {
  const match = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (match) return `/${locale}${match[2] ?? ""}`;
  const base = pathname.split("?")[0];
  return `${base}?lang=${locale}`;
}

export default function LandingIntro({
  logoSrc,
  restaurantName,
  tagline,
  phone,
  location,
  menuHref,
  isAr = true,
  backgroundSrc = "/brand/mixat-storefront.png",
}: Props) {
  const pathname = usePathname();

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <CallButton phone={phone} isAr={isAr} />

      {pathname && (
        <div
          dir="ltr"
          className="landing-lang-toggle fixed top-5 left-5 z-40 inline-flex rounded-full border border-ink/15 overflow-hidden bg-paper/90 backdrop-blur shadow-sm"
        >
          <a
            href={localeHref(pathname, "ar")}
            className={`font-body text-sm font-bold px-4 py-2 transition-colors ${
              isAr ? "bg-flame text-paper" : "text-ink/60 hover:text-flame"
            }`}
          >
            العربية
          </a>
          <a
            href={localeHref(pathname, "en")}
            className={`font-body text-sm font-bold px-4 py-2 transition-colors ${
              !isAr ? "bg-flame text-paper" : "text-ink/60 hover:text-flame"
            }`}
          >
            English
          </a>
        </div>
      )}

      {/* Real storefront photo as the background */}
      <div
        className="landing-bg-photo fixed inset-0"
        style={{
          backgroundImage: `url(${backgroundSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />

      {/* Light scrim so the logo, text, and button stay legible over the photo */}
      <div
        className="landing-bg-overlay fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(250,248,244,0.88) 0%, rgba(250,248,244,0.55) 30%, rgba(250,248,244,0.22) 60%, rgba(250,248,244,0.05) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={restaurantName}
          className="landing-logo w-72 sm:w-[26rem] max-w-[85vw] h-auto"
        />

        {tagline && (
          <p className="landing-tagline mt-3 font-body text-ink/60 text-sm tracking-[0.3em] uppercase">
            {tagline}
          </p>
        )}

        <div className="landing-contact mt-4 font-body text-ink/65 text-base flex flex-col items-center gap-1.5">
          {location && (
            <p className="flex items-center gap-1.5">
              <span aria-hidden="true">📍</span>
              {location}
            </p>
          )}
          {phone && (
            <p
              dir="ltr"
              style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
              className="font-medium"
            >
              {phone}
            </p>
          )}
        </div>

        <Link
          href={menuHref}
          className="landing-cta group relative mt-10 overflow-hidden bg-flame text-paper font-body font-bold text-lg px-10 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,128,33,0.35)]"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-white/20 skew-x-[-20deg]" />
          <span className="relative">
            {isAr ? "تصفح المنيو" : "Browse the Menu"}
          </span>
          <span className="relative transition-transform duration-300 group-hover:-translate-x-1">
            {isAr ? "←" : "→"}
          </span>
        </Link>
      </div>

      <style>{`
        @keyframes bgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes logoFadeUp { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }

        .landing-bg-photo { opacity: 0; animation: bgFadeIn 0.7s ease-out forwards; }
        .landing-bg-overlay { opacity: 0; animation: bgFadeIn 0.7s ease-out 0.1s forwards; }
        .landing-lang-toggle { animation: fadeUp 0.4s ease-out 0.1s forwards; opacity: 0; }
        .landing-logo { animation: logoFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .landing-tagline { animation: fadeUp 0.4s ease-out 0.22s forwards; opacity: 0; }
        .landing-contact { animation: fadeUp 0.4s ease-out 0.32s forwards; opacity: 0; }
        .landing-cta { animation: fadeUp 0.4s ease-out 0.5s forwards; opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .landing-bg-photo, .landing-bg-overlay, .landing-lang-toggle, .landing-logo, .landing-tagline, .landing-contact, .landing-cta {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}