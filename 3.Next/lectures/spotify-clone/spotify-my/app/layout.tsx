import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import SuperbaseProvider from "@/providers/SuperbaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import Player from "@/components/Player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoDo-Spotify",
  description: "Clone Soptify with nextjs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SuperbaseProvider>
          <UserProvider>
            <SideBar songs={userSongs}>{children}</SideBar>
            <ModalProvider products={products} />
            <Player />
          </UserProvider>
        </SuperbaseProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
