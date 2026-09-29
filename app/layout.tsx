import "./globals.css";
import { Anton, Space_Grotesk } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Digital Menu",
  description: "Zero-cost digital restaurant menu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${anton.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-paper font-body">{children}</body>
    </html>
  );
}
