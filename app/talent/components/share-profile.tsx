import {
  AtSign,
  FileText,
  Mail,
  MessageCircle,
  QrCode,
  Share2,
  Smartphone,
} from "lucide-react";

const channels = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: AtSign, label: "Instagram" },
  { icon: Share2, label: "Facebook" },
  { icon: Smartphone, label: "LinkedIn" },
  { icon: Mail, label: "Email" },
  { icon: FileText, label: "CV impreso" },
  { icon: QrCode, label: "QR" },
];

export function ShareProfile() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-violet-500/10 blur-[80px]" />

            <div className="relative rounded-[30px] border border-white/[0.08] bg-[#111116] p-7 shadow-2xl shadow-black/30 sm:p-9">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                Tu perfil viaja con vos
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-violet-400/15 bg-violet-400/[0.05] p-4">
                <div className="text-sm font-semibold text-white">
                  vora.com/talent/maria
                </div>

                <QrCode className="h-5 w-5 text-violet-300" />
              </div>

              <div className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/25">
                Compartilo donde quieras
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {channels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <div
                      key={channel.label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3"
                    >
                      <Icon className="h-4 w-4 text-violet-300" />
                      <span className="text-xs text-white/60">
                        {channel.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Compartí tu perfil
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Tu perfil
              <br />
              <span className="text-white/35">viaja con vos.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Un solo enlace. Un solo QR. Todo lo que sos profesionalmente,
              listo para compartir en cualquier momento.
            </p>

            <p className="mt-4 max-w-lg text-base font-medium leading-7 text-white/60">
              No tenés que crear un CV nuevo cada vez.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
