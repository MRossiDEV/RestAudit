import Link from "next/link";

export function ProfileFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <div className="brand-mark text-sm">
            VOR<span>A</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-2">
            Talent especializado en gastronomía y hospitalidad.
          </p>
        </div>

        <div className="flex justify-center gap-5 text-[10px] text-muted sm:justify-end">
          <Link href="/talent" className="hover:text-foreground">
            VORA Talent
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacidad
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}
