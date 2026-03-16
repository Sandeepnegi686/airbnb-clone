import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Model from "./_components/Modals/Model";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built on NextJs NodeJs Express MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${font.className}`}>
        <Model isOpen title="Hello World" actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
