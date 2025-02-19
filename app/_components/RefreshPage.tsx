"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import IconArrows from "@/_assets/icons/arrows.svg";

interface RefreshPageProps {
  className?: string;
}

function RefreshPage({ className }: RefreshPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      type="button"
      className={`min-h-full hover:bg-slate-100 flex self-stretch items-center justify-center py-2 px-3 aspect-square border border-slate-300 rounded-md ${className}`}
    >
      <IconArrows
        height={16}
        width={16}
        className={isPending ? "animate-spin" : ""}
      />
    </button>
  );
}

export default RefreshPage;
