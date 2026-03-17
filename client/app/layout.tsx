import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import RegisterModel from "./_components/Modals/RegisterModel";
import ToasterProvider from "./_providers/ToasterProvider";
import LoginModel from "./_components/Modals/LoginModel";

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
        {/* <Model isOpen title="Hello World" actionLabel="Submit" /> */}
        <RegisterModel />
        <LoginModel />
        <Navbar />
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
