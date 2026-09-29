"use client";

import { useState } from "react";

type Props = {
  phone?: string;
  isAr?: boolean;
};

function parseNumbers(phone?: string): string[] {
  if (!phone) return [];
  return phone
    .split("/")
    .map((n) => n.trim())
    .filter(Boolean);
}

export default function CallButton({ phone, isAr = true }: Props) {
  const [open, setOpen] = useState(false);
  const numbers = parseNumbers(phone);

  if (numbers.length === 0) return null;

  const singleTel = numbers.length === 1 ? `tel:${numbers[0].replace(/\s+/g, "")}` : null;

  return (
    <>
      {singleTel ? (
        <a
          href={singleTel}
          dir="ltr"
          style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
          aria-label={isAr ? "اتصل بنا" : "Call us"}
          className="fixed bottom-6 start-6 z-40 flex items-center gap-2 bg-flame text-paper font-body font-bold pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <CallIcon />
          <span className="text-sm">{isAr ? "اتصل بنا" : "Call"}</span>
        </a>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label={isAr ? "اتصل بنا" : "Call us"}
          className="fixed bottom-6 start-6 z-40 flex items-center gap-2 bg-flame text-paper font-body font-bold pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <CallIcon />
          <span className="text-sm">{isAr ? "اتصل بنا" : "Call"}</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 backdrop-blur-sm animate-fadein"
          onClick={() => setOpen(false)}
        >
          <div
            dir={isAr ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
            className="bg-paper w-full sm:w-[360px] sm:rounded-2xl rounded-t-2xl overflow-hidden animate-modalup p-6"
          >
            <h3 className="font-display text-2xl text-ink text-center mb-5">
              {isAr ? "اختر رقم للاتصال" : "Choose a number to call"}
            </h3>

            <div className="flex flex-col gap-3">
              {numbers.map((num, i) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s+/g, "")}`}
                  dir="ltr"
                  style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
                  className={`flex items-center justify-center gap-3 rounded-xl py-4 font-body font-bold text-lg text-paper transition-transform active:scale-[0.98] ${
                    i % 2 === 0 ? "bg-flame" : "bg-cyan"
                  }`}
                >
                  <CallIcon />
                  {num}
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-ink/50 font-body text-base py-2"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
