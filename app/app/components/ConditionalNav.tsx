"use client";

import { usePathname } from "next/navigation";
import Appbar from "./Appbar";

export default function ConditionalNav() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and creator pages
  const hideNavbar = pathname?.startsWith("/dashboard") || pathname?.startsWith("/creator");
  
  if (hideNavbar) {
    return null;
  }
  
  return <Appbar />;
}
