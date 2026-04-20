"use client";

import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";
import { ReactNode } from "react";

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <LanguageProvider>
        <NavbarWrapper />
        {children}
        <Footer />
        <AIAssistant />
      </LanguageProvider>
    </AdminProvider>
  );
}
