import Link from "next/link";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="grid-bg" aria-hidden />

      {/* ============ NAVBAR ============ */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            VOR<span>A</span>
          </div>

          <div className="nav-links">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#intelligence">VORA Intelligence</a>
            <a href="#soluciones">Soluciones</a>
            <a href="#nosotros">Nosotros</a>
          </div>

          <Link href="/check" className="btn btn-primary">
            Obtener mi VORA Check
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">INTELIGENCIA + EXPERTISE HUMANO</div>

              <h1>
                Convierte la complejidad de tu restaurante en{" "}
                <span className="gradient-text">oportunidades claras.</span>
              </h1>

              <p>
                VORA analiza las señales detrás de las finanzas, costos,
                operaciones, menú y experiencia del cliente para descubrir qué
                está impulsando realmente el rendimiento de tu restaurante.
              </p>

              <div className="hero-actions">
                <Link href="/check" className="btn btn-primary">
                  Obtener mi VORA Check →
                </Link>

                <a href="#intelligence" className="btn btn-outline">
                  Conocer VORA
                </a>
              </div>

              <div className="hero-benefits">
                <span>100% Gratuito</span>
                <span>Solo 3 minutos</span>
                <span>Sin tarjeta de crédito</span>
              </div>
            </div>

            {/* ============ DASHBOARD ============ */}
            <div className="dashboard">
              <div className="dashboard-header">
                <div>
                  <div className="dashboard-label">RESTAURANT INTELLIGENCE</div>
                  <strong>VORA SCORE</strong>
                </div>

                <div className="status">● ANALYSIS COMPLETE</div>
              </div>

              <div className="score-grid">
                <div className="score-circle">
                  <div className="number">72</div>
                  <div className="small">SCORE / 100</div>
                </div>

                <div className="metrics">
                  <Metric name="Finanzas" value={72} />
                  <Metric name="Costos" value={58} />
                  <Metric name="Menú" value={81} />
                  <Metric name="Operaciones" value={76} />
                </div>
              </div>

              <div className="opportunities">
                <h4>TOP OPPORTUNITIES DETECTED</h4>

                <div className="opportunity">
                  <div>
                    <strong>Costos de alimentos</strong>
                    <br />
                    <small>Posible oportunidad detectada</small>
                  </div>
                  <div className="impact">HIGH IMPACT</div>
                </div>

                <div className="opportunity">
                  <div>
                    <strong>Eficiencia laboral</strong>
                    <br />
                    <small>Patrón operativo identificado</small>
                  </div>
                  <div className="impact">MEDIUM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="trust">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-title">
              INTELIGENCIA PARA LA NUEVA GENERACIÓN DE RESTAURANTES
            </div>

            <div className="trust-logos">
              <span>URBAN EATS</span>
              <span>MESA GRILL</span>
              <span>LA COSTA</span>
              <span>BISTRO Nº9</span>
              <span>CHAR</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTELLIGENCE ============ */}
      <section id="intelligence">
        <div className="container">
          <div className="intelligence-layout">
            <div>
              <div className="section-label">CONSTRUIDA PARA RESTAURANTES</div>

              <h2 className="section-title">
                La inteligencia detrás de <span className="gradient-text">VORA.</span>
              </h2>

              <p className="section-copy">
                La mayoría de las herramientas de IA saben un poco sobre todo.
                <br />
                <br />
                VORA está siendo desarrollada con un objetivo diferente:
                construir inteligencia especializada para comprender la
                complejidad real de un negocio gastronómico.
                <br />
                <br />
                VORA conecta múltiples señales para detectar relaciones,
                patrones y oportunidades que los reportes tradicionales pueden
                pasar por alto.
              </p>
            </div>

            <div className="engine">
              <div className="engine-ring ring-2" aria-hidden />
              <div className="engine-ring ring-1" aria-hidden />

              <div className="node node-1">Inteligencia Financiera</div>
              <div className="node node-2">Inteligencia del Menú</div>
              <div className="node node-3">Inteligencia Laboral</div>
              <div className="node node-4">Inteligencia del Cliente</div>
              <div className="node node-5">Inteligencia Operativa</div>
              <div className="node node-6">Inteligencia de Costos</div>

              <div className="engine-core">
                <strong>VORA</strong>
                <span>
                  INTELLIGENCE
                  <br />
                  ENGINE
                </span>
              </div>
            </div>
          </div>

          {/* ============ FEATURES ============ */}
          <div className="feature-grid">
            <FeatureCard icon="◈" title="IA Especializada">
              Diseñada alrededor de escenarios reales de análisis y operación
              gastronómica.
            </FeatureCard>
            <FeatureCard icon="◉" title="Human-in-the-Loop">
              Los hallazgos importantes son revisados y validados por expertos.
            </FeatureCard>
            <FeatureCard icon="↗" title="Inteligencia Evolutiva">
              El conocimiento del sistema se refina mediante experiencia y
              validación profesional.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ============ VORA CHECK ============ */}
      <section id="check">
        <div className="container">
          <div className="vora-check">
            <div className="check-grid">
              <div>
                <div className="section-label">EVALUACIÓN GRATUITA</div>

                <h2 className="check-title">
                  VORA <span className="gradient-text">CHECK</span>
                </h2>

                <p className="section-copy">
                  Una evaluación rápida para descubrir qué oportunidades pueden
                  estar escondidas en tu restaurante.
                </p>

                <ul className="check-list">
                  <li>Responde algunas preguntas</li>
                  <li>Obtén tu VORA Score</li>
                  <li>Descubre áreas de oportunidad</li>
                  <li>Solicita una revisión profesional</li>
                </ul>

                <Link href="/check" className="btn btn-primary">
                  Obtener mi VORA Check →
                </Link>
              </div>

              <div className="mini-dashboard">
                <div className="dashboard-label">TU RESTAURANT SCORE</div>

                <div className="mini-score">72</div>

                <p style={{ color: "#94a3b8" }}>Saludable, con oportunidades.</p>

                <br />

                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: "72%" }} />
                </div>

                <br />

                <small style={{ color: "#20e3b2" }}>
                  ● 3 oportunidades detectadas
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOLUCIONES ============ */}
      <section id="soluciones">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">POR QUÉ VORA</div>

            <h2 className="section-title">
              De datos complejos a{" "}
              <span className="gradient-text">decisiones claras.</span>
            </h2>
          </div>

          <div className="feature-grid">
            <FeatureCard icon="◎" title="Encuentra lo importante">
              Identifica las áreas y oportunidades que merecen atención primero.
            </FeatureCard>
            <FeatureCard icon="ϟ" title="Ahorra tiempo">
              Analiza múltiples señales y fuentes de información de forma
              estructurada.
            </FeatureCard>
            <FeatureCard icon="◈" title="Validado por expertos">
              Los hallazgos se complementan con experiencia real de
              profesionales.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section id="como-funciona">
        <div className="container">
          <div>
            <div className="section-label">CÓMO FUNCIONA</div>

            <h2 className="section-title">
              De señales complejas a <span className="gradient-text">acción.</span>
            </h2>
          </div>

          <div className="steps">
            <Step number="01" title="Comparte información">
              Comienza con el VORA Check y responde algunas preguntas clave.
            </Step>
            <Step number="02" title="VORA analiza">
              El sistema identifica patrones, riesgos y oportunidades
              potenciales.
            </Step>
            <Step number="03" title="Los expertos investigan">
              Los hallazgos se complementan con experiencia y análisis
              profesional.
            </Step>
            <Step number="04" title="Convierte insights en acción">
              Obtén claridad sobre qué merece atención y por qué.
            </Step>
          </div>
        </div>
      </section>

      {/* ============ NOT A CHATBOT ============ */}
      <section>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">
              INTELIGENCIA, NO CONVERSACIÓN GENÉRICA
            </div>

            <h2 className="section-title">
              VORA no es un <span className="gradient-text">chatbot público.</span>
            </h2>

            <p className="section-copy" style={{ margin: "auto" }}>
              VORA funciona como una capa de inteligencia especializada dentro
              del proceso de análisis y consultoría profesional.
            </p>
          </div>

          <div className="comparison">
            <div className="comparison-card generic">
              <h3>IA Genérica</h3>
              <ul>
                <li>Conocimiento general</li>
                <li>Respuestas aisladas</li>
                <li>Conversación genérica</li>
                <li>Sin contexto específico</li>
                <li>Recomendaciones generales</li>
              </ul>
            </div>

            <div className="comparison-card vora">
              <h3>VORA Intelligence</h3>
              <ul>
                <li>Especialización en restaurantes</li>
                <li>Análisis estructurado</li>
                <li>Inteligencia operativa</li>
                <li>Contexto del negocio</li>
                <li>Hallazgos priorizados</li>
                <li>Validación humana</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY ============ */}
      <section id="nosotros">
        <div className="container">
          <div className="philosophy">
            <div className="section-label">LA FILOSOFÍA VORA</div>

            <h2 className="section-title">
              Los restaurantes generan cientos de señales.
            </h2>

            <p className="section-copy">
              Ventas. Costos. Personal. Inventario. Operaciones. Clientes.
              <br />
              <br />
              El problema no es la falta de datos.
              <br />
              El problema es entender qué significan juntos.
            </p>

            <div className="big-statement">
              VORA conecta las señales.
              <br />
              <span className="gradient-text">Para encontrar lo que importa.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta">
        <div className="container">
          <h2>
            Descubre qué puede estar pasando{" "}
            <span className="gradient-text">debajo de la superficie.</span>
          </h2>

          <p>
            Comienza con un VORA Check gratuito y descubre las áreas de tu
            restaurante que pueden merecer una mirada más profunda.
          </p>

          <Link href="/check" className="btn btn-primary">
            Obtener mi VORA Check →
          </Link>

          <div className="hero-benefits" style={{ justifyContent: "center" }}>
            <span>Gratis</span>
            <span>3 minutos</span>
            <span>Sin compromiso</span>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                VOR<span>A</span>
              </div>

              <p>
                Transformamos señales complejas en inteligencia para mejores
                decisiones.
              </p>
            </div>

            <div className="footer-column">
              <h4>Plataforma</h4>
              <Link href="/check">VORA Check</Link>
              <a href="#intelligence">VORA Intelligence</a>
              <a href="#como-funciona">Cómo funciona</a>
            </div>

            <div className="footer-column">
              <h4>Servicios</h4>
              <Link href="/check">Auditoría</Link>
              <a href="#soluciones">Análisis Operativo</a>
              <a href="#soluciones">Consultoría</a>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <a href="#nosotros">Nosotros</a>
              <a href="#check">Contacto</a>
              <a href="#intelligence">Recursos</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} VORA. Todos los derechos reservados.</span>
            <span>Privacidad · Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Metric({ name, value }: { name: string; value: number }) {
  return (
    <div className="metric">
      <div className="metric-name">{name}</div>
      <div className="metric-value">{value}</div>

      <div className="metric-bar">
        <div className="metric-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}