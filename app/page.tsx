import Image from "next/image";
import Link from "next/link";
import HealthCheckWidget from "./check/restaurant-check";

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  dining:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  chef:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
  bar:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
  consultant:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ============ NAV ============ */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold tracking-tight text-primary-foreground glow-primary">
              V
            </span>
            <span className="font-display text-lg font-bold tracking-[0.2em]">VORA</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm text-muted transition hover:text-foreground">
              Cómo funciona
            </a>
            <a href="#what-we-analyze" className="text-sm text-muted transition hover:text-foreground">
              Qué analizamos
            </a>
            <a href="#for-owners" className="text-sm text-muted transition hover:text-foreground">
              Para dueños de restaurantes
            </a>
            <a href="#about" className="text-sm text-muted transition hover:text-foreground">
              Nosotros
            </a>
          </nav>

          <Link
            href="#health-check"
            className="glow-primary rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Obtén mi VORA Check gratis
          </Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60% 80% at 70% 10%, rgba(124,108,255,0.22), transparent 60%), radial-gradient(50% 60% at 20% 80%, rgba(79,124,255,0.14), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="animate-gradient pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,108,255,0.8), rgba(79,124,255,0.5), transparent)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              VORA RESTAURANT INTELLIGENCE
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              ¿Qué tan saludable es tu restaurante, en realidad?
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">
              VORA analiza las señales detrás del rendimiento financiero, las operaciones, los
              costos y la experiencia del cliente de tu restaurante para identificar dónde se
              esconden tus mayores oportunidades.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="#health-check"
                className="glow-primary inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Obtén mi VORA Check gratis
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-2">
              Gratis · Unos 3 minutos · No se requiere tarjeta de crédito
            </p>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <div className="relative h-full">
                <Image
                  src={IMAGES.hero}
                  alt="Restaurante con iluminación cálida"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    Informe en tiempo real
                  </span>
                </div>
                <div className="relative mt-14 p-5 pb-6 sm:p-7">
                  <HeroDashboard />
                </div>
              </div>
            </div>

            <div className="animate-float absolute -left-5 top-10 hidden rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur sm:block">
              <p className="text-xs text-muted">VORA Score</p>
              <p className="text-2xl font-semibold">
                71<span className="text-sm text-muted">/100</span>
              </p>
            </div>
            <div className="animate-float absolute -right-4 bottom-10 hidden rounded-2xl border border-primary/40 bg-surface/90 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur sm:block" style={{ animationDelay: "1.5s" }}>
              <p className="text-xs text-muted">VORA Insights</p>
              <p className="text-2xl font-semibold text-primary">3 detectadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
          <p className="text-center text-sm font-medium text-foreground/80">
            Hecho para dueños de restaurantes que quieren respuestas, no suposiciones.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Análisis con IA
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Revisión de un consultor humano
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Recomendaciones accionables
            </span>
          </div>
        </div>
      </section>

      {/* ============ HEALTH CHECK ============ */}
      <section id="health-check" className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Da un vistazo rápido debajo de la superficie de tu restaurante.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Responde algunas preguntas sobre tu negocio. El VORA Engine identificará posibles áreas
            de riesgo y oportunidades que vale la pena investigar.
          </p>
        </div>
        <div className="mt-10">
          <HealthCheckWidget />
        </div>
      </section>

      {/* ============ THE PROBLEM ============ */}
      <section id="about" className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            La mayoría de los dueños conocen sus números. No siempre saben qué les están diciendo.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-[17px] leading-8 text-muted">
            <p>Los ingresos pueden verse saludables mientras los márgenes desaparecen en silencio.</p>
            <p>Una cocina ocupada puede seguir siendo ineficiente.</p>
            <p>Un platillo popular puede generar ventas y producir sorprendentemente poca ganancia.</p>
            <p>Y el aumento de los costos de alimentos o personal puede ocultar el problema real.</p>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-xl font-medium leading-8 text-foreground">
            El reto no es recolectar datos. Es saber qué hacer con ellos.
          </p>
        </div>
      </section>

      {/* ============ IMAGE BAND ============ */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
          <div className="relative h-64 overflow-hidden rounded-3xl border border-border sm:h-80">
            <Image
              src={IMAGES.dining}
              alt="Interior de un restaurante elegante"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                El problema
              </p>
              <p className="max-w-xl text-xl font-semibold leading-8 text-white sm:text-2xl">
                Los ingresos pueden verse saludables mientras los márgenes desaparecen en silencio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE ANALYZE ============ */}
      <section id="what-we-analyze" className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Miramos más allá de lo obvio.</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Un restaurante es un sistema. Las pequeñas ineficiencias en distintas áreas pueden crear un
          problema de rentabilidad mucho mayor.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANALYZE_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40"
            >
              <p className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RESTAURANT INTELLIGENCE ENGINE ============ */}
      <section id="intelligence-engine" className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            La inteligencia detrás de VORA
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Construido para restaurantes. No IA genérica.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            La mayoría de las herramientas de IA están diseñadas para saber un poco de todo. VORA se
            está desarrollando en torno a una idea distinta: inteligencia especializada para
            comprender la complejidad de los negocios de restaurantes.
          </p>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            VORA conecta el rendimiento financiero, los costos de alimentos, las decisiones de menú,
            el personal, las operaciones y las señales del cliente para identificar patrones que son
            difíciles de ver cuando cada área se analiza por separado.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-foreground">
            VORA no reemplaza la experiencia restaurantera. Le da a los expertos una forma más
            poderosa de usarla.
          </p>

          <div className="mt-14">
            <IntelligenceDiagram />
          </div>

          <p className="mt-14 text-center text-xl font-semibold tracking-tight text-foreground">
            Una capa de inteligencia. Múltiples perspectivas restauranteras.
          </p>
          <p className="mx-auto mt-4 max-w-3xl leading-8 text-muted">
            Un problema de restaurante rara vez existe de forma aislada. El aumento de los costos de
            alimentos puede estar conectado con compras, inventario, desperdicio, recetas o mezcla
            del menú. Los altos costos de personal pueden relacionarse con la programación, los
            patrones de servicio o las ineficiencias operativas. La caída de la rentabilidad puede
            ser el resultado de múltiples problemas pequeños interactuando al mismo tiempo.
          </p>
          <p className="mx-auto mt-4 max-w-3xl leading-8 text-muted">
            El VORA Engine está diseñado para analizar esas relaciones en lugar de mirar cada
            número de forma independiente.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTELLIGENCE_DOMAINS.map((d, i) => (
              <div
                key={d.title}
                className="rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40"
              >
                <p className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-lg font-semibold">{d.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOT A PUBLIC CHATBOT ============ */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Sistema interno
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Esta inteligencia no es un chatbot público.
            </h2>
            <p className="mt-5 leading-8 text-muted">
              Nuestra IA de Inteligencia Restaurantera está diseñada como una herramienta interna
              para nuestros auditores y equipo de consultoría.
            </p>
            <p className="mt-3 leading-8 text-muted">
              Trabaja tras bambalinas — procesando información, identificando patrones, conectando
              evidencia y apoyando investigaciones más profundas.
            </p>
            <p className="mt-3 leading-8 text-muted">
              El objetivo no es reemplazar a los profesionales restauranteros experimentados. El
              objetivo es darles un sistema analítico más poderoso.
            </p>
          </div>
          <IntelligenceComparison />
        </div>
      </section>

      {/* ============ HOW THE INTELLIGENCE EVOLVES ============ */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          El sistema se vuelve más inteligente con la experiencia.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Cada análisis profesional ayuda a mejorar la inteligencia detrás de la plataforma. Los
          hallazgos generados por IA son revisados por consultores experimentados. Las correcciones,
          validaciones y resultados ayudan a construir un creciente acervo de conocimiento
          específico del sector restaurantero.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <FlowDiagram steps={EVOLUTION_FLOW} />
          <div className="flex flex-col justify-center">
            <p className="leading-8 text-muted">
              Con el tiempo, esto crea algo más valioso que una colección de reportes:
            </p>
            <p className="mt-4 text-xl font-semibold leading-8 text-foreground">
              una base de inteligencia en crecimiento construida alrededor de problemas, decisiones y
              resultados reales de restaurantes.
            </p>
          </div>
        </div>
      </section>

      {/* ============ HUMAN-IN-THE-LOOP ============ */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              La tecnología acelera el análisis. La experiencia hace el juicio.
            </h2>
            <p className="mt-5 leading-8 text-muted">
              La IA puede procesar información a una escala y velocidad difíciles de lograr
              manualmente. Pero los restaurantes operan en el mundo real. El contexto importa. Las
              personas importan. Los mercados locales importan.
            </p>
            <p className="mt-3 leading-8 text-muted">
              Por eso los hallazgos importantes son revisados por consultores experimentados antes de
              convertirse en recomendaciones.
            </p>
          </div>
          <FlowDiagram steps={HUMAN_LOOP_FLOW} />
        </div>
      </section>

      {/* ============ LONG-TERM INTELLIGENCE ============ */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Hecho para aprender
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Construyendo un nuevo tipo de inteligencia restaurantera.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl leading-8 text-muted">
          La consultoría tradicional depende en gran medida de la experiencia individual. Nuestra
          visión es combinar esa experiencia con un sistema de inteligencia en evolución capaz de
          reconocer patrones entre datos financieros, operativos y de clientes.
        </p>
        <p className="mx-auto mt-3 max-w-3xl leading-8 text-muted">
          No para automatizar la consultoría. Para darles a los consultores experimentados mejores
          herramientas para entender negocios restauranteros cada vez más complejos.
        </p>

        <div className="mx-auto mt-12 max-w-2xl space-y-5 text-left">
          <FinalStatementLine lead="Todo análisis" rest="aporta conocimiento." />
          <FinalStatementLine lead="Toda revisión de un experto" rest="aporta contexto." />
          <FinalStatementLine lead="Toda intervención exitosa" rest="aporta evidencia." />
          <FinalStatementLine lead="Juntos" rest="construyen la inteligencia restaurantera." highlight />
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            De los datos del restaurante a decisiones claras.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="relative">
                {i < HOW_STEPS.length - 1 && (
                  <div className="absolute left-0 top-7 hidden h-px w-full bg-border md:block" />
                )}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-surface text-lg font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AI + HUMAN ============ */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              La IA encuentra los patrones. Los expertos entienden el restaurante.
            </h2>
            <p className="mt-4 text-muted">
              La IA puede procesar miles de puntos de datos rápidamente. Pero los números no
              entienden tu cocina, tu equipo, tus clientes ni tu mercado local. Por eso nuestra
              plataforma combina el análisis con IA con consultores restauranteros experimentados.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: "IA", body: "Encuentra patrones, anomalías y oportunidades." },
                { title: "Expertos", body: "Validan los hallazgos y aportan conocimiento restaurantero." },
                { title: "Tú", body: "Decides qué cambios tienen sentido para tu negocio." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-lg font-semibold text-primary">{c.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden h-full min-h-[360px] overflow-hidden rounded-3xl border border-border md:block">
            <Image
              src={IMAGES.consultant}
              alt="Consultor revisando datos en una tableta"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-sm font-semibold text-white">
                Experiencia humana + análisis con IA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MID-PAGE CTA ============ */}
      <section className="relative overflow-hidden border-y border-border">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.chef}
            alt="Chef trabajando en una cocina profesional"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, rgba(124,108,255,0.16), transparent 70%)",
            }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            No sigas adivinando
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Cada día sin claridad cuesta dinero.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Descubre gratis, en unos tres minutos, dónde tu restaurante podría estar perdiendo
            margen y oportunidad.
          </p>
          <Link
            href="#health-check"
            className="glow-primary mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Obtén mi chequeo gratuito
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-4 text-xs text-muted-2">Gratis · Unos 3 minutos · No se requiere tarjeta de crédito</p>
        </div>
      </section>

      {/* ============ SAMPLE AUDIT ============ */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Lo que un análisis más profundo puede descubrir.
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Tus resultados se basan en los datos reales de tu restaurante, no en consejos
                genéricos.
              </p>
              <div className="relative mt-8 hidden h-56 overflow-hidden rounded-2xl border border-border md:block">
                <Image
                  src={IMAGES.kitchen}
                  alt="Cocina de restaurante en plena operación"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            <SampleAudit />
          </div>
        </div>
      </section>

      {/* ============ VALUE / PRICING ============ */}
      <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          El chequeo gratuito te dice dónde mirar. La auditoría completa te dice por qué.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <TierCard
            name="Chequeo de salud gratuito"
            price="$0"
            features={[
              "Puntaje de salud preliminar",
              "Indicadores de riesgo iniciales",
              "Oportunidades potenciales",
              "Análisis básico con IA",
              "Revisión preliminar de un consultor",
            ]}
            cta="Empezar gratis"
          />
          <TierCard
            name="Auditoría completa"
            price="Personalizado"
            featured
            features={[
              "Análisis financiero",
              "Análisis de costo de alimentos",
              "Ingeniería de menú",
              "Análisis de personal",
              "Compras e inventario",
              "Revisión de operaciones",
              "Experiencia del cliente",
              "Plan de acción priorizado",
            ]}
            cta="Solicitar auditoría completa"
          />
          <TierCard
            name="Transformación de restaurante"
            price="Personalizado"
            features={[
              "Todo lo de la auditoría completa",
              "Apoyo en la implementación",
              "Monitoreo de KPIs",
              "Análisis de seguimiento",
              "Optimización continua",
              "Consultoría de gestión",
            ]}
            cta="Hablar con un consultor"
          />
        </div>
      </section>

      {/* ============ ROI ============ */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              No necesitas más reportes. Necesitas mejores decisiones.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              El objetivo de una auditoría no es darte otro documento de 40 páginas. Es identificar
              los cambios que pueden marcar la mayor diferencia en tu restaurante — y ayudarte a
              priorizarlos.
            </p>
          </div>
          <RoiFlow />
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section id="for-owners" className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Hecho para las personas que dirigen restaurantes.
            </h2>
            <div className="mt-8 space-y-4">
              {AUDIENCES.map((a) => (
                <div key={a.title} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-lg font-semibold">{a.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden h-full min-h-[420px] overflow-hidden rounded-3xl border border-border md:block">
            <Image
              src={IMAGES.bar}
              alt="Bar y lounge de restaurante"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-sm font-semibold text-white">
                Desde un solo local hasta grupos con múltiples ubicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted">
            {TRUST_ITEMS.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-primary">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-surface px-6 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}
                <span className="ml-4 text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 0%, rgba(124,108,255,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Tu restaurante. Tus números. Tus oportunidades.
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Deja de adivinar a dónde se va tu ganancia.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Comienza con un chequeo de salud gratuito y descubre qué merece tu atención primero.
          </p>
          <Link
            href="#health-check"
            className="glow-primary mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Obtén mi chequeo gratuito
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-4 text-xs text-muted-2">Gratis · Unos 3 minutos · No se requiere tarjeta de crédito</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  RI
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  Inteligencia<span className="text-primary">Restaurantera</span>
                </span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted">
                Inteligencia restaurantera
              </p>
              <p className="mt-2 max-w-xs text-sm text-muted">
                Análisis de restaurantes con IA y experiencia humana.
              </p>
            </div>

            <FooterCol
              title="Producto"
              links={[
                { label: "Chequeo de salud", href: "#health-check" },
                { label: "Auditorías", href: "#pricing" },
                { label: "Cómo funciona", href: "#how-it-works" },
              ]}
            />
            <div className="grid grid-cols-2 gap-10">
              <FooterCol
                title="Empresa"
                links={[
                  { label: "Nosotros", href: "#about" },
                  { label: "Contacto", href: "#health-check" },
                ]}
              />
              <FooterCol
                title="Recursos"
                links={[
                  { label: "Preguntas frecuentes", href: "#faq" },
                  { label: "Privacidad", href: "/privacy" },
                  { label: "Términos", href: "/terms" },
                ]}
              />
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-2">
            © {new Date().getFullYear()} Inteligencia Restaurantera
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
          Salud del restaurante
        </p>
        <span className="flex items-center gap-1.5 text-xs text-positive">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" /> En vivo
        </span>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <span className="text-6xl font-semibold tracking-tight text-white">71</span>
        <span className="pb-2 text-white/60">/ 100</span>
      </div>
      <div className="mt-6 space-y-3.5">
        {[
          { label: "Financiero", score: 68 },
          { label: "Costo de alimentos", score: 54, warn: true },
          { label: "Menú", score: 82 },
          { label: "Personal", score: 64 },
          { label: "Operaciones", score: 77 },
          { label: "Cliente", score: 86 },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{row.label}</span>
              <span className="flex items-center gap-2 font-medium text-white">
                {row.score}
                {row.warn && <span className="text-negative">⚠</span>}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${row.score >= 75 ? "bg-positive" : row.score >= 55 ? "bg-primary" : "bg-negative"}`}
                style={{ width: `${row.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-primary/20 px-4 py-3 text-sm font-medium text-primary">
        3 oportunidades detectadas
      </div>
    </div>
  );
}

function SampleAudit() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/40">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        Revisión de rendimiento del restaurante
      </p>
      <div className="mt-4 flex items-end gap-3">
        <span className="text-5xl font-semibold tracking-tight">72</span>
        <span className="pb-1.5 text-muted">/ 100</span>
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-widest text-primary">
        Principales oportunidades
      </p>
      <div className="mt-4 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">01 · Costo de alimentos</p>
            <span className="rounded bg-negative/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-negative">
              Prioridad alta
            </span>
          </div>
          <div className="mt-2 space-y-1 text-sm text-muted">
            <p>Real: 34.8% · Meta: 28–31%</p>
            <p className="font-medium text-foreground">Potencial: $4,200–$6,000 / mes</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">02 · Ingeniería de menú</p>
            <span className="rounded bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Prioridad media
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            4 platillos de alto volumen tienen una contribución por debajo de la meta.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">03 · Eficiencia laboral</p>
            <span className="rounded bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Prioridad media
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            El personal de los sábados supera el requisito de ingresos actual.
          </p>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-2">Datos de muestra solo para ilustración</p>
    </div>
  );
}

function TierCard({
  name,
  price,
  features,
  cta,
  featured = false,
}: {
  name: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 ${
        featured ? "border-primary/50 bg-surface" : "border-border bg-surface/60"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          Más popular
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{name}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{price}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
            <span className="mt-0.5 text-primary">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="#health-check"
        className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
          featured
            ? "glow-primary bg-primary text-primary-foreground hover:bg-primary-hover"
            : "border border-border text-foreground hover:border-primary/50"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

function RoiFlow() {
  const steps = ["Problema", "Causa", "Oportunidad", "Acción", "Resultado medible"];
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={s}>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-3.5">
            <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-9 flex justify-center py-1 text-muted-2">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-muted transition hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntelligenceDiagram() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-10">
      <div className="flex flex-col items-center">
        {/* Core */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-dot" />
          <div className="absolute inset-3 rounded-full bg-primary/10" />
          <div className="relative h-3 w-3 rounded-full bg-primary" />
        </div>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          VORA INTELLIGENCE ENGINE
        </p>
        <p className="text-2xl font-bold tracking-[0.15em]">VORA</p>

        {/* Branches */}
        <div className="mt-4 grid w-full gap-4 sm:grid-cols-3">
          {[
            "ANÁLISIS FINANCIERO",
            "ANÁLISIS DE COSTO DE ALIMENTOS",
            "ANÁLISIS DE MENÚ",
          ].map((t) => (
            <DiagramNode key={t} label={t} />
          ))}
        </div>

        <div className="mt-4 grid w-full gap-4 sm:grid-cols-3">
          {[
            "EFICIENCIA LABORAL",
            "INTELIGENCIA OPERATIVA",
            "EXPERIENCIA DEL CLIENTE",
          ].map((t) => (
            <DiagramNode key={t} label={t} dim />
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 py-1 text-muted-2">
          <span>↓</span>
        </div>
        <DiagramNode label="VORA INSIGHTS" accent />
        <div className="flex flex-col items-center gap-2 py-1 text-muted-2">
          <span>↓</span>
        </div>
        <DiagramNode label="VORA ACTIONS" accent strong />
      </div>
    </div>
  );
}

function DiagramNode({
  label,
  dim = false,
  accent = false,
  strong = false,
}: {
  label: string;
  dim?: boolean;
  accent?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider transition ${
        strong
          ? "border-primary bg-primary text-primary-foreground"
          : accent
            ? "border-primary/50 bg-primary/10 text-primary"
            : dim
              ? "border-border bg-surface text-muted"
              : "border-border bg-surface text-foreground"
      }`}
    >
      {label}
    </div>
  );
}

function IntelligenceComparison() {
  const rows = [
    { generic: "Sabe un poco de todo", rt: "Especializada en análisis restaurantero" },
    { generic: "Respuestas genéricas", rt: "Metodología de consultoría estructurada" },
    { generic: "Sin contexto restaurantero", rt: "Contexto específico del restaurante" },
    { generic: "Conversación única", rt: "Análisis de evidencia de múltiples fuentes" },
    { generic: "Sin validación de expertos", rt: "Revisión de consultores" },
    { generic: "Recomendaciones genéricas", rt: "Oportunidades de acción priorizadas" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid grid-cols-2 border-b border-border text-xs font-semibold uppercase tracking-wider">
        <div className="px-5 py-3 text-muted-2">IA genérica</div>
        <div className="border-l border-border bg-primary/5 px-5 py-3 text-primary">
          Inteligencia restaurantera
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.rt}
          className={`grid grid-cols-2 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`}
        >
          <div className="px-5 py-3 text-muted-2">{r.generic}</div>
          <div className="border-l border-border px-5 py-3 text-foreground">{r.rt}</div>
        </div>
      ))}
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={s}>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-3.5">
            <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-9 flex justify-center py-1 text-muted-2">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

function FinalStatementLine({
  lead,
  rest,
  highlight = false,
}: {
  lead: string;
  rest: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
        highlight ? "border-primary/50 bg-primary/10" : "border-border bg-surface"
      }`}
    >
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${highlight ? "bg-primary" : "bg-muted-2"}`} />
      <p className="text-[15px] leading-7">
        <span className={highlight ? "font-semibold text-foreground" : "font-medium text-foreground"}>{lead}</span>{" "}
        <span className={highlight ? "text-foreground" : "text-muted"}>{rest}</span>
      </p>
    </div>
  );
}

const INTELLIGENCE_DOMAINS = [
  {
    title: "Inteligencia financiera",
    body: "Comprende la relación entre ingresos, márgenes, costos y rentabilidad.",
  },
  {
    title: "Inteligencia de menú",
    body: "Analiza popularidad, contribución, precios y complejidad operativa.",
  },
  {
    title: "Inteligencia de costo de alimentos",
    body: "Investiga compras, recetas, porciones, desperdicio y variación de inventario.",
  },
  {
    title: "Inteligencia laboral",
    body: "Identifica patrones de productividad, ineficiencias de personal y oportunidades de programación.",
  },
  {
    title: "Inteligencia operativa",
    body: "Conecta observaciones, flujos de trabajo y rendimiento operativo.",
  },
  {
    title: "Inteligencia del cliente",
    body: "Detecta patrones recurrentes en la retroalimentación y la experiencia del cliente.",
  },
];

const EVOLUTION_FLOW = [
  "Datos del restaurante",
  "Análisis con IA",
  "Revisión del consultor",
  "Correcciones de expertos",
  "Acciones del mundo real",
  "Resultados medidos",
  "Inteligencia restaurantera",
];

const HUMAN_LOOP_FLOW = [
  "Datos",
  "IA restaurantera",
  "Hallazgos",
  "Experto humano",
  "Validación",
  "Recomendación",
  "Acción",
];

const ANALYZE_ITEMS = [
  {
    title: "Rendimiento financiero",
    body: "Comprende a dónde van los ingresos y dónde se pierden márgenes.",
  },
  {
    title: "Costo de alimentos",
    body: "Analiza compras, recetas, porciones, desperdicio y variación de inventario.",
  },
  {
    title: "Rendimiento del menú",
    body: "Identifica los platillos que impulsan ventas, contribución y complejidad oculta.",
  },
  {
    title: "Personal",
    body: "Comprende la eficiencia, productividad y los patrones de programación.",
  },
  {
    title: "Operaciones",
    body: "Encuentra cuellos de botella, ineficiencias y riesgos operativos.",
  },
  {
    title: "Experiencia del cliente",
    body: "Identifica quejas recurrentes, patrones de sentimiento y brechas de experiencia.",
  },
  {
    title: "Oportunidades de crecimiento",
    body: "Prioriza los cambios con el mayor impacto potencial en el negocio.",
  },
];

const HOW_STEPS = [
  { title: "Cuéntanos sobre tu restaurante", body: "Comienza con el chequeo de salud gratuito." },
  { title: "Analizamos las señales", body: "La IA identifica patrones, anomalías y áreas que vale la pena investigar." },
  { title: "Nuestros consultores revisan los hallazgos", body: "La experiencia humana valida el análisis y añade contexto del mundo real." },
  { title: "Obtienes un plan de acción claro", body: "Sabes qué merece atención, por qué importa y qué hacer a continuación." },
];

const AUDIENCES = [
  {
    title: "Dueños de restaurantes",
    body: "Comprende dónde está tu negocio y dónde pueden estar las mayores oportunidades.",
  },
  {
    title: "Operadores y gerentes generales",
    body: "Convierte los datos operativos en decisiones prácticas.",
  },
  {
    title: "Grupos con múltiples ubicaciones",
    body: "Compara el rendimiento e identifica patrones entre ubicaciones.",
  },
  {
    title: "Inversionistas / Grupos restauranteros",
    body: "Obtén una visión estructurada del rendimiento operativo y financiero.",
  },
];

const TRUST_ITEMS = [
  "Datos de negocio confidenciales",
  "Revisión de consultores humanos",
  "Análisis basado en evidencia",
  "Inteligencia con IA",
  "Recomendaciones orientadas a la acción",
];

const FAQS = [
  {
    q: "¿El chequeo de salud es realmente gratuito?",
    a: "Sí. El chequeo de salud preliminar es gratuito y no requiere tarjeta de crédito.",
  },
  {
    q: "¿Esto reemplaza a un consultor restaurantero?",
    a: "No. La IA ayuda a identificar patrones y oportunidades. Nuestro proceso de consultoría combina ese análisis con la experiencia y validación humana.",
  },
  {
    q: "¿Necesito subir mi información financiera?",
    a: "No para el chequeo inicial. Una auditoría más profunda utiliza datos adicionales del restaurante para producir un análisis más detallado.",
  },
  {
    q: "¿Tendrán acceso a los datos de mi restaurante?",
    a: "Solo a la información que tú decidas proporcionar. La información de tu negocio se trata como confidencial.",
  },
  {
    q: "¿La IA toma decisiones por mí?",
    a: "No. La plataforma proporciona análisis y recomendaciones. Las decisiones finales quedan en manos del dueño del restaurante y del equipo de consultoría.",
  },
  {
    q: "¿Cuánto cuesta una auditoría completa?",
    a: "El precio depende del tamaño, la complejidad y el alcance del análisis del restaurante. Después de la revisión preliminar, recomendaremos el nivel de servicio adecuado.",
  },
];