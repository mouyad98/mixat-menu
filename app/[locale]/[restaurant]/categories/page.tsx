import { createServerSupabase } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import CategoryCircles from "@/components/CategoryCircles";
import GalleryBand from "@/components/GalleryBand";
import CallButton from "@/components/CallButton";

type Props = {
  params: Promise<{ locale: "en" | "ar"; restaurant: string }>;
};

export default async function CategoriesPage({ params }: Props) {
  const { locale, restaurant: slug } = await params;
  const supabase = await createServerSupabase();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name, logo_url, phone")
    .eq("slug", slug)
    .single();

  if (!restaurant) return notFound();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name_en, name_ar, sort_order")
    .eq("restaurant_id", restaurant.id)
    .order("sort_order", { ascending: true });

  const isAr = locale === "ar";
  const categories = (categoriesData ?? []).map((c) => ({
    id: c.id,
    name: isAr ? c.name_ar || c.name_en : c.name_en,
  }));

  const logoSrc = restaurant.logo_url ?? "/brand/mixat-logo.png";
  const otherLocale = isAr ? "en" : "ar";

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="relative min-h-screen bg-paper px-6 py-16 overflow-hidden">
      <CallButton phone={restaurant.phone ?? undefined} isAr={isAr} />

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

      <a
        href={`/${otherLocale}/${slug}/categories`}
        className="fixed top-5 end-5 z-20 font-body text-xs font-bold border border-ink/20 rounded-full px-3 py-1 text-ink/60 hover:text-flame hover:border-flame transition-colors bg-paper/80 backdrop-blur"
      >
        {isAr ? "EN" : "AR"}
      </a>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        <div className="relative w-full mb-8">
          <GalleryBand />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={restaurant.name} className="h-24 sm:h-28 w-auto mb-8" />

        <div className="relative flex flex-col items-center text-center mb-12">
          {/* Oversized faint background word */}
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

        <CategoryCircles
          categories={categories}
          menuHref={`/${locale}/menu/${slug}`}
          isAr={isAr}
        />
      </div>
    </main>
  );
}
