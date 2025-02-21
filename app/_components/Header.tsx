"use client";

import IconEth from "@/_assets/icons/eth.svg";
import Wallet from "@/_components/wallet/Wallet";
import { useState, useRef, useEffect } from "react";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className={`sticky z-10 top-0 my-3 md:mb-0 md:mt-12 ${
        isSticky ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-5 bg-white flex flex-wrap justify-center lg:justify-between items-center gap-x-[92px] gap-y-6 ">
        <h1 className="flex items-center gap-2.5 text-3xl text-slate-700 text-center font-bold">
          <IconEth /> Lumix Token
        </h1>
        <Wallet />
      </div>
    </header>
  );
}

export default Header;
