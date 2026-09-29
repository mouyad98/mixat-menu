import CategoryCircles from "@/components/CategoryCircles";
import GalleryBand from "@/components/GalleryBand";
import CallButton from "@/components/CallButton";

const categoriesAr = [
  { id: "steak", name: "ستيك لحمة" },
  { id: "burgers", name: "البرغر" },
  { id: "meals", name: "الوجبات" },
  { id: "fried-chicken", name: "دجاج مقلي" },
  { id: "grilled-chicken", name: "دجاج مشوي" },
  { id: "sides", name: "المقبلات" },
  { id: "cold-sandwich", name: "سندويش بارد" },
  { id: "salads", name: "السلطات" },
  { id: "kids", name: "وجبات الأطفال" },
];

const categoriesEn = [
  { id: "steak", name: "Steak" },
  { id: "burgers", name: "Burgers" },
  { id: "meals", name: "Meals" },
  { id: "fried-chicken", name: "Fried Chicken" },
  { id: "grilled-chicken", name: "Grilled Chicken" },
  { id: "sides", name: "Sides" },
  { id: "cold-sandwich", name: "Cold Sandwich" },
  { id: "salads", name: "Salads" },
  { id: "kids", name: "Kids Meals" },
];

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function PreviewCategoriesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const isAr = sp.lang !== "en";
  const logoSrc = "/brand/mixat-logo.png";
  const categories = isAr ? categoriesAr : categoriesEn;
  const menuHref = `/preview${isAr ? "" : "?lang=en"}`;

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="relative min-h-screen bg-paper px-6 py-16 overflow-hidden">
      <CallButton phone="0930 68 4444 / 0119098" isAr={isAr} />

      {/* Repeated, slowly drifting logo watermark */}
      <div
        className="watermark-bg fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url(${logoSrc})`,
          backgroundSize: "220px auto",
          backgroundRepeat: "repeat",
          transform: "rotate(-8deg) scale(1.3)",
        }}
      />

      <div
        dir="ltr"
        className="fixed top-5 left-5 z-40 inline-flex rounded-full border border-ink/15 overflow-hidden bg-paper/90 backdrop-blur shadow-sm"
      >
        <a
          href="?lang=ar"
          className={`font-body text-sm font-bold px-4 py-2 transition-colors ${
            isAr ? "bg-flame text-paper" : "text-ink/60 hover:text-flame"
          }`}
        >
          العربية
        </a>
        <a
          href="?lang=en"
          className={`font-body text-sm font-bold px-4 py-2 transition-colors ${
            !isAr ? "bg-flame text-paper" : "text-ink/60 hover:text-flame"
          }`}
        >
          English
        </a>
      </div>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        <div className="relative w-full mb-8">
          <GalleryBand />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="MIXAT" className="h-24 sm:h-28 w-auto mb-8" />

        <div className="relative flex flex-col items-center text-center mb-12">
          <span
            aria-hidden="true"
            className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 font-display text-[4rem] sm:text-[6rem] text-ink/[0.04] whitespace-nowrap select-none pointer-events-none"
          >
            {isAr ? "المنيو" : "MENU"}
          </span>

          <h1 className="relative font-display text-3xl sm:text-4xl text-ink tracking-wide">
            {isAr ? "شو عبالك اليوم؟" : "What are you craving?"}
          </h1>
          <p className="relative font-body text-ink/65 text-base mt-2">
            {isAr ? "اختر القسم لتصفح المنيو" : "Pick a category to browse the menu"}
          </p>
        </div>

        <CategoryCircles categories={categories} menuHref={menuHref} isAr={isAr} />
      </div>
    </main>
  );
}
