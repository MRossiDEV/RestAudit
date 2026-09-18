import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  ChefHat,
  Coffee,
  FileText,
  Globe2,
  HeartHandshake,
  Link2,
  LockKeyhole,
  QrCode,
  Search,
  Sparkles,
  Users,
  Utensils,
  Video,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface Candidate {
  name: string;
  id: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  availability: string;
  status: string;
  image: string;
}

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

export const talentCategories = [
  { label: "Chefs", icon: ChefHat },
  { label: "Cocineros", icon: Utensils },
  { label: "Pastelería", icon: ChefHat },
  { label: "Panadería", icon: Utensils },
  { label: "Bartenders", icon: Coffee },
  { label: "Baristas", icon: Coffee },
  { label: "Mozos", icon: Users },
  { label: "Encargados", icon: BriefcaseBusiness },
  { label: "Hotelería", icon: BriefcaseBusiness },
  { label: "Catering", icon: Utensils },
];

/* -------------------------------------------------------------------------- */
/* Profile Features                                                           */
/* -------------------------------------------------------------------------- */

export const profileFeatures: FeatureItem[] = [
  {
    icon: BriefcaseBusiness,
    title: "Tu trayectoria completa",
    description:
      "Experiencia, habilidades, especialidades, formación, certificaciones y disponibilidad en un solo perfil.",
  },
  {
    icon: Camera,
    title: "Mostrá tu trabajo",
    description:
      "Fotos de platos, eventos, proyectos y trabajos reales que ayudan a demostrar lo que sabés hacer.",
  },
  {
    icon: Link2,
    title: "Un perfil que podés compartir",
    description:
      "Una URL permanente y un QR para tu CV, redes sociales, WhatsApp, email o tarjetas.",
  },
  {
    icon: Globe2,
    title: "Local o internacional",
    description:
      "Indicá dónde buscás oportunidades y si estás dispuesto a trasladarte por trabajo.",
  },
];

/* -------------------------------------------------------------------------- */
/* Interviewed Features                                                       */
/* -------------------------------------------------------------------------- */

export const interviewedFeatures: FeatureItem[] = [
  {
    icon: HeartHandshake,
    title: "Entrevista humana",
    description:
      "Un profesional de la red VORA conversa con vos y estructura tu experiencia profesional.",
  },
  {
    icon: Video,
    title: "Videos de trabajo",
    description:
      "Mostrá técnicas, preparación, servicio, liderazgo y otras habilidades profesionales.",
  },
  {
    icon: BadgeCheck,
    title: "VORA Interviewed",
    description:
      "Tu perfil incorpora información profesional revisada durante una entrevista VORA.",
  },
  {
    icon: Sparkles,
    title: "Más información para matching",
    description:
      "Experiencia, tareas, habilidades y disponibilidad estructuradas para mejorar las coincidencias.",
  },
];

/* -------------------------------------------------------------------------- */
/* Hiring Features                                                            */
/* -------------------------------------------------------------------------- */

export const hiringFeatures: FeatureItem[] = [
  {
    icon: Search,
    title: "Buscá por lo que realmente necesitás",
    description:
      "Rol, especialidad, experiencia, ubicación, disponibilidad, tipo de establecimiento y más.",
  },
  {
    icon: Sparkles,
    title: "Matching especializado",
    description:
      "VORA puede identificar profesionales según los requisitos concretos de tu búsqueda.",
  },
  {
    icon: BadgeCheck,
    title: "VORA Verified e Interviewed",
    description:
      "Accedé a profesionales con información adicional cuando tu empresa cumple los requisitos de acceso.",
  },
  {
    icon: LockKeyhole,
    title: "Información protegida",
    description:
      "Los datos privados y de contacto permanecen protegidos hasta que corresponde desbloquearlos.",
  },
];

/* -------------------------------------------------------------------------- */
/* Talent Steps                                                               */
/* -------------------------------------------------------------------------- */

export const talentSteps: StepItem[] = [
  {
    number: "01",
    title: "Creá tu perfil gratis",
    description:
      "Construí tu identidad profesional con experiencia, habilidades, especialidades, disponibilidad y portfolio.",
  },
  {
    number: "02",
    title: "Compartilo",
    description:
      "Usá tu enlace o QR en tu CV, Instagram, LinkedIn, WhatsApp, email o directamente con una empresa.",
  },
  {
    number: "03",
    title: "Seguí construyéndolo",
    description:
      "Cada nuevo trabajo, curso, certificación, habilidad o proyecto puede incorporarse a tu trayectoria.",
  },
  {
    number: "04",
    title: "Dejá que te encuentren",
    description:
      "Las empresas pueden descubrir profesionales cuando realizan búsquedas dentro de la red VORA.",
  },
];

/* -------------------------------------------------------------------------- */
/* Hiring Steps                                                               */
/* -------------------------------------------------------------------------- */

export const hiringSteps: StepItem[] = [
  {
    number: "01",
    title: "Definí tu búsqueda",
    description:
      "Indicá qué posición necesitás, dónde, qué experiencia requiere y qué habilidades buscás.",
  },
  {
    number: "02",
    title: "Descubrí profesionales",
    description:
      "Explorá perfiles y encontrá coincidencias dentro de una red especializada en gastronomía y hospitalidad.",
  },
  {
    number: "03",
    title: "Evaluá la información",
    description:
      "Experiencia, habilidades, portfolio, disponibilidad, ubicación y señales de VORA.",
  },
  {
    number: "04",
    title: "Desbloqueá candidatos",
    description:
      "Accedé a la información necesaria para avanzar con tu proceso de contratación.",
  },
];

/* -------------------------------------------------------------------------- */
/* Candidates                                                                 */
/* -------------------------------------------------------------------------- */

export const candidates: Candidate[] = [
  {
    name: "María",
    id: "#123456",
    role: "Chef Ejecutiva",
    location: "Montevideo · Uruguay",
    experience: "8 años",
    skills: ["Fine Dining", "Gestión", "Pastelería"],
    availability: "Disponible",
    status: "VORA Interviewed",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Carlos",
    id: "#284731",
    role: "Cocinero Profesional",
    location: "Buenos Aires · Argentina",
    experience: "6 años",
    skills: ["Parrilla", "Producción", "Cocina caliente"],
    availability: "Disponible",
    status: "VORA Verified",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Lucía",
    id: "#391824",
    role: "Pastelera",
    location: "Santiago · Chile",
    experience: "5 años",
    skills: ["Pastelería", "Panadería", "Decoración"],
    availability: "En 15 días",
    status: "VORA Interviewed",
    image:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=500&q=85",
  },
];
