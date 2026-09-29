import LandingIntro from "@/components/LandingIntro";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function PreviewHomePage({ searchParams }: Props) {
  const sp = await searchParams;
  const isAr = sp.lang !== "en";

  return (
    <LandingIntro
      logoSrc="/brand/mixat-logo.png"
      restaurantName="MIXAT"
      tagline="BURGERS & SNACKS"
      phone="0930 68 4444 / 0119098"
      location={isAr ? "دمشق - ساحة القصور" : "Damascus - Al-Qusour Square"}
      menuHref={`/preview-categories${isAr ? "" : "?lang=en"}`}
      isAr={isAr}
    />
  );
}
