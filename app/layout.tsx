import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Geniung Amartya",
  description: "Geniung Amartya's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-sans text-black bg-white dark:text-white dark:bg-black"
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
