import { AgentVisual } from "./agent-visual";

export function AgentTrust() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-violet-950/30 via-[#101015] to-blue-950/20 p-7 sm:p-10 lg:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Tecnología + personas
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                La tecnología encuentra.
                <br />
                <span className="text-white/35">
                  Las personas verifican.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
                Detrás de la red VORA existen profesionales locales que
                conocen la industria y pueden realizar entrevistas,
                verificaciones y procesos profesionales.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Red local", "Profesionales de la industria"],
                  ["02", "Entrevista", "Conversación humana estructurada"],
                  ["03", "VORA", "Datos + matching + plataforma"],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-violet-300">
                      {number}
                    </div>

                    <div className="mt-4 text-sm font-semibold">{title}</div>

                    <div className="mt-1 text-xs text-white/35">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <AgentVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
