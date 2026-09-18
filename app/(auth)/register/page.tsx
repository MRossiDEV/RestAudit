import Link from "next/link";
import { Suspense } from "react";
import { BrandLink } from "@/components/brand";
import UnifiedRegisterForm from "./register-form";

export const metadata = { title: "Crear cuenta" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-12">
      <BrandLink href="/" size="xl" />
      <Suspense>
        <UnifiedRegisterForm />
      </Suspense>
    </div>
  );
}
