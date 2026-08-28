import type { Metadata } from "next";
import { Instrument_Serif, Archivo, Caveat } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jackiemiller.co"),
  title: {
    default: "Jackie Miller — Instructional Designer",
    template: "%s",
  },
  description:
    "Instructional designer for justice-involved and underserved adult learners — trauma-informed, accessible, AI-augmented learning.",
  openGraph: {
    title: "Jackie Miller — Instructional Designer",
    description: "Learning design for the people the system leaves out.",
    url: "https://jackiemiller.co",
    siteName: "Jackie Miller",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jackie Miller — Instructional Designer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackie Miller — Instructional Designer",
    description: "Learning design for the people the system leaves out.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${archivo.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
