import { ReactNode } from "react";

type PlayerPortalCardProps = {
  children: ReactNode;
};

export default function PlayerPortalCard({
  children,
}: PlayerPortalCardProps) {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-green-100 bg-white px-10 pb-10 shadow-2xl">
      {children}
    </div>
  );
}