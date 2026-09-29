"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GalleryBand from "./GalleryBand";
import CallButton from "./CallButton";

export type MenuProduct = {
  id: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  products: MenuProduct[];
};

export type ContactInfo = {
  phone?: string;
  location?: string;
  instagram?: string;
  instagram2?: string;
  instagram2Label?: string;
  facebook?: string;
};

type Props = {
  restaurantName: string;
  tagline?: string;
  categories: MenuCategory[];
  contact?: ContactInfo;
  isAr?: boolean;
  logoSrc?: string;
};

export default function MenuView({
  restaurantName,
  tagline,
  categories,
  contact,
  isAr = true,
  logoSrc = "/brand/mixat-logo.png",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFocus = searchParams.get("cat");

  const [query, setQuery] = useState("");
  const [focusedCategory, setFocusedCategory] = useState<string | null>(initialFocus);
  const [activeCategory, setActiveCategory] = useState(
    initialFocus ?? categories[0]?.id ?? ""
  );
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set());
  const [tappedTab, setTappedTab] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isManualScroll = useRef(false);

  // Fade sections in as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.catId;
            if (id) {
              setVisibleCategories((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories, focusedCategory]);

  // Auto-highlight the active tab based on which section is currently in view (only matters in full-menu mode)
  useEffect(() => {
    if (focusedCategory) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.catId;
            if (id) {
              setActiveCategory(id);
              tabRefs.current[id]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }
          }
        });
      },
      { threshold: 0, rootMargin: "-140px 0px -70% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories, focusedCategory]);

  // Show "back to top" once the user has scrolled a bit
  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the item detail modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  // Close modal on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedProduct(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Build the alternate-language URL, if this page is a locale route (/en/... or /ar/...)
  const altLocaleHref = useMemo(() => {
    if (!pathname) return null;
    const match = pathname.match(/^\/(en|ar)(\/.*)?$/);
    if (!match) return null;
    const otherLocale = match[1] === "en" ? "ar" : "en";
    return `/${otherLocale}${match[2] ?? ""}`;
  }, [pathname]);

  // In focused mode, show only that one category. Otherwise show everything (filtered by search).
  const baseCategories = useMemo(() => {
    if (!focusedCategory) return categories;
    return categories.filter((c) => c.id === focusedCategory);
  }, [categories, focusedCategory]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return baseCategories;
    const q = query.trim().toLowerCase();
    return baseCategories
      .map((cat) => ({
        ...cat,
        products: cat.products.filter((p) => p.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [baseCategories, query]);

  function goToCategory(id: string) {
    setFocusedCategory(id);
    setActiveCategory(id);
    setTappedTab(id);
    setTimeout(() => setTappedTab(null), 150);
    router.replace(`${pathname}?cat=${id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showFullMenu() {
    setFocusedCategory(null);
    router.replace(pathname, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToCategory(id: string) {
    setActiveCategory(id);
    isManualScroll.current = true;
    document
      .getElementById(`cat-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isManualScroll.current = false;
    }, 700);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="relative min-h-screen bg-paper text-ink">
      <CallButton phone={contact?.phone} isAr={isAr} />

      {/* Repeated, slowly drifting logo watermark behind everything */}
      <div
        className="watermark-bg fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url(${logoSrc})`,
          backgroundSize: "220px auto",
          backgroundRepeat: "repeat",
          transform: "rotate(-8deg) scale(1.3)",
        }}
      />

      <div className="relative">
        {/* Hero */}
        <div className="relative px-6 pt-14 pb-8 flex flex-col items-center text-center gap-2">
          {altLocaleHref && (
            <a
              href={altLocaleHref}
              className="absolute top-4 end-4 font-body text-sm font-bold border border-ink/20 rounded-full px-3 py-1 text-ink/60 hover:text-flame hover:border-flame transition-colors"
            >
              {isAr ? "EN" : "AR"}
            </a>
          )}
          {logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={restaurantName} className="h-16 w-auto mb-1" />
          )}
          {tagline && (
            <p className="font-body text-ink/50 text-sm tracking-[0.3em] uppercase">
              {tagline}
            </p>
          )}
        </div>

        {/* Search + tabs */}
        <div className="sticky top-0 z-20 bg-paper/90 backdrop-blur px-4 pt-4 pb-3 border-b border-ink/10">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن صنف..." : "Search items..."}
              className="w-full bg-transparent text-ink placeholder-ink/35 font-body text-lg px-1 py-2 border-b-2 border-ink/15 focus:outline-none focus:border-flame transition-colors"
            />

            <div className="flex items-center gap-1 overflow-x-auto mt-3 pb-1 no-scrollbar">
              {focusedCategory && (
                <button
                  onClick={showFullMenu}
                  className="whitespace-nowrap font-body text-sm px-3.5 py-1.5 rounded-full border border-ink/20 text-ink/60 hover:text-flame hover:border-flame transition-colors flex-shrink-0"
                >
                  {isAr ? "كل الأقسام" : "All Categories"}
                </button>
              )}
              {categories.map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    ref={(el) => {
                      tabRefs.current[cat.id] = el;
                    }}
                    onClick={() => {
                      if (focusedCategory) {
                        goToCategory(cat.id);
                      } else {
                        scrollToCategory(cat.id);
                        setTappedTab(cat.id);
                        setTimeout(() => setTappedTab(null), 150);
                      }
                    }}
                    className={`whitespace-nowrap font-body text-sm px-3.5 py-1.5 rounded-full transition-all duration-150 ${
                      tappedTab === cat.id ? "scale-90" : "scale-100"
                    } ${
                      active
                        ? "bg-flame text-paper font-bold"
                        : "text-ink/45 hover:text-ink"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-10">
          {!focusedCategory && <GalleryBand />}

          {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-flame/40 flex items-center justify-center">
                <span className="font-display text-flame text-xl">?</span>
              </div>
              <p className="font-body text-ink/50">
                {isAr ? "لا توجد نتائج مطابقة" : "No matching items found"}
              </p>
            </div>
          )}

          {filteredCategories.map((cat, catIndex) => (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              data-cat-id={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              className="mb-14 scroll-mt-36"
            >
              <div className="flex items-baseline gap-3 mb-6">
                <h2 className="font-display text-3xl tracking-wide text-ink">
                  {cat.name}
                </h2>
              </div>

              <div className="flex flex-col">
                {cat.products.map((p, i) => {
                  const priceEl = (
                    <span
                      className={`flex-shrink-0 font-display text-xl ${
                        catIndex % 2 === 0 ? "text-cyan" : "text-flame"
                      }`}
                    >
                      {p.price}
                    </span>
                  );

                  return (
                    <button
                      key={p.id}
                      dir="ltr"
                      onClick={() => setSelectedProduct(p)}
                      className={`text-start bg-white border border-ink/10 rounded-lg px-4 py-4 mb-3 flex items-center gap-4 transition-all duration-300 hover:border-flame/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 ${
                        visibleCategories.has(cat.id)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3"
                      }`}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {p.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                        />
                      )}
                      {priceEl}
                      <div dir={isAr ? "rtl" : "ltr"} className="min-w-0 flex-1">
                        <p className="font-body font-medium text-ink text-lg leading-snug">
                          {p.name}
                        </p>
                        {p.description && (
                          <p className="font-body text-ink/60 text-base mt-1 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {contact && (
          <footer className="border-t border-ink/10 px-6 py-10 flex flex-col items-center gap-4 text-center">
            <div className="flex gap-5">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram - MIXAT"
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="w-11 h-11 rounded-full bg-flame flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                    </svg>
                  </span>
                  <span className="font-body text-xs text-ink/45">MIXAT</span>
                </a>
              )}
              {contact.instagram2 && (
                <a
                  href={contact.instagram2}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram - ${contact.instagram2Label ?? "Orange"}`}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                    </svg>
                  </span>
                  <span className="font-body text-xs text-ink/45">
                    {contact.instagram2Label ?? "Orange"}
                  </span>
                </a>
              )}
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="w-11 h-11 rounded-full bg-cyan flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3c-.3-.04-1.3-.13-2.4-.13-2.4 0-4.1 1.45-4.1 4.15V10.5H7.5v3H10V21h3.5z" />
                    </svg>
                  </span>
                  <span className="font-body text-xs text-ink/45">Facebook</span>
                </a>
              )}
            </div>
            {contact.phone && (
              <p
                dir="ltr"
                style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
                className="font-body text-ink/60 text-base"
              >
                {contact.phone}
              </p>
            )}
            {contact.location && <p className="font-body text-ink/50 text-sm">{contact.location}</p>}
          </footer>
        )}

        <button
          onClick={scrollToTop}
          aria-label={isAr ? "العودة إلى الأعلى" : "Back to top"}
          className={`fixed bottom-6 end-6 z-30 w-11 h-11 rounded-full bg-flame text-paper shadow-lg flex items-center justify-center transition-all duration-300 ${
            showBackToTop
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <span className="font-display text-lg">{isAr ? "↑" : "↑"}</span>
        </button>
      </div>

      {/* Item detail modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 backdrop-blur-sm animate-fadein"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            dir={isAr ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
            className="bg-paper w-full sm:w-[420px] sm:rounded-2xl rounded-t-2xl overflow-hidden animate-modalup max-h-[85vh] overflow-y-auto"
          >
            {selectedProduct.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-24 bg-teal flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt="" className="h-10 w-auto opacity-40" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-2xl text-ink leading-tight">
                  {selectedProduct.name}
                </h3>
                <span className="flex-shrink-0 font-display text-2xl text-flame">
                  {selectedProduct.price}
                </span>
              </div>

              {selectedProduct.description ? (
                <p className="font-body text-ink/60 leading-relaxed">
                  {selectedProduct.description}
                </p>
              ) : (
                <p className="font-body text-ink/40 italic">
                  {isAr ? "لا يوجد وصف إضافي" : "No additional description"}
                </p>
              )}

              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-6 w-full bg-flame text-paper font-body font-bold py-3 rounded-lg hover:brightness-95 transition"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
