"use client";

import Sun from "./icons/sun";
import Home from "./icons/home";
import { useTheme } from "./theme-provider";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function TabbarItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="transition-all hover:scale-110">
      {children}
    </div>
  );
}

export default function TabBar() {
  const { toggle } = useTheme();

  const tabbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = tabbarRef.current;
      if (!el) return;
      gsap.set(el, { y: 500 });
      gsap.to(el, { y: 0, duration: 0.5, ease: "power2.out", delay: 0.7 });
    }, tabbarRef);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={tabbarRef}
      className={`px-6 py-3 fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[92vw] max-w-lg md:max-w-xl h-14 border-2 rounded-2xl bg-surface/90 backdrop-blur text-foreground border-border shadow-md z-50 flex items-center justify-around gap-6 cursor-pointer`}
    >
      <TabbarItem>
        <Home className="w-8 h-8 sm:w-9 sm:h-9" />
      </TabbarItem>

      <TabbarItem onClick={toggle}>
        <Sun className="w-8 h-8 sm:w-9 sm:h-9" />
      </TabbarItem>
    </div>
  );
}
