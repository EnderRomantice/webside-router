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
  const { isDark, toggle } = useTheme();
  const border = isDark ? "border-white" : "border-black";
  const text = isDark ? "text-white" : "text-black";

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
      className={`p-10 fixed bottom-20 left-1/2 transform -translate-x-1/2 md:w-100 w-80 h-14 ${border} border-4 ${text} rounded-4xl flex items-center justify-around gap-6 cursor-pointer`}
    >
      <TabbarItem>
        <Home
          className="w-10 h-10 rounded-2xl"
          textColor={isDark ? "#FFFFFF" : "#111111"}
        />
      </TabbarItem>

      <TabbarItem onClick={toggle}>
        <Sun
          className="w-10 h-10 rounded-2xl"
          textColor={isDark ? "#FFFFFF" : "#111111"}
        />
      </TabbarItem>
    </div>
  );
}
