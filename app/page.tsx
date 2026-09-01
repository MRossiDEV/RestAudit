import Link from "next/link";
import "./landing.css";

const painPoints = [
  {
    title: "El restaurante está lleno, pero la rentabilidad no mejora.",
    text: "Trabajas más. Vendes más. Pero al final del mes, los números no reflejan el esfuerzo.",
  },
  {
    title: "Los costos aumentan y no está claro por qué.",
    text: "Compras, proveedores, desperdicio, porciones, inventario. Sabes que algo cambió, pero encontrar la causa requiere tiempo que no tienes.",
  },
  {
    title: "Siempre estás apagando incendios.",
    text: "Problemas de personal, operaciones inconsistentes y situaciones urgentes que terminan dependiendo siempre de ti.",
  },
  {
    title: "Sabes que existen oportunidades, pero no sabes dónde empezar.",
    text: "Hay demasiadas variables. Cambiar todo al mismo tiempo no es una estrategia.",
  },
  {
    title: "Tu equipo trabaja duro, pero los resultados no siempre son consistentes.",
    text: "El problema no siempre son las personas. A veces son los procesos y sistemas que las personas tienen que seguir.",
  },
  {
    title: "Tienes información, pero no necesariamente respuestas.",
    text: "Ventas. Inventario. Costos. Reviews. Reportes. La información existe. Lo difícil es entender qué significa realmente para tu negocio.",
  },
];

const auditAreas = [
  {
    id: "01",
    title: "Rentabilidad",
    summary: "¿El negocio está generando el retorno que debería?",
    text: "Analizamos cómo se conectan ventas, costos y operación para identificar dónde pueden estar erosionándose los márgenes.",
  },
  {
    id: "02",
    title: "Costos y control",
    summary: "¿Sabe exactamente dónde se está yendo su dinero?",
    text: "Investigamos variaciones, desperdicios, compras, inventario y otros factores que pueden afectar silenciosamente la rentabilidad.",
  },
  {
    id: "03",
    title: "Operaciones",
    summary: "¿La operación funciona como debería funcionar?",
    text: "Observamos procesos, flujos de trabajo y cuellos de botella que afectan la eficiencia diaria.",
  },
  {
    id: "04",
    title: "Equipos y productividad",
    summary: "¿La estructura de trabajo acompaña la demanda real del negocio?",
    text: "Analizamos organización, responsabilidades y distribución de recursos.",
  },
  {
    id: "05",
    title: "Menú y rentabilidad",
    summary: "¿Lo que más vende es realmente lo que más conviene vender?",
    text: "Evaluamos popularidad, costos, complejidad y contribución económica.",
  },
  {
    id: "06",
    title: "Experiencia del cliente",
    summary: "¿La experiencia que cree ofrecer coincide con la que vive su cliente?",
    text: "Buscamos señales que pueden afectar percepción, satisfacción y recurrencia.",
  },
];

const methodSteps = [
  {
    number: "01",
    title: "Escuchamos",
    text: "Antes de analizar números, entendemos el negocio, sus objetivos y las preocupaciones de quienes lo gestionan.",
  },
  {
    number: "02",
    title: "Observamos",
    text: "Nuestros auditores estudian cómo funciona realmente la operación.",
  },
  {
    number: "03",
    title: "Investigamos",
    text: "Conectamos datos, procesos y observaciones para encontrar las causas detrás de los síntomas.",
  },
  {
    number: "04",
    title: "Priorizamos",
    text: "No todos los problemas tienen el mismo impacto. Identificamos dónde actuar primero.",
  },
  {
    number: "05",
    title: "Recomendamos",
    text: "Convertimos los hallazgos en acciones claras, prácticas y comprensibles.",
  },
  {
    number: "06",
    title: "Acompañamos",
    text: "Porque encontrar una oportunidad es solo el comienzo. El verdadero cambio ocurre durante la implementación.",
  },
];

const deliverables = [
  "Diagnóstico Ejecutivo",
  "Hallazgos Prioritarios",
  "Análisis de Causas",
  "Mapa de Impacto",
  "Plan de Acción",
];

const faqs = [
  {
    question: "¿VORA es un software?",
    answer: "No. VORA es una firma especializada en auditoría y consultoría para restaurantes. Utilizamos tecnología avanzada como parte de nuestro proceso interno, pero cada análisis es guiado por profesionales con experiencia.",
  },
  {
    question: "¿Quién realiza la auditoría?",
    answer: "Nuestros auditores y especialistas analizan la información, investigan los hallazgos y desarrollan las recomendaciones.",
  },
  {
    question: "¿Qué papel tiene la inteligencia artificial?",
    answer: "La tecnología funciona como una herramienta de asistencia para ayudar a nuestros profesionales a procesar información y detectar patrones. El análisis final y las recomendaciones son responsabilidad del equipo profesional.",
  },
  {
    question: "¿Qué tipo de restaurantes pueden trabajar con VORA?",
    answer: "La metodología puede adaptarse según el tipo de operación, tamaño y necesidades específicas del negocio.",
  },
  {
    question: "¿Cuánto dura una auditoría?",
    answer: "La duración depende del alcance y profundidad del análisis requerido.",
  },
  {
    question: "¿Qué ocurre después de la revisión inicial?",
    answer: "Dependiendo de los hallazgos y necesidades identificadas, el equipo puede recomendar un proceso de auditoría específico.",
  },
];

const auditors = [
  {
    name: "NOMBRE DEL AUDITOR",
    role: "Senior Restaurant Auditor",
    years: "15+ años de experiencia en la industria",
    specializations: ["Operaciones", "Control de Costos", "Rentabilidad", "Gestión de Equipos"],
    background: "Ha trabajado en operaciones gastronómicas, gestión de costos y proyectos de mejora continua en restaurantes de servicio completo y multiunidad.",
    philosophy: "Una auditoría no consiste simplemente en encontrar problemas. Consiste en entender por qué existen.",
  },
  {
    name: "NOMBRE DEL AUDITOR",
    role: "Consultor de Operación y Financiamiento",
    years: "12+ años en restauración y gestión comercial",
    specializations: ["Eficiencia Operativa", "Diseño de Procesos", "Margen", "Planificación"],
    background: "Cuenta con experiencia en apertura de restaurantes, gestión de operaciones y apoyo a equipos en etapas de crecimiento y reorganización.",
    philosophy: "El valor real no está en detectar errores aislados, sino en comprender cómo interactúan las piezas del negocio.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="grid-bg" aria-hidden />

      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            VOR<span>A</span>
          </div>

          <div className="nav-links">
            <a href="#nuestro-enfoque">Nuestro Enfoque</a>
            <a href="#que-auditamos">Qué Auditamos</a>
            <a href="#expertos">Nuestros Expertos</a>
            <a href="#metodo">El Método VORA</a>
            <a href="#resultados">Resultados</a>
          </div>

          <Link href="/check" className="btn btn-primary">
            Solicitar Revisión
          </Link>
        </div>
      </nav>

      <section className="hero" id="nuestro-enfoque">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">AUDITORÍA Y CONSULTORÍA PARA RESTAURANTES</div>

              <h1>
                Vos conoces tu restaurante. Nosotros te ayudamos a verlo <span className="gradient-text">desde otra perspectiva</span>.
              </h1>

              <p>
                Gestionar un restaurante significa tomar cientos de decisiones cada semana.
                Costos, personal, operaciones, proveedores, menú y clientes.
                Con el tiempo, algunos problemas dejan de ser visibles.
              </p>

              <p className="section-copy">
                Nuestros auditores combinan experiencia real en la industria, análisis profundo y una metodología estructurada para identificar oportunidades, ineficiencias y problemas que pueden estar afectando el rendimiento de su negocio.
              </p>

              <div className="hero-actions">
                <Link href="/check" className="btn btn-primary">
                  Solicitar una revisión inicial →
                </Link>
                <a href="#expertos" className="btn btn-outline">
                  Conocer a nuestros expertos
                </a>
              </div>

              <div className="hero-benefits">
                <span>Experiencia en la industria</span>
                <span>Análisis independiente</span>
                <span>Metodología estructurada</span>
                <span>Tecnología como asistencia</span>
              </div>
            </div>

            <div className="dashboard">
              <div className="dashboard-header">
                <div>
                  <div className="dashboard-label">AUDITORÍA OPERATIVA</div>
                  <strong>VORA REVIEW</strong>
                </div>

                <div className="status">● ANÁLISIS EN CURSO</div>
              </div>

              <div className="score-grid">
                <div className="score-circle">
                  <div className="number">72</div>
                  <div className="small">SEÑAL / 100</div>
                </div>

                <div className="metrics">
                  <Metric name="Finanzas" value={72} />
                  <Metric name="Costos" value={58} />
                  <Metric name="Menú" value={81} />
                  <Metric name="Operación" value={76} />
                </div>
              </div>

              <div className="opportunities">
                <h4>ÁREAS DE ATENCIÓN</h4>

                <div className="opportunity">
                  <div>
                    <strong>Costos de alimentos</strong>
                    <br />
                    <small>Riesgo operativo</small>
                  </div>
                  <div className="impact">ALTO IMPACTO</div>
                </div>

                <div className="opportunity">
                  <div>
                    <strong>Eficiencia laboral</strong>
                    <br />
                    <small>Patrón a revisar</small>
                  </div>
                  <div className="impact">MEDIO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-title">EXPERIENCIA HUMANA + MÉTODO PROFESIONAL</div>
            <div className="trust-logos">
              <span>OPERACIÓN</span>
              <span>RENTABILIDAD</span>
              <span>COSTOS</span>
              <span>MENÚ</span>
              <span>PERSONAL</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pain-points">
        <div className="container">
          <div className="section-heading narrow">
            <div className="section-label">PROPIETARIOS Y OPERADORES</div>
            <h2>Ser dueño de un restaurante significa que siempre hay algo que resolver.</h2>
            <p>
              El problema es que cuando pasas todos los días dentro de la operación, es difícil detenerse y observar el negocio desde afuera.
            </p>
          </div>

          <div className="pain-grid">
            {painPoints.map((item) => (
              <article key={item.title} className="pain-card">
                <span className="pain-index">0{painPoints.indexOf(item) + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block perspective">
        <div className="container">
          <div className="section-heading narrow text-center">
            <div className="section-label">PERSPECTIVA EXTERNA</div>
            <h2>A veces no necesitas trabajar más. Necesitas una nueva perspectiva.</h2>
          </div>

          <p className="lead-copy">
            Cuando gestionas un restaurante todos los días, muchas situaciones terminan formando parte de la rutina. Procesos lentos. Costos que aumentan gradualmente. Problemas que se repiten. Decisiones que siempre dependen de las mismas personas.
          </p>

          <p className="lead-copy">
            Con el tiempo, algunas de estas situaciones dejan de parecer problemas. Simplemente se convierten en “la forma en que siempre hemos trabajado”.
          </p>

          <p className="lead-copy emphasis">
            Nuestros auditores aportan una mirada externa e independiente para observar el negocio desde una perspectiva diferente. No para buscar culpables, sino para entender qué está ocurriendo realmente.
          </p>

          <blockquote>
            “Una mirada externa puede revelar oportunidades que la rutina ha dejado de mostrar.”
          </blockquote>
        </div>
      </section>

      <section className="section-block experts" id="expertos">
        <div className="container">
          <div className="section-heading narrow">
            <div className="section-label">EXPERIENCIA QUE NO VIENE EN UN SOFTWARE</div>
            <h2>Detrás de cada auditoría hay personas que conocen la industria.</h2>
            <p>
              Los datos pueden indicar que algo cambió. Pero entender por qué cambió, qué investigar y qué hacer después requiere experiencia. Nuestros auditores combinan conocimiento operativo, financiero y estratégico para analizar cada restaurante dentro de su propio contexto.
            </p>
          </div>

          <div className="auditor-grid">
            {auditors.map((auditor) => (
              <article key={auditor.name} className="auditor-card">
                <div className="auditor-photo" aria-hidden="true" />
                <div className="auditor-body">
                  <h3>{auditor.name}</h3>
                  <div className="auditor-role">{auditor.role}</div>
                  <div className="auditor-years">{auditor.years}</div>

                  <div className="auditor-specializations">
                    {auditor.specializations.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <p className="auditor-background">{auditor.background}</p>

                  <div className="auditor-quote">
                    <span>“</span>
                    <p>{auditor.philosophy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block data-flow" id="resultados">
        <div className="container">
          <div className="section-heading narrow">
            <h2>Los números pueden señalar un problema. La experiencia ayuda a encontrar la causa.</h2>
          </div>

          <div className="flow-steps">
            <div className="flow-item"><span>DATOS</span><strong>Food Cost: 38%<br />Labor Cost: 32%</strong></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-item muted"><span>SEÑAL</span><strong>Los márgenes están deteriorándose.</strong></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-item muted"><span>RESPUESTA SUPERFICIAL</span><strong>“Hay que reducir costos.”</strong></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-item highlight"><span>AUDITOR EXPERIMENTADO INVESTIGA</span><strong>¿Proveedores? ¿Porciones? ¿Desperdicio? ¿Inventario? ¿Recetas? ¿Mix de ventas? ¿Planificación?</strong></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-item muted"><span>CAUSA REAL</span><strong>Problema operativo específico.</strong></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-item"><span>ACCIÓN CORRECTA</span><strong>Solución basada en la causa.</strong></div>
          </div>

          <p className="lead-copy">
            Un porcentaje fuera de rango no explica un problema. Es una señal. El verdadero trabajo comienza después. <strong>El valor de un auditor experimentado está en saber qué preguntas hacer.</strong>
          </p>
        </div>
      </section>

      <section className="section-block audit-areas" id="que-auditamos">
        <div className="container">
          <div className="section-heading narrow text-center">
            <h2>Investigamos las áreas que realmente impactan el rendimiento de un restaurante.</h2>
          </div>

          <div className="area-grid">
            {auditAreas.map((area) => (
              <article key={area.id} className="area-card">
                <div className="area-number">{area.id}</div>
                <div className="area-content">
                  <h3>{area.title}</h3>
                  <p className="area-summary">{area.summary}</p>
                  <p>{area.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block method" id="metodo">
        <div className="container">
          <div className="section-heading narrow text-center">
            <div className="section-label">NUESTRO PROCESO</div>
            <h2>El Método VORA</h2>
          </div>

          <div className="method-grid">
            {methodSteps.map((step) => (
              <article key={step.number} className="method-card">
                <div className="method-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block deliverables">
        <div className="container">
          <div className="section-heading narrow">
            <h2>Una auditoría no termina con una lista de problemas.</h2>
            <p>
              El objetivo es que termine el proceso entendiendo claramente qué está ocurriendo, qué merece atención, por qué puede estar ocurriendo y dónde actuar primero.
            </p>
          </div>

          <div className="deliverable-list">
            {deliverables.map((item) => (
              <div key={item} className="deliverable-item">
                <span className="deliverable-dot" aria-hidden="true" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block intelligence">
        <div className="container">
          <div className="section-heading narrow">
            <div className="section-label">UNA VENTAJA ADICIONAL</div>
            <h2>La experiencia humana, apoyada por inteligencia especializada.</h2>
            <p>
              Nuestros auditores trabajan con herramientas diseñadas para ayudarles a procesar información, detectar patrones y organizar grandes cantidades de datos con mayor velocidad. VORA Intelligence funciona como una capa de asistencia dentro del proceso de auditoría. No reemplaza la experiencia, no toma decisiones por el cliente y no sustituye el criterio profesional.
            </p>
          </div>

          <div className="intelligence-flow">
            <div className="intel-node"><span>Auditor</span></div>
            <div className="intel-node"><span>Experiencia</span></div>
            <div className="intel-split">
              <div className="intel-node small"><span>Observación</span></div>
              <div className="intel-node small"><span>VORA assistance</span></div>
            </div>
            <div className="intel-node"><span>Investigación</span></div>
            <div className="intel-node"><span>Juicio profesional</span></div>
            <div className="intel-node"><span>Recomendación</span></div>
          </div>
        </div>
      </section>

      <section className="section-block faq">
        <div className="container">
          <div className="section-heading narrow text-center">
            <h2>Preguntas frecuentes</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="authority">
        <div className="container authority-inner">
          <h2>Ninguna herramienta conoce su restaurante mejor que las personas que lo viven todos los días.</h2>
          <p>Pero:</p>
          <blockquote>Una mirada externa, independiente y experimentada puede ayudarle a descubrir aquello que la rutina ha vuelto invisible.</blockquote>
          <h3>Ese es el trabajo de un buen auditor.</h3>
        </div>
      </section>

      <section className="final-cta section-block">
        <div className="container narrow text-center">
          <h2>Descubra qué oportunidades podrían estar pasando desapercibidas.</h2>
          <p>
            Una conversación puede ser el primer paso para entender mejor qué está ocurriendo dentro de su restaurante.
          </p>
          <Link href="/check" className="btn btn-primary large">
            Solicitar una revisión inicial →
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo">
              VOR<span>A</span>
            </div>
            <p>Experiencia humana. Análisis independiente. Metodología profesional. Tecnología como asistencia.</p>
          </div>

          <div className="footer-column">
            <h4>Enfoque</h4>
            <a href="#nuestro-enfoque">Nuestro Enfoque</a>
            <a href="#que-auditamos">Qué Auditamos</a>
            <a href="#metodo">El Método VORA</a>
          </div>

          <div className="footer-column">
            <h4>Equipo</h4>
            <a href="#expertos">Nuestros Expertos</a>
            <a href="#resultados">Resultados</a>
            <a href="/check">Revisión inicial</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="/privacy">Privacidad</a>
            <a href="/terms">Términos</a>
            <a href="/check">Contacto</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} VORA. Todos los derechos reservados.</span>
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

