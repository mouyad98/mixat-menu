import { createServerSupabase } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import LandingIntro from "@/components/LandingIntro";

type Props = {
  params: Promise<{ locale: "en" | "ar"; restaurant: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale, restaurant: slug } = await params;
  const supabase = await createServerSupabase();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name, tagline, phone, location, logo_url")
    .eq("slug", slug)
    .single();

  if (!restaurant) return notFound();

  const isAr = locale === "ar";

  return (
    <LandingIntro
      logoSrc={restaurant.logo_url ?? "/brand/mixat-logo.png"}
      restaurantName={restaurant.name}
      tagline={restaurant.tagline ?? undefined}
      phone={restaurant.phone ?? undefined}
      location={restaurant.location ?? undefined}
      menuHref={`/${locale}/${slug}/categories`}
      isAr={isAr}
    />
  );
}
