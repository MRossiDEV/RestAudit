import { FileText, Globe2, QrCode, Users } from "lucide-react";
import { ProfileEvolution } from "./profile-evolution";

export function PermanentProfile() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <ProfileEvolution />

          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Perfil permanente
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Tu CV deja de ser
              <br />
              <span className="text-white/35">un documento.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Tu perfil VORA tiene una URL propia y puede acompañarte de un
              trabajo al siguiente.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: QrCode,
                  title: "URL + QR",
                  text: "Ponelo en tu CV, tarjeta, bio o compartilo directamente.",
                },
                {
                  icon: Users,
                  title: "Compartilo con empresas",
                  text: "Un empleador puede recibir tu perfil directamente.",
                },
                {
                  icon: Globe2,
                  title: "Uruguay y el mundo",
                  text: "Indicá tus preferencias de ubicación y movilidad.",
                },
                {
                  icon: FileText,
                  title: "Tu historia permanece",
                  text: "No necesitás volver a crear tu CV desde cero cada vez.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <div className="text-sm font-semibold">{item.title}</div>

                      <div className="mt-1 text-xs leading-5 text-white/40">
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
