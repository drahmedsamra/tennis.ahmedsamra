
import { ReactNode } from "react";

type PlayerPortalCardProps = {
  children: ReactNode;
};

export default function PlayerPortalCard({
  children,
}: PlayerPortalCardProps) {
  return (
    <div
      className="
        w-full
        overflow-hidden
        bg-white
        shadow-2xl

        rounded-none
        border-0

        sm:mx-auto
        sm:max-w-3xl
        sm:rounded-[24px]
        sm:border
        sm:border-green-100

        lg:max-w-5xl
        lg:rounded-[32px]
      "
    >
      <div className="px-4 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
}