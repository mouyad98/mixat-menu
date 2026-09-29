import { Suspense } from "react";
import MenuView, { MenuCategory } from "@/components/MenuView";

const categories: MenuCategory[] = [
  {
    id: "steak",
    name: "ستيك لحمة",
    products: [
      { id: "1", name: "فيلادلفيا", price: "650", description: "شرائح لحم بقري مشوي مع صوص الموزاريلا وصوص الخردل الفرنسي." },
      { id: "2", name: "ستيك", price: "600", description: "شرائح لحم بقري مشوي مع صوص الصويا وجبنة الموزاريلا والقطر والمخلل." },
      { id: "3", name: "ستيك بوفر", price: "650", description: "شرائح لحم بقري مشوي مع ميكس أجبان بالصوص الخاص مع البصل المكرمل والقطر والمخلل." },
    ],
  },
  {
    id: "burgers",
    name: "البرغر",
    products: [
      { id: "4", name: "كلاسيك برغر", price: "550", description: "قطعة لحم بقري مشوية مع الجبنة والبصل والخس والمايونيز.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
      { id: "5", name: "باربيكيو برغر", price: "600", description: "قطعة لحم بقري مشوية مع صلصة الباربيكيو المقدد والمخلل والبصل والخس والمايونيز.", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80" },
      { id: "6", name: "فولكينو برغر", price: "600", description: "قطعة لحم بقري مشوية مع سويت شيلي صوص، البصل المقلي والهالبينو الحار والمخلل والخس والمايونيز." },
      { id: "7", name: "مشروم برغر", price: "600", description: "قطعة من اللحم البقري مشوية مع الصوص الكريمي وجبنة الإمنتال، مع حلقات البصل والقطر المكرمل والمخلل والخس والمايونيز." },
      { id: "8", name: "سموكي برغر", price: "600", description: "قطعة من اللحم البقري مشوية مع شرائح تشيدر وصوص السموكي المدخن، مع البصل المشوي وحلقات القطر والخس والمايونيز." },
      { id: "9", name: "ماستر برغر", price: "600", description: "قطعة من اللحم البقري مشوية مع جبنة الإمنتال وصوص الماسترد والرانش وحلقات البصل والخس والمايونيز." },
    ],
  },
  {
    id: "meals",
    name: "الوجبات",
    products: [
      { id: "10", name: "شيش", price: "900", description: "قطع دجاج مع البطاطس المقلية وكول سلو الفرنسي." },
      { id: "11", name: "اسكالوب", price: "900", description: "صدر دجاج مشوي مع الموزاريلا والبارميزان وبطاطا مقلية والمايونيز." },
      { id: "12", name: "كريسبي", price: "850", description: "قطع دجاج عدد 4 مع بطاطا مقلية وأربع أنواع صوص من اختيارك." },
      { id: "13", name: "بيني بروكلي", price: "700", description: "باستا مع قطع دجاج والبروكلي والصوص الكريمي." },
      { id: "14", name: "تربائي تشكن", price: "1100", description: "دجاج مع صوص الترياكي والبصل والهالبينو والأرز والأناناس والسمسم." },
    ],
  },
  {
    id: "fried-chicken",
    name: "دجاج مقلي",
    products: [
      { id: "15", name: "كريسبي", price: "500", description: "قطع دجاج مع الصوص والخس والبندورة والمايونيز." },
      { id: "16", name: "سوبريم", price: "500", description: "صدر دجاج بانيه مع شرائح التشيدر وصلصة سالسي والخس والبندورة والمايونيز." },
      { id: "17", name: "كرانشي راب", price: "500", description: "صدر دجاج مع التشيدر الخس والبندورة والمايونيز." },
      { id: "18", name: "دراغون", price: "500", description: "صدر دجاج حار مع الموزاريلا والصوص الحار مع الهالبينو والذرة والخس والمايونيز." },
      { id: "19", name: "بيبروني تشيكن", price: "500", description: "صدر دجاج بانيه مع شرائح بيبروني مع الخس والمايونيز." },
      { id: "20", name: "فولكينو تشيكن", price: "500", description: "قطعة دجاج حار مع الهالبينو الحار وصوص سويت تشيلي والخس والمايونيز." },
      { id: "21", name: "ناشفل تشيكن", price: "500", description: "قطعة دجاج بانيه مع شرائح تشيدر وصوص الناتشوز الخاص والهالبينو والمخلل." },
    ],
  },
  {
    id: "grilled-chicken",
    name: "دجاج مشوي",
    products: [
      { id: "22", name: "شيش", price: "450", description: "دجاج مشوي مع كريم الثوم وسلطة الكول سلو مع البطاطا والمخلل." },
      { id: "23", name: "مكسيكان", price: "500", description: "دجاج مشوي مع الموزاريلا وصوص سويت تشيلي مع الفليفلة الملونة والذرة والمايونيز." },
      { id: "24", name: "تيراكي", price: "550", description: "دجاج مشوي مع صوص الترياكي وشرائح الشيدر وجبنة الأناناس مع الفليفلة والسمسم." },
      { id: "25", name: "فاهيتا دجاج", price: "500", description: "دجاج مشوي مع صوص الفاهيتا الخاص، بالفليفلة والخس والمايونيز." },
      { id: "26", name: "فرانشيسكو", price: "500", description: "دجاج مشوي مع الموزاريلا والصوص، والقطر والذرة والخس والمايونيز." },
      { id: "27", name: "سويس تشيكن", price: "500", description: "دجاج مشوي مع جبنة الإمنتال والصوص الكريمي، مع الفليفلة المكرمل والذرة والخس والمايونيز." },
      { id: "28", name: "تشيكن سيزر", price: "500", description: "دجاج مشوي مع جبنة البارميزان الصوص السيزر والخس والمايونيز." },
    ],
  },
  {
    id: "sides",
    name: "المقبلات",
    products: [
      { id: "29", name: "صحن بطاطا مقلية", price: "300" },
      { id: "30", name: "علبة بطاطا مقلية", price: "200" },
      { id: "31", name: "بطاطا تشيدر", price: "380", description: "أصابع بطاطا مع صوص تشيدر." },
      { id: "32", name: "بطاطا موزاريلا", price: "400", description: "أصابع بطاطا مع جبنة الموزاريلا الكريمي وصوص رانش." },
      { id: "33", name: "حلقات بصل", price: "300", description: "حلقات البصل مقرمشة مع صوص هالي ماسترد." },
      { id: "34", name: "موزاريلا ستيك 4 قطع", price: "400", description: "أصابع الجبنة الموزاريلا." },
      { id: "35", name: "جوانح داينمت", price: "500", description: "أجنحة دجاج مقلية مع صوص الداينمت الحار." },
      { id: "36", name: "جوانح باربيكو", price: "500", description: "أجنحة دجاج مشوية مع صلصة الباربيكيو." },
      { id: "37", name: "جوانح ماسترد", price: "500", description: "أجنحة دجاج مع صوص الماسترد." },
      { id: "38", name: "لود فرايز", price: "600", description: "بطاطا مع قطع الدجاج المقلي مع ميكس أجبان وميكس صوصات." },
    ],
  },
  {
    id: "cold-sandwich",
    name: "سندويش بارد",
    products: [
      { id: "39", name: "صب واي", price: "400", description: "تشكيلة من اللحوم الباردة وجبنة الشيدر والخس والبندورة والزيتون والمايونيز." },
      { id: "40", name: "جبش وقشقوان", price: "400" },
      { id: "41", name: "حلوم", price: "350" },
    ],
  },
  {
    id: "salads",
    name: "السلطات",
    products: [
      { id: "42", name: "سيزر سالاد", price: "400", description: "قطع دجاج مشوية مع التوست المحمص وقطع البندورة الكرزية والخس وصوص السيزر." },
      { id: "43", name: "كول سلو", price: "200", description: "الملفوف الأحمر والأبيض مع الصوص الكلاسيكي والمايونيز." },
      { id: "44", name: "مكسيكان سالاد", price: "500", description: "قطع دجاج مقلية مع صوص المكسيكان والحمراء والفليفلة الملونة مع قطاع الناتشوز." },
      { id: "45", name: "كورن سالاد", price: "300", description: "حبات الذرة مع الخس والأوريغانو والصوص والمايونيز." },
      { id: "46", name: "ستيك سالاد", price: "600", description: "شرائح الستيك المشوية مع صوص البلسميك والمايونيز." },
    ],
  },
  {
    id: "kids",
    name: "وجبات الأطفال",
    products: [
      { id: "47", name: "برغر أطفال (دجاج)", price: "500" },
      { id: "48", name: "برغر أطفال (لحمة)", price: "450" },
      { id: "49", name: "ناغيت أطفال", price: "450", description: "قطع من صدر الدجاج ناغيت مع البطاطا والصوص تقدم مع العصير طبيعي." },
    ],
  },
];

type Props = {
  searchParams: Promise<{ lang?: string; cat?: string }>;
};

export default async function PreviewPage({ searchParams }: Props) {
  const sp = await searchParams;
  const isAr = sp.lang !== "en";

  return (
    <Suspense>
      <div
        dir="ltr"
        className="fixed top-5 left-5 z-50 inline-flex rounded-full border border-ink/15 overflow-hidden bg-paper/90 backdrop-blur shadow-sm"
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
      <MenuView
        restaurantName="MIXAT"
        tagline="BURGERS & SNACKS"
        categories={categories}
        isAr={isAr}
        contact={{
          phone: "0930 68 4444 / 0119098",
          location: isAr ? "دمشق - ساحة القصور" : "Damascus - Al-Qusour Square",
          instagram: "https://www.instagram.com/mixat.fastfood?stkn=MXBycWttM2tobTMyNw%3D%3D&utm_source=qr",
          instagram2: "https://www.instagram.com/orange.sy_?stkn=MXJicG95bzUzNGp0Mw%3D%3D&utm_source=qr",
          instagram2Label: "Orange",
          facebook: "https://www.facebook.com/profile.php?id=61590618330526&mibextid=wwXIfr&mibextid=wwXIfr",
        }}
      />
    </Suspense>
  );
}
