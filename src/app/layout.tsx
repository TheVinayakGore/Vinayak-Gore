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
    default: "Vinayak Gore - Tech Visions Of Vinu",
    template: "Vinayak Gore",
  },
  description:
    "Vinayak Gore's portfolio is a hub for developers, offering free tutorials, web development resources, and expert blogs on modern frameworks like React, Next.js, and Tailwind CSS. Discover comprehensive guides, code snippets, and the latest trends in front-end and full-stack development. Learn the best practices in JavaScript, TypeScript, and web design, and explore freelance opportunities with expert insights into the tech industry. Stay updated with the newest web development technologies and improve your skills with practical learning materials and hands-on projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
