import type { CSSProperties } from "react";
import Image from "next/image";

type TeamBadgeProps = {
  code: string;
  name: string;
  size?: "sm" | "md" | "lg";
};

const teamColors: Record<
  string,
  { primary: string; secondary: string }
> = {
  MIN: { primary: "#4F2683", secondary: "#FFC62F" },
  ATL: { primary: "#A71930", secondary: "#000000" },
  BAL: { primary: "#241773", secondary: "#9E7C0C" },
  BUF: { primary: "#00338D", secondary: "#C60C30" },
  CAR: { primary: "#0085CA", secondary: "#101820" },
  CHI: { primary: "#0B162A", secondary: "#C83803" },
  DEN: { primary: "#FB4F14", secondary: "#002244" },
  DET: { primary: "#0076B6", secondary: "#B0B7BC" },
  GB: { primary: "#203731", secondary: "#FFB612" },
  IND: { primary: "#002C5F", secondary: "#A2AAAD" },
  MIA: { primary: "#008E97", secondary: "#FC4C02" },
  NE: { primary: "#002244", secondary: "#C60C30" },
  NO: { primary: "#101820", secondary: "#D3BC8D" },
  NYG: { primary: "#0B2265", secondary: "#A71930" },
  NYJ: { primary: "#125740", secondary: "#FFFFFF" },
  SF: { primary: "#AA0000", secondary: "#B3995D" },
  TB: { primary: "#D50A0A", secondary: "#34302B" },
  WAS: { primary: "#5A1414", secondary: "#FFB612" },
};

const sizeClasses = {
  sm: "h-12 w-12 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-20 w-20 text-xl sm:h-24 sm:w-24 sm:text-2xl",
};

export default function TeamBadge({
  code,
  name,
  size = "md",
}: TeamBadgeProps) {
  const colors = teamColors[code] ?? {
    primary: "#252532",
    secondary: "#FFFFFF",
  };
  const logoCode = code === "WAS" ? "wsh" : code.toLowerCase();
  const style: CSSProperties = {
    background: `radial-gradient(circle at 30% 20%, ${colors.primary}CC, #111118 70%)`,
    borderColor: colors.secondary,
    boxShadow: `0 12px 30px ${colors.primary}55, inset 0 0 0 3px ${colors.primary}`,
  };

  return (
    <span
      className={`${sizeClasses[size]} relative inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2`}
      style={style}
    >
      <span className="absolute inset-1 rounded-full border border-white/20" />
      <Image
        src={`/team-logos/${logoCode}.png`}
        alt={`Logo do ${name}`}
        fill
        sizes={size === "lg" ? "96px" : size === "md" ? "64px" : "48px"}
        className="object-contain p-2 drop-shadow-lg"
      />
    </span>
  );
}
