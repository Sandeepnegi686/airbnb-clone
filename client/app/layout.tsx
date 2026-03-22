import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import RegisterModel from "./_components/Modals/RegisterModel";
import ToasterProvider from "./_providers/ToasterProvider";
import LoginModel from "./_components/Modals/LoginModel";
import getCurrentUser from "./_actions/getCurrentUser";
import RentModal from "./_components/Modals/RentModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built on NextJs NodeJs Express MongoDB",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`antialiased ${font.className}`}>
        <RegisterModel />
        <LoginModel />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
        <ToasterProvider />
      </body>
    </html>
  );
}
