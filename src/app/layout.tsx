import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://linkedinpostgenerator.vercel.app"),
  title: {
    default: "LinkedIn Post Generator",
    template: "%s | LinkedIn Post Generator",
  },
  description: "Boost your LinkedIn presence with our Post Generator",
  openGraph: {
    title: "LinkedIn Post Generator",
    description: "Boost your LinkedIn presence with our Post Generator",
    url: "https://linkedinpostgenerator.vercel.app",
    siteName: "LinkedIn Post Generator",
    locale: "en_US",
    type: "website",
    images: "https://linkedinpostgenerator.vercel.app/icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Post Generator",
    description: "Boost your LinkedIn presence with our Post Generator",
    //site: "@YourTwitterHandle", //Replace with your Twitter handle if available
    //creator: "@YourTwitterHandle", // Replace with your Twitter handle if available
    images: "https://linkedinpostgenerator.vercel.app/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
