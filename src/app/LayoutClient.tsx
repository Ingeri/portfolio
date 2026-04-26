"use client";

import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <AdminProvider>
      <LanguageProvider>
        {!isAdminRoute && <NavbarWrapper />}
        {children}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <AIAssistant />}
      </LanguageProvider>
    </AdminProvider>
  );
}
