import { talentCategories } from "../data";

export function Categories() {
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.015] px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/30">
          Profesionales que forman parte de VORA Talent
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {talentCategories.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-white/55"
            >
              <Icon className="h-4 w-4 text-white/30" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
