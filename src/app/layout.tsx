import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Vinayak Gore - Visions Of Vinu",
    template: "Vinayak Gore",
  },
  description: "Created with love by Vinayak Gore.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ToastContainer />
        <SessionWrapper>
          <div className="pb-20">{children}</div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
