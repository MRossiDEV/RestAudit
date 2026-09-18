import Image from "next/image";
import Link from "next/link";

export function BrandIcon({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/brand/logo-icon-tr.png"
      alt="VORA"
      width={size}
      height={size}
      className="shrink-0"
      priority
    />
  );
}

export function BrandMark({
  size = "base",
  subtitle,
}: {
  size?: "sm" | "base" | "lg" | "xl";
  subtitle?: string;
}) {
  const height = { sm: 20, base: 26, lg: 32, xl: 40 }[size];
  const src = size === "sm" ? "/brand/logo-sm.png" : "/brand/logo.png";
  const ratio = size === "sm" ? 200 / 30 : 888 / 135;
  const width = Math.round(height * ratio);

  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={src}
        alt="VORA"
        width={width}
        height={height}
        className="shrink-0"
        priority
      />
      {subtitle && (
        <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-violet-400">
          {subtitle}
        </span>
      )}
    </span>
  );
}

export function BrandLink({
  href = "/",
  size = "base",
  subtitle,
}: {
  href?: string;
  size?: "sm" | "base" | "lg" | "xl";
  subtitle?: string;
}) {
  return (
    <Link href={href} className="inline-flex">
      <BrandMark size={size} subtitle={subtitle} />
    </Link>
  );
}
