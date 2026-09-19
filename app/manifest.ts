import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VORA — Talento para gastronomía y hospitalidad",
    short_name: "VORA",
    description:
      "La red profesional de gastronomía y hospitalidad. Tu perfil profesional, tu carrera, tus oportunidades.",
    start_url: "/talent",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#07070a",
    theme_color: "#07070a",
    lang: "es",
    icons: [
      {
        src: "/brand/logo-icon-black.png",
        sizes: "251x251",
        type: "image/png",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
