"use client";

import { Suspense } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
}
