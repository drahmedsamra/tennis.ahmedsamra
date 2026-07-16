import { ReactNode } from "react";

type PlayerPortalCardProps = {
  children: ReactNode;
};

export default function PlayerPortalCard({
  children,
}: PlayerPortalCardProps) {
  return (
    <div className="mx-auto w-full max-w-none overflow-hidden rounded-[24px] border border-green-100 bg-white shadow-2xl sm:max-w-3xl lg:max-w-5xl">
      <div className="px-4 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
}