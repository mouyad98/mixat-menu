import Link from "next/link";

export type CategoryLink = {
  id: string;
  name: string;
};

type Props = {
  categories: CategoryLink[];
  menuHref: string;
  logoSrc?: string;
  isAr?: boolean;
};

// Dramatic, tightly-cropped food photography for a handful of recognizable categories.
function categoryPhoto(name: string): string | undefined {
  const n = name.toLowerCase();
  if (/برغر|burger/.test(n))
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=70";
  if (/ستيك|steak/.test(n))
    return "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500&q=70";
  if (/مقبلات|بطاطا|fries|sides/.test(n))
    return "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=70";
  if (/سندويش|sandwich/.test(n))
    return "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=500&q=70";
  if (/مقلي|fried/.test(n))
    return "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=70";
  if (/مشوي|grilled/.test(n))
    return "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&q=70";
  if (/سلطات|سلطة|salad/.test(n))
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=70";
  if (/أطفال|kids/.test(n))
    return "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=70";
  if (/وجبات|meals?\b/.test(n))
    return "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=70";
  return undefined;
}

// Short condensed English label shown inside the circle
function shortLabel(name: string): string {
  const n = name.toLowerCase();
  if (/ستيك|steak/.test(n)) return "STEAK";
  if (/برغر|burger/.test(n)) return "BURGER";
  if (/مشوي|grilled/.test(n)) return "GRILLED";
  if (/مقلي|fried/.test(n)) return "FRIED";
  if (/مقبلات|بطاطا|fries|sides/.test(n)) return "SIDES";
  if (/سندويش|sandwich/.test(n)) return "SANDWICH";
  if (/سلطات|سلطة|salad/.test(n)) return "SALAD";
  if (/أطفال|kids/.test(n)) return "KIDS";
  if (/وجبات|meals?\b/.test(n)) return "MEALS";
  return "MENU";
}

export default function CategoryCircles({
  categories,
  menuHref,
  isAr = true,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
      {categories.map((cat) => {
        const photo = categoryPhoto(cat.name);
        const label = shortLabel(cat.name);

        return (
          <Link
            key={cat.id}
            href={`${menuHref}${menuHref.includes("?") ? "&" : "?"}cat=${cat.id}`}
            className="group relative flex flex-col items-center gap-3 bg-white rounded-2xl shadow-[0_2px_10px_rgba(30,25,20,0.06)] hover:shadow-[0_10px_28px_rgba(30,25,20,0.12)] transition-all duration-300 hover:-translate-y-1.5 px-3 py-6 overflow-hidden"
          >
            {/* Faint dramatic food crop for select categories */}
            {photo && (
              <div
                className="absolute inset-0 opacity-[0.14] transition-opacity duration-300 group-hover:opacity-[0.22]"
                style={{
                  backgroundImage: `url(${photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "60% 35%",
                }}
              />
            )}

            {/* Tiny triangle accent, echoing the logo's orange triangles */}
            <div
              className="absolute -top-1 -right-1 w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
              style={{
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                backgroundColor: "#FF8021",
              }}
            />

            <div className="relative flex flex-col items-center gap-1 py-3">
              <span className="font-display text-xs tracking-[0.15em] uppercase text-ink/45">
                {label}
              </span>
              <span
                dir={isAr ? "rtl" : "ltr"}
                className="font-display text-lg sm:text-xl text-ink text-center leading-tight tracking-wide"
              >
                {cat.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
