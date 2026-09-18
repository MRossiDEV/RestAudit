import Link from "next/link";
import { BrandLink } from "@/components/brand";
import LoginForm from "./login-form";

export const metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-12">
      <BrandLink href="/" size="xl" />
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
