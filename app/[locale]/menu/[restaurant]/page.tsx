import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import MenuView, { MenuCategory } from "@/components/MenuView";

type Props = {
  params: Promise<{ locale: "en" | "ar"; restaurant: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale, restaurant: slug } = await params;
  const supabase = await createServerSupabase();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select(
      "id, name, tagline, phone, location, instagram_url, facebook_url"
    )
    .eq("slug", slug)
    .single();

  if (!restaurant) return notFound();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select(
      "id, name_en, name_ar, sort_order, products(id, name_en, name_ar, price, description_en, description_ar, image_url, is_available)"
    )
    .eq("restaurant_id", restaurant.id)
    .order("sort_order", { ascending: true });

  const isAr = locale === "ar";

  const categories: MenuCategory[] = (categoriesData ?? []).map((cat) => ({
    id: cat.id,
    name: isAr ? cat.name_ar || cat.name_en : cat.name_en,
    products: (cat.products ?? [])
      .filter((p) => p.is_available)
      .map((p) => ({
        id: p.id,
        name: isAr ? p.name_ar || p.name_en : p.name_en,
        price: `$${p.price}`,
        description: isAr
          ? p.description_ar || p.description_en || undefined
          : p.description_en || undefined,
        image: p.image_url ?? undefined,
      })),
  }));

  return (
    <Suspense>
      <MenuView
        restaurantName={restaurant.name}
        tagline={restaurant.tagline ?? undefined}
        categories={categories}
        isAr={isAr}
        contact={{
          phone: restaurant.phone ?? undefined,
          location: restaurant.location ?? undefined,
          instagram: restaurant.instagram_url ?? undefined,
          instagram2: "https://www.instagram.com/orange.sy_?stkn=MXJicG95bzUzNGp0Mw%3D%3D&utm_source=qr",
          instagram2Label: "Orange",
          facebook: restaurant.facebook_url ?? undefined,
        }}
      />
    </Suspense>
  );
}
