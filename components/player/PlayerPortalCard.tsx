import { ReactNode } from "react";

type PlayerPortalCardProps = {
  children: ReactNode;
};

export default function PlayerPortalCard({
  children,
}: PlayerPortalCardProps) {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[32px] border border-green-100 bg-white shadow-2xl sm:max-w-2xl lg:max-w-5xl">
      <div className="px-6 pb-8 sm:px-8 lg:px-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
}