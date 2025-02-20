"use client";

import useTokenInfo from "@/_hooks/useTokenInfo";
import Spinner from "@/_components/Spinner";
import CopyClipboard from "@/_components/CopyClipboard";

function TokenInfoList() {
  const { tokenInfo, isPending } = useTokenInfo();

  if (isPending)
    return <Spinner className="mx-auto mb-6" height={32} width={32} />;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28 gap-y-4">
      {tokenInfo.map((info) => (
        <li
          key={info.label}
          className="flex items-center justify-between gap-2"
        >
          <span className="text-slate-800 font-medium">{info.label}</span>

          <div>
            <span className="text-slate-700">{info.value}</span>
            {info.showCopyBtn && (
              <CopyClipboard
                text={info.value}
                className="relative top-[2px] ml-[5px]"
                height={17}
                width={17}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TokenInfoList;
